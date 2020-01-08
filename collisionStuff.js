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

	volume(){
		return (this.width*2)*(this.height*2); 
	}
}

class Tree{
	constructor(){
		this.root 		= null;
		this.thisTree 	= this;
	}
	update(){
		if(this.root !== null){
			if(this.root.isLeaf){

			}
		}
	}
	add(object){
		if(this.root !== null){
			//inserts new child node att root
			let node = new Node();
			node.setLeaf(object);
			node.updateAABB(AABBMargin);
			this.insertNode(node, this.root);
		}
		else{
			//first node, makes this the root
			this.root = new Node();
			this.root.setLeaf(object);
			this.root.updateAABB(AABBMargin);
		}
	}
	insertNode(node, parent){
		if(parent.isLeaf){
			var newNode = new Node();
			newNode.setLeaf(parent.data);
			parent.setBranch(node, newNode);
			// parent = newParent; cant do this in javascript :)

			//checks if the current parent is the root and updates it
			if(parent.parent === null){
				this.root.data = parent.data;
				this.root.isLeaf = parent.isLeaf;
				this.root.children = parent.children;
				this.root.aabb = parent.aabb
			}
			
		}
		else{
			//compute the volumetric difference of incerting new node to left or right child
			let leftAabb 		= parent.children[0].aabb;
			let rightAabb 		= parent.children[1].aabb;
			let leftVolumeDiff 	= leftAabb.union(node.aabb).volume() - leftAabb.volume();
			let rightVolumeDiff = rightAabb.union(node.aabb).volume() - rightAabb.volume();
			
			// insert into child that gives less volume increase
			if(leftVolumeDiff < rightVolumeDiff){
				this.insertNode(node, parent.children[0]);
			}
			else{
				this.insertNode(node, parent.children[1]);
			}

		}

		// update parent AABB
		// this will propegate up the ruecursion stack
		parent.updateAABB(AABBMargin);
	}
	remove(node){
		let parent = node.parent;

		if(parent != this.root){
			let sibling = node.parent.getSibling();
			console.log(sibling);
			if(parent.parent !== null){ //checks if the node has a grandparent
				//#region updates link
				//moves the sibling node up one step
				sibling.parent.data 	= parent.parent.data;
				sibling.parent.children = parent.parent.children;
				sibling.parent.parent 	= parent.parent.parent; // :|
				sibling.parent.aabb 	= parent.parent.aabb;
				sibling.parent.isLeaf 	= parent.parent.isLeaf;
				
				if(parent == parent.parent.children[0]){
					parent.parent.children[0] = sibling;
				}
				else{
					parent.parent.children[1] = sibling;
				}
				//#endregion
			}
			else{ //in case of no grandparents makes the sibling node root
				this.root.data 		= sibling.data;
				this.root.children 	= sibling.children;
				this.root.parent 	= null;
				this.isLeaf 		= sibling.isLeaf;
			}
		}
		else{
			this.root.data 		= null;
			this.root.children 	= [null,null];
			this.parent 		= null;
			this.aabb 			= null;
			this.isLeaf 		= false;
		}
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
	setBranch(leftNode, rightNode){
		this.data			= null;
		this.isLeaf			= false;
		this.children[0] = leftNode;
		this.children[1] = rightNode;
		
		leftNode.parent 	= this;
		rightNode.parent 	= this;
	}
	updateAABB(margin){
		if(this.isLeaf){
			//give a little padding to the containing AABB
			this.aabb.xMin -= margin;
			this.aabb.xMax += margin;
			this.aabb.yMin -= margin;
			this.aabb.yMax += margin;

			this.aabb.width 	+= margin;
			this.aabb.height 	+= margin;
		}
		else{
			// make union of child AABBs of child nodes
			this.aabb = this.children[0].aabb.union(this.children[1].aabb);
		}
	}
	getSibling(){
		return (this.parent.children[0] === this) ? this.parent.children[1] : this.parent.children[0];
	}
	
}

function absolute(value){
	if(value > 0)
		return value;
	else
		return value*(-1);
}
// function square(value){
// 	return value*value; 			//?? scrap
// }

function traverseInOrder(n){
	if(n==null){
		return;
	}
	
	traverseInOrder(n.children[0]);
	
	drawAABB(n.aabb);
	
	traverseInOrder(n.children[1]);
}
	function drawAABB(aabb){
		let div = document.createElement("div");
		div.style.position 	= "absolute";
		div.style.top 		= aabb.yMin;
		div.style.left 		= aabb.xMin;
		div.style.width 	= aabb.width*2;
		div.style.height 	= aabb.height*2;
		div.style.border 	= "1px solid black";
		document.body.appendChild(div);
	}