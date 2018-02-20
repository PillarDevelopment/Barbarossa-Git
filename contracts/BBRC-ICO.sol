pragma solidity ^0.4.18;

//Контракт токена(коина)

/*** @title ERC20Basic*/
contract ERC20Basic {
  uint256 public totalSupply;
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

/*** @title ERC20 interface */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}











interface BarbarossaICO{
    function transfer(address _receiver, uint256 _amount);
}

contract BarbarossaCoinSafe {

    uint256 public buyPrice;
    BarbarossaICO public token;


    function BarbarossaCoinSafe(BarbarossaICO _token){
        buyPrice = 1000000;
    }

    function () payable {
        _buy(msg.sender, msg.value);
    }

    function buy() payable returns (uint) {
        uint tokens = _buy(msg.sender, msg.value);
        return tokens;
    }

    function _buy(address _sender, uint256 _amount) internal returns (uint){
        uint tokens = _amount / buyPrice;
        token.transfer(_sender, tokens);
        return tokens;
    }
}