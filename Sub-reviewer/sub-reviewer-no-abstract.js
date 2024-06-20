// For adding submission with paper and abstract
document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }
    
    loadData(token)
    fetchsubmissions();
});
document.getElementById('cond').addEventListener('click', function() {
    localStorage.setItem("where","Sub-reviewer-no-abstract")
});

document.querySelector('.create-event-advanced-back-button').addEventListener('click', async () => {
    const loc =localStorage.getItem("where")
    if(loc=="mycon"){
        window.location.href="../my-conferences/my-conferences.html"

    }else if(loc=="con"){
        window.location.href="../conferences/conferences.html"

    }else if(loc=="scon"){
        window.location.href="../conferences/searchconferences.html"

    }else if(loc=="uhp"){
        window.location.href="../Homepage/user-homepage.html"

    }else{
        window.location.href="../Homepage/user-homepage.html"
    }
});    

async function fetchsubmissions() {
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
        displaysubmissions(submissions);
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
}async function displaysubmissions(submissions) {
    const conferencesContainer = document.getElementById("sub");
    conferencesContainer.innerHTML = ''; // Clear existing content

    for (const submission of submissions) {
        const user = await getuser(submission.authorId);
        const conferenceHTML = `
            <div class="col-md-12 col-lg-6 mx-auto gap-5" data-submission-id="${submission._id}">
                <div class="card test-card" style="min-width: 18rem;">
                    <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Author's name: ${user.fullName}</p>
                        <label for="score-${submission._id}">Assign a score:</label>
                        <input id="score-${submission._id}" class="form-control mt-2" type="text" placeholder="Enter a score" aria-label="default input example">
                        <label for="file-${submission._id}" class="form-label mt-3">Add a review<span style="color: red;">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" id="file-${submission._id}" aria-describedby="inputGroupFileAddon-${submission._id}" aria-label="Upload">
                            <button class="btn btn-outline-secondary submit-review" type="button" id="inputGroupFileAddon-${submission._id}" data-submission-id="${submission._id}">Submit</button>
                        </div>
                        <div class="d-flex  col-12 mx-auto mt-2">
                            <button type="button" class="btn save-and-continue-btn col-11 mx-auto paper" style="margin-top: 3%;" data-paper-url="http://localhost:3000/${submission.paper}">Download Paper</button>
                        </div>
                    </div>
                </div>
            </div>`;
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    }

    const paperButtons = document.querySelectorAll('.paper');
    paperButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default behavior
            const paperUrl = button.getAttribute('data-paper-url');
            if (paperUrl) {
                const fileExtension = paperUrl.split('.').pop().toLowerCase();
                if (fileExtension === 'pdf') {
                    window.open(paperUrl, '_blank'); // Open the PDF in a new tab
                } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                    window.location.href = paperUrl; // Download the Word document
                } else {
                    alert('Unsupported file type');
                }
            }
        });
    });

    const submitButtons = document.querySelectorAll('.submit-review');
submitButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const submissionId = button.getAttribute('data-submission-id');
        const scoreInput = document.getElementById(`score-${submissionId}`);
        const fileInput = document.getElementById(`file-${submissionId}`);

        const score = scoreInput.value;
        const review = fileInput.files[0];

        console.log('Score:', score);
        console.log('Review file:', review);
        console.log('Submission ID:', submissionId);

        if (!score || !review) {
            alert('Please provide both a score and a file.');
            return;
        }

        const formData = new FormData();
        formData.append('score', score);
        formData.append('description', review);
        formData.append('submissionId', submissionId);

        try {
            const response = await fetch('http://localhost:3000/reviewer/add-reviewandscore', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (response.ok) {
                alert('Review submitted successfully.');
                window.location.href="./Sub-reviewer-no-abstract.html"
            } else {
                alert('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting the review.');
        }
    });
});
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
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching conferences:', error);
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
   


