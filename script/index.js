//1.引入该文件
//2.创建一个js文件，_game2048.init(className);
//1.游戏的初始化
//   1.棋盘4*4
//   2.随机棋子
//   3.数据初始化 data[3][3]
//2.玩游戏
//   1.触摸或者按键 up、right、down、left
//   2.数据的叠加
//   3.判断是否游戏结束
//   4.随机棋子
//3.游戏结束
(function(window,undefined){
	function Game() {//game obj 开始

		this.data = new Array();
		this.isMoveChese = false;//每次按键时，棋子是否移动 false表示未移动
		this.isCombine = false;//是否合并
		//判断是否为最后一个棋子的标志量
		this.isLastChese = false;
		//发生合并的位置记录
		this.flagCombineArr = new Array();


		//		棋盘棋子初始化
		this.dataInit = function() {
			for (var i = 0; i < 4;i++) {
				this.data[i] = new Array;
				for(var j = 0; j < 4; j++) {
					this.data[i][j] = 0;
				}
			}
		}
		//合并标志数组初始化
		this.flagCombineArrInit = function() {
			for (var i = 0;i < 16; i++) { 
				this.flagCombineArr[i] = false;
			}
		}
		//棋盘初始化
		//参数的名字className
		this.init = function(className) {
			this.dataInit();
			this.cheseInit(className);
			for(var i = 0; i < 2; i++) {
				this.randomChese();
			}
			this.play();
		}
	}//game 对象 结束

	//随机出现棋子
	Game.prototype.randomChese = function() {
		var arrXY = this.randomCheseXY();
		if (arrXY != 0) {
		var num  = this.randomValue();
		this.drawChese(arrXY[0],arrXY[1],num);
		}
	}

	Game.prototype.cheseInit =function(className) {
		var game = document.querySelector("."+className);
		var chese = document.createElement("div");
		chese.className = "game2048";
		chese.setAttribute("style","width:425px;height:425px; background-color:#BBA99A; margin:10px auto;"+
			"border-radius:10px; position:relative;");
		game.appendChild(chese);
		//棋子的位置
		for (var i = 0; i < 4; i ++) {
			for (var j = 0; j < 4; j ++) {
				var c = document.createElement("div");
				c.className = "child";
				c.setAttribute("style","top:"+(i*105+5)+"px;"+
					"left:"+(j*105+5)+"px;width:100px;height:100px;background-color:#ccc0B2;position:absolute;border-radius:10px;");
				chese.appendChild(c);
			}
		}
		// var childArr = document.querySelector(".child")
		// var len = childArr.length;
		// for(var m = 0; m < len; m++){
		// 	if(m == 0){
		// 		childArr[0].style.borderTopLeftRedius = "10px";
		// }else if (m == 11){
		// 		childArr[0].style.borderTopRightRedius = "10px";
		// }else if (m == 15){
		// 		childArr[0].style.borderBottomRightRedius = "10px";
		// }
	}//cheseInit end
	//画棋子
	//@param cheseX 棋子右上角X坐标
	//@peram cheseY 棋子右上角Y坐标
	//@peram cheseValue 棋子的值
	Game.prototype.drawChese = function(cheseX,cheseY,cheseValue) {
		//
		this.data[cheseX][cheseY] = cheseValue;

		var chese = document.querySelector(".game2048");
		var child = document.createElement("div");
		child.className = "children_"+cheseX+"_"+cheseY;

		child.innerHTML = cheseValue;
		child.setAttribute("style","width:100px;height:100px;background-color:"+this.selectBgColor(cheseValue)+
		";color:#FFF;font-size:1.5em;text-align:center;line-height:100px;position:absolute;top:"+(105*cheseX+5)+"px;left:"+(105*cheseY+5)+"px;"+
		"border-radius:10px; transition:left .4s,top .4s;");
		chese.appendChild(child);

		//判断是否有空位 进行游戏判断
		if (this.isLastChese) {
			this.isGameOver();
		}		
	}
	//@param num 棋子上的
	//判断背景颜色
	Game.prototype.selectBgColor = function(num) {
		switch(num+"") {
			case "2":
				return "#ECE4D9";
			case "4":
				return "#EDDDC4";
			case "8":
				return "#EFB171";
			case "16":
				return "#F88E63";
			case "32":
				return "#F57D57";
			case "64":
				return "#FA5C3A";
			case "128":
				return "#ECCC73";
			case "256":
				return "#ECCD58";
		}
	}


	//随机棋子值
	Game.prototype.randomValue = function() {
		return (Math.floor(Math.random()*2)+1)*2;
	}
	
	//@param2 cheseY 棋子右上角的Y参数

	//随机坐标
	Game.prototype.randomCheseXY = function() {
		//筛选未落子的位置
		var arrXY = new Array();
		var k = 0;
		for (var i = 0; i < 4; i++) {
			for(var j = 0;j < 4; j++) {
				if (this.data[i][j] == 0) {
					arrXY[k] = [i,j];
					k++;
				} 
			}
		}

		if (1== k) {
			this.isLastChese = true;
		}

		if (k==0){
			return 0;
		} else{
		var randomNum=Math.floor(Math.random()*k);

		return arrXY[randomNum];
		}
	}
	//玩游戏
	//1.绑定按键事件
	//2.移动(数字合并)
	Game.prototype.play = function() {
		//给游戏对象起别名防止和js事件中的this冲突。
		var obj = this;
		//1.绑定按键事件
		//up=38
		//right=39
		//down=40
		//left=37
		document.onkeydown = function(event) {
			switch (event.keyCode) {
					case 37: 
							//2.移动(数字合并)
							obj.gameProcess(37);
							break;
					case 38:
							//2.移动(数字合并)
							obj.gameProcess(38);
							

							break;
					case 39:
							obj.gameProcess(39);
							break;
					case 40:
							obj.gameProcess(40);
							break;
			}
		}	
	}//end  play
	Game.prototype.gameProcess = function (key) {
		var obj = this;
		//2.移动(数字合并)
		obj.moveChese(key);
							//是否随机棋子
		if(obj.isMoveChese){
			setTimeout(function(){
				obj.randomChese();
			}, 500);
		}
	}

	// //左右移动 改变步长
	// //@param1棋子行
	// //@param2棋子列
	// Game.prototype.movestep = function (row,col,changeCol,index) {
	// 	var step = index;
	// 	if(this.data[row][changeCol] == 0){
	// 						index++;
	// 						this.isMoveChese = true;
	// 					}else if (this.data[row][changeCol]==
	// 						this.data[GPS[i][0]][GPS[i][1]]) {
	// 						index++;
	// 						this.isMoveChese = true;
	// 						this.isCombine = true;
	// 						break;
	// 					}else { 
	// 						break;
	// 					}


	// }

	//移动
	Game.prototype.moveChese = function(key) {
		this.isMoveChese = false;//重新初始化移动
		this.flagCombineArrInit();
		var GPS = this.serchChese(key);
		var len = GPS.length;

		
		for (var i = 0;i < len; i++){
			var classNameMove = "children_"+GPS[i][0]+"_"+GPS[i][1];
			var moveObj = document.querySelector("."+classNameMove);
			// moveObj.style.left = "5px";
			this.isCombine = false;//重新初始化合并
			var index = 0;
			switch (key) {
				case 37:
					for (var j = GPS[i][1]-1; j >= 0; j--){
						if(this.data[GPS[i][0]][j] == 0){
							index++;
							this.isMoveChese = true;
						}else if (this.data[GPS[i][0]][j]==
							this.data[GPS[i][0]][GPS[i][1]]&&
							this.flagCombineArr[GPS[i][0]*4+j] == false) {
							index++;
							this.isMoveChese = true;
							this.isCombine = true;
							break;
						}else { 
							break;
						}
					}
					break;
				case 38:
					for (var j = GPS[i][0]-1; j >= 0; j--) {
						if (this.data[j][GPS[i][1]] == 0) {
							index ++;
							this.isMoveChese = true;
						}else if(this.data[j][GPS[i][1]]==
							this.data[GPS[i][0]][GPS[i][1]]&&
							this.flagCombineArr[j*4+GPS[i][1]] == false) {
							index++;
							this.isMoveChese = true;
							this.isCombine = true;
							break;
						}else {
							break;
						}		
					} 
					break;
				case 39:
					for (var j = GPS[i][1]+1; j <= 3; j++) {
						if (this.data[GPS[i][0]][j] == 0) {
							index--;
							this.isMoveChese = true;
						} else if (this.data[GPS[i][0]][j]==
							this.data[GPS[i][0]][GPS[i][1]]&&
							this.flagCombineArr[GPS[i][0]*4+j] == false) {
							index--;
							this.isMoveChese = true;
							this.isCombine = true;
							break;
						} else {
							break;
						}
					}
					break;
				case 40:
					for (var j = GPS[i][0]+1; j <= 3; j++) {
							if (this.data[j][GPS[i][1]] == 0) {
								index --;
								this.isMoveChese = true;
							}else if(this.data[j][GPS[i][1]]==
								this.data[GPS[i][0]][GPS[i][1]]&&
							this.flagCombineArr[j*4+GPS[i][1]] == false) {
								index --;
								this.isMoveChese = true;
								this.isCombine = true;
								break;
							}else {
								break;
							}		
						} 	
						break;
			}
		

			if(index != 0){
				switch(key) {
					case 37:
					case 39:
						moveObj.style.left = moveObj.style.left.replace("px","")
											-0-index*105+"px";
						this.data[GPS[i][0]][GPS[i][1]-index] = this.data[GPS[i][0]][GPS[i][1]];
						this.data[GPS[i][0]][GPS[i][1]] = 0;
						moveObj.className = "children_"+GPS[i][0]+"_"+(GPS[i][1]-index);
						break;
					case 38:
					case 40:
						moveObj.style.top = moveObj.style.top.replace("px","")
											-0-index*105+"px";
						this.data[GPS[i][0]-index][GPS[i][1]] = this.data[GPS[i][0]][GPS[i][1]];
						this.data[GPS[i][0]][GPS[i][1]] = 0;
						moveObj.className = "children_"+(GPS[i][0]-index)+"_"+GPS[i][1];
						break;
				}
				
				if(this.isCombine) {
					var parent = document.querySelector(".game2048");
					var childs = document.querySelectorAll("."+moveObj.className);
					var lenChilds = childs.length;
					for (var d = 0; d < lenChilds; d++ ) {
							parent.removeChild(childs[d]);
						}
		
					switch (key) {
						case 37:
						case 39:
							this.data[GPS[i][0]][GPS[i][1]-index] *= 2;
							this.drawChese(GPS[i][0], GPS[i][1]-index,
								this.data[GPS[i][0]][GPS[i][1]-index]);
							this.flagCombineArr[GPS[i][0]*4+GPS[i][1]-index] = true;

							break;
						case 38:
						case 40:
							this.data[GPS[i][0]-index][GPS[i][1]] *= 2;
							this.drawChese(GPS[i][0]-index, GPS[i][1],
								this.data[GPS[i][0]-index][GPS[i][1]]);
							this.flagCombineArr[(GPS[i][0]-index)*4+GPS[i][1]] = true;
							break;
					}

				}
			}

		}	
	}

	//查找有棋子的位置
	// @pamper 反转棋子的标志 37 38 不反转 39 40 反转
	Game.prototype.serchChese = function(key) {
		var GPS = new Array();
		var k = 0;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++){
				if (this.data[i][j] !=0){
					GPS[k] = [i , j];
					k++; 				
				}
			}
		}

		switch (key) {
			case 37:
			case 38:
				return GPS;
			case 39:
			case 40:
				return GPS.reverse();
		}
	}

	//判断游戏是否结束
	Game.prototype.isGameOver = function() {
		var flag = false;
		var obj = this;
		for (var i = 0; i < 4; i++){
			for ( var j = 0; j < 4; j++) {
				if(i != 0 && this.data[i][j] == this.data[i-1][j]) {
					flag=true;
					break;
				} else if (j != 3 && this.data[i][j] == this.data[i][j+1]) {
						flag = true;
						break;
				} else if (i != 3 && this.data[i][j] == this.data[i+1][j]) {
						flag = true;
						break; 
				} else if (j != 0 && this.data[i][j] == this.data[i][j-1]) {
						flag = true;
						break; 
					
				}	
			}

			if (flag) {
				break;
			}
		}

		if (!flag) {
			setTimeout(function(){
				alert("游戏结束");
			 var game2048 = document.querySelector(".game2048") ;
			 game2048.parentNode.removeChild(game2048);
			 obj.init("game");
			},555);	
		} else {
			this.isLastChese = false;
		}
	}

	window._game2048 =  Game;
})(window)
var game = new _game2048
game.init("game");
