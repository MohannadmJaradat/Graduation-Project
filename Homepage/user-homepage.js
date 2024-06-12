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

    document.getElementById('profileb').addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Redirect the user to the login page
        window.location.href = '../yaser/profileInfo.html';
    });

    fetchConferences();

    // Add event listeners for conference categories
    const categories = ['Technology', 'Medical', 'Business', 'Academic', 'Environmental', 'Cultural'];
    categories.forEach(categoryId => {
        const element = document.getElementById(categoryId);
        if (element) {
            element.addEventListener('click', function() {
                localStorage.setItem('category', categoryId);
                goToConferences();
            });
        }
    });
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var countries = [
            "Irbid",
            "Ajloun",
            "Jerash",
            "Mafraq",
            "Balqa",
            "Amman",
            "Zarqa",
            "Madaba",
            "Karak",
            "Tafilah",
            "Ma'an",
            "Aqaba"
        ];
        const searchInput = document.getElementById('search-input').value;
        const selectCountry = document.getElementById('select-country').value;
        localStorage.setItem('searchInput', searchInput);
        if(countries[selectCountry-1]){
        localStorage.setItem('selectCountry', countries[selectCountry-1]);
                alert(countries[selectCountry-1])

        }
        else{
            localStorage.setItem('selectCountry', "Irbid");
            
        }
        
        
        window.location.href = '../conferences/searchconferences.html';
    });
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
        // Use fallback image if conference.poster is not valid
        const posterSrc = conference.poster && conference.poster.trim() !== "" ? conference.poster : '../assets/medical.jpg';
        
        const conferenceHTML = `
            <div class="col-lg-4 col-md-6 mb-4 popular-conference-div">
                <div class="card popular-conference-card">
                    <a href="../yaser/index.html" data-conference-id="${conference._id}">
                        <img src="${posterSrc}" class="card-img-top popular-conference-image" alt="${conference.title}" onerror="this.onerror=null;this.src='../assets/medical.jpg';">
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