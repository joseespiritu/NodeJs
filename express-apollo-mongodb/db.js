const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  connectDB,
};
