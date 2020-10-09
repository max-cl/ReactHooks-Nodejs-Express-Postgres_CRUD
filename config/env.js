const env = {
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    secret: process.env.JWT_SECRET,
    ROLEs: ['ADMIN', 'ROLE_1', 'ROLE_2']
};
   
module.exports = env;