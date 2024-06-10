document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '../Login/login.html'; 
            return;
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
            document.getElementById('fullName').value = userData.fullName;
            //document.getElementById('email').value = userData.email;
            document.getElementById('googleScholar').value = userData.googleScholarUsername;
            document.getElementById('webPage').value = userData.webPage;
            document.getElementById('university').value = userData.university;
            document.getElementById('degree').value = userData.degree;
            document.getElementById('gender').value = userData.gender;
            document.getElementById('phoneNumber').value = userData.phoneNumber;
            document.getElementById('country').value = userData.country;
        } else {
            console.error('Error fetching user data:', userData.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    
});

document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Moved token declaration here

    const data = {
        fullName: document.getElementById('fullName').value,
        googleScholarUsername: document.getElementById('googleScholar').value,
        webPage: document.getElementById('webPage').value,
        university: document.getElementById('university').value,
        degree: document.getElementById('degree').value,
        gender: document.getElementById('gender').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        country: document.getElementById('country').value
    };

    try {
        const response = await fetch('http://localhost:3000/user/update-user', {
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
                errorMessage = await response.json(); // Attempt to get error message as JSON
            } catch (error) {
                errorMessage = 'An error occurred while updating the profile.'; // Default error message
            }
            console.error('Error updating profile:', errorMessage);
            alert(errorMessage.message || errorMessage);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
    }
});

