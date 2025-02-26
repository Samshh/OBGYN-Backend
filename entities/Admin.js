const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Admin",
  tableName: "tbl_admin",
  columns: {
    AdminID: {
      primary: true,
      type: "int",
      generated: true,
    },
    Role: {
      type: "varchar",
      length: 30,
      nullable: false,
      default: "Admin",
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
