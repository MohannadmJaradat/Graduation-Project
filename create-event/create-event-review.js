document.addEventListener('DOMContentLoaded', () => {
  // Function to populate the HTML with data from localStorage
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

  // Display the poster image if available
  function displayPosterImage() {
      const posterImageSrc = localStorage.getItem('posterFile');
      if (posterImageSrc) {
          const posterImages = document.querySelectorAll('.main-input-group-div img, .main-input-group-div img.mb-5');
          posterImages.forEach(image => image.src = posterImageSrc);
      }
  }

  // Function to load user data
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
          console.log('User data:', userData); // Debug log
          document.querySelector('.host').textContent = userData.fullName;
      } catch (error) {
          console.error('Error loading data:', error);
      }
  }

  // Load the user data
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
      loadData(token);
  } else {
      console.error('No token found in localStorage');
  }

  // Populate event details and display the poster image
  populateEventDetails();
  displayPosterImage();

  // Add event listener for the Save & Continue button
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Retrieve form values from localStorage
      const conferenceTitle = localStorage.getItem('conferenceTitle');
      const conferenceShortName = localStorage.getItem('conferenceShortName');
      const conferenceCategory = localStorage.getItem('conferenceCategory');
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      const location = localStorage.getItem('location');
      const conferenceDescription = localStorage.getItem('conferenceDescription');
      const maxNumOfSubmissions = localStorage.getItem('maxNumOfSubmissions');
      const abstractOption = localStorage.getItem('abstractOption') === 'yes';
      const posterFile = localStorage.getItem('posterFile');

      // Construct the payload for the API
      const payload = {
          title: conferenceTitle,
          shortName: conferenceShortName,
          description: conferenceDescription,
          location: location,
          startDate: startDate,
          endDate: endDate,
          maxNumSub: maxNumOfSubmissions,
          isAbstracted: abstractOption,
          category: conferenceCategory,
          poster: posterFile, // Include the poster file data
      };

      // Create a FormData object for the file upload
      const formData = new FormData();
      for (const key in payload) {
          formData.append(key, payload[key]);
      }

      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
          // Fetch the API to create a new conference
          const response = await fetch('http://localhost:3000/conference/create-conference', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              body: formData, // Use FormData object for the request body
          });

          const result = await response.json();

          if (response.ok) {
              alert('Conference created successfully.');
              window.location.href="../manager/manager.html"
          } else {
              throw new Error(result.error || 'Failed to create conference.');
          }

      } catch (error) {
          console.error('Error creating conference:', error);
          alert('Error creating conference: ' + error.message);
      }
  });
});
