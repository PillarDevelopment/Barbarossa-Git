
pragma solidity ^0.4.18;

library SafeMath
{
    function mul(uint256 a, uint256 b) internal pure
        returns (uint256)
    {
        uint256 c = a * b;

        assert(a == 0 || c / a == b);

        return c;
    }

    function div(uint256 a, uint256 b) internal pure
        returns (uint256)
    {
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure
        returns (uint256)
    {
        assert(b <= a);

        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure
        returns (uint256)
    {
        uint256 c = a + b;

        assert(c >= a);

        return c;
    }
}

contract Ownable
{
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract Migrations is Ownable {
  uint256 public lastCompletedMigration;

  function setCompleted(uint256 completed) onlyOwner  public {
    lastCompletedMigration = completed;
  }

  function upgrade(address newAddress) onlyOwner  public {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(lastCompletedMigration);
  }
}

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
    uint256 DEC = 10 ** uint256(decimals); 
    address public owner;

    uint256 public totalSupply;
    uint256 public avaliableSupply;
    uint256 public buyPrice = 12000 szabo;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(
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

        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _value) public
    {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public
        returns (bool success)
    {
        require(_value <= allowance[_from][msg.sender]);    

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

        emit Approval(msg.sender, _spender, allowance[msg.sender][_spender]);

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
        emit Approval(msg.sender, _spender, allowance[msg.sender][_spender]);
        return true;
    }
    
    function burn(uint256 _value) public onlyOwner
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        avaliableSupply -= _value;
        emit Burn(msg.sender, _value);
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
        emit Burn(_from, _value);
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

        emit EPause();
    }

    function pauseInternal() internal
    {
        paused = true;

        emit EPause();
    }

    function unpause() public onlyOwner
    {
        paused = false;

        emit EUnpause();
    }
}

contract ERC20Extending is TokenERC20
{
    
    function transferEthFromContract(address _to, uint256 amount) public onlyOwner
    {
        amount = amount * DEC; 
        _to.transfer(amount);
    }

    function transferTokensFromContract(address _to, uint256 _value) public onlyOwner
    {   
        avaliableSupply -= _value;
        _value = _value*DEC; 
        _transfer(this, _to, _value);
    }
}

contract BarbarossaCrowdsale is Pauseble
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
            return "first stage";
        } else if(2 == stage) {
            return "second stage";
        } else if (3 == stage) {
            return "feature stage";
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
            emit SaleFinished(SaleStatus());
            pauseInternal();
            revert();
        }
        Selling.tokens -= _amount;
        avaliableSupply -= _amount;
        _transfer(this, _investor, _amount);
    }
/*
function startSelling(uint256 _tokens, uint _startDate, uint _endDate, uint8 _discount) public onlyOwner
    {
        require(_tokens * DEC <= avaliableSupply);  
        startSellDate = _startDate;
        Selling = Ico (_tokens * DEC, _startDate, _endDate, _discount);
        stage += 1;
        unpause();
    }
*/
    

    function withDiscount(uint256 _amount, uint _percent) internal pure
        returns (uint256)
    {
        return ((_amount * _percent) / 100);
    }
} 

contract BarbarossaContract is ERC20Extending, BarbarossaCrowdsale, Migrations {

    uint public weisRaised; 

    constructor() public TokenERC20(50000000, "Barbarossa Invest Token", "BIT") {
        
    } 

    
    function () public payable   
    {
        owner.transfer(msg.value); 
        sell(msg.sender, msg.value);
        weisRaised = weisRaised.add(msg.value);  
    }
    function setPrices(uint256 newPrice)  public onlyOwner {
        buyPrice = newPrice;
    }
}///50000000,1513663200,1514700000,0
