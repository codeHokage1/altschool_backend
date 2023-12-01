const username = window.location.search.split("=")[1];
console.log(username);

const socket = io({
   query: {
      username,
      userType: "driver",
      userId: localStorage.getItem("id")
   }
});