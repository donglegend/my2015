var Global = require("./global.js");
var Effect = require("./effect");
var Aud = require("./audio.js");

var elIcon = Global.getEleById("iconBtn");

var audios = ["sunluSound", "kaSound"];
var myAudio = {};
function createAudio(){
	Global.loopArray(audios, function (item, i){
		var a = Global.getEleById(item);
		myAudio[item] = new Aud(a);
	})
}
createAudio();




(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

var Wind = (function (){

	function Wind(conf){
		this.type = "Wind";
		this.ele = Global.getEleById(conf.ele);
		this.contentText = conf.contentText || "hell wind!";
		this.stepIndex = 0;
		this.stepSum = 0;
		this.init = true;
		this.timer = null;
		this.runTimes = 0;
		this.processindex = 0;
		this.process = Number(conf.speed) >>> 0;
		if (this === window){
			return new Wind(conf);
		}
	}
	
	Wind.prototype = {
		run : function (w, cb){
			var s = this;

			if(!s.ele){
				return ;
			}
			if(s.init){
				s.stepIndex = 0;
				s.stepSum = s.contentText.length;
				s.init = false;
				s.ele.innerHTML = "";
			}

			if(s.processindex++ > s.process){
				s.processindex = 0;
				var curText = s.ele.innerHTML;

				var curChart = s.contentText.charAt(s.stepIndex);
		       	var nextFourChars = s.contentText.substr(s.stepIndex,4);
		       	if(nextFourChars=='<BR>' || nextFourChars=='<br>'){
		       		curChart  = '<BR>';
		       		s.stepIndex+=3;
		       	}else{
		       		// curChart = "<span>" + curChart + "</span>";
		       	}

				curText += curChart;
				s.ele.innerHTML = curText;
				if(s.stepIndex < s.stepSum-1){
					s.stepIndex++;
					s.timer = requestAnimationFrame(s.run.bind(s, w, cb));
					myAudio.kaSound.play();
				}
			}else{
				s.timer = requestAnimationFrame(s.run.bind(s, w, cb));
			}

			if(s.stepIndex >= s.stepSum-1){
				cancelAnimationFrame(s.timer);
				myAudio.kaSound.pause();
				cb && s.ele.classList.add("lightSpeedOut");
				setTimeout(function(){
					s.ele.classList.remove("lightSpeedOut");
					if(cb){
						cb(s.ele, ++s.runTimes, w)
					}else{
						s.ele.classList.add("lightSpeedOut");
						Global.removeElement(s.ele);
						myAudio.sunluSound.loop = true;
						myAudio.sunluSound.play();
						elIcon.classList.remove("hide");
						elIcon.classList.add('playicon');
					}
					
				}, 900)
			}


		}
	}

	Object.defineProperty(Wind, "prototype", {
		writable: false
	})
	return Wind;

})();

module.exports = Wind;

/*
function main(){
	// var txt = getEleById("txt").innerHTML;
	var txt = "dong  \n   legend";
	var ops = {
		"ele": "Wind",
		"contentText": txt
	}
	var myWind = new Wind(ops);
	myWind.run();
}

loadEvent(main);
*/
