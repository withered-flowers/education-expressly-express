## Table of Content
1. [Recap npm](#recap-npm)
1. [Recap express](#recap-express)
1. [How to expressing express](#how-to-expressing-express)
1. [Optional: How to use nodemon](#optional-how-to-use-nodemon)
1. [How to use req.params and req.query](#how-to-use-req.params-and-req.query)
1. [Reference](#reference)

## Recap npm

npm adalah  **node package manager**, tools pada nodejs untuk memasang *package* 
atau *extension* atau *modules* tambahan pada nodejs.

Cara menggunakan npm:
* Buka terminal / cmd / ps
* Masuk ke dalam folder project yang akan menggunakan nodejs
* Ketik `npm init` (atau `npm init -y` bila ingin instan)
* Masukkan data yang berhubungan dengan `author`
* Lihat pada folder, akan terbentuk file baru dengan nama `package.json`
* Mulai melakukan instalasi package tambahan dengan mengetik   
  `npm install <nama_package>` (bisa menerima satu atau lebih package)   
  e.g.: `npm install express`
* Apabila akan memasang package yang hanya digunakan untuk development saja 
  gunakan `npm install --save-dev <nama_package>`  
  e.g.: `npm install --save-dev nodemon`
* Lihat pada folder, akan terbentuk folder `node_modules` dan file 
  `package_lock.json`
  * `node_modules` adalah tempat di mana package tambahan ditaruh
  * `package_lock.json` adalah file untuk menjaga konsistensi versi file yang 
    digunakan

Pada pembelajaran ini, module tambahan yang digunakan adalah `nodemon` dan
`express`

## Recap express

Express merupakan sebuah `framework` pada nodejs yang sangat populer dan 
digunakan untuk membuat aplikasi web (mirip dengan `sinatra` pada `ruby`)

Cara membuat sebuah aplikasi web sederhana dengan express  
(Pada pembelajaran ini kita tidak menggunakan `express-generator`)

1. Pasang module `express` dengan mengetik `npm install express`
1. Buat sebuah file utama (mis: `app.js`)
1. Buat kode untuk menjalankan express seperti di [Code 1](#code-1)
1. Jalankan dengan mengetik `node app.js`

#### Code 1
```javascript
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
```

Ketika kita menjalankan kode di atas, pada console akan mengeluarkan output
```
Welcome to express at port 3000
```

Kita bisa membuka aplikasi web yang sudah kita buat  pada browser kesayangan 
kita dengan membuka url `localhost:3000`

Namun ketika kita membuka kode di atas, akan muncul output error
```
Cannot get /
```

Mengapa demikian? Hal ini terjadi karena kita belum mengerti cara pakai express!

## How to *expressing* express
Dalam menggunakan express, kita harus mendefinisikan rute (atau disebut dengan
`endpoint`) yang akan digunakan oleh aplikasi web kita. cara mendefinisikan rute 
pada app ini berhubungan dengan HTTP methods yang akan digunakan, seperti 
`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, dsb. untuk full method yang dapat 
digunakan pada express dapat dilihat di tautan 
[ini](https://expressjs.com/en/4x/api.html#app.METHOD)

Namun yang akan digunakan pada pembelajaran ini adalah HTTP method `GET` saja.

Cara menggunakannya dengan memodifikasi Code 1 dan dapat dilihat pada [Code 2](#code-2)

### Code 2
```javascript
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
```

Kemudian kita akan menjalankan kode di atas dengan me-`refresh` halaman browser
yang digunakan. 

Tapi mengapa kode kita tidak berjalan dan masih mengeluarkan output 
`Cannot GET /` ?

Hal ini terjadi karena kita belum mematikan aplikasi web yang dibuat, sehingga
masih menggunakan kode yang lama. Untuk menggunakan kode yang baru ini, kita 
harus mematikan aplikasi kita terlebih dahulu (`CTRL + C`) pada terminal, lalu
menjalankan kode nya ulang (`node app.js`) lagi. 

Cukup menyebalkan bukan ?

Sehingga kita akan memasang module tambahan supaya aplikasi bisa `auto restart` 
pada saat pengembangan aplikasi web ini.

## Optional: How to use nodemon
Nah, untuk bisa mendapatkan fitur `auto restart`, kita akan memasang module 
tambahan yang bernama `nodemon`.

Untuk cara memasang nodemon ini ada 2 cara, yaitu dengan menggunakan 
`global package npm` dan dengan menggunakan `npx`, pada pembelajaran kali ini
kita akan menggunakan cara `npx`

Cara memasang module `nodemon` dan menggunakan `npx`:
1. Pasang module `nodemon` dengan `npm install --save-dev nodemon`
2. Jalankan dengan `npx nodemon <nama_file_js>` e.g. `npx nodemon app.js`

Setelah menjalankan ini maka setiap perubahan pada file `app.js`, aplikasi web 
akan langsung `auto restart`, sungguh memudahkan development bukan ?

## Basic Routing
Pada express, kita bebas menentukan `endpoint` yang kita inginkan dengan nama 
tertentu pada aplikasi web yan akan kita gunakan, mari kita memodifikasi 
Code 2 menjadi [Code 3](#code-3) di bawah ini

### Code 3
```javascript
const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function HTTPGetRootHandler(req, res) {
  res.send("Hello world");
});

// Selain define endpoint users,
// Kita juga bisa mengkombinasikan untuk membaca file json di sini
// dan menampilkannya ke dalam browser kita, yay !
app.get('/users', function HTTPGetUsersHandler(req, res) {
  fs.readFile('./0-generated.json', 'utf8', function readHandler(err, data) {
    if(err) {
      res.send(err);
    }

    res.send(JSON.parse(data));
  });
});

// Disini ceritanya kita menginginkan inputan id dari browser untuk kita
// proses / tampilkan kembali
app.get('/users/id', function HTTPGetUsersInputHandler(req, res) {
  res.send(id);
});

app.listen(3000, () => {
  console.log(`Welcome to express at port ${PORT}`);
});
```

Pada kode di atas, selain kita dapat mendefinisikan multiple `endpoint` sesuai
dengan keinginan kita, kita juga dapat mendefinisikan nested `endpoint` seperti
`localhost:3000/users/id` di atas.

Namun kode di atas, masih kurang benar, karena input `id` yang kita inginkan 
tidak dapat dicetak pada browser. output pada `localhost:3000/users/id` di 
browser adalah
```
ReferenceError: id is not defined
```

Mengapa demikian?

Karena kita belum menggunakan inputan tersebut di dalam express ini !

## How to use req.params and req.query
Cara untuk menghandle "input" pada browser sebagaimana yang dimaksud sebelumnya 
adalah dengan menggunakan `req.params` dan `req.query`

Perbedaannya adalah dari cara kita menuliskan inputnya pada url di browser.

Contoh URL dan penggunaan yang tepat:  
(`[]` menandakan inputan yang ingin diterima)
* `localhost/users/[1]` => menggunakan req.params
* `localhost/users?[search=1]` => menggunakan req.query

Untuk memperdalam lebih lanjut, kita akan memodifikasi Code 3 menjadi 
[Code 4](#code-4) di bawah ini.

### Code 4
```javascript
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
```

*Lah*, apa gunanya kalau begitu `req.query` ataupun `req.params` ?  
kalau begini saya pakai `req.query` atau `req.params` saja semuanya, *toh* sama 
saja !

Letak perbedaan dari `req.query` dan `req.params` selain dari cara menggunakan, 
adalah dari **kegunaan**-nya.

BEST PRACTICE:
* `req.params` umumnya digunakan mengambil / memberikan info dari sumber yang 
  diinginkan. misalnya dalam hal di atas, adalah mengenai informasi `user`
* `req.query` umumnya digunakan untuk melakukan `sorting` / `filter` dari data 
  yang ada sesuai dengan keinginan user
* Apabila dalam endpoint / query memiliki 2 kata e.g. `belum bosen`, maka dalam 
  penulisan endpointnya dipisah dengan *hyphen* / *dash* `-` menjadi 
  `belum-bosen`.

WARNING:
* Dalam menuliskan rute pada express, posisi menentukan prestasi, jadi jangan 
  sampai menuliskan rute yang bertentangan pada urutan yang salah yah !

## Reference
* [About package-lock.json - Coinmonks (Medium)](https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8)
* [Express JS Documentation](https://expressjs.com/en/api.html#express)