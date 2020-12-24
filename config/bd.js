const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/cardenasCertificado",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (e) => {
    if (e) throw e;
    console.log("todo es ok");
  }
);
module.exports = mongoose;
