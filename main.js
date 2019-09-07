var balls 			= [];
var gravity 		= 9.8;
var airResistance 	= 0.5;
var run 			= true;
window.onload = function(){
	document.body.onclick = function(){
		run = false;
	}
	let floor = document.createElement("div");
	
	floor.style.position = "absolute";
	floor.style.backgroundColor = "red";
	floor.style.width = "100%";
	floor.style.height = "200px";
	floor.style.top = document.body.offsetHeight
	
	balls[0] = new Ball(200,200,100);
	document.body.appendChild(floor);
	document.body.appendChild(balls[0].div);
	
	globalUpdate();
}

class Ball{
	constructor(xPos, yPos, radius){
		this.xPos 			= xPos;
		this.yPos 			= yPos;
		this.radius 		= radius;
		this.div 			= document.createElement("div");
		this.tZero			= 0;
		this.mass			= 5;
		this.velocity 		= [0,0];
		this.acceleration 	= [0,1];
		
		
		this.div.id 					= "ball";
		this.div.style.position 		= "absolute";
		this.div.style.backgroundColor 	= "blue";
		this.div.style.width 			= this.radius*2;
		this.div.style.height 			= this.radius*2;
		this.div.style.borderRadius  	= this.radius + "px";
		this.div.style.top				= this.yPos+radius;
		this.div.style.left				= this.xPos+radius;
	}
	
	setTZero(time){
		this.tZero = time;
	}
	update(a,t){
		this.velocity = [0,a*(t-this.tZero)];
		this.yPos = this.yPos + a*this.mass*(t-this.tZero);
		this.div.style.top = this.yPos + this.radius;
	}
}

async function globalUpdate(){
	let time = 0;
	while(run){
		for(let i = 0; i < balls.length; i++){
			balls[i].update(gravity,time);
		}
		time += 0.0333;
		await sleep(33.3);
	}
}
function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}
