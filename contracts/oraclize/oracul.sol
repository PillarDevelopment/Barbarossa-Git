pragma solidity ^0.4.18;

import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract DollardPriceContract is usingOraclize {  // добавлены функции __callback, updatedPrice

    uint public ethusdPrice;  // цена которую мы парсим из Kraken
    uint public tokenPrice; // пересчитаная цена токена
    uint public tokenNomianl;// номинал токена в usd
     uint256 public decimals = 2;
    uint256 DEC = 10 ** uint256(decimals);
    event updatedPrice(string price);
    event newOraclizeQuery(string description);

    function DollardPriceContract() payable {  // функция принимает бабки и отправляет значение обратно, ее надо сделать публичной и тогда можно убрать другую
        updatePrice();
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        ethusdPrice  = parseInt(result, 1);
        updatedPrice(result);
        updatePrice();
    }

    function  () public payable {
    }

//    function myFunction (uint ethusdPrice, uint tokenNomianl) internal returns(uint tokenPrice) {
//      tokenPrice = tokenNomianl.mul(DEC).div(ethusdPrice); 
//      }  /// данная функция выдает ошибку - что то ей не нравится
    

    function updatePrice() payable {

         uint256 _tokenPrice = tokenNomianl.mul(DEC).div(ethusdPrice); 
        if (oraclize_getPrice("URL") > this.balance) {
            newOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query(43200, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.[0]");
        }
    }
}



 function sell(address _investor, uint256 amount) internal
    {
        uint256 _tokenPrice = tokenNomianl.mul(DEC).div(ethusdPrice); 
        
    }





/* 
contract DollardPriceContract is usingOraclize {  // добавлены функции __callback, updatedPrice

    string public ethusdPrice;  
    uint internal nominalUsdPrice = 10; // цена показывает цену номинала в долларах - можно реплизовать функцию изменения цены номинала
    uint public tokenPrice;
    event updatedPrice(string price);
    event newOraclizeQuery(string description);
    event nominalUsdPrice(string price); /// добавил эфент на номинальную цену
    
function parseInt(string _a, uint _b) internal returns (uint) { // функция переводит string в uint
  bytes memory bresult = bytes(_a);
  uint mint = 0;
  bool decimals = false;
  for (uint i = 0; i < bresult.length; i++) {
    if ((bresult[i] >= 48) && (bresult[i] <= 57)) {
      if (decimals) {
        if (_b == 0) break;
          else _b--;
      }
      mint *= 10;
      mint += uint(bresult[i]) - 48;
    } else if (bresult[i] == 46) decimals = true;
  }
  return mint;
}

    function DollardPriceContract() payable {  // функция принимает бабки и отправляет значение обратно, ее надо сделать публичной и тогда можно убрать другую
        updatePrice();
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        ethusdPrice = result;
        updatedPrice(result);
        updatePrice();
    }

    function  () public payable {
    }
    
    function updatePrice() payable {
        if (oraclize_getPrice("URL") > this.balance) {
            newOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.[0]");
        }
    }
    function freshPrice (uint newtokenPrice) public returns(uint) {
        tokenPrice = newtokenPrice;
    }
    
}




/// Thanks Suhanov Aleksandr
pragma solidity ^0.4.11;

import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract DollarPrice is usingOraclize {

    uint public dollarCost;

    function updatePrice() payable {
        if (oraclize_getPrice("URL") > this.balance) {
            return;
        }
        else {
            oraclize_query("URL", ""); // "json(https://api.kraken.com/0/public/Ticker?pair=XBTUSD).result.XXBTZUSD.c.[0]"
        }
    }   
    function _callBack (bytes32 myid, string result)  {
        if (msg.sender != oraclize_cbAddress()) throw;
        dollarCost = parseInt(result, 3);
    }
}





//Thanks Jinkor
function __callback(bytes32 myid, string result, bytes proof) {

    uint newPrice = parseInt(result, 2);
    require(newPrice > 0);
    uint changeInPercents = newPrice.mul(100).div(currentPrice);

    if (changeInPercents >= MIN_ALLOWED_PRICE_DIFF && changeInPercents <= MAX_ALLOWED_PRICE_DIFF) {
      currentPrice = newPrice;
    } 
  }*/


