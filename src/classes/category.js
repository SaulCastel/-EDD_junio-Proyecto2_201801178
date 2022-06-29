export default class Category{
    constructor({
        id_categoria,
        company
    }){
        this.id = id_categoria;
        this.comp = company;
    }
    valueOf(){
        return this.id;
    }
    toString(){
        return `${this.comp}\\n${this.id}`;
    }
}