import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Cafe extends Model {
  public id!: string;
  public name!: string;
  public phoneNumber!: string;
  public rewardFreq!: number;
}

Cafe.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    /*
      email: {

      }
       */
    rewardFreq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /*
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
*/
  },
  {
    sequelize,
    tableName: "cafes",
    timestamps: true,
  },
);

export default Cafe;
