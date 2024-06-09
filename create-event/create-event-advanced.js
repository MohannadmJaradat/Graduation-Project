document.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
          window.location.href = '../Login/login.html'; 
      }
    } catch (error) {
      
    }
      
});
saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click',goToReview)

function goToReview(){
    let maxNum = parseInt(document.getElementById('max-num-of-submissions').value)
    let enableNames = document.getElementById('inlineRadio1').checked;
    let disableNames = document.getElementById('inlineRadio2').checked;
    let enablesAbstracts = document.getElementById('yesRadio').checked;
    let disableAbstracts = document.getElementById('noRadio').checked;
    let files = document.getElementById("formFile").files;
    console.log(files[0].type)
    console.log(maxNum)
    if(maxNum == undefined || maxNum == "" || isNaN(maxNum)){
        window.alert("Please Enter Maximum Number Of Submissions")
        return;
    }
    if(!enableNames && !disableNames){
        window.alert("Please Select An Option")
        return;
    }
    if(!enablesAbstracts && !disableAbstracts){
        window.alert("Please Select An Option")
        return;
    }

    
    if(files.length<=0){
        window.alert("Please Enter Conference Poster")
        return;
    }
    if(files[0].type == "image/jpeg" || files[0].type == "image/png"){
        window.localStorage.setItem('poster',files[0])

       
    }else{
        window.alert("Poster file type not allowed")
        return;
    }
    window.localStorage.setItem('max-num',maxNum)
    if(enableNames){
        window.localStorage.setItem('enable-names',true)
    }else{
        window.localStorage.setItem('enable-names',false)
    }
    if(enableNames){
        window.localStorage.setItem('enable-abstracts',true)
    }else{
        window.localStorage.setItem('enable-abstracts',false)
    }
    window.location.href = "../create-event/create-event-review.html";

}