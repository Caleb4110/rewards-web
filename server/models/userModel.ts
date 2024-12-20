import { Sequelize, DataTypes } from "sequelize";

const userModel = (sequelize: Sequelize) => {
  const ausPhoneRegex =
    /^(\+61|0)[2-478](\s?\d{4}\s?\d{4}|\d{8})$|^(\+61|0)4(\s?\d{2}\s?\d{3}\s?\d{3}|\d{8})$/;

  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: ausPhoneRegex,
        },
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      suburb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    },
  );
  return User;
};

export default userModel;
