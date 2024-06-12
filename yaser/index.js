document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    fetchConferences();

    // Add event listeners for conference categories (if any)
    
});
async function getuser(conference) {
    try {
        const response = await fetch('http://localhost:3000/user/getuserById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ userId:conference.manager})
        });
  
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
        return userData.fullName;
    } catch (error) {
        console.error('Error loading data:', error);
    }
    
}
async function fetchConferences() {
    try {
        const conId = await localStorage.getItem('conId');
        alert(conId)
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
        
        displayConference(conference);
    } catch (error) {
        alert("Problem fetching conferences");
        console.error('Error fetching conferences:', error);
    }
}
async function displayConference(conference) {
    if (!conference) return;

    // Update the conference title
    const titleElement = document.querySelector('.col-md-7 p');
    if (titleElement) {
        titleElement.textContent = conference.title;
    }
    console.log(conference.title)

    // Update the conference image
    const imageElement = document.querySelector('.col-md-11 img');
    if (imageElement) {
        imageElement.src = conference.imageUrl;
    }

    // Update the date and time
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = `${conference.startDate} | ${conference.endDate}`;
    }

    // Update the location
    const locationElement = document.getElementById('location');
    if (locationElement) {
        locationElement.textContent = conference.location;
    }
    const hostElement = document.getElementById('host');
    if (hostElement) {
       const host = await getuser(conference)
       hostElement.textContent = host
       
    }

    // Update the Google Maps iframe (optional, if you have coordinates)
    const mapIframe = document.querySelector('.col iframe');
    if (mapIframe && conference.coordinates) {
        const { latitude, longitude } = conference.coordinates;
        mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.988557801129!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude}!5e0!3m2!1sen!2sus!4v1612399743273!5m2!1sen!2sus`;
    }

    // Update the event description
    const descriptionElement = document.getElementById('condes');
    if (descriptionElement) {
        descriptionElement.innerHTML = conference.description;
    }
    
}

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
