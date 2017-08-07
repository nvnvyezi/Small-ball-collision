var roll = (function(){
	var startTime = 0,endTime = 0,now = 0;
	var main = document.getElementById('main');
	var k1 = document.getElementById('k1');
	var div = main.getElementsByTagName('div');
	var screenh =document.body.clientHeight;
	k1.style.height = screenh + 'px';
	var change = function () {
		screenh =document.body.clientHeight;
		for(var i=0;i<div.length;i++){
			div[i].style.height = screenh +'px';
		}
	};
	var scroll = function(event){
		screenh =document.body.clientHeight;
		var startTime = new Date().getTime();
		var delta = (-event.detail) || event.wheelDelta;
		if(endTime - startTime < -1000){
			if(delta > 0 && parseInt(main.offsetTop) < 0){
				now = now + screenh;
				topage(now);
			}
			if(delta <0 && parseInt(main.offsetTop) > -(screenh*3)){
				now = now - screenh;
				topage(now);
			}
			endTime = new Date().getTime();
		}else {
			event.preventDefault();
		}
	};
	var topage = function (now) {
		$("#main").animate({top:(now+'px')},1000);
	};
	window.onload = function () {
	 	change();
	};
	window.onresize = function () {
		change();
	};
    document.addEventListener("mousewheel",scroll,false);
})();
