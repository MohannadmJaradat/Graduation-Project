document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-btn');
  
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
  