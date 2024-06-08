document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    } else {
        // Verify token with the server
        fetch('http://localhost:3000/user-homepage', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // Add an event listener to the logout button
    document.getElementById('logoutButton').addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Remove the token from localStorage
        localStorage.removeItem('token');
        const token = localStorage.getItem('token');

        // Redirect the user to the login page
        window.location.href = '../Login/login.html';
    });
});
