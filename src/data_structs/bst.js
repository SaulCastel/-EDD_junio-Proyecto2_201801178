class _Node {
    constructor(data, id) {
        this.data = data;
        this.left = this.right = null;
        this.id = `n${id}`;
    }
}

export default class BSTree {
    constructor() {
        this.root = null;
        this.id = 0;
    }
    isEmpty(){
        return this.root;
    }
    insert(data) {
        if(this._contains(this.root,data)){
            return false
        }
        this.root = this._insertRec(this.root, data);
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
    _insertRec(root, data) {
        if (root === null) {
            root = new _Node(data, this.id++);
            return root;
        }
        if (data < root.data) {
            root.left = this._insertRec(root.left, data);
        }
        else if (data > root.data) {
            root.right = this._insertRec(root.right, data);
        }
        return root;
    }
} 