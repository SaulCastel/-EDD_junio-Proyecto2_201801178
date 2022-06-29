class _Node{
    constructor(data,id){
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.bf = 0;
        this.id = `n${id}`;
    }
}

export default class AVLTree{
    constructor(){
        this.root = null;
        this.id = 0;
    }
    isEmpty(){
        return this.root;
    }
    insert(data){
        if(this._contains(this.root,data)){
            return false
        }
        this.root = this._insertRec(this.root, data);
        this.id++;
        return true;
    }
    _contains(root,data){
        if(root == null){
            return false;
        }
        if(data < root.data){
            return this._contains(root.left, data);
        }
        if(data > root.data){
            return this._contains(root.right, data);
        }
        return true;
    }
    _insertRec(node,data){
        if(node == null){
            return new _Node(data,this.id);
        }
        if(data < node.data){
            node.left = this._insertRec(node.left,data);
        }
        else{
            node.right = this._insertRec(node.right,data);
        }
        this._update(node);
        return this._balance(node);
    }
    _update(node){
        let leftHeight = -1;
        let rightHeight = -1;
        if(node.left != null) leftHeight = node.left.height;
        if(node.right != null) rightHeight = node.right.height;
        node.height = 1 + this._max(leftHeight,rightHeight);
        node.bf = rightHeight - leftHeight;
    }
    _max(a,b){
        return (a > b) ? a : b;
    }
    _balance(node){
        if (node.bf == -2){
            if (node.left.bf <= 0){
                return this._leftLeftCase(node);
            }
            else{
                return this._leftRightCase(node);
            }
        }
        else if (node.bf == 2){
            if (node.right.bf >= 0){
                return this._rightRightCase(node);
            }
            else{
                return this._rightLeftCase(node);
            }
        }
        return node;
    }
    _leftLeftCase(node){
        return this._rightRotate(node);
    }
    _leftRightCase(node){
        node.left = this._leftRotate(node.left);
        return this._leftLeftCase(node);
    }
    _rightRightCase(node){
        return this._leftRotate(node);
    }
    _rightLeftCase(node){
        node.right = this._rightRotate(node.right);
        return this._rightRightCase(node);
    }
    _rightRotate(root){
        let newParent = root.left;
        root.left = newParent.right;
        newParent.right = root;
        this._update(root);
        this._update(newParent);
        return newParent;
    }

    _leftRotate(root){
        let newParent = root.right;
        root.right = newParent.left;
        newParent.left = root;
        this._update(root);
        this._update(newParent);
        return newParent;
    }
}