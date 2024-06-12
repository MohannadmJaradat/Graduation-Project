document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    // Add an event listener to the logout button
    // document.getElementById('logoutButton').addEventListener('click', function(event) {
    //     // Prevent default form submission behavior
    //     event.preventDefault();

    //     // Remove the token from localStorage
    //     localStorage.removeItem('token');

    //     // Redirect the user to the login page
    //     window.location.href = '../Login/login.html';
    // });
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input').value;
        const selectCountry = document.getElementById('select-country').value;
        localStorage.setItem('searchInput', searchInput);
        localStorage.setItem('selectCountry', selectCountry);
        window.location.href = '../conferences/searchconferences.html';
    });

    fetchConferences();

    // Add event listeners for conference categories (if any)
    
});
async function fetchConferences() {
    try {
        const searchInput = localStorage.getItem('searchInput');
        const country = localStorage.getItem('selectCountry');

        if (!searchInput) {
            throw new Error('Search not found in localStorage');
        }

        const response = await fetch('http://localhost:3000/conference/search-conference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ search: searchInput, country})
        });

        // if (!response.ok) {
        //     alert("Failed to fetch conferences");
        //     throw new Error('Failed to fetch conferences');
        // }

        const conferences = await response.json();
        displayConferences(conferences);
    } catch (error) {
        // alert("Problem fetching conferences");
        // console.error('Error fetching conferences:', error);
    }
}

function displayConferences(conferences) {
    const conferencesContainer = document.querySelector('.col-md-9 .conference-cards .row');
    conferencesContainer.innerHTML = ''; // Clear existing content
    conferences.forEach(conference => {
        const conferenceHTML = `
        <a href="#">
            <div class="card mb-3 card-div" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${conference.imageUrl}" class="img-fluid rounded-start rounded-bottom rounded-top" alt="Conference Image">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">${conference.title}</h5>
                            <p class="card-text">${conference.description}</p>
                            <p>${conference.date} | ${conference.location}</p>
                            <p class="card-text"><small class="text-body-secondary">${conference.time}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    `;
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    });
}

// Call fetchConferences on page load or based on specific event
document.addEventListener('DOMContentLoaded', fetchConferences);

// Event listener for the create conference button
const createConferenceBtn = document.getElementById("create-btna");
createConferenceBtn.addEventListener("click", goToCreateConference);

function goToCreateConference() {
    const token = window.localStorage.getItem('token');
    if (!token) {
        window.location.href = '../Login/login.html';
    } else {
        window.location.href = '../create-event/create-event-edit.html';
    }
}
