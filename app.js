const MongoDB = require('./MongoDB/mongoDB.js');

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const request = require('request');

var currentBikes;
var app = express();
  request({
    url: `http://api.citybik.es/bicing.json`,
    json: true
    },
    (error, response, body) => {
      if (error){
        console.log('unable to connect ');
      }
      else if (response.statusCode === 400){
        console.log('unable to fetch data');
      }
      else if (response.statusCode === 200){
        currentBikes = body;
        for (var i= 0; i<currentBikes.length; i++){
          console.log(JSON.stringify(currentBikes[i],undefined,2));
          MongoDB.insertOne(currentBikes[i].bikes,currentBikes[i].id,currentBikes[i].free,currentBikes[i].lat,currentBikes[i].lng);
        }
      }

    });
    app.get('/',(req,res) =>{

    });
app.listen(3000, () => {
  console.log('server up in port 3000');
});

// It should be something similar to send the request every 1hour but it should be async.
// while(){
//   setTimeout(()=>{
//     request({
//       url: `http://api.citybik.es/bicing.json`,
//       json: true
//       },
//       (error, response, body) => {
//         if (error){
//           console.log('unable to connect ');
//         }
//         else if (response.statusCode === 400){
//           console.log('unable to fetch data');
//         }
//         else if (response.statusCode === 200){
//           currentBikes = body;
//           for (var i= 0; i<currentBikes.length; i++){
//             console.log(JSON.stringify(currentBikes[i],undefined,2));
//             MongoDB.insertOne(currentBikes[i].bikes,currentBikes[i].id,currentBikes[i].free,currentBikes[i].lat,currentBikes[i].lng);
//           }
//         }
//
//       });
// }, 3600000);
// }

//To get the closer station I'd create another collection to save the stations the first time. Then calculate the shorter distance beetween
//the given location and the stations showing the closer one.
