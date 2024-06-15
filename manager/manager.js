document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    loadData(token)
    fetchSubmesions();

        const titleInput = document.getElementById('max-num-of-submissions');
        const emailInput = document.getElementById('max-num-of-attendees');
        const roleInputs = document.getElementsByName('inlineRadioOptions');
        const addButton = document.getElementById("addmem")
        const deleteButton = document.querySelector('.btn-danger');
        const conferencedetails = document.getElementById('addmem');
        conferencedetails.addEventListener('click', async () => {
            window.location.href ="../yaser/user.html"
        });

        addButton.addEventListener('click', async () => {
            const conferenceTitle = titleInput.value;
            const memberEmail = emailInput.value;
            alert(memberEmail)
            let memberRole = '';
    
            roleInputs.forEach(input => {
                if (input.checked) {
                    memberRole = input.nextElementSibling.textContent.trim();
                }
            });
            if(!memberRole){
                alert("you have to choose the rule")
                return;
            }
            try {
                
                const response = await fetch('http://localhost:3000/manager/add-member', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({conferenceId: localStorage.getItem("conId"), title: conferenceTitle, email:memberEmail, role:memberRole})
                });
                window.location.href = "../manager/manager.html";
            } catch (error) {
                console.error('Error fetching conferences:', error);
            }
    
        });
    
        // Add event listener to the Delete button
        deleteButton.addEventListener('click', async () => {
            const memberEmail = emailInput.value;
            try {
                const response = await fetch('http://localhost:3000/user/get-conmem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ email: memberEmail, conferenceId: localStorage.getItem("conId") })
                });
                const conmem = await response.json();
                if (!response.ok) {
                    throw new Error(conmem.message || 'Error fetching conference member');
                }
    
                deletemember(conmem);
            } catch (error) {
                console.error('Error fetching conference member:', error);
                alert(`Error fetching conference member: ${error.message}`);
            }
        });
    });
    async function deletemember(conmem){
        try {
            alert(conmem._id)
            const response2 = await fetch('http://localhost:3000/manager/delete-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ conferenceMemberId: conmem._id, conferenceId: localStorage.getItem("conId") })
            });
            const result = await response2.json();
            if (!response2.ok) {
                throw new Error(result.message || 'Error deleting conference member');
            }
            console.log('Member deleted successfully:', result);
            window.location.href = "../manager/manager.html";
        } catch (error) {
            console.error('Error deleting conference member:', error);
            alert(`Error deleting member: ${error.message}`);
        }

    }
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
            const user = await getuser(submission.authorId);
            alert(user._id)
            let conferenceHTML;
    
            if (submission.isAccepted) {
                conferenceHTML = `<div class="col-md-12 col-lg-6 mx-auto gap-5">
                    <div class="card test-card" style="min-width: 18rem;">
                        <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Author's name: ${user.fullName}</p>
                            <p class="card-text">Average score: ${submission.avgScore}</p>
                            <p class="card-text">The submission is: Accepted</p>
                        </div>
                        <div class="d-flex mx-auto gap-2">
                            <button type="button" class="btn btn-danger test-button" data-id="${submission._id}" data-action="delete">Delete</button>
                        </div>
                    </div>
                </div>`;
            } else {
                conferenceHTML = `<div class="col-md-12 col-lg-6 mx-auto gap-5">
                    <div class="card test-card" style="min-width: 18rem;">
                        <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Author's name: ${user.fullName} </p>
                            <p class="card-text">Average score: ${submission.avgScore}</p>
                            <p class="card-text">The submission is: still need evaluate</p>
                        </div>
                        <div class="d-flex mx-auto gap-2">
                            <button type="button" class="btn btn-success test-button" data-id="${submission._id}" data-action="accept">Accept</button>
                            <button type="button" class="btn btn-danger test-button" data-id="${submission._id}" data-action="reject">Reject</button>
                        </div>
                    </div>
                </div>`;
            }
            
            submissionsContainer.insertAdjacentHTML('beforeend', conferenceHTML);
        }
    
        // Add event listeners to the buttons
        const buttons = document.querySelectorAll('.test-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                const submissionId = this.getAttribute('data-id');
                const action = this.getAttribute('data-action');
                handleSubmissionAction(submissionId, action);
            });
        });
    }
    
    // Function to handle the button actions
    async function handleSubmissionAction(submissionId, action) {
        if (action === 'accept') {
            const response = await fetch('http://localhost:3000/manager/accept-sub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({submissionId})
            });
            alert(`Accepted submission with ID: ${submissionId}`);
            window.location.href = "../manager/manager.html";
        } else if (action === 'reject') {
            const response = await fetch('http://localhost:3000/manager/reject-sub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({submissionId})
            });
            alert(`Rejected submission with ID: ${submissionId}`);
            window.location.href = "../manager/manager.html";
        } else if (action === 'delete') {
            const response = await fetch('http://localhost:3000/manager/reject-sub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({submissionId})
            });
            alert(`Deleted submission with ID: ${submissionId}`);
            window.location.href = "../manager/manager.html";
        }
    }
    async function displayMembers(users) {
        const submissionsContainer = document.getElementById("conmember");
        submissionsContainer.innerHTML = ''; // Clear existing content
    
        users.forEach((user, index) => {
            let conferenceHTML;
            if (user.role == "manager") {
                conferenceHTML = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${user.user.email}</td>
                        <td>${user.role}</td>
                        <td>
                            <div class="mx-auto col-6 d-grid">
                                <button type="button" class="btn btn-danger" disabled>Remove member</button>
                            </div>
                        </td>
                    </tr>`;
            } else {
                conferenceHTML = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${user.user.email}</td>
                        <td>${user.role}</td>
                        <td>
                            <div class="mx-auto col-6 d-grid">
                                <button type="button" class="btn btn-danger remove-button" data-conference-member-id="${user.conferenceMember_id}">Remove member</button>
                            </div>
                        </td>
                    </tr>`;
            }
            submissionsContainer.insertAdjacentHTML('beforeend', conferenceHTML);
        });
    
        // Add event listener using event delegation
        submissionsContainer.addEventListener('click', async (event) => {
            if (event.target.classList.contains('remove-button')) {
                const conferenceMemberId = event.target.dataset.conferenceMemberId;
                try {
                    alert(conferenceMemberId)
                    const response = await fetch('http://localhost:3000/manager/delete-member', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ conferenceMemberId: conferenceMemberId, conferenceId: localStorage.getItem("conId") })
                    });
                    const result = await response.json();
                    if (!response.ok) {
                        throw new Error(result.message || 'Error deleting conference member');
                    }
                    console.log('Member deleted successfully:', result);
                    window.location.href = "../manager/manager.html";
                } catch (error) {
                    console.error('Error deleting conference member:', error);
                    alert(`Error deleting member: ${error.message}`);
                }
            }
        });
    }
    
    
    
    // Event listener for modal title click
    const modalTitle = document.getElementById('viewmembers');
    modalTitle.addEventListener('click', async () => {
       // alert('Modal title clicked');
        try {
            const response = await fetch('http://localhost:3000/conference/get-conferenceMembers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ conferenceId: localStorage.getItem("conId") })
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch conference members');
            }
    
            displayMembers(result);
        } catch (error) {
            console.error('Error fetching conference members:', error);
        }
    });
    
    // Event listener for close button click
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
       // alert('Close button clicked');
        // Add your code to handle the click event
    });