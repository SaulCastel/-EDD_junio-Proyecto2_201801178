export default class Actor{
    constructor({
        dni,
        nombre_actor,
        correo,
        descripcion
    }){
        this.dni = dni;
        this.name = nombre_actor;
        this.email = correo;
        this.desc = descripcion;
    }
    valueOf(){
        return this.dni;
    }
    toString(){
        return `${this.name.replace(' ','\\n')}\\n${this.dni}`;
    }
}