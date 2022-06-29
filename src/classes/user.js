export default class User{
    constructor({
        dpi,
        nombre_completo,
        nombre_usuario,
        correo,
        contrasenia,
        telefono,
        admin = false
    }){
        this.dpi = dpi;
        this.name = nombre_completo;
        this.user = nombre_usuario;
        this.email = correo;
        this.pass = contrasenia;
        this.tel = telefono;
        this.admin = admin;
    }

    toString(){
        return `User: ${this.user}\\nPass: ${this.pass}`;
    }
}