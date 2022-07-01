import LinkedList from "../data_structs/linked_list.js";
import Comment from "./comment.js";

export default class Movie{
    constructor({
        id_pelicula,
        nombre_pelicula,
        descripcion,
        puntuacion_star,
        precio_Q
    }){
        this.id = id_pelicula;
        this.name = nombre_pelicula;
        this.desc = descripcion;
        this.stars = puntuacion_star;
        this.price = precio_Q;
        this.comments = new LinkedList();
    }
    valueOf(){
        return this.id;
    }
    toString(){
        return `${this.name.replace(' ','\\n')}\\n${this.id}`;
    }
    addComment(user,com){
        this.comments.add(new Comment(user,com));
    }
}