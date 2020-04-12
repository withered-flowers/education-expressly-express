const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function HTTPGetRootHandler(req, res) {
  res.send("Hello world");
});

// Di endpoint ini kita akan menggunakan req.query
app.get('/users', function HTTPGetUsersHandler(req, res) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      res.send(err);
    }

    data = JSON.parse(data);
    
    // Ingat data dari req.query selalu berbentuk string
    if(req.query.reversed === 'true') {
      data.sort((a,b) => b.id - a.id);
    }

    res.send(data);
  });
});


// Di endpoint ini kita akan menggunakan req.params
app.get('/users/:id', function HTTPGetUsersInputHandler(req, res) {
  // res.send(req.params.id);

  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      res.send(err);
    }

    data = JSON.parse(data);
    data = data.find(element => element.id === parseInt(req.params.id));

    res.send(data);
  });
});

// Di endpoint ini kita akan mengkombinasikan req.params dan req.query
app.get('/users/:id/companies', function HTTPGetUserCompaniesHandler(req, res) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    let result = null;

    if(err) {
      res.send(err);
    }

    result = JSON.parse(data);
    result = result.find(element => element.id === parseInt(req.params.id));

    if(req.query.positions != null) {
      result = result.companies[req.query.positions];
    }
    else {
      result = result.companies;
    }

    res.send(result);
  });
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});