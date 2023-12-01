const serverUrl = `http://localhost:${process.env.PORT}`;
const form = document.querySelector('#login-form');

form.addEventListener('submit', (event) => {
   event.preventDefault();
   const username = event.target.elements.username.value;
   const userType = event.target.elements['user-type'].value;

   if(userType === 'customer') {
      fetch(`${serverUrl}/customer?username=${username}`)
   } else if(userType === 'driver') {
      fetch(`${serverUrl}/driver?username=${username}`)
   }
})