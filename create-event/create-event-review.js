window.addEventListener("load",loadData)

function loadData(){
  let title =  window.localStorage.getItem('create-title');
  let shortName = window.localStorage.getItem('create-short');
  let startDate = window.localStorage.getItem('create-start-date');
  let endDate = window.localStorage.getItem('create-end-date');
  let country =  window.localStorage.getItem('create-location');
  let desc = window.localStorage.getItem('create-description');
  let category = window.localStorage.getItem('create-category');
  let maxNum = window.localStorage.getItem('max-num');
  let poster = window.localStorage.setItem('poster');
  let enableNames = window.localStorage.setItem('enable-names');
  let enablesAbstracts = window.localStorage.setItem('enable-abstracts');




}