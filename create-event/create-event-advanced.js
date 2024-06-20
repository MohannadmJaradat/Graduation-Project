document.addEventListener('DOMContentLoaded', async () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
        window.location.href = '../Login/login.html';
    }
    const saveButton = document.getElementById('save-btn');
    const conferenceTitle = localStorage.getItem('conferenceTitle') || 'Event Title';
      const location = localStorage.getItem('location') || 'Location';
      const startDate = localStorage.getItem('startDate') || 'Start Date';
      const endDate = localStorage.getItem('endDate') || 'End Date';
  
      document.querySelector('.create-event-advanced-title-h2').textContent = conferenceTitle;
      document.querySelector('.create-event-advanced-location-h4').textContent = location;
      document.querySelector('.create-event-advanced-time-h4').textContent = `${startDate} - ${endDate}`;
    saveButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const maxNumOfSubmissions = document.getElementById('max-num-of-submissions').value;
      const abstractOption = document.querySelector('input[name="abstractOption"]:checked');
      const posterFile = document.getElementById('formFile').files[0];
  
      let errorMessages = [];
  
      if (!maxNumOfSubmissions) {
        errorMessages.push("Maximum number of submissions is required.");
      }
  
      if (!abstractOption) {
        errorMessages.push("Please select if authors have to submit abstracts.");
      }
  
      if (!posterFile) {
        errorMessages.push("Please upload the poster for your conference.");
      }
  
      if (errorMessages.length > 0) {
        alert("Please fix the following errors:\n" + errorMessages.join("\n"));
      } else {
        // Save form values to local storage (excluding the poster)
        localStorage.setItem('maxNumOfSubmissions', maxNumOfSubmissions);
        localStorage.setItem('abstractOption', abstractOption.value);
  
        if (posterFile) {
          const reader = new FileReader();
          reader.onload = function(e) {
            localStorage.setItem('posterFile', e.target.result);
            alert('Form data saved successfully!');
            window.location.href = "./create-event-review.html";
          };
          reader.readAsDataURL(posterFile);
        } else {
          alert('Form data saved successfully!');
          window.location.href = "./create-event-review.html";
        }
      }
    });
  });
document.querySelector('.create-event-advanced-back-button').addEventListener('click', async () => {
      window.location.href="../create-event/create-event-edit.html"
});
  