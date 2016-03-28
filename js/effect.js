var G = require("./global");
var W = window.screen.width;
var H = window.screen.height;
function Effect(el){
	this.ele = el || "";
	this.list = this.ele && this.ele.getElementsByTagName("span");
}

Effect.prototype = {
	fly: function (){
		var s = this;
		console.log(s);
		G.loopArray(s.list, function (item, i){
			// var css = s.setStyle();
			// console.log(css);
			// item.style.display='block';
			item.classList.add("move");
			// item.style.cssText = css;
			 // console.log(item);
			 // item.style.opacity=0;

			//item.style.cssText='opacity:#f00';
		});
	},
	setStyle: function (){
		return '-webkit-transform: translate3d('+G.getRand(10, W-10)+','+G.getRand(10, H-10) +','+ 0+') skewX('+G.getRand(-90, 90)+'deg)'
		// return 'translate3d(100px,0,0);'
		// return "-webkit-transition:width 4s";
	}
}
module.exports = Effect;