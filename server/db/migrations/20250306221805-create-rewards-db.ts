import { QueryInterface } from "sequelize";
import User from "../../src/models/User";
import Cafe from "../../src/models/Cafe";
import Reward from "../../src/models/Reward";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("users", User.getAttributes());
    await queryInterface.createTable("cafes", Cafe.getAttributes());
    await queryInterface.createTable("rewards", Reward.getAttributes());
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("cafes");
    await queryInterface.dropTable("rewards");
  },
};
