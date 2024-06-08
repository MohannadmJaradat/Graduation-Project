createConferenceBtn = document.getElementById("create-btn")

document.addEventListener("submit",goToCreateConference);

function goToCreateConference(){
 window.location.href = '../create-event/create-event-advanced.html';
}