const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function HTTPGetRootHandler(request, response) {
  response.send("Hello world");
});

// Di endpoint ini kita akan menggunakan req.query
app.get('/users', function HTTPGetUsersHandler(request, response) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      response.send(err);
    }

    data = JSON.parse(data);
    
    // Ingat data dari req.query selalu berbentuk string
    if(request.query.reversed === 'true') {
      data.sort((a,b) => b.id - a.id);
    }

    response.send(data);
  });
});


// Di endpoint ini kita akan menggunakan req.params
app.get('/users/:id', function HTTPGetUsersInputHandler(request, response) {
  // response.send(request.params.id);

  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      response.send(err);
    }

    data = JSON.parse(data);
    data = data.find(element => element.id === parseInt(request.params.id));

    response.send(data);
  });
});

// Di endpoint ini kita akan mengkombinasikan req.params dan req.query
app.get('/users/:id/companies', function HTTPGetUserCompaniesHandler(request, response) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    let result = null;

    if(err) {
      response.send(err);
    }

    result = JSON.parse(data);
    result = result.find(element => element.id === parseInt(request.params.id));

    if(request.query.positions != null) {
      result = result.companies[request.query.positions];
    }
    else {
      result = result.companies;
    }

    response.send(result);
  });
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});