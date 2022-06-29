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
    }
    valueOf(){
        return this.id;
    }
    toString(){
        return `${this.name.replace(' ','\\n')}\\n${this.id}`;
    }
}