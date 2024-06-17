document.addEventListener('DOMContentLoaded', async (event) => {
    await fetchNotifications();
    await fetchInvitations();
});
async function  fetchNotifications  (){
    let notificationsHTML =document.getElementById("notifications");
    let notificationsNumber = document.getElementById("notificationsNumber");
    let token =  window.localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/notifications/get-notifications',{
            method: "GET",
            headers:{
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            }
        }); // Assuming your backend has this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch conferences');
        }
        let notifications = []
        response.json().then(body => {
            console.log(body)
            notifications = body["notifications"]
            notificationsHTML.innerHTML =''
            notificationsNumber.innerHTML = notifications.length
            notifications.forEach(element => {
                notificationsHTML.innerHTML+= `<div class='notification' id='${element._id}'> ${element.notificationContent}</div>`
            });

        }).catch((error)=>{
            console.log(error)
        })
        
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }


}
async function  fetchInvitations(){
    let invitationsHTML =document.getElementById("invitations");
    let invitationsNumber = document.getElementById("invitationsNumber");
    let token =  window.localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/subreviewer/get-invitations',{
            method: "GET",
            headers:{
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            }
        }); // Assuming your backend has this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch conferences');
        }
        let invitations = []
        response.json().then(body => {
            console.log(body)
            invitations = body
            invitationsNumber.innerHTML = invitations.length
           invitationsHTML.innerHTML = ''
            invitations.forEach(async element => {
                invitationsHTML.innerHTML+= `<div class="notification" id='${element._id}'>
            ${element.textmessage}
            
            <div class="d-flex col-12 mt-3">
                <button class="btn btn-success rounded-pill col-5 mx-auto" type="button"  id='accept-${element._id}'>Accept</button>
            
                <button class="btn btn-danger rounded-pill col-5 mx-auto" type="button" id='reject-${element._id}'>Decline</button>
            </div>
        </div>`
            });
            invitations.forEach((element) => {
                document.getElementById(`accept-${element._id}`).addEventListener('click', async () => {
                    await acceptInvitation(element._id);
                });
            
                document.getElementById(`reject-${element._id}`).addEventListener('click', async () => {
                    await rejectInvitation(element._id);
                });
            });

        }).catch((error)=>{
            console.log(error)
        })
        
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }


}
async function acceptInvitation(invitationId){
     let token =  window.localStorage.getItem('token');
     let acceptedElement = document.getElementById(`${invitationId}`)

    try {
        const response = await fetch('http://localhost:3000/subreviewer/accept-invitation',{
            method: "POST",
            headers:{
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                invitationId:  invitationId
            })
        }); // Assuming your backend has this endpoint
        // if (!response.ok) {
        //     console.log(response)
        //     throw new Error('Failed to accept invitation');
        // }
      
        response.json().then(body => {
           let message = body['message'];
           alert(message)
           acceptedElement.remove()
        }).catch((error)=>{
            console.log("Accept"+error)
        })
        
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
}

async function rejectInvitation(invitationId){
    let token =  window.localStorage.getItem('token');
    let rejectedElement = document.getElementById(`${invitationId}`)
    

    try {
        const response = await fetch('http://localhost:3000/subreviewer/reject-invitation',{
            method: "POST",
            headers:{
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                invitationId:  invitationId
            })
        }); // Assuming your backend has this endpoint
        
      
        response.json().then(body => {
           let message = body['message'];
           alert(message)
           rejectedElement.remove()

        }).catch((error)=>{
            console.log(error)
        })
        
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
}