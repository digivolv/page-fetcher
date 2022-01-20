const fs = require("fs");
const existsSync = fs.existsSync;

const request = require("request");

const input = process.argv.slice(2);
const localPath = input.slice(" ")[1];
const inputWebsite = input.slice(" ")[0];

request(inputWebsite, (error, response, body) => {
  if (error) {
    console.log("error:", error); // Print the error if one occurred
    return;
  }
  if (response.statusCode !== 200) {
    console.log("The issue is HTTP status code:", response.statusCode);
    return;
  }

  fs.writeFile(localPath, body, (err) => {
    if (err) {
      console.log("Failed to save data at file path", err);
      return;
    }
    if (existsSync(localPath)) {
      console.log("The path exists");
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
  });
});
