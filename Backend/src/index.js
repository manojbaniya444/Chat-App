require("dotenv").config();
const server = require("./app");

const connectToDb = require("./db/index");
const PORT = process.env.PORT || 8080;

connectToDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
