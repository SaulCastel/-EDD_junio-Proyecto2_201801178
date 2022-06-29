//CLASS IMPORTS
import Actor from "./classes/actor.js";
import Graph from "./classes/graph.js";
import Movie from "./classes/movie.js";
import UI from "./classes/ui.js";
import User from "./classes/user.js";
//DATA_STRUCT IMPORTS
import AVLTree from "./data_structs/avl_tree.js";
import BSTree from "./data_structs/bst.js";
import LinkedList from "./data_structs/linked_list.js";
//VARIABLES/CONSTANTS
const info_admin = {
    "dpi": "2354168452525",
    "nombre_completo": "Wilfred Perez",
    "nombre_usuario": "EDD",
    "correo": "aux@gmail.com",
    "contrasenia": "123",
    "telefono": "+502 (123) 123-4567",
    "admin": true
};
let curr_user = null;
//INSTANCES
const users = new LinkedList();
users.add(new User(info_admin))
const movies = new AVLTree();
const actors = new BSTree();
const ui = new UI();
const g = new Graph();
//FUNCTIONS
function login(user, pass, admin) {
    let aux = users.head;
    for (let i = 0; i < users.len; i++) {
        let u = aux.data;
        if (u.user === user) {
            if (u.pass === pass) {
                curr_user = u;
                if (admin) {
                    if (u.admin) {
                        ui.showAdminView(curr_user);
                    }
                    else {
                        alert('Usuario no es admin')
                    }
                }
                else {
                    ui.showUserView(curr_user);
                }
            }
            else {
                alert("Password incorrecta");
            }
            return true;
        }
        aux = aux.next;
    }
    alert('Usuario no existe')
}
ui.showLoginView();
//EVENTS
document.getElementById("login_form")
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const user = document.getElementById('user-input').value;
        const pass = document.getElementById('pass-input').value;
        const admin = document.getElementById('admin-ckbx').checked;
        login(user, pass, admin);
    });
document.getElementById('log-out')
    .addEventListener('click', function () {
        curr_user = null;
        ui.showLoginView();
    });
//FILE_LOADING
document.getElementById('load-movies')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(movie => {
                movies.insert(new Movie(movie));
            });
            g.graphBStree(movies);
        };
        fr.readAsText(this.files[0]);
    });
document.getElementById('load-users')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(user => {
                users.add(new User(user));
            });
            g.graphLinkedList(users);
        };
        fr.readAsText(this.files[0]);
    });
document.getElementById('load-actors')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(actor => {
                actors.insert(new Actor(actor));
            });
            g.graphBStree(actors);
        };
        fr.readAsText(this.files[0]);
    });