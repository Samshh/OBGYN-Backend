const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Patient",
  tableName: "tbl_patient",
  columns: {
    PatientID: {
      primary: true,
      type: "int",
      generated: true,
    },
    Role: {
      type: "varchar",
      length: 30,
      nullable: false,
      default: "Patient",
    },
    FirstName: {
      type: "varchar",
      length: 30,
      nullable: false,
    },
    MiddleName: {
      type: "varchar",
      length: 30,
      nullable: true,
    },
    LastName: {
      type: "varchar",
      length: 30,
      nullable: false,
    },
    BirthDate: {
      type: "date",
      nullable: false,
    },
    SexID: {
      type: "int",
      nullable: false,
    },
    HomeAddress: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    UserName: {
      type: "varchar",
      length: 30,
      nullable: false,
    },
    UserPassword: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    ContactNumber: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    EmailAddress: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
  },
});
