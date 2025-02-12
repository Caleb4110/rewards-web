import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Reward extends Model {
  public id!: number;
  public userId!: string;
  public cafeId!: string;
  public tokenCount!: number;
  public validRewards!: number;
  public usedRewards!: number;
  public visitCount!: number;
}

Reward.init(
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
    sequelize,
    tableName: "rewards",
    timestamps: true,
  },
);

export default Reward;
