// ver 0.6
pragma solidity ^0.4.18;

import 'github.com/PillarDevelopment/Barbarossa-Git/BarbarossaCrowdsale.sol';

contract BarbarossaToken is ERC20Extending, BarbarossaCrowdsale, Migrations
{

    uint public weisRaised; 

    function BarbarossaToken() public TokenERC20(10000, "Barbarossa Token", "BB") {} //change before send !!!

    
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
