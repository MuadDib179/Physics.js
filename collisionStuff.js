var AABBMargin = 15;

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
		this.position 	= position;
		this.xMin		= position[0] - this.width;
		this.xMax		= position[0] + this.width;
		this.yMin		= position[1] - this.width;
		this.yMax		= position[1] + this.width;
	}
	
	union(addAabb){
		let aabb = new Aabb(0,0,[0,0]);
		if(this.xMin < addAabb.xMin)
			aabb.xMin = this.xMin;
		else
			aabb.xMin = addAabb.xMin;
		
		if(this.xMax > addAabb.xMax)
			aabb.xMax = this.xMax;
		else
			aabb.xMax = addAabb.xMax;
		
		if(this.yMin < addAabb.yMin)
			aabb.yMin = this.yMin;
		else
			aabb.yMin = addAabb.yMin;
		
		if(this.yMax > addAabb.yMax)
			aabb.yMax = this.yMax;
		else
			aabb.yMax = addAabb.yMax;
		
		aabb.position 	= [aabb.xMin+(aabb.xMax-aabb.xMin)/2,aabb.yMin+(aabb.yMax-aabb.yMin)/2]
		aabb.width 		= (aabb.xMax - aabb.xMin)/2;
		aabb.height 	= (aabb.yMax - aabb.yMin)/2;
		return aabb;
	}
}

class Tree{
	constructor(){
		this.root = null;
	}
	update(){
		//do stuff
	}
	add(object){
		if(this.root !== null){
			//inserts new child node att root
			node = new Node();
			node.setLeaf(object);
			node.updateAABB(AABBMargin);
			InsertNode(node, this.root);
		}
		else{
			//first node, makes this the root
			this.root = new Node();
			this.root.setLeaf(object);
			this.root.update(AABBMargin);
		}
	}
	insertNode(node, parent){
		
	}
}

class Node{
	constructor(){
		this.data 		= null;
		this.children 	= [null,null];
		this.parent		= null;
		this.aabb		= null;
		this.isLeaf		= false;
	}
	setLeaf(data){
		this.aabb			= data.aabb;
		this.data 			= data;
		this.children[0] 	= null;
		this.children[1] 	= null;
		this.isLeaf 		= true;
	}
	setBranch(){
		//dostuff
	}
	updateAABB(margin){
		if(isLeaf){
			//give a little padding to the containing AABB
			aabb.xMin -= AABBMargin;
			aabb.xMax += AABBMargin;
			aabb.yMin -= AABBMargin;
			aabb.yMax += AABBMargin;
		}
		else{
			// make union of child AABBs of child nodes
			this.aabb = children[0].aabb.union(children[1]);
		}
	}
	getSibling(){
		return (this.parent.children[0] === this) ? this.parent[1] : this.parent[0];
	}
	
}

function drawAABB(aabbs){
	for(let i = 0; i < aabbs.length; i++){
		let div = document.createElement("div");
		div.style.position 	= "absolute";
		div.style.top 		= aabbs[i].yMin;
		div.style.left 		= aabbs[i].xMin;
		div.style.width 	= aabbs[i].width*2;
		div.style.height 	= aabbs[i].height*2;
		div.style.border 	= "1px solid black";
		document.body.appendChild(div);
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