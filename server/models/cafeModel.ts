import { Sequelize, DataTypes } from "sequelize";

const cafeModel = (sequelize: Sequelize) => {
  const Cafe = sequelize.define(
    "cafe",
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
      timestamps: true,
      freezeTableName: true,
    },
  );
  return Cafe;
};

export default cafeModel;
