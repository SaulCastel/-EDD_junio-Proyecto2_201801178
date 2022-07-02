export default class UI {
    showLoginView() {
        document.getElementById('login_view').style.display = 'block';
        document.getElementById('user-controls').style.display = "none";
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'none';
        document.getElementById('actors-view').style.display = 'none';
        document.getElementById('categories-view').style.display = 'none';
        document.getElementById('movie-view').style.display = 'none';
        document.getElementById('blockchain-view').style.display = 'none';
    }
    showAdminView(user) {
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('blockchain-view').style.display = 'none';
        document.getElementById('admin_view').style.display = 'block';
        this._showUserControls(user);
    }
    showBlockchainView(){
        document.getElementById('user-controls').style.display = "none";
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('blockchain-view').style.display = 'block';
    }
    showUserView(user) {
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'block';
        document.getElementById('arrange-movies').selectedIndex = 0;
        document.getElementById('actors-view').style.display = 'none';
        document.getElementById('categories-view').style.display = 'none';
        document.getElementById('movie-view').style.display = 'none';
        this._showUserControls(user);
    }
    _showUserControls(user) {
        document.getElementById('user-controls').style.display = 'block';
        document.getElementById('user-name').textContent = `Usuario: ${user.name}`;
    }
    showMovies(tree,reversed=false) {
        if (tree.isEmpty()) {
            const movies = document.getElementById('movies');
            movies.innerHTML = '';
            if(!reversed){
                this._inOrderMovies(tree.root, movies);
            }
            else{
                this._inOrderReversedMovies(tree.root,movies);
            }
        }
    }
    _inOrderMovies(root, movies) {
        if (root == null) {
            return;
        }
        this._inOrderMovies(root.left, movies);
        if(root.data.available){
            movies.appendChild(this._createMovieCard(root.data));
        }
        this._inOrderMovies(root.right, movies);
    }
    _inOrderReversedMovies(root, movies) {
        if (root == null) {
            return;
        }
        this._inOrderReversedMovies(root.right, movies);
        if(root.data.available){
            movies.appendChild(this._createMovieCard(root.data));
        }
        this._inOrderReversedMovies(root.left, movies);
    }
    _createMovieCard(movie) {
        const movie_div = document.createElement('div');
        movie_div.setAttribute('mid', movie.id);
        movie_div.className = 'd-flex align-items-center border-bottom border-dark py-3';
        movie_div.innerHTML =
            `<div class="text-center mx-3">
        <div class="border border-dark movie">${movie.name}</div>
        <p>id:<br>${movie.id}</p>
        </div>
        <p><b>Descripción:</b> ${movie.desc}</p>
        <div class="btn btn-secondary ms-2" name="info">info.</div>
        <div class="btn btn-success ms-2" name="rent">alquilar</div>
        <h5 class="mx-3">Precio:<br>Q${movie.price}</h5>`;
        return movie_div;
    }
    showMovieView(movie){
        document.getElementById('user_view').style.display = 'none';
        document.getElementById('movie-title').textContent = `${movie.name}`;
        document.getElementById('movie-desc').innerHTML = `<b>Descripción:</b> ${movie.desc}`;
        document.getElementById('stars').value = `${movie.stars}`;
        document.getElementById('movie-price').textContent = `Q${movie.price}`;
        this._fillMovieComments(movie.comments);
        document.getElementById('comment-box').reset();
        document.getElementById('user-controls').style.display = 'none';
        document.getElementById('movie-view').style.display = 'block';
    }
    _fillMovieComments(list){
        const comments = document.getElementById('comments');
        comments.innerHTML = '';
        if(list.isEmpty()){
            let aux = list.head;
            while(aux != null){
                const comment = document.createElement('div');
                comment.className = 'border border-dark px-3 mb-3 text-wrap text-break';
                comment.innerHTML = `${aux.data}`;
                comments.appendChild(comment);
                aux = aux.next;
            }
        }
    }
    showActorsView() {
        document.getElementById('user-controls').style.display = 'none';
        document.getElementById('user_view').style.display = 'none';
        document.getElementById('actors-view').style.display = 'block';
        document.getElementById('arrange-actors').selectedIndex = 0;
    }
    showActors(tree, type) {
        if(tree.isEmpty()){
            const actors = document.getElementById('actors');
            actors.innerHTML = '';
            switch (type) {
                case 'in':
                    this._inOrderActors(tree.root,actors);
                    break;
                case 'pre':
                    this._preOrderActors(tree.root,actors);
                    break;
                case 'post':
                    this._postOrderActors(tree.root,actors);
                    break;
                default:
                    break;
            }
        }
    }
    _inOrderActors(root,actors){
        if(root == null){
            return;
        }
        this._inOrderActors(root.left,actors);
        actors.appendChild(this._createActorCard(root.data));
        this._inOrderActors(root.right,actors);
    }
    _preOrderActors(root,actors){
        if(root == null){
            return;
        }
        actors.appendChild(this._createActorCard(root.data));
        this._preOrderActors(root.left,actors);
        this._preOrderActors(root.right,actors);
    }
    _postOrderActors(root,actors){
        if(root == null){
            return;
        }
        this._postOrderActors(root.left,actors);
        this._postOrderActors(root.right,actors);
        actors.appendChild(this._createActorCard(root.data));
    }
    _createActorCard(actor){
        const actor_div = document.createElement('div');
        actor_div.className = 'border-bottom border-dark px-3 py-3';
        actor_div.innerHTML =
        `<h5>${actor.dni}: ${actor.name}</h5>
        <p>${actor.desc}</p>`;
        return actor_div;
    }
    showCategoriesView(list) {
        document.getElementById('user-controls').style.display = 'none';
        document.getElementById('user_view').style.display = 'none';
        document.getElementById('categories-view').style.display = 'block';
        this._showCategories(list);
    }
    _showCategories(list) {
        if (list.isEmpty()) {
            const categories = document.getElementById('categories');
            categories.innerHTML = '';
            let aux = list.h.head;
            while (aux != null) {
                if (aux.data) {
                    let node = aux.data.head;
                    while (node != null) {
                        categories.appendChild(this._createCategoryCard(node.data));
                        node = node.next;
                    }
                }
                aux = aux.next;
            }
        }
    }
    _createCategoryCard(cat) {
        const category_div = document.createElement('div');
        category_div.className = 'border-bottom border-dark px-auto py-3';
        category_div.innerHTML =
            `<h5>${cat.comp}</h5>
        <p>id:${cat.id}</p>`;
        return category_div;
    }
}