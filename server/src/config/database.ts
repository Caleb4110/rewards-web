import { Sequelize } from "sequelize";
import { config } from "./index";

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: config.nodeEnv === "development" ? console.log : false,
});

export default sequelize;
