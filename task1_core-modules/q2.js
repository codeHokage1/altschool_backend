// Using the FS module
const fs = require("fs");
const path = require("path");

// Question 1: Create directory/folder named: “Students”
const dirPath = path.join(__dirname, "Students");

if (fs.existsSync(dirPath)) {
	console.log("Directory already exists");
} else {
	fs.mkdir(dirPath, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('"Students" directory successfully created.');
	});
}

// Question 2: In the Students directory, create a file named user.js
let userFilePath = path.join(__dirname, "Students", "user.js");
if (fs.existsSync(userFilePath)) {
	console.log("File already exists");
} else {
	fs.writeFile(userFilePath, "", (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('"user.js" file successfully created');
	});
}

// Question 3: Update the Students directory to “Names”
const newDirPath = path.join(__dirname, "Names");
if (fs.existsSync(newDirPath)) {
	console.log("Directory already exists");
} else {
	fs.rename(dirPath, newDirPath, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('"Students" directory successfully renamed to "Names"');
	});
}

// Question 4: Add your name as content to the file user.js
userFilePath = path.join(__dirname, "Names", "user.js");
const content = "Sodiq Farhan";
fs.appendFile(userFilePath, content, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Name successfully added to file");
});

// Question 5: Update the file and add your age, sex, nationality, phone number and any other information about yourself
const update = `
\nAge: 23
\nSex: Male
\nNationality: Nigerian
\nPhone Number: +2347013578199
\nFav. Sport: Basketball
`;
fs.appendFile(userFilePath, update, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("File successfully updated");
});

// Question 6: Update the file user.js to {your_name}.js eg daniel_adesoji.js
const newUserFilePath = path.join(__dirname, "Names", "sodiq_farhan.js");
fs.rename(userFilePath, newUserFilePath, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("File successfully renamed");
})

// Question 7: Read the contents from {your_name}.js. User fs.open or fs.readFile
fs.readFile(newUserFilePath, "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(data);
});

// Question 8: Delete the file {your_name}.js
fs.rm(newUserFilePath, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("File successfully deleted");
})

// Question 9: Delete the directory “Names”
fs.rmdir(newDirPath, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Directory successfully deleted");
})

