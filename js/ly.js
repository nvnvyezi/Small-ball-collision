var ball = {
	main : document.getElementById('main'),
	// colors : ['#A0FB98','#E0F085','#7F9EF5','#F4B161','#F689A8','#68F3F2','#DC63F5'],
	text : ['女女','野子','你还碰','蓝色碰','黄色碰','红色碰','反了你了'],
	maxW : 0,//空间大小
	maxH : 0,
	json : [],
	circles : main.getElementsByTagName('div'),
	//创建div（小球）
	cdiv : function() {
		var colors = [];
		var st = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
		for(var i =0;i<10;i++){
			for (var j = 0; j < 6; j++) {
				colors[j]=st[Math.floor(Math.random()*16)];
			}
			var div = document.createElement('div');
			var index = ball.randomnum();
			div.style.backgroundColor = '#' +colors.join('');
			div.innerHTML = ball.text[index];
			ball.main.appendChild(div);
		}
	},
	//产生随机数
	randomnum : function(){
		var index = Math.floor(Math.random()*7);
		return index;
	},
	//获得小球的生存空间
	mainroom : function(){
		ball.maxW = window.innerWidth - ball.circles[0].clientWidth;
		ball.maxH = window.innerHeight - ball.circles[0].clientHeight;
		ball.main.style.width = window.innerWidth + 'px';
		ball.main.style.height = window.innerHeight + 'px';
	},
	//初始化小球
	init : function(){
		for (var i = 0; i < ball.circles.length; i++) {
			var arr = [];
			arr.x = Math.floor(Math.random()*(ball.maxW+1));
			arr.y = Math.floor(Math.random()*(ball.maxH+1));
			arr.cx = arr.x +ball.circles[0].offsetWidth/2;
			arr.cy = arr.y +ball.circles[0].offsetHeight/2;
			arr.movex = Math.floor(Math.random()*2);
			arr.movey = Math.floor(Math.random()*2);
			arr.speed = 2+Math.floor(Math.random()*5);
			arr.timer = null;
			arr.index =i;
			ball.json.push(arr);
			ball.circles[i].style.left = arr.x + 'px';
			ball.circles[i].style.top = arr.y + 'px';
		}
	},
	//碰撞事件
	collision : function(num){
		var x1 = ball.json[num].cx;
		var y1 = ball.json[num].cy;
		for (var i = 0; i < ball.circles.length; i++) {
			if(i != num ){
				var x2 = ball.json[i].cx;
				var y2 = ball.json[i].cy;
				var len = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
				if(len <= ball.circles[0].clientWidth*ball.circles[0].clientWidth){
                    if(x1 >x2){
                        if(y1 > y2){
                            ball.json[num].movex=1;
                            ball.json[num].movey=1;
                        }else if(y1 < y2){
                            ball.json[num].movex=1;
                            ball.json[num].movey=0;
                        }else{
                            ball.json[num].movex=1;
                        }
                    }else if(x1 < x2){
                        if(y1 > y2){
                            ball.json[num].movex=0;
                            ball.json[num].movey=0;
                        }else if(y1 < y2){
                            ball.json[num].movex=0;
                            ball.json[num].movey=1;
                        }else{
                                ball.json[num].movex=0;
                        }
                    }else{
                        if(y1 > y2){
                            ball.json[num].movey=1;
                        }else if(y1 < y2){
                            ball.json[num].movey=0;
			   			}
					}
				}
			}
		}
	},
	//小球移动
	move : function (circle) {
		circle.timer = setInterval(function() {
			if(circle.movex == 1){
				circle.x +=circle.speed;
				if(circle.x +circle.speed >= ball.maxW){
					circle.x = ball.maxW;
					circle.movex = 0;
				}
			}else {
				circle.x -=circle.speed;
				if(circle.x -circle.speed <= 0){
					circle.x = 0;
					circle.movex = 1;
				}
			}
			if(circle.movey == 1){
				circle.y +=circle.speed;
				if(circle.y + circle.speed >= ball.maxH){
					circle.y = ball.maxH;
					circle.movey =0;
				}
			}else {
				circle.y -= circle.speed;
				if(circle.y -circle.speed <=0){
					circle.y =0;
					circle.movey =1;
				}
			}
			circle.cx =circle.x + ball.circles[0].offsetWidth/2;
			circle.cy = circle.y + ball.circles[0].offsetHeight/2;
			ball.circles[circle.index].style.left = circle.x + 'px';
			ball.circles[circle.index].style.top = circle.y + 'px';
			ball.collision(circle.index);
		},15);
	},
	//让小球全部动起来
	go : function(){
		for (var i = 0; i < ball.circles.length; i++) {
			ball.move(ball.json[i]);
		}
	}
};
ball.cdiv();
ball.mainroom();
ball.init();
ball.go();