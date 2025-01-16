import { Sequelize, DataTypes } from "sequelize";

const rewardModel = (sequelize: Sequelize) => {
  const Reward = sequelize.define(
    "reward",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cafeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      validRewards: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      usedRewards: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      visitCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    },
  );
  return Reward;
};

export default rewardModel;
