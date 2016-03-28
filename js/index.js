/**
 * Wind类 打字机效果单体类
 * @use 通过 new Wind(params) 调用，
 * @param Object ele: 元素id ，contentText: 内容
 */
var G = require("./global");
var Wind = require("./wind");
var reg = /(.+)/g;

var myBook = [];
var objWinds = [];


/**
 * 获取要打印的数据
 * @return {[type]} [description]
 */
function getData(){
	var elBooks = document.querySelectorAll(".book");
	G.loopArray(elBooks, function (item, i){
		var o = {};
		o.t = item.querySelector(".title").innerHTML;
		o.c = item.querySelector(".text").innerHTML;
		myBook.push(o);
		G.removeElement(item);
	})
}

function nextWind(el, i, w){
	console.log(w);
	console.log(i);
	w[i] && (el.innerHTML = "");
	var cb = null;
	if(i >= w.length-1){
		cb = null;
	}else{
		cb = arguments.callee;
	}
	w[i] && w[i].run(w, cb);
}


function creatWind(){
	var res = [];
	G.loopArray(myBook, function (item, i){
		var ops = {
			"ele": "Wind",
			"contentText": (item.t + item.c).replace(reg, '$1<br>'),
			"speed": 6
		}
		res.push(new Wind(ops));
	})
	return res;
}




function main(){
	getData();
	objWinds = creatWind();
	objWinds[0].run(objWinds,nextWind);
}

G.loadEvent(main);
