export default class Comment{
    constructor(user,com){
        this.user = user;
        this.com = com;
    }
    toString(){
        return `<b>${this.user}</b>: ${this.com}`;
    }
}