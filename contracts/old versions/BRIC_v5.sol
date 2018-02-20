pragma solidity ^0.4.18;
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol';
import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Ownable.sol';

interface tokenRecipient
{
    function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public;
}

contract TokenERC20 is Ownable
{
    using SafeMath for uint;

    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 DEC = 10 ** uint256(decimals); //конвертация из wei
    address public owner;

    uint256 public totalSupply;
    uint256 public avaliableSupply;
    uint256 public buyPrice = 20000000000000000 wei; // цена покупки - заменил с 1 эфира на 0.02

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function TokenERC20(
        uint256 initialSupply,
        string tokenName,
        string tokenSymbol
    ) public
    {
        totalSupply = initialSupply * DEC;  // Update total supply with the decimal amount
        balanceOf[this] = totalSupply;                // Give the creator all initial tokens
        avaliableSupply = balanceOf[this];            // Show how much tokens on contract
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        owner = msg.sender;
    }

    function _transfer(address _from, address _to, uint256 _value) internal
    {
        require(_to != 0x0);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _value) public
    {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public
        returns (bool success)
    {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance

        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function approveAndCall(address _spender, uint256 _value, bytes _extraData) public onlyOwner
        returns (bool success)
    {
        tokenRecipient spender = tokenRecipient(_spender);

        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    function increaseApproval (address _spender, uint _addedValue) public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = allowance[msg.sender][_spender].add(_addedValue);

        Approval(msg.sender, _spender, allowance[msg.sender][_spender]);

        return true;
    }

    function decreaseApproval (address _spender, uint _subtractedValue) public
        returns (bool success)
    {
        uint oldValue = allowance[msg.sender][_spender];
        if (_subtractedValue > oldValue) {
            allowance[msg.sender][_spender] = 0;
        } else {
            allowance[msg.sender][_spender] = oldValue.sub(_subtractedValue);
        }
        Approval(msg.sender, _spender, allowance[msg.sender][_spender]);
        return true;
    }

    function burn(uint256 _value) public onlyOwner
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        avaliableSupply -= _value;
        Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(address _from, uint256 _value) public onlyOwner
        returns (bool success)
    {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        avaliableSupply -= _value;
        Burn(_from, _value);
        return true;
    }
}

contract Pauseble is TokenERC20
{
    event EPause();
    event EUnpause();

    bool public paused = true;
    uint public startSellDate = 0;

    modifier whenNotPaused()
    {
      require(!paused);
      _;
    }

    modifier whenPaused()
    {
          require(paused);
        _;
    }

    function pause() public onlyOwner
    {
        paused = true;

        EPause();
    }

    function pauseInternal() internal
    {
        paused = true;

        EPause();
    }

    function unpause() public onlyOwner
    {
        paused = false;

        EUnpause();
    }
}

contract ERC20Extending is TokenERC20
{

    function transferEthFromContract(address _to, uint256 amount) public onlyOwner
    {
        amount = amount * DEC; //пытаюсь решить проблемы с нулями - при тестировании в Remix работате корректно
        _to.transfer(amount);
    }

    function transferTokensFromContract(address _to, uint256 _value) public onlyOwner
    {   
        avaliableSupply -= _value;
        _value = _value*DEC; //пытаюсь решить проблемы с нулями
        _transfer(this, _to, _value);
    }
}

contract PastilaCrowdsale is Pauseble
{
    using SafeMath for uint;
    uint public stage = 0;
    event SaleFinished(string info);
    struct Ico {
        uint256 tokens;
        uint startDate;
        uint endDate; 
        uint8 discount;
    }

    Ico public Selling;
    
    function SaleStatus() internal constant
        returns (string)
    {
        if (1 == stage) {
            return "Pre-ICO";
        } else if(2 == stage) {
            return "ICO first stage";
        } else if (3 == stage) {
            return "ICO second stage";
        } else if (4 >= stage) {
            return "feature stage";
        }
        return "there is no stage at present";
    }

    function sell(address _investor, uint256 amount) internal
    {
        uint256 _amount = amount.mul(DEC).div(buyPrice); 
        if (1 == stage) {
            _amount = _amount.add(withDiscount(_amount, Selling.discount));
        }
        else if (2 == stage) {
            _amount = _amount.add(withDiscount(_amount, Selling.discount));
        } 
        else if (3 == stage) {
            _amount = _amount.add(withDiscount(_amount, Selling.discount));
        }
        if (Selling.tokens < _amount)
        {
            SaleFinished(SaleStatus());
            pauseInternal();
            revert();
        }
        Selling.tokens -= _amount;
        avaliableSupply -= _amount;
        _transfer(this, _investor, _amount);
    }

    function startSelling(uint256 _tokens, uint _startDate, uint _endDate, uint8 _discount) public onlyOwner
    {
        require(_tokens * DEC <= avaliableSupply);  
        startSellDate = _startDate;
        Selling = Ico (_tokens * DEC, _startDate, _endDate, _discount);
        stage += 1;
        unpause();
    }

    function withDiscount(uint256 _amount, uint _percent) internal pure
        returns (uint256)
    {
        return ((_amount * _percent) / 100);
    }
}

contract PastilaContract is ERC20Extending, PastilaCrowdsale
{

    uint public weisRaised; /// количеств эфиров, которые пришли

    function PastilaContract() public TokenERC20(10000, "Pastila Contract", "PSTL") {} //change before send !!!

    
    function () public payable   //  приход эфиров на счет
    {
        assert(msg.value >= 1 ether / 10);  // проверка что прыслано более чем 0,1 эфир - минимально 5 токенов - 50 баксов
        
        sell(msg.sender, msg.value);
        owner.transfer(msg.value); ///++ отправляет эфир сразу владельцу контракта
        weisRaised = weisRaised.add(msg.value);  /// количеств эфиров, которые пришли - можно к web3js прикрутить
    }

    function setPrices(uint256 newPrice)  public onlyOwner {
        buyPrice = newPrice;
    }
}

c870cb1db9eed45391b0 - GitHub Authorization
Personal Authorization token
Enter following code in SmartGit to complete the authorization: