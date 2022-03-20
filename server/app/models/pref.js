const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("pref", {
        email: {
            type: Sequelize.STRING
        },
        source: {
            type: Sequelize.STRING
        },
        likedart: {
            type: Sequelize.STRING
        },
        savedart: {
            type: Sequelize.STRING
        }
    });
};