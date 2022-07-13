const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

db.users.hasMany(db.posts);
db.users.hasMany(db.comments);

db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users, {
    // foreignKey : "userId",
    // as: "user"
})
db.comments.belongsTo(db.users, {
    // foreignKey : "userId",
    // as: "user"
})
db.comments.belongsTo(db.posts, {
    // foreignKey : "postId",
    // as: "post"
})


module.exports = db;