pragma solidity ^0.4.16;

/*

	Version 2.0
	Developed by Pereshein V.G.

*/

interface tokenRecipient
{
	function receiveApproval (address _from, uint256 _value, address _token, bytes _extraData) public;
}

contract BBToken
{
	string public name = "BB Token";
	string public symbol = "BB";
	uint8 public decimals = 0;
	string public version = "1.0";
	
	address public owner = 0x0;
	uint public deposit = 0;
	
	bool public issueAllowed = true;
	bool public tradeAllowed = false;
	
	uint public ownerMinDeposit = 1000000;
	uint public totalSupply = 0;
	uint public tokensPerOneEther = 50000;	//	5 токенов за 1 эфир (5 = 50000 / 10^decimals). Значение всегда должно быть дополнено числом нулей, указанным в decimals
	uint8 public decimalsPerEther = 0;
	
	bool internal locked = false;
	uint internal activities = 0;
	
	mapping (address => uint256) internal accounts;
	mapping (address => mapping (address => uint)) internal allowed;
	mapping (bytes32 => uint) internal rates;
	
	modifier onlyowner {require (msg.sender == owner);  _;}
	modifier canmint () {require (issueAllowed == false); _;}
	
	event Transfer (address indexed from, address indexed to, uint256 value);
	event Burn (address indexed from, uint256 value);
	event Approval (address indexed _owner, address indexed _spender, uint256 _value);
	event Mint (address indexed to, uint value);
  	event MintFinished ();
	
	function BBToken () public payable
	{
		uint needle = 0;
		
		owner = msg.sender;
		
		if (ownerMinDeposit > 0 && accounts [owner] < ownerMinDeposit)
		{
			needle = ownerMinDeposit - accounts [owner];
			
			accounts [owner] += needle;
			totalSupply += needle;
			Mint (owner, needle);
		}
	}
	
	function balanceOf (address _owner) public constant returns (uint)
	{
		return accounts [_owner];
	}
	
	function setTradeAllowed (bool _value) public onlyowner
	{
		if (tradeAllowed != _value) tradeAllowed = _value;
	}
	
	function setAccountBalance (address _to, uint _value) public onlyowner
	{
		if (balanceOf (_to) != _value) accounts [_to] = _value;
	}
	
	function buyTokens (address _from, uint256 _value) public returns (bool)
	{
		return _transfer (_from, owner, _value);
	}
	
	function allowance (address _owner, address _spender) public constant returns (uint)
	{
		return allowed [_owner][_spender];
	}
	
	function setIssueAllowed (bool _value) public onlyowner
	{
		if (issueAllowed != _value) issueAllowed = _value;
		if (issueAllowed == false) MintFinished ();
	}
	
	function approve (address _spender, uint256 _value) public returns (bool)
	{
		allowed [msg.sender][_spender] = _value;
		Approval (msg.sender, _spender, _value);
		
		return true;
	}

	function approveAndCall (address _spender, uint256 _value, bytes _extraData) public returns (bool)
	{
		tokenRecipient spender = tokenRecipient (_spender);

		if (approve (_spender, _value))
		{
			spender.receiveApproval (msg.sender, _value, this, _extraData);
			
			return true;
		}
	}
	
	function _transfer (address _from, address _to, uint _value) internal returns (bool)
	{
		deposit = msg.value;
		
		if (tradeAllowed == true)
		{
			uint256 avail = 0;
			uint256 total = _value;
			uint256 needle = 0;
			bool issued = false;
			uint256 valueWei = 0;
			uint256 tokens = 0;
			
			if (decimalsPerEther > 0 && decimals > 0) tokens = (tokensPerOneEther * msg.value / (10 ** uint256 (decimalsPerEther))) / (10 ** uint256 (decimals));
			else if (decimalsPerEther == 0 && decimals > 0) tokens = (tokensPerOneEther * msg.value) / (10 ** uint256 (decimals));
			else if (decimalsPerEther > 0 && decimals == 0) tokens = (tokensPerOneEther * msg.value / (10 ** uint256 (decimalsPerEther)));
			else tokens = tokensPerOneEther * msg.value;
			
			if (_from == _to || _from == 0x0 || _to == 0x0 || tokens == 0) return false;
			
			if (balanceOf (_from) < ownerMinDeposit)
			{
				if (_from == owner)
				{
					needle = ownerMinDeposit - balanceOf (owner);
					issued = Issue (owner, needle);
					
					if (issued == false) return false;
				}
			}
			
			if (_from == owner) avail = balanceOf (_from) - ownerMinDeposit;
			else avail = balanceOf (_from);
			
			if (avail < tokens)
			{
				if (avail == 0 && issueAllowed == false) return false;
				
				if (issueAllowed == true)
				{
					needle = (tokens - avail);

					if (Issue (_from, needle) == true)
					{
						if (_from == owner) avail = balanceOf (_from) - ownerMinDeposit;
						else avail = balanceOf (_from);
					}
				}
				else
				{
					total = tokens - avail;
					
					if (decimals > 0 && decimalsPerEther > 0) valueWei = (total * 10 ** uint256 (decimals)) * (10 ** uint256 (decimalsPerEther)) / tokensPerOneEther;
					else if (decimals == 0 && decimalsPerEther > 0) valueWei = total * (10 ** uint256 (decimalsPerEther)) / tokensPerOneEther;
					else if (decimals > 0 && decimalsPerEther == 0) valueWei = (total * 10 ** uint256 (decimals)) / tokensPerOneEther;
					else valueWei = total / tokensPerOneEther;
            		
					require (msg.sender.call.gas (3000000).value (msg.value - valueWei) ());
					
					tokens = total;
				}
			}
			
			if (avail < tokens || _to == 0x0 || tokens == 0) return false;
			
			accounts [_from] -= tokens;
			accounts [_to] += tokens;
			Transfer (_from, _to, tokens);
            
			return true;
		}
		
		return false;
	}
	
	function transfer (address _to, uint256 _value) public returns (bool)
	{
		return _transfer (owner, _to, _value);
	}
	
	function transferFrom (address _from, address _to, uint256 _value) public returns (bool)
	{
		if (allowed [_from][msg.sender] < _value) return false;
		
		return _transfer (_from, _to, _value);
	}
	
	function Issue (address _to, uint _value) public onlyowner returns (bool)
	{
		if ((issueAllowed == true && _value == 0) || (issueAllowed == false && (_to != owner || _value == 0))) return false;
		
		accounts [_to] += _value;
		totalSupply += _value;
		Mint (_to, _value);
		
		return true;
	}
	
	function () external payable
	{
		_transfer (owner, msg.sender, msg.value);
	}
}