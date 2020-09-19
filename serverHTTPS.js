const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
const http = require('http');
const https = require('https');

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/archive/www.conectatradesys.com.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/www.conectatradesys.com.br/cert.pem')
};

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
  res.json({ message: "Welcome to application." });
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
require('./app/routes/buscaCep.routes')(app);
require('./app/routes/buscaCnpj.routes')(app);
require('./app/routes/upload.routes')(app);

// set port, listen for requests
const PORT = 21061;
/*
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/
//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(PORT);

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
