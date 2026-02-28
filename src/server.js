require("./config/env"); // loads .env.dev/.env.release/.env.prod dynamically
const { app } = require("./app");

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server listening on :${port} (NODE_ENV=${process.env.NODE_ENV})`);
});