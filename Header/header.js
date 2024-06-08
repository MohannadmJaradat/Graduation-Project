createConferenceBtn = document.getElementById("create-btn")

createConferenceBtn.addEventListener("click",goToCreateConference);

function goToCreateConference(){
 window.location.href = '../create-event/create-event-advanced.html';
}