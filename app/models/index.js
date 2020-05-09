const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.neighborhood = require("./neighborhood.model.js")(sequelize, Sequelize);
db.accreditation = require("./accreditation.model.js")(sequelize, Sequelize);
db.status = require("./accreditation_status.model.js")(sequelize, Sequelize);
db.company_person_registration = require("./company_person_registration.model.js")(sequelize, Sequelize);
db.user_roles = require("./user_roles.model.js")(sequelize, Sequelize);

// Relacionamento de usuário com roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


// Relacionamento de dados person/company na tabela de credenciamento
db.accreditation.belongsTo(db.user, {
  foreignKey: 'consultorId',
});
db.accreditation.belongsTo(db.company_person_registration, {
  foreignKey: 'companyPersonRegistrationId',
});
db.accreditation.belongsTo(db.status, {
  foreignKey: 'accreditationsStatusId',
});

db.ROLES = ["consultor", "backoffice", "admin", "cliente"];

module.exports = db;
