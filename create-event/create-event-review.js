document.addEventListener('DOMContentLoaded', async () => {
  try {
      const token = localStorage.getItem('token');

      if (!token) {
          window.location.href = '../Login/login.html'; 
      }
  } catch (error) {
      console.error('Error checking token:', error);
  }

  loadData();
});

function loadData() {
  let title = window.localStorage.getItem('create-title') || 'Event Title';
  let location = window.localStorage.getItem('create-location') || 'Location';
  let startDate = window.localStorage.getItem('create-start-date') || 'Start Date';
  let endDate = window.localStorage.getItem('create-end-date') || 'End Date';
  let desc = window.localStorage.getItem('create-description') || 'Conference Description';
  let host = window.localStorage.getItem('create-host') || 'Host Name';
  let poster = window.localStorage.getItem('poster') || '../assets/conference banner5.jpg';

  document.querySelector('.create-event-advanced-title-h2').textContent = title;
  document.querySelector('.create-event-advanced-location-h4').textContent = location;
  document.querySelector('.create-event-advanced-time-h4').textContent = `${startDate} - ${endDate}`;

  let bannerImages = document.querySelectorAll('.main-input-group-div img');
  bannerImages.forEach(img => img.src = poster);

  document.querySelector('.main-input-group-div h1').textContent = title;
  document.querySelector('.main-input-group-div p.date').textContent = `${startDate} - ${endDate}`;
  document.querySelector('.main-input-group-div p.location').textContent = location;
  document.querySelector('.main-input-group-div p.host').textContent = host;
  document.querySelector('.main-input-group-div p.description').textContent = desc;
}
