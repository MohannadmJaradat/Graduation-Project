// For adding submission with paper and abstract
document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }
    //alert("one")
    fetchsubmissions();
});
document.getElementById('submitFileButton').addEventListener('click', async () => {
    const paperFileInput = document.getElementById('formFile');
    
    //const abstractFileInput = document.getElementById('formabstract');
    //alert("button pressed")
    const paperFile = paperFileInput.files[0];
    //const abstractFile = abstractFileInput.files[0];
    const conferenceId = localStorage.getItem('conId');

    try {
        const formData = new FormData();
        formData.append('conferenceId', conferenceId);
        formData.append('paper', paperFile);
        //formData.append('abstract', abstractFile);

        const response = await fetch('http://localhost:3000/author/add-submission-without-abstract', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to add submission');
        }

        const result = await response.json();
        alert('Submission added successfully');
        console.log(result);
        window.location.href = './author-no-abstract.html';
    } catch (error) {
        console.error('Error adding submission:', error);
        alert('Failed to add submission. Check console for details.');
    }
});
async function fetchsubmissions() {
    try {

        const response = await fetch('http://localhost:3000/author/get-submission', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const submissions = await response.json();
        await displaysubmissions(submissions);
        //displayabstract(submissions)
    } catch (error) {
        // alert("Problem fetching conferences");
        // console.error('Error fetching conferences:', error);
    }
}
async function displaysubmissions(submissions) {
    const conferencesContainer = document.getElementById("sub");
    conferencesContainer.innerHTML = ''; // Clear existing content
    let conference = await getconferences();
    
    submissions.forEach(async submission => {
        const conferenceHTML = `
        <div class="card test-card popular-conference-div" style="min-width: 18rem;" data-paper-url="http://localhost:3000/${submission.paper}" data-submission-id="${submission._id}">
                    <a onclick="return false;">
                        <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Conference: ${conference.title}</p>
                            <p class="card-text">Field: ${conference.confield}</p>
                        </div>
                    </a>
                    <div class=" mx-auto d-flex  col-12 mx-auto">
                        <button type="button" class="btn btn-danger col-11 mx-auto mb-4 mt-2 delete-button">Remove Submission</button>
                    </div>
                </div>    
        `;
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    });

    // Add event listeners to each card to show the paper when clicked
    const cards = document.querySelectorAll('.test-card');
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default behavior
            const paperUrl = card.getAttribute('data-paper-url');
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

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.stopPropagation(); // Prevent the card click event
            const card = button.closest('.test-card');
            const papersub = card.getAttribute("data-submission-id")
            if (confirm('Are you sure you want to delete this paper?')) {
                try {
                    const response = await fetch(`http://localhost:3000/author/delete-submission`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ submissionId:papersub })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete paper');
                    }

                    alert('Paper deleted successfully');
                    card.remove(); // Remove the card from the DOM
                } catch (error) {
                    console.error('Error deleting paper:', error);
                    alert('Failed to delete paper. Check console for details.');
                }
            }
        });
    });
}




async function getconferences() {
    try {
        const conId = localStorage.getItem('conId');
        if (!conId) {
            throw new Error('conId not found in localStorage');
        }
        // Fetch conferences by category
        const response = await fetch('http://localhost:3000/conference/get-conferenceById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ conId })
        });

        if (!response.ok) {
            alert("Failed to fetch conferences");
            throw new Error('Failed to fetch conferences');
        }

        const conference = await response.json();
        
        return conference;
    } catch (error) {
        alert("Problem fetching conferences");
        console.error('Error fetching conferences:', error);
    }
}
