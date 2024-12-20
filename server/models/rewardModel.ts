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
      // TODO: Might be better off calling this tokenCount
      // and have another entry called rewardCount
      rewardCount: {
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
