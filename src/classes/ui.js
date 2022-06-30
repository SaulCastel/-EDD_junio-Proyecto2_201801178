export default class UI {
    showLoginView() {
        document.getElementById('login_view').style.display = 'block';
        document.getElementById('user-controls').style.display = "none";
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'none';
    }
    showAdminView(user) {
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('admin_view').style.display = 'block';
        document.getElementById('user_view').style.display = 'none';
        this._showUserControls(user);
    }
    showUserView(user,movies) {
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'block';
        this._showUserControls(user);
        this.showMoviesIncreasing(movies);
    }
    _showUserControls(user) {
        document.getElementById('user-controls').style.display = "block";
        document.getElementById('user-name').textContent = `Usuario: ${user.name}`;
    }
    showMoviesIncreasing(tree) {
        if(tree.isEmpty()){
            const movies = document.getElementById('movies');
            movies.innerHTML = '';
            this._inOrder(tree.root, movies);
        }
    }
    _inOrder(root, movies) {
        if(root == null){
            return
        }
        this._inOrder(root.left, movies);
        this._createMovieCard(root.data, movies);
        this._inOrder(root.right, movies);
    }
    _createMovieCard(movie, movies) {
        const movie_div = document.createElement('div');
        movie_div.className = 'd-flex align-items-center border-bottom border-dark py-3';
        movie_div.innerHTML = 
            `<div class="text-center mx-3">
            <div class="border border-dark movie">${movie.name}</div>
            <h5>id:<br>${movie.id}</h5>
            </div>
            <p>${movie.desc}</p>
            <div class="btn btn-secondary ms-2">info.</div>
            <div class="btn btn-success ms-2">comprar</div>
            <h5 class="mx-3">Precio:<br>Q${movie.price}</h5>`;
        movies.appendChild(movie_div);
    }
}