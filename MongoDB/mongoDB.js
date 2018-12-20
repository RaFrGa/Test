const {MongoClient,ObjetctID} =require('mongodb');

var insertOne = (bikes,id,free,lat,lng) => {
  MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
      bikes: bikes,
      identifier: id,
      free: free,
      lat: lat,
      lng: lng

    }, (err,result) =>{
      if (err){
        return console.log('Unable to insert todo', err);
      }

      console.log(JSON.stringify(result.ops, undefined,2));
    })
    db.collection("customers").find().sort({id: -1}).toArray(function(err, result) {
      if (err) throw err;
    });
    db.close();
  });
}

var getData = ()=>{
  MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db.collection('Todos').find().toArray().then((docs) =>{
      return JSON.stringify(docs, undefined,2);
      db.close();

    },(err) =>{
      console.log('Unable to fetch data', err);
    });

  });
}

module.exports.insertOne = insertOne;
module.exports.getData = getData;
