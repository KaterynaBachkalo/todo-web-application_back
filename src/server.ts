import app from "./app";
import serverConfig from "./configs/serverConfig";

app.listen(serverConfig.PORT, () => {
  console.log("Server running to mariadb");
});
