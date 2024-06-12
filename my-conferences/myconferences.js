document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    document.getElementById('profileb').addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Redirect the user to the login page
        window.location.href = '../yaser/profileInfo.html';
    });

    fetchConferences();
    });
async function fetchConferences() {
    try {
        const response = await fetch('http://localhost:3000/conference/get-conferencesByUserId'); // Assuming your backend has this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch conferences');
        }
        const conferences = await response.json();
        displayConferences(conferences);
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

function displayConferences(conferences) {
    const conferencesContainer = document.getElementById("con");
    conferencesContainer.innerHTML = ''; // Clear existing content

    conferences.forEach(conference => {
        // Use fallback image if conference.poster is not valid
        const posterSrc = conference.poster && conference.poster.trim() !== "" ? conference.poster : '../assets/medical.jpg';
        const truncatedDescription = truncateText(conference.description, 20);
        const conferenceHTML = `
            <div class="col-lg-4 col-md-6 mb-4 popular-conference-div">
                <div class="card popular-conference-card">
                    <a href="../yaser/index.html" data-conference-id="${conference._id}">
                        <img src="${posterSrc}" class="card-img-top popular-conference-image" alt="${conference.title}" onerror="this.onerror=null;this.src='../assets/medical.jpg';">
                        <div class="card-body">
                            <h3>${conference.title}</h3>
                            <p class="card-text">${truncatedDescription}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;`<div class="col-md-12 col-lg-6 mx-auto gap-5 popular-conference-div">
                    <div class="card test-card" style="min-width: 18rem;">
                        <img src="../assets/conference banner2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3>${conference.title}</h3>
                            <p class="card-text">Sed convallis fermentum leo vitae placerat. Vivamus vitae posuere est, ut posuere mi. Nunc eu sem varius, sollicitudin lacus at, egestas mi. Nam et fringilla ante, nec rutrum justo. Sed consequat elit turpis, vitae sollicitudin
                                est volutpat vitae. Quisque sem arcu, ultricies a nulla quis, consequat molestie enim</p>
                            <p class="text-body-secondary">Your role in this conference is: Manager</p>
                        </div>

                    </div>
                </div>`
        
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    });

    // Add event listener to save conference ID on click
    const conferenceLinks = document.querySelectorAll('.popular-conference-card a');
    conferenceLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const conferenceId = this.getAttribute('data-conference-id');
            localStorage.setItem('conId', conferenceId);
        });
    });
}



function goToConferences() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../Login/login.html';
    } else {
        window.location.href = '../conferences/conferences.html';
    }
}

createConferenceBtn = document.getElementById("create-btna")

createConferenceBtn.addEventListener("click",goToCreateConference);

function goToCreateConference(){
  let token =  window.localStorage.getItem('token');
  console.log(token)
  if(!token){
    window.location.href = '../Login/login.html';

  }else{
    window.location.href = '../create-event/create-event-edit.html';

  }
}