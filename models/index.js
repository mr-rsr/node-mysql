import dbconfig from '../config/dbConfig.js'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {    // 1        // 2        // 3
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    pool: {        // 4
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
})

sequelize.authenticate().then(() => {    // 5       
    console.log('Connection has been established successfully.')
}).catch(err => {
    console.error('Unable to connect to the database:', err)
}
)
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, DataTypes); // here products is the table name
db.review = require('./review.model.js')(sequelize, DataTypes);// here review is the table name

db.sequelize.sync({ force: false }).then(() => {    // 6
    console.log('Drop and Resync with { force: true }')
}) // db.sequelize.sync({force: false}): This line of code is using Sequelize to
// synchronize the database schema with the application's models. 
// The sync method ensures that the database structure matches the defined 
// models in your application. The {force: false} option means that it won't 
// drop and recreate tables if they already exist. If you set force to true, 
// it would drop existing tables and recreate them, effectively resetting the database.

export default db;