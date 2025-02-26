const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Status",
  tableName: "tbl_status",
  columns: {
    StatusID: {
      primary: true,
      type: "int",
    },
    StatusName: {
      type: "varchar",
      length: 15,
      nullable: false,
    },
  },
});
