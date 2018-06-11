var MAINET_RPC_URL = 'https://mainnet.infura.io/metamask' ;
var ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask' ;
var KOVAN_RPC_URL = 'https://kovan.infura.io/metamask' ;
var RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask' ;

var CURRENT_URL = ROPSTEN_RPC_URL ;

$( document ).ready(function() {
    web3 = new Web3(new Web3.providers.HttpProvider(CURRENT_URL));

    var wallet = '0x4c322906982842D71E4Ffc6Fb707EBF250Fa0C48' ;

    $('.check_balance').click(function(){
        address = wallet ;
        balance = getBalance(address) ;
        console.log(balance) ;
    });

    function getBalance(address) {
        if (address.length <= 3) {
            alert("Wallet address is incorrect") ;
            return 0 ;
        }

        web3.eth.getBalance(address, function(error, result){
            console.log('yes') ;
            if(!error) {
                balance = result.toString(10) ;
                setBalance(balance) ;
                $.cookie("address", address);
            } else {
                alert('Some error happens. Please, try again.') ;
                console.error(error);
            }
        });
    }

    function setBalance(wei) {
        eth = wei / 1000000000000000000 ;
        eth = web3.fromWei(wei, 'ether') ;
        $('.balance_positive').html(eth) ;
    }
});




var MAINET_RPC_URL='https://mainnet.infura.io/metamask';
var ROPSTEN_RPC_URL='https://ropsten.infura.io/metamask';
var KOVAN_RPC_URL='https://kovan.infura.io/metamask';
var RINKEBY_RPC_URL='https://rinkeby.infura.io/metamask';

var CURRENT_URL=MAINET_RPC_URL;

$(document).ready(function() {

var web3=new Web3(new Web3.providers.HttpProvider(CURRENT_URL));

var MyContract=web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenHolder","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"icoContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"tokenHolderCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mintTokens","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[{"name":"_icoContractAddress","type":"address"},{"name":"_authenticationManagerAddress","type":"address"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"anonymous":false,"inputs":[],"name":"FundClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);

var contractInstance=MyContract.at('0x32ff589e7ac1c1379fb56d9d1040cd74c7c50a62');

var user_address=$('.contractInstance').html();user_address=$.trim(user_address);
var balance=contractInstance.balanceOf(user_address);

balance=balance/100000000;

$('.tokens_count').html(balance);});
