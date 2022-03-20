const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("news", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        }
    });
};