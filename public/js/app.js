console.log('Client side javascript file is loaded!');


    
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adresse = search.value;
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = '';
    fetch('http://localhost:2000/weather?adress='+ adresse)
    .then((response) => {
      response.json()
      .then((data) => {
         if(data.error){
             messageOne.textContent='';
            messageTwo.textContent = data.error;
         } else {
             //console.log(data.title);
             //console.log(data.location);
             //console.log(data.forecast);
             messageOne.textContent = data.location;
             messageTwo.textContent =`Title : ${data.title} \nLocation: ${data.forecast}`;
         }
      }); 
    });  
});