export default class UI{
    showLoginView(){
        document.getElementById('login_view').style.display = 'block';
        document.getElementById('user-controls').style.display = "none";
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'none';
    }
    showAdminView(user){
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('admin_view').style.display = 'block';
        document.getElementById('user_view').style.display = 'none';
        this._showUserControls(user);
    }
    showUserView(user){
        document.getElementById('login_view').style.display = 'none';
        document.getElementById('admin_view').style.display = 'none';
        document.getElementById('user_view').style.display = 'block';
        this._showUserControls(user);
    }
    _showUserControls(user){
        document.getElementById('user-controls').style.display = "block";
        document.getElementById('user-name').textContent = `Usuario: ${user.name}`;
    }
}