document.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
          window.location.href = '../Login/login.html'; 
      }
    } catch (error) {
      
    }
      
});
saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener('click',saveData);

function saveData(){
    let confTitle = document.getElementById('conf-title-lb').value;
    let confShort = document.getElementById('conf-short-lb').value;
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    let country = document.getElementById('location').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    console.log(country)

   if(confTitle == ""){
    window.alert("Please Enter Conference Title")
    return;
   }
   if(confShort == ""){
    window.alert("Please Enter Conference Short Name")
    return;
   }
   if(startDate == ""){
    window.alert("Please Enter Start Date")
    return;
   }
   if(endDate == ""){
    window.alert("Please Enter End Date")
    return;
   }
   if(country == ""){
    window.alert("Please Enter Location")
    return;
   }
   if(description == ""){
    window.alert("Please Enter Conference Description")
    return;
   }
   if(category == ""){
    window.alert("Please Enter Conference Category")
    return;
   }
   window.localStorage.setItem('create-title',confTitle);
   window.localStorage.setItem('create-short',confShort);
   window.localStorage.setItem('create-start-date',startDate);
   window.localStorage.setItem('create-end-date',endDate);
   window.localStorage.setItem('create-location',country);
   window.localStorage.setItem('create-description',description);
   window.localStorage.setItem('create-category',category);

   window.location.href = "../create-event/create-event-advanced.html";
   console.log(window.location.href);

}