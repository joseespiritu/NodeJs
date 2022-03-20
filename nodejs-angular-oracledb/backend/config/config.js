const oracledb = require("oracledb");

db = {
  user: "system",
  password: "root",
  connectString: "localhost:1521",
};

const open = async (sql, binds, autoCommit) => {
  try {
    const con = await oracledb.getConnection(db);
    const result = await con.execute(sql, binds, { autoCommit });
    con.release();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = open;
