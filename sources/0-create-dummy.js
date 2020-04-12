const faker = require('faker');
const fs = require('fs');

// Gunakan 500000 untuk mendapatkan 113 MB
// Gunakan 1000000 untuk mendapatkan 226 MB
const DATASIZE = 100;
let arrData = [];


for(let ctr = 0; ctr < DATASIZE; ctr++) {
  let name = faker.name.findName();
  let email = faker.internet.email();
  let companies = [
    {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      zipCOde: faker.address.zipCode()
    },
    {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      zipCOde: faker.address.zipCode()
    }
  ];

  objPerson = {
    id: ctr+1,
    name,
    email,
    companies
  }

  arrData.push(objPerson);
}

fs.writeFileSync('./0-generated.json', JSON.stringify(arrData,null,2));