'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id' });



/**
 * ! hasMany :  1: N 의 관계    user가 1 이고 , comment가 N이다.
 * ! 한명의 유저가 여러개의 코멘트를 달 수 있다.   그러나 하나의 코멘트는 여러개의 유저를 가질 수는 없다. (여러개의 코멘트가 한명의 유저!)
 * ! belongsTo 
 */


module.exports = db;
