import { Sequelize } from "sequelize";
import cafeModel from "./cafeModel";
import rewardModel from "./rewardModel";
import userModel from "./userModel";

import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME;

// Connecting to database using postgres dialect
const sequelize = new Sequelize(
  `postgres://postgres:1234@localhost:5432/${dbName}`,
  { dialect: "postgres" },
);

// Check if connection was successful
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err: any) => {
    console.log(`Error connecting to database: ${err}`);
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connecting to models
db.cafes = cafeModel(sequelize);
db.users = userModel(sequelize);
db.rewards = rewardModel(sequelize);

export default db;
