document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    loadData(token)
    fetchSubmesions();
    });
    async function loadData(token) {
        try {
            const response = await fetch('http://localhost:3000/user/get-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
      
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
      
            const userData = await response.json();
            
            const dateElement = document.getElementById('name');
    if (dateElement) {
        dateElement.textContent = userData.fullName;
    }
        }catch{

        }
    }
    async function getuser(conmemId) {
        try {
            const response = await fetch('http://localhost:3000/user/getuserByConMemId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({conmemId})
            });
            // if (!response.ok) {
            //     throw new Error('Failed to fetch conferences');
            // }
            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Error fetching conferences:', error);
        }
    }    
  
    async function fetchSubmesions() {
        try {
            const conid = localStorage.getItem("conId")
            const response = await fetch('http://localhost:3000/author/get-submissionsByConId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ conferenceid:conid})
            });
            if (!response.ok) {
                throw new Error('Failed to fetch conferences');
            }
            const submissions = await response.json();
            
            displayConferences(submissions);
        } catch (error) {
            console.error('Error fetching conferences:', error);
        }
    }    

    async function displayConferences(submissions) {
        const submissionsContainer = document.getElementById("sub");
        submissionsContainer.innerHTML = ''; // Clear existing content
        
        for (const submission of submissions) {
            const user = await getuser(submission.authorId)
            const conferenceHTML = `<div class="col-md-12 col-lg-6 mx-auto gap-5">
                        <div class="card test-card" style="min-width: 18rem;">
                            <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">Author's name: ${user.fullName}</p>
                                <p class="card-text">Average score: ${submission.avgScore}</p>
                            </div>
                            <div class="d-flex mx-auto gap-2">
                                <button type="button" class="btn btn-success test-button" data-id="${submission._id}" data-action="accept">Accept</button>
                                <button type="button" class="btn btn-danger test-button" data-id="${submission._id}" data-action="reject">Reject</button>
                            </div>
                        </div>
                    </div>`;
            
            submissionsContainer.insertAdjacentHTML('beforeend', conferenceHTML);
        }
    }