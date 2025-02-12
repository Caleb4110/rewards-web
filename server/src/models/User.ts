import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: string;
  public phoneNumber!: string;
  public dob!: Date;
  public suburb!: string;
}

// TODO: Decide if this is needed
const ausPhoneRegex =
  /^(\+61|0)[2-478](\s?\d{4}\s?\d{4}|\d{8})$|^(\+61|0)4(\s?\d{2}\s?\d{3}\s?\d{3}|\d{8})$/;

User.init(
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
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);

export default User;
