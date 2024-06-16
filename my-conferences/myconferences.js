document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }

    loadData(token)
    fetchConferences();
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
async function getroletype(conferenceid){
    try {
    
        const response = await fetch('http://localhost:3000/conference/get-roletype', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({conferenceid})
        });
        const user = await response.json();
        //alert(user)//here 3mk
        return user;
    } catch (error) {
    }
}    
async function fetchConferences() {
    try {
        const response = await fetch('http://localhost:3000/conference/get-conferencesByUserId', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
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

async function displayConferences(conferences) {
    const conferencesContainer = document.getElementById("con");
    conferencesContainer.innerHTML = ''; // Clear existing content
    
    for (const conference of conferences) {
        const type = await getroletype(conference._id);
        const posterPath = `http://localhost:3000/${conference.poster.replace(/\\/g, '/')}`;
        const truncatedDescription = truncateText(conference.description, 20);
        const conferenceHTML = `<div class="col-md-12 col-lg-6 mx-auto gap-5 popular-conference-div">
                    <div class="card test-card" style="min-width: 18rem;">
                        <a href="" data-conference-id="${conference._id}" data-roletype="${type}" data-is-abstract-enabled="${conference.isAbstractEnabled}">
                            <img src="${posterPath}" class="card-img-top" alt="...">
                            <div class="card-body card-body-test">
                                <h3 class="card-body-test">${conference.title}</h3>
                                <p class="card-text card-body-test">${truncatedDescription}</p>
                                <p class="text-body-secondary">your role in this conference is: ${type}</p>
                            </div>
                        </a>
                    </div>
                </div>`;
        
        conferencesContainer.insertAdjacentHTML('beforeend', conferenceHTML);
    }

    // Add event listener to save conference ID and type on click
    const conferenceLinks = document.querySelectorAll('.test-card a');
    conferenceLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior if needed
            const conferenceId = this.getAttribute('data-conference-id');
            const abstract = this.getAttribute('data-is-abstract-enabled');
            localStorage.setItem('conId', conferenceId);
            localStorage.setItem('abstract', abstract);
            const roletype = this.getAttribute('data-roletype');
            //localStorage.setItem('roleType', roletype);
            //alert(`Conference ID: ${conferenceId}, Role Type: ${roletype}`);
            // Optionally navigate to the new page after storing data
            if(roletype=="Supervisor"){
                window.location.href = "../supervisor/supervisor.html";
                }else if(roletype=="Reviewer"){
                    window.location.href = "../Reviewer/reviewer.html";
                    }else if(roletype=="manager"){
                        window.location.href = "../manager/manager.html";
                        }else if(roletype=="Author"){
                            if(abstract=="false"){
                                window.location.href = "../author/author-no-abstract.html";}
                            else if(abstract=="true"){
                                window.location.href = "../author/author.html";}
                        }else if(roletype=="user"){
                            window.location.href = "../yaser/user.html";

                        }
        });
    });
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