export default class Rent{
    constructor(user,movie){
        this.user = user;
        this.movie = movie;
    }
    toString(){
        return `${this.user} - ${this.movie}`;
    }
}