var objects 			= [];
var gravity 		= 0.1;
var friction		= 0.95;
var run 			= true;


window.onload = function(){
	document.body.onclick = function(){
		run = false;
	}
	
	objects[0] = new Ball(200,200,100);
	document.body.appendChild(objects[0].div);
	
	globalUpdate();
}

class Ball{
	constructor(xPos, yPos, radius){
		this.radius 		= radius;
		this.div 			= document.createElement("div");
		this.mass			= 5;
		this.position		= [xPos,yPos];
		this.velocity 		= [0,0];
		
		
		this.div.id 					= "ball";
		this.div.style.position 		= "absolute";
		this.div.style.backgroundColor 	= "blue";
		this.div.style.width 			= this.radius*2;
		this.div.style.height 			= this.radius*2;
		this.div.style.borderRadius  	= this.radius + "px";
		this.div.style.top				= this.position[1]+radius;
		this.div.style.left				= this.position[0]+radius;
	}
	
	update(){
		this.velocity[1] += gravity; 
		
		this.position = add(this.position, this.velocity);
		
		this.updatePosition();
	}
	
	updatePosition(){
		this.div.style.top		= this.position[1]+this.radius;
		this.div.style.left		= this.position[0]+this.radius;
	}
}

function dumbDetection(){
	for(let i = 0; i < objects.length; i++){
		for(let k = 0; k < objects.length; k++){
			//checks if its hitting the floor or the walls
			if(objects[k].position[1] + (objects[k].radius*2) >= document.body.offsetHeight){
				objects[k].velocity = scale(friction, conjugate('x', objects[k].velocity));
				console.log("shit");
				objects[k].update();
			}
		}
	}
}

async function globalUpdate(){
	while(run){
		for(let i = 0; i < objects.length; i++){
			objects[i].update();
		}
		dumbDetection();
		await sleep(33.3);
	}
}


function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}


function scale(scalar, vector){
	return([vector[0]*scalar, vector[1]*scalar]);
}
function add(vector1, vector2){
	return([vector1[0] + vector2[0], vector1[1] + vector2[1]])
}
function conjugate(oriantation,vector){
	if(oriantation === 'x')
		return([vector[0],vector[1]*(-1)]);
	else(oriantation === 'y')
		return([vector[0]*(-1),vector[1]]);
}	