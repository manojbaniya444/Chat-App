require("dotenv").config();
const server = require("./app");

const connectToDb = require("./src/db/index");
const PORT = process.env.PORT || 8080;

connectToDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running and PORT ${PORT}`);
  });
});
