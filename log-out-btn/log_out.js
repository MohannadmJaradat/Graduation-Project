document.getElementById('logoutButton').addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('category');
    localStorage.removeItem('searchInput');
    localStorage.removeItem('selectCountry');

    // Redirect the user to the login page
    window.location.href = '../Login/login.html';
});
document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('category');
    localStorage.removeItem('searchInput');
    localStorage.removeItem('selectCountry');
    window.location.href = '../Login/login.html';
});