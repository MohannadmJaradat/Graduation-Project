document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/user/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("please verify your email")
        localStorage.setItem('token',data.token)
        window.location.href = '../Login/login.html';
    } else {
        alert('Error: ' + data.message);
    }
});
