document.addEventListener('DOMContentLoaded', (event) => {
    
    fetchConferences();
});

async function fetchConferences() {
    try {
        const response = await fetch('http://localhost:3000/conference/get-conferences'); // Assuming your backend has this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch conferences');
        }
        const conferences = await response.json();
        displayConferences(conferences);
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
}

function displayConferences(conferences) {
    const conferencesContainer = document.querySelector('.row1');
    conferencesContainer.innerHTML = ''; // Clear existing content
    conferences.forEach(conference => {
        const conferenceHTML = `
            <div class="col-lg-4 col-md-6 mb-4 popular-conference-div">
                <div class="card popular-conference-card">
                    <a href="">
                        <img src="" class="card-img-top popular-conference-image" alt="${conference.title}">
                        <div class="card-body">
                            <h3>${conference.title}</h3>
                            <p class="card-text">${conference.description}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    });
}