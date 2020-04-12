const express = require('express');
const app = express();

const PORT = 3000;

// Di sini kita mendefinisikan penggunaan endpoint '/'
// yang akan meng-handle HTTP GET method
app.get('/', function HTTPGetRootHandler(req, res) {
  res.send("Hello world");
});


app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});