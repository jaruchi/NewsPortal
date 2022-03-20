const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
};