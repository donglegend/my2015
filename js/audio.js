var G = require("./global");


function Audio(obj){
	this.obj = obj;
	if(this == window){
		return new Audio(obj);
	}
}

Audio.prototype = {
	play: function (){
		var s = this;
		s.obj.play();
	},
	pause: function (){
		var s = this;
		s.obj.pause();
	}
}
	
module.exports = Audio;