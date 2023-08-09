// Write a program to do the following using, path, os and process modules
const process = require('process');
const path = require('path');
const os = require('os');

// Question 1: Print out the current working directory
console.log({cwd: process.cwd()});

// Question 2: Print out the separator of a given file path
console.log({seperator: path.sep});

// Question 3: Print out the extension name of a file path
console.log({extname: path.extname(__filename)});

// Question 4: Print out the process id of the current running process
console.log({processId: process.pid});

// Question 5: Print out the user information of the os
console.log({userInfo: os.userInfo()});

// Question 6: Print out the platform of an operating system
console.log({platform: os.platform()});