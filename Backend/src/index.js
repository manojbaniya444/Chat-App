require("dotenv").config();
const app = require("./app");

const connectToDb = require("./db/index");
const PORT = process.env.PORT || 8080;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
