require('dotenv').config();
module.exports = {
    database: {
        conectionLimit: 10,
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DB_NOMBRE
    }
}