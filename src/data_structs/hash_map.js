import LinkedList from "./linked_list.js";

export default class HashMap{
    constructor(m){
        this.m = m;
        this.num = 0;
        this.h = new LinkedList();
        for (let i = 0; i < m; i++) {
            this.h.add(null);
        }
    }
    isEmpty(){
        return this.num;
    }
    insert(k){
        let i = this._divison(k);
        this.h.insert(i,k);
        this.num++;
    }
    _divison(k){
        return k%this.m;
    }
}