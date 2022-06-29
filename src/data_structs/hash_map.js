import LinkedList from "./linked_list.js";

export default class HashMap{
    constructor(m,max){
        this.m = m;
        this.max = max;
        this.num = 0;
        this.h = new LinkedList();
        for (let i = 0; i < m; i++) {
            this.h.add(null);
        }
    }
    insert(k){
        let i = this._divison(k);
        if(this._checkSize()){
            this.h.insert(i,k);
            this.num++;
        }
    }
    _divison(k){
        return k%this.m;
    }
    _checkSize(){
        return (this.num*100/this.m <= this.max) ? true:false;
    }
}