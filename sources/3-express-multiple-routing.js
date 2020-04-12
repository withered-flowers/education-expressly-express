const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function HTTPGetRootHandler(request, response) {
  response.send("Hello world");
});

// Selain define endpoint users,
// Kita juga bisa mengkombinasikan untuk membaca file json di sini
// dan menampilkannya ke dalam browser kita, yay !
app.get('/users', function HTTPGetUsersHandler(request, response) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      response.send(err);
    }

    response.send(JSON.parse(data));
  });
});

// Disini ceritanya kita menginginkan inputan id dari browser untuk kita
// proses / tampilkan kembali
app.get('/users/id', function HTTPGetUsersInputHandler(request, response) {
  response.send(id);
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});