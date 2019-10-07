var objects 			= [];
var gravity 		= 0.50;
var friction		= 1;
var run 			= false;
var yBounds;

window.onload = function(){
	yBounds = document.body.offsetHeight;
	document.body.onclick = function(){
		run = (run ? false : true);
		drawAABB(objects);
	}
	
	objects[0] = new Ball(200,120,100);
	objects[1] = new Ball(400,240,100);
	objects[2] = new Ball(600,460,100);
	// objects[3] = new Ball(800,200,100);
	// objects[4] = new Ball(1010,100,100);
	// objects[5] = new Ball(1220,50,100);
	// objects[6] = new Ball(1440,400,100);
	// objects[7] = new Ball(1660,180,100);
	for(let i = 0; i < objects.length; i++){
		document.body.appendChild(objects[i].div);
	}
	globalUpdate();
}

class Ball{
	constructor(xPos, yPos, radius){
		this.radius 		= radius;
		this.div 			= document.createElement("div");
		this.mass			= 5;
		this.position		= [xPos,yPos];
		this.velocity 		= [0,0];
		this.aabb			= new Aabb(this.radius, this.radius, this.position);
		
		this.div.id 					= "ball";
		this.div.style.position 		= "absolute";
		this.div.style.backgroundColor 	= "blue";
		this.div.style.width 			= this.radius*2;
		this.div.style.height 			= this.radius*2;
		this.div.style.borderRadius  	= this.radius + "px";
		this.div.style.top				= this.position[1]-radius;
		this.div.style.left				= this.position[0]-radius;
	}
	
	update(acceleration){
		if(!((this.position[1] + acceleration) >= yBounds)){
			this.velocity[1] += acceleration; 
		}
	
		this.position = add(this.position, this.velocity);
		this.updatePosition();
		
		this.aabb.update(this.position);
	}
	
	updatePosition(){
		this.div.style.top		= this.position[1]-this.radius;
		this.div.style.left		= this.position[0]-this.radius;
	}
}

function dumbDetection(){
	for(let k = 0; k < objects.length; k++){
		//checks if its hitting the floor or the walls
		if((objects[k].position[1] + objects[k].radius) >= yBounds){
			objects[k].velocity = scale(friction, conjugate('x', objects[k].velocity));
			objects[k].update(0);
		}
	}
}

async function globalUpdate(){
	for(;;){
		if(run){
			for(let i = 0; i < objects.length; i++){
				objects[i].update(gravity);
			}

			dumbDetection();
		}
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
	if(oriantation === 'x'){
		return([vector[0],vector[1]*(-1)]);
	}
	else(oriantation === 'y')
		return([vector[0]*(-1),vector[1]]);
}	