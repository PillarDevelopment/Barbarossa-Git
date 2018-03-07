var MAINET_RPC_URL = 'https://mainnet.infura.io/metamask' ;
var ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask' ;
var KOVAN_RPC_URL = 'https://kovan.infura.io/metamask' ;
var RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask' ;

var CURRENT_URL = MAINET_RPC_URL ;

$( document ).ready(function() {
    web3 = new Web3(new Web3.providers.HttpProvider(CURRENT_URL));

    var contractAddress = '0x45e044ED9Bf130EafafA8095115Eda69FC3b0D20' ;

    var ABIArray([
                                     	{
                                     		"constant": false,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "tokenTransferFromHolding",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "avaliableSupply",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "name",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "string"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "totalSupply",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "balances",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "decimals",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "endPreIcoDate",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "beneficiary",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "startPreIcoDate",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [
                                     			{
                                     				"name": "_value",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "burn",
                                     		"outputs": [
                                     			{
                                     				"name": "success",
                                     				"type": "bool"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [],
                                     		"name": "finalize",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "hardCapPreIco",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "tokenFrozenTeam",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "balanceOf",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "tokenFrozenReserve",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "buyPrice",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "isFinalized",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "bool"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "owner",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "tokenHolders",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "symbol",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "string"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "hardCapMainISale",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "endIcoDate",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [
                                     			{
                                     				"name": "_to",
                                     				"type": "address"
                                     			},
                                     			{
                                     				"name": "_value",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "transfer",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [
                                     			{
                                     				"name": "_to",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "withdrawEthFromContract",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [
                                     			{
                                     				"name": "newEndIcoDate",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "setEndData",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "startIcoDate",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": false,
                                     		"inputs": [],
                                     		"name": "distributionTokens",
                                     		"outputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [],
                                     		"name": "weisRaised",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "tokenFrozenConsult",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"constant": true,
                                     		"inputs": [
                                     			{
                                     				"name": "",
                                     				"type": "address"
                                     			}
                                     		],
                                     		"name": "onChain",
                                     		"outputs": [
                                     			{
                                     				"name": "",
                                     				"type": "bool"
                                     			}
                                     		],
                                     		"payable": false,
                                     		"stateMutability": "view",
                                     		"type": "function"
                                     	},
                                     	{
                                     		"inputs": [],
                                     		"payable": false,
                                     		"stateMutability": "nonpayable",
                                     		"type": "constructor"
                                     	},
                                     	{
                                     		"payable": true,
                                     		"stateMutability": "payable",
                                     		"type": "fallback"
                                     	},
                                     	{
                                     		"anonymous": false,
                                     		"inputs": [],
                                     		"name": "Finalized",
                                     		"type": "event"
                                     	},
                                     	{
                                     		"anonymous": false,
                                     		"inputs": [
                                     			{
                                     				"indexed": true,
                                     				"name": "from",
                                     				"type": "address"
                                     			},
                                     			{
                                     				"indexed": true,
                                     				"name": "to",
                                     				"type": "address"
                                     			},
                                     			{
                                     				"indexed": false,
                                     				"name": "value",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "Transfer",
                                     		"type": "event"
                                     	},
                                     	{
                                     		"anonymous": false,
                                     		"inputs": [
                                     			{
                                     				"indexed": true,
                                     				"name": "from",
                                     				"type": "address"
                                     			},
                                     			{
                                     				"indexed": false,
                                     				"name": "value",
                                     				"type": "uint256"
                                     			}
                                     		],
                                     		"name": "Burn",
                                     		"type": "event"
                                     	}
                                     ]);

    var contractYODSE = web3.eth.contract(ABIArray).at(contractAddress);

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
                BalanceContractWei(balance) ;
                $.cookie("address", address);
            } else {
                alert('Some error happens. Please, try again.') ;
                console.error(error);
            }
        });
    }

    function BalanceContractWei(wei) {
        eth = wei / 1000000000000000000 ;
        eth = web3.fromWei(wei, 'ether') ;
        $('.balance_positive').html(eth) ;
    }

    /*
    function Tokensforsale(address) {

        }
    */
    //var BalanceContractWei = web3.fromWei(web3.eth.getBalance(contractAddress), 'ether');
    //var Tokensforsale = contractYODSE.balanceOf(contractAddress);
    //var Investors = contractYODSE.tokenHolders();
    //var price = web3.fromWei(contractYODSE.buyPrice(),'ether');
    //var AllToken = contractYODSE.totalSupply();
});