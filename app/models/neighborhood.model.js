module.exports = (sequelize, Sequelize) => {
    const Neighborhood = sequelize.define("neighborhoods", {
        cep: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        }
    });

    return Neighborhood;
};
