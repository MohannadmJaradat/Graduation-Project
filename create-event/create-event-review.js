document.addEventListener('DOMContentLoaded', () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
        window.location.href = '../Login/login.html';
    }
    function populateEventDetails() {
      const conferenceTitle = localStorage.getItem('conferenceTitle') || 'Event Title';
      const location = localStorage.getItem('location') || 'Location';
      const startDate = localStorage.getItem('startDate') || 'Start Date';
      const endDate = localStorage.getItem('endDate') || 'End Date';
  
      document.querySelector('.create-event-advanced-title-h2').textContent = conferenceTitle;
      document.querySelector('.create-event-advanced-location-h4').textContent = location;
      document.querySelector('.create-event-advanced-time-h4').textContent = `${startDate} - ${endDate}`;
  
      document.querySelector('.main-input-group-div h1').textContent = conferenceTitle;
      document.querySelector('.date').textContent = `${startDate} - ${endDate}`;
      document.querySelector('.location').textContent = location;
      document.querySelector('.description').textContent = localStorage.getItem('conferenceDescription') || 'Conference Description';
    }
  
    function displayPosterImage() {
      const posterImageSrc = localStorage.getItem('posterFile');
      if (posterImageSrc) {
        const posterImages = document.querySelectorAll('.main-input-group-div img, .main-input-group-div img.mb-5');
        posterImages.forEach(image => image.src = posterImageSrc);
      }
    }
  
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
        console.log('User data:', userData);
        document.querySelector('.host').textContent = userData.fullName;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  
    if (token) {
      loadData(token);
    } else {
      console.error('No token found in localStorage');
    }
  
    populateEventDetails();
    displayPosterImage();
  
    const saveButton = document.getElementById('save');
    if (!saveButton) {
      console.error('Save button not found');
      return;
    }
  
    saveButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const conferenceTitle = localStorage.getItem('conferenceTitle');
      const conferenceShortName = localStorage.getItem('conferenceShortName');
      const conferenceCategory = localStorage.getItem('conferenceCategory');
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      const location = localStorage.getItem('location');
      const conferenceDescription = localStorage.getItem('conferenceDescription');
      const maxNumOfSubmissions = localStorage.getItem('maxNumOfSubmissions');
      const abstractOption = localStorage.getItem('abstractOption') === 'yes';
      const posterFileDataUrl = localStorage.getItem('posterFile');
  
      // Convert data URL back to a File object
      function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
      }
  
      const posterFile = dataURLtoFile(posterFileDataUrl, 'poster.png');
  
      const formData = new FormData();
      formData.append('title', conferenceTitle);
      formData.append('shortName', conferenceShortName);
      formData.append('category', conferenceCategory);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('location', location);
      formData.append('description', conferenceDescription);
      formData.append('maxNumSub', maxNumOfSubmissions);
      formData.append('isAbstracted', abstractOption);
      formData.append('poster', posterFile);
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/conference/create-conference', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });
  
        const result = await response.json();
        
        if (response.ok) {
          alert('Conference created successfully.');

          window.location.href = "../my-conferences/my-conferences.html";
        } else {
          throw new Error(result.error || 'Failed to create conference.');
        }
  
      } catch (error) {
        console.error('Error creating conference:', error);
        alert('Error creating conference: ' + error.message);
      }
    });
  });
  document.querySelector('.create-event-advanced-back-button').addEventListener('click', async () => {
        window.location.href="../create-event/create-event-advanced.html"
  });
  