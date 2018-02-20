pragma solidity ^0.4.11;

interface BarbarossaCoin {
    function transfer(address _receiver, uint256 _amount);
}

contract BarbarossaCoinSafe {

    uint256 public buyPrice;
    BarbarossaCoin public token;


    function BarbarossaCoinSafe(BarbarossaCoin _token){
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