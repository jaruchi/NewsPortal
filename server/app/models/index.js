const Sequelize = require("sequelize");
const dbConfig = require("../config/db");
const news = require("./news");
const user = require("./user");
const pref = require("./pref");

console.log('Do every require creates a new sequilize object??')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

async function dropAndResync() {
    await sequelize.sync({ force: true });
    console.log("Drop and re-sync db.");
}

const db = {
    sequelize,
    news: news(sequelize),
    user: user(sequelize),
    pref: pref(sequelize),
    dropAndResync
};

module.exports = db;

