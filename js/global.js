var Global = {

	loadEvent: function (fn){
		var oldFn = window.onload;
		if(typeof window.onload != "function"){
			window.onload = fn;
		}else{
			window.onload = function (){
				oldFn();
				fn();
			}
		}
	},

	getRand: function (m, n){
		var r = n - m + 1;
		return Math.floor(Math.random()*r) + m;
	},

	loopArray: function(list, cb){
		if (list.length <= 0){
			return;
		}
		var item;
		for(var i = 0, len = list.length; i<len; i++){
			item = list[i];
			cb(item, i);
		}
	},

	getEleById: function (id){
		return document.getElementById(id) || "";
	},

	removeElement: function (_element){
		var _parentElement = _element.parentNode;
		if(_parentElement){
			_parentElement.removeChild(_element);  
		}
	} 
}


module.exports = Global;