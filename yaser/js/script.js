
// Get today's date
var today = new Date();
// Set the date to 2 December 2023
today = new Date(2023, 11, 2);
// Define days of the week and months
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Get the day, month, and year
var dayOfWeek = daysOfWeek[today.getDay()];
var dayOfMonth = today.getDate();
var month = months[today.getMonth()];
var year = today.getFullYear();
// Display the date
var dateDisplay = document.getElementById("dateDisplay");
dateDisplay.textContent = dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
