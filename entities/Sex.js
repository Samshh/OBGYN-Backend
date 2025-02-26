const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Sex",
  tableName: "tbl_sex",
  columns: {
    SexID: {
      primary: true,
      type: "int",
    },
    SexName: {
      type: "varchar",
      length: 15,
      nullable: false,
    },
  },
});
