import app from "./app";

import serverConfig from "./configs/serverConfig";
import mongoose from "mongoose";

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((er: any) => {
    console.log(er.message);
    process.exit(1);
  });

export default app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
