const path = require("path");
const os = require("os");
const process = require("process");
const fs = require("fs");

// console.log(os.userInfo());
// console.log(path.resolve());
// console.log(process.env);

// const dir = fs.mkdir(path.join(__dirname, "files"), err => {
//     if (err) {
// 		console.log(err.message);
// 		return;
// 	}
// 	console.log("Folder created succesfully");
// });
// console.log(dir)

// const filePath = path.join(__dirname, "files", "file1.txt");
// fs.writeFile(filePath, "Hello there!", (err) => {
// 	if (err) {
// 		console.log(err.message);
// 		return;
// 	}
// 	console.log("File written succesfully");
// });
fs.appendFile(
    path.join(__dirname, "files", "file1.txt"),
    '\nHello there again!',
    (err) => {
        if(err){
            console.log(err.message);
            return;
        }
        console.log('Append successful');
    }
)

fs.readFile(
	path.join(__dirname, "files", "file1.txt"),
	"utf-8",
	(err, data) => {
        if(err){
            console.log(err.message);
            return;
        }
        console.log(data);
    }
);
