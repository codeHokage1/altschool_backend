const token = localStorage.getItem("token");
// console.log(token);

// if(!token){
//    window.location.href = "index.html";
// }

const copyToClipboard = document.getElementsByClassName("copy-to-clipboard");
console.log(copyToClipboard);

for (let i = 0; i < copyToClipboard.length; i++) {
	copyToClipboard[i].addEventListener("click", function () {
		const copyText = document.getElementById(`link-to-copy`);
		console.log(copyText.innerHTML);
		const el = document.createElement("textarea");
		el.style.display = "none";
		el.value = copyText.innerHTML;
		document.body.appendChild(el);
		el.select();

		// copyText.select();
		el.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.innerHTML);
	});
}
