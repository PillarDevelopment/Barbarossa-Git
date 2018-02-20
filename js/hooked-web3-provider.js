"use strict";var _createClass=(function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1;descriptor.configurable=!0;if("value" in descriptor)descriptor.writable=!0;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}})();var _get=function get(_x,_x2,_x3){var _again=!0;_function:while(_again){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=undefined;_again=!1;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=!0;continue _function}}else if("value" in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}
function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}
var factory=function factory(web3){var HookedWeb3Provider=(function(_web3$providers$HttpProvider){_inherits(HookedWeb3Provider,_web3$providers$HttpProvider);function HookedWeb3Provider(_ref){var host=_ref.host;var transaction_signer=_ref.transaction_signer;_classCallCheck(this,HookedWeb3Provider);_get(Object.getPrototypeOf(HookedWeb3Provider.prototype),"constructor",this).call(this,host);this.transaction_signer=transaction_signer;this.global_nonces={}}
    _createClass(HookedWeb3Provider,[{key:"send",value:function send(payload,callback){var _this=this;var requests=payload;if(!(requests instanceof Array)){requests=[requests]}
        var _iteratorNormalCompletion=!0;var _didIteratorError=!1;var _iteratorError=undefined;try{for(var _iterator=requests[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var request=_step.value;if(request.method=="eth_sendTransaction"){throw new Error("HookedWeb3Provider does not support synchronous transactions. Please provide a callback.")}}}catch(err){_didIteratorError=!0;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}
        var finishedWithRewrite=function finishedWithRewrite(){return _get(Object.getPrototypeOf(HookedWeb3Provider.prototype),"send",_this).call(_this,payload,callback)};return this.rewritePayloads(0,requests,{},finishedWithRewrite)}},{key:"sendAsync",value:function sendAsync(payload,callback){var _this2=this;var finishedWithRewrite=function finishedWithRewrite(){_get(Object.getPrototypeOf(HookedWeb3Provider.prototype),"sendAsync",_this2).call(_this2,payload,callback)};var requests=payload;if(!(payload instanceof Array)){requests=[payload]}
        this.rewritePayloads(0,requests,{},finishedWithRewrite)}},{key:"rewritePayloads",value:function rewritePayloads(index,requests,session_nonces,finished){var _this3=this;if(index>=requests.length){return finished()}
        var payload=requests[index];var next=function next(err){if(err!=null){return finished(err)}
            return _this3.rewritePayloads(index+1,requests,session_nonces,finished)};if(payload.method!="eth_sendTransaction"){return next()}
        var tx_params=payload.params[0];var sender=tx_params.from;this.transaction_signer.hasAddress(sender,function(err,has_address){if(err!=null||has_address==!1){return next(err)}
            var getNonce=function getNonce(done){var nonce=session_nonces[sender];if(nonce!=null){done(null,nonce)}else{_this3.sendAsync({jsonrpc:'2.0',method:'eth_getTransactionCount',params:[sender,"pending"],id:new Date().getTime()},function(err,result){if(err!=null){done(err)}else{var new_nonce=result.result;done(null,web3.toDecimal(new_nonce))}})}};getNonce(function(err,nonce){if(err!=null){return finished(err)}
                var final_nonce=Math.max(nonce,_this3.global_nonces[sender]||0);tx_params.nonce=web3.toHex(final_nonce);session_nonces[sender]=final_nonce+1;_this3.global_nonces[sender]=final_nonce+1;_this3.transaction_signer.signTransaction(tx_params,function(err,raw_tx){if(err!=null){return next(err)}
                    payload.method="eth_sendRawTransaction";payload.params=[raw_tx];return next()})})})}}]);return HookedWeb3Provider})(web3.providers.HttpProvider);return HookedWeb3Provider};if(typeof module!=='undefined'){module.exports=factory(require("web3"))}else{window.HookedWeb3Provider=factory(web3)}