class _Node {
    constructor(id, data) {
        this.id = `n${id}`;
        this.data = data;
        this.next = null;
    }
}

export default class LinkedList{
    constructor(){
        this.head = null;
        this.end = null;
        this.len = 0;
        this.id = 0;
    }
    add(data) {
        let temp = new _Node(this.id++, data);
        if (this.head === null) {
            this.head = temp
            this.end = temp
        }
        else {
            this.end.next = temp
            this.end = temp
        }
        this.len += 1;
    }
    insert(index,data){
        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        if(node.data){
            node.data.orderedInsert(data);
        }
        else{
            node.data = new LinkedList();
            node.data.add(data);
        }
    }
    orderedInsert(data){
        let temp = new _Node(this.id++, data);
        let aux = this.head;
        while(aux != null){
            if (data < aux.data){
                if(aux === this.head){
                    temp.next = this.head;
                    this.head = temp;
                    break;
                }
                else{
                    aux = aux.next;
                }
            }
            else{
                if(data === aux.data){
                    return;
                }
                else if(aux === this.end){
                    this.end.next = temp;
                    this.end = temp;
                }
                else{
                    temp.next = aux.next;
                    aux.next = temp;
                }
                break;
            }
        }
        this.len += 1;
    }
}