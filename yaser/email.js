document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '../Login/login.html'; 
        }

        const response = await fetch('http://localhost:3000/user/get-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const userData = await response.json();

        if (response.ok) {
            document.getElementById('staticEmail').value = userData.email; // Populate current email
        } else {
            console.error('Error fetching user data:', userData.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

   
});
 document.getElementById('logoutButton').addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect the user to the login page
        window.location.href = '../Login/login.html';
    });
document.getElementById('email-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const newEmail = document.getElementById('newEmail').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    if (newEmail == confirmEmail && newEmail=="") {
        alert('New email should not be empty.');
        return;
    }

    if (newEmail !== confirmEmail) {
        alert('New email and confirm email must match.');
        return;
    }

    const data = {
        email: newEmail
    };

    try {
        const response = await fetch('http://localhost:3000/user/update-email', {
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
                errorMessage = 'An error occurred while updating the email.';
            }
            console.error('Error updating email:', errorMessage);
            alert(errorMessage);
        }
        localStorage.removeItem('token');
        window.location.href = '../Login/login.html';
    } catch (error) {
        console.error('Error updating email:', error);
        alert('An error occurred while updating the email.');
    }
});
