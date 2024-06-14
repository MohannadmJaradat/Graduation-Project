document.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        window.location.href = '../Login/login.html';
        return; // Exit if there's no token
      }
  
      await loadData(token); // Pass the token to loadData
    } catch (error) {
      console.error('Error checking token:', error);
    }
  
    document.getElementById('save').addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      
      const title = localStorage.getItem('create-title');
      const shortName = localStorage.getItem('create-short');
      const startDate = localStorage.getItem('create-start-date');
      const endDate = localStorage.getItem('create-end-date');
      const location = localStorage.getItem('create-location');
      const description = localStorage.getItem('create-description');
      const confield = localStorage.getItem('create-category');
      const maxNumSub = localStorage.getItem('max-num');
      const isAbstracted = localStorage.getItem('enable-abstracts') === 'true';
      const token = localStorage.getItem('token');
      
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('shortName', shortName);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('maxNumSub', maxNumSub);
        formData.append('isAbstracted', isAbstracted);
        formData.append('category', confield);
        // Assuming you have a file input with id 'poster' for the conference poster
        const posterInput = document.getElementById('poster');
        if (posterInput && posterInput.files.length > 0) {
          formData.append('poster', posterInput.files[0]);
        }
        
        const response = await fetch('http://localhost:3000/conference/create-conference', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Failed to create conference');
        }
  
        const result = await response.json();
        localStorage.setItem('conId', result.conferenceId);
        alert(result.conferenceId)
        window.location.href="../manager/manager.html"
        console.log('Conference created:', result);
  
        // Optionally, you can redirect to another page after successful submission
        // window.location.href = 'path/to/success/page.html';
  
      } catch (error) {
        console.error('Error creating conference:', error);
      }
    });
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
  
      let title = window.localStorage.getItem('create-title') || 'Event Title';
      let location = window.localStorage.getItem('create-location') || 'Location';
      let startDate = window.localStorage.getItem('create-start-date') || 'Start Date';
      let endDate = window.localStorage.getItem('create-end-date') || 'End Date';
      let desc = window.localStorage.getItem('create-description') || 'Conference Description';
      let host = window.localStorage.getItem('create-host') || 'Host Name';
      let shortDescription = window.localStorage.getItem('create-short') || 'Short Description';
      let category = window.localStorage.getItem('create-category') || 'Category';
      let maxNum = window.localStorage.getItem('max-num') || 'Maximum Number';
      let enableAbstracts = window.localStorage.getItem('enable-abstracts') === 'true' ? 'Yes' : 'No';
  
      document.querySelector('.create-event-advanced-title-h2').textContent = title;
      document.querySelector('.create-event-advanced-location-h4').textContent = location;
      document.querySelector('.create-event-advanced-time-h4').textContent = `${startDate} - ${endDate}`;
  
      document.querySelector('.main-input-group-div h1').textContent = title;
      document.querySelector('.main-input-group-div p.date').textContent = `${startDate} - ${endDate}`;
      document.querySelector('.main-input-group-div p.location').textContent = location;
      document.querySelector('.main-input-group-div p.host').textContent = userData.fullName;
      document.querySelector('.main-input-group-div p.description').textContent = desc;
      document.querySelector('.main-input-group-div p.short-description').textContent = shortDescription;
      document.querySelector('.main-input-group-div p.category').textContent = category;
      document.querySelector('.main-input-group-div p.max-num').textContent = maxNum;
      document.querySelector('.main-input-group-div p.enable-abstracts').textContent = enableAbstracts;
  
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  