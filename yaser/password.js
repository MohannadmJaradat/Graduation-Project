document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '../Login/login.html'; 
        }
    } catch (error) {
        console.error('Error checking token:', error);
    }
});

document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '../Login/login.html';
});

document.getElementById('savepass-btn').addEventListener('click', async function(event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword == confirmPassword && newPassword == "") {
        alert('New password should not be empty');
        return;
        
    }
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password must match.');
        return;
    }

    const token = localStorage.getItem('token');
    const data = {
        password: newPassword
    };

    try {
        const response = await fetch('http://localhost:3000/user/update-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            let errorMessage;
            try {
                errorMessage = await response.json();
            } catch (error) {
                errorMessage = 'An error occurred while updating the password.';
            }
            console.error('Error updating password:', errorMessage);
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password.');
    }
});
