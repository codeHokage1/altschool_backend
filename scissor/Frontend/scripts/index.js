// Get the modal
var regModal = document.getElementById("reg-modal");
var loginModal = document.getElementById("login-modal");

// Get the button that opens the modal
var regBtn = document.getElementById("reg-btn");
var loginBtn = document.getElementById("login-btn");

// Get the <span> element that closes the modal
var closeReg = document.getElementById("close-reg");
var closeLogin = document.getElementById("close-login");

// When the user clicks on the button, open the modal
regBtn.onclick = function () {
	regModal.style.display = "block";
};
loginBtn.onclick = function () {
	loginModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeReg.onclick = function () {
	regModal.style.display = "none";
};
closeLogin.onclick = function () {
	loginModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == regModal) {
		regModal.style.display = "none";
	} else if (event.target == loginModal) {
      loginModal.style.display = "none";
   }
};
