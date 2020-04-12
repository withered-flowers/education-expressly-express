const express = require('express');
const app = express();

// Default port aplikasi express
// Port untuk development jangan di bawah 1024, 
// reserved for system usage (well-known ports)
const PORT = 3000;

// app.listen(port, callback)
// digunakan untuk meng-serve aplikasi web yang dibuat pada port tertentu
app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});