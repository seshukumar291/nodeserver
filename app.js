const express = require("express");
const app = express();
const spawn = require("child_process").spawn;
const fs = require('fs');
var cors = require('cors')

app.use(express.static('public'));
app.use(express.static('img'));
app.use(cors());

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//capture images
app.post("/capimages", (req, res) => {

  console.log('cap images');

  //get the arguments from the requet
  let args = req.body.args.split(" ");
  let imageName = args[args.length - 1];

  console.log('args', args);

  let ffmpeg = spawn("ffmpeg", args);

  ffmpeg.stderr.on("data", data => {
    //  res.json({'result' : data.toString("utf8")});
    console.log('data', data.toString("utf8"));
  });

  ffmpeg.stdout.on("data", data => {
    // res.json({'result' : data.toString("utf8")});
    console.log('data', data.toString("utf8"));
  });

  ffmpeg.on("exit", function(code, signal) {
    // res.json({'result':'process exited with code: ' + code});
    console.log('process exited with code: ' + code);
    res.json({image: imageName});
  });


});

// get images
app.get("/getimages", (req, res) => {
  const files = fs.readdirSync('./public/images');
  res.json({'images' : files});
});

//Catch all routes.
app.get("*", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.listen('3000', () => {
    console.log('app started on port 3000');
})