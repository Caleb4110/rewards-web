import sequelize from "../config/database";
import Cafe from "./Cafe";
import Reward from "./Reward";
import User from "./User";
import Sequelize from "sequelize";
// Define relationships
Cafe.hasMany(Reward, { foreignKey: "cafeId", as: "rewards" });
User.hasMany(Reward, { foreignKey: "userId", as: "rewards" });
Reward.belongsTo(Cafe, { foreignKey: "cafeId", as: "cafe" });
Reward.belongsTo(User, { foreignKey: "userId", as: "user" });

const db = {
  sequelize,
  Sequelize,
  Cafe,
  Reward,
  User,
};

export default db;
