const mongoose = require("mongoose");

module.exports = {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
      console.log(err);
    }
  },
};
