const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");

const app = express();

var corsOptions = {
  origin: ""
};

app.use(morgan('dev'));

app.use(cors());

// parse requests of content-type - application/json
const configBodyParser = {
  json: { limit: '150mb', extended: true },
  urlencoded: { limit: '150mb', extended: true }
};
app.use(bodyParser.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  const now = moment().format("DD-MM-yyyy HH-mm");
  var data = new Date();

  var dia = data.getDate();           // 1-31
  var mes = data.getMonth();          // 0-11 (zero=janeiro)
  var ano4 = data.getFullYear();       // 4 dígitos
  var hora = data.getHours();          // 0-23
  var min = data.getMinutes();        // 0-59
  var seg = data.getSeconds();        // 0-59

  var str_data = dia + '-' + (mes + 1) + '-' + ano4;
  var str_hora = hora + ':' + min + ':' + seg;

  console.log('Hoje é ' + str_data + ' às ' + str_hora);
  res.json({ message: "Welcome to application.--->" + now });
});
app.use('/enviadas', express.static(__dirname + '/uploads'));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/neighborhood.routes')(app);
require('./app/routes/status.routes')(app);
require('./app/routes/accreditation.routes')(app);
require('./app/routes/company_person_registration.routes')(app);
require('./app/routes/visits.routes')(app);
require('./app/routes/revisit_client.routes')(app);
require('./app/routes/buscaCep.routes')(app);
require('./app/routes/buscaCnpj.routes')(app);
require('./app/routes/upload.routes')(app);

// set port, listen for requests
const PORT = 21071;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "consultor"
  });

  Role.create({
    id: 2,
    name: "backoffice"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
  Role.create({
    id: 4,
    name: "cliente"
  });
}