module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "conectatrade",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


// module.exports = {
//   HOST: "mysql.conectatradesys.com.br",
//   USER: "conectatradesy01",
//   PASSWORD: "V3l0c1d4d3",
//   DB: "conectatradesy01",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
