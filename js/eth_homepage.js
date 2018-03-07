var MAINET_RPC_URL='https://mainnet.infura.io/metamask';
var ROPSTEN_RPC_URL='https://ropsten.infura.io/metamask';
var KOVAN_RPC_URL='https://kovan.infura.io/metamask';
var RINKEBY_RPC_URL='https://rinkeby.infura.io/metamask';

var CURRENT_URL=ROPSTEN_RPC_URL;

$(document).ready(function() {

var web3=new Web3(new Web3.providers.HttpProvider(CURRENT_URL));
var contractAddress = "0x4c322906982842D71E4Ffc6Fb707EBF250Fa0C48";

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

contractYODSE = web3.eth.contract(ABIArray).at(contractAddress);

var BalanceContractWei = web3.fromWei(web3.eth.getBalance(contractAddress), 'ether');
  var Tokensforsale = contractYODSE.balanceOf(contractAddress);
  var Investors = contractYODSE.tokenHolders();
  var price = web3.fromWei(contractYODSE.buyPrice(),'ether');
  var AllToken = contractYODSE.totalSupply();
});


/*
var user_address=$('.user_acc_number').html();
user_address=$.trim(user_address);
var balance=contractInstance.balanceOf(user_address);
balance=balance/100000000;
$('.tokens_count').html(balance);});

import './TemplateVar.js';

var MAINET_RPC_URL='https://mainnet.infura.io/metamask';
var ROPSTEN_RPC_URL='https://ropsten.infura.io/metamask';
var KOVAN_RPC_URL='https://kovan.infura.io/metamask';
var RINKEBY_RPC_URL='https://rinkeby.infura.io/metamask';
var CURRENT_URL=MAINET_RPC_URL;

$(document).ready(function()
{

    web3=new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VErbwOgRsS5RyJHEThON'));
    //web3=new Web3(new Web3.providers.HttpProvider(CURRENT_URL));

    contractAddress = "0x4c322906982842D71E4Ffc6Fb707EBF250Fa0C48";

    ABIArray=([
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
        "constant": true,
        "inputs": [],
        "name": "softCapPreIco",
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
        "name": "softCapMainSale",
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
    },
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
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
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
        "constant": false,
        "inputs": [],
        "name": "refundICO",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
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
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "constant": false,
        "inputs": [],
        "name": "refundPreICO",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]);
// речи о калькуляторе не было
     //  - сколько собрано эфира
    contractYODSE = web3.eth.contract(ABIArray).at(contractAddress);
/*
   set("Investors",contractYODSE.tokenHolders());
      set("price",web3.fromWei(contractYODSE.buyPrice(),'ether'));
      set("BalanceContractWei",web3.fromWei(web3.eth.getBalance(contractAddress), 'ether'));
      set("Tokensforsale",contractYODSE.balanceOf(contractAddress));
      set("AllToken",contractYODSE.totalSupply());
*
var BalanceContractWei = web3.fromWei(web3.eth.getBalance(contractAddress), 'ether');
var Tokensforsale = contractYODSE.balanceOf(contractAddress);
var Investors = contractYODSE.tokenHolders();
var price = web3.fromWei(contractYODSE.buyPrice(),'ether');
var AllToken = contractYODSE.totalSupply();

    /*
    var balance =  web3.fromWei(eth.getBalance(address)); // выведет собр эфир - макс шкалы - 3000 ether(40 000 для hardCAp)
    var price = web3.fromWei(1000000000000000); // выведет текущую цену в ETH

    var contract = web3.eth.contract(abi); // создали объект контракта
    var investors = contract.at(tokenHolders); // вывели количество инвесторов
    var curentToken = contract.at(availableSupply);; // выведет колчество доступных токенов (макс шкалы - 60 000 000 шт)
    var soldToken = 60000000-curentToken; // выведет количество проданных токенов

*
var priceETH = buyPrice;    // цена в эфире
var balance = web3.eth.getBalance("0x4c322906982842D71E4Ffc6Fb707EBF250Fa0C48"); //  - сколько средств на счете
    // вычесть из softCap чтобы получить шкалу закрытия SoftCap 3000  Ether

    var availableSupply; // доступные к продаже
    var tokenHolders; // количеств оинвесторов



var contractInstance=MyContract.at('0x4c322906982842D71E4Ffc6Fb707EBF250Fa0C48');

var was_sold=contractInstance.totalSupply(); // сколько продано токенов
    // сколько осталось = totalSupply -  was_sold - 40 000 000



was_sold=(was_sold/100000000*0.005-(307.7186/3*5)-(175.7246/4*5)-(143.2501/4.5*5)-(110.6452/4.75*5))+ 307.7186+ 175.7246+ 143.2501+ 110.6452;

$('.eth_contract_balance').html(was_sold.toFixed(4));

var eth_to_usd=$('.eth_to_usd').html();

var usd_sum=$('.usd_contract_balance').data("value");

usd_sum=parseFloat(usd_sum)+ parseFloat(was_sold)*parseFloat(eth_to_usd);$('.usd_contract_balance').html(usd_sum.toFixed(0));
**

});

*/
