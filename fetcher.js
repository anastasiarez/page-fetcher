/**
Implement a node app
* It should take two command line arguments:
* a URL
* a local file path

It should download the resource at the URL to the local path on your machine. Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

1) You need to make an http request and wait for the response.
2) After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.
3) When you're trying to control the order of asynchronous operations, you can use nested callbacks.
4) Get the file size: 1 character is equal to 1 byte.

Install and use the request library to make the HTTP request
Use Node's fs (file system) module to write the file
Use the callback based approach we've been learning so far
Do not use the pipe function & writeFileSync

INPUT / OUTPUT:
> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
 */

// The request module is a popular third-party module used for making HTTP requests. It simplifies the process of sending HTTP requests and handling responses. It provides a higher-level API with convenient methods for making GET, POST, PUT, DELETE, and other types of HTTP requests. The request module also supports features like URL encoding, headers, cookies, and response handling.

//This line imports the request module/library in Node.js. The request module is commonly used for making HTTP requests in Node.js. 
// This line imports the fs module/library in Node.js. The fs module provides functionality for interacting with the file system. 

const request = require('request');
const fs = require('fs');

// Get command line arguments
// first element is a the absolute path of the Node.js executable. Second is our url and third is file path where to save data. Node will create a file, you just need to give it a name and format. ./ means that it will be saved to the same directory

const url = process.argv[2];
const filePath = process.argv[3];

// Validate command line argumets

if (!url || !filePath) {
  console.log("Please enter in this order: node fileName.js url filePath");
  process.exit(1);

  // This indicates an error or failure condition. A non-zero status code, such as 1, is often used to indicate that the process exited due to an error.
}

// Make the HTTP request
//request.get(url, callback): This method is used to send an HTTP GET request to the specified url. It retrieves the content of the resource at the given URL. The callback function is executed when the request is completed, and it receives three parameters: error, response, and body
// response contains the response object returned by the server. It provides information about the response, such as the status code, headers, etc.
// body: This parameter contains the body of the HTTP response returned by the server. It represents the content of the response, usually in the form of a string. 

request.get(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  //After making the HTTP request using request.get, the callback function is called with three parameters: error, response, and body. By accessing response.statusCode, you can check the status code of the response. 200 - everything is OK

  //console.error is a method in Node.js used to display error messages in the console. It is similar to console.log but is specifically designed for printing error messages.

  if (response.statusCode !== 200) {
    console.error('Status:', response.statusCode);
    process.exit(1);
  }

  // Write the response data to the file
  //.writeFile method is used to write data to a file in the local filesystem. 
  // It takes several parameters: file: The path to the file where the data will be written.
  //body: The content to be written to the file. In this case, it is the body parameter received in the callback of the request.get function, which contains the response body (content of the resource).
  //(err) => { ... }: This is the callback function that will be executed after the write operation is completed. 

  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.log('Error writing file:', err);
      process.exit(1);
    }
    console.log('Data saved to file:', filePath);
  });
});
