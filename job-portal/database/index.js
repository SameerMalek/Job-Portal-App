const { default: mongoose } = require("mongoose");

const connectToDB = () => {
  const connectionURL =
    "mongodb+srv://maleksameer715:sameer@cluster0.knys1gv.mongodb.net/";
  mongoose
    .connect(connectionURL)
    .then(() => console.log("job board database connection successful!"))
    .catch((e) => console.log(error));
};

export default connectToDB;