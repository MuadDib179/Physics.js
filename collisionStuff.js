class Aabb{
	constructor(width,height,position){
		this.width 		= width;
		this.height 	= height;
		this.position 	= position;
		
		this.xMin		= position[0] - this.width;
		this.xMax		= position[0] + this.width;
		this.yMin		= position[1] - this.width;
		this.yMax		= position[1] + this.width;
	}
	
	update(position){
		this.position = position;
	}
}

class Tree{
	constructor{
		this.root = null;
	}
	
	addNode(object){
		let node = new Node(object);
		if(this.root === null)
			this.root = node;
		else if(this.root.left === null && this.root.right === null){
			containerPosition = square(this.root.data.position[0]-node.data.position)
			container = new Aabb()
		}
	}
}

class Node{
	constructor(data){
		this.data 	= data;
		this.left 	= null;
		this.right 	= null;
	}
}

function absolute(value){
	if(value > 0)
		return value;
	else
		return value*(-1);
}
function square(value){
	return value*value;
}