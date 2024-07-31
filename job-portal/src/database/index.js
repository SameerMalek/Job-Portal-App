const { default: mongoose } = require("mongoose");

const connectToDB = () => {
  const connectionURL = process.env.MONGODB_URL;
  mongoose
    .connect(connectionURL)
    .then(() => console.log("job board database connection successful!"))
    .catch((e) => console.log(error));
};

export default connectToDB;
