//CLASS IMPORTS
import Actor from "./classes/actor.js";
import Category from "./classes/category.js";
import Graph from "./classes/graph.js";
import Movie from "./classes/movie.js";
import UI from "./classes/ui.js";
import User from "./classes/user.js";
//DATA_STRUCT IMPORTS
import AVLTree from "./data_structs/avl_tree.js";
import BSTree from "./data_structs/bst.js";
import HashMap from "./data_structs/hash_map.js";
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
let curr_movie = null;
//INSTANCES
const users = new LinkedList();
users.add(new User(info_admin))
const movies = new AVLTree();
const actors = new BSTree();
const categories = new HashMap(20, 100);
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
                    ui.showUserView(curr_user, movies);
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
//STARTING_POINT
ui.showLoginView();
//EVENTS
document.getElementById('login_form')
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
//ADMIN_VIEWS
document.getElementById('graph-controls')
    .addEventListener('click', function (e) {
        const btn = e.target.id;
        switch (btn) {
            case 'btn-1':
                if (movies.isEmpty())
                    g.graphBStree(movies);
                else alert('Cargue archivo correspondiente')
                break;
            case 'btn-2':
                if (users.isEmpty())
                    g.graphLinkedList(users);
                else alert('Cargue archivo correspondiente')
                break;
            case 'btn-3':
                if (actors.isEmpty())
                    g.graphBStree(actors);
                else alert('Cargue archivo correspondiente')
                break;
            case 'btn-4':
                if (categories.isEmpty())
                    g.graphHashMap(categories);
                else alert('Cargue archivo correspondiente')
                break;
            default:
                break;
        }
    });
//USER_VIEWS
document.getElementById('arrange-movies')
    addEventListener('change', (e) =>{
        switch (e.target.selectedIndex) {
            case 1:
                ui.showMovies(movies);
                break;
            case 2:
                ui.showMovies(movies, true);
                break;
            default:
                break;
        }
    });
document.getElementById('movies')
    .addEventListener('click', (e) => {
        const mid = e.target.parentElement.getAttribute('mid');
        switch (e.target.getAttribute('name')) {
            case 'info':
                curr_movie = movies.search(movies.root, mid).data;
                ui.showMovieView(curr_movie);
                break;
            case 'rent':

                break;
            default:
                break;
        }
    });
document.getElementById('btn-stars')
    .addEventListener('click', () => {
        const stars = document.getElementById('stars').value;
        curr_movie.stars = stars;
        alert(`Nueva puntuación: ${stars}`)
    });
document.getElementById('comment-box')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const com = document.getElementById('comment-area').value;
        curr_movie.addComment(curr_user.name, com);
        document.getElementById('comment-box').reset();
        ui._fillMovieComments(curr_movie.comments);
    });
document.getElementById('btn-back-movie')
    .addEventListener('click', () => {
        ui.showUserView(curr_user, movies);
    });
document.getElementById('btn-actors')
    .addEventListener('click', () => {
        ui.showActorsView(actors);
    });
document.getElementById('arrange-actors')
    .addEventListener('change', (e) => {
        switch (e.target.selectedIndex) {
            case 1:
                ui.showActors(actors, 'in');
                break;
            case 2:
                ui.showActors(actors, 'pre');
                break;
            case 3:
                ui.showActors(actors, 'post');
                break;
            default:
                break;
        }
    });
document.getElementById('btn-back-actors')
        .addEventListener('click', () => {
            ui.showUserView(curr_user, movies);
        });
document.getElementById('btn-categories')
    .addEventListener('click', () => {
        ui.showCategoriesView(categories);
    });
document.getElementById('btn-back-categories')
    .addEventListener('click', () => {
        ui.showUserView(curr_user, movies);
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
        };
        fr.readAsText(this.files[0]);
    });
document.getElementById('load-categories')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(cat => {
                categories.insert(new Category(cat));
            });
        };
        fr.readAsText(this.files[0]);
    });