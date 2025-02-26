const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Ocp123@",
  database: "db_obgyn",
  synchronize: true,
  logging: true,
  entities: [
    require("./entities/Admin"),
    require("./entities/Appointment"),
    require("./entities/Diagnosis"),
    require("./entities/Leave"),
    require("./entities/Patient"),
    require("./entities/Sex"),
    require("./entities/Status"),
  ],
});

module.exports = AppDataSource;
