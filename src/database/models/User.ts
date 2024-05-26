import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class User extends Model{
    declare id: number
    declare email: string
    declare password: string
}

User.init({
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email:{
        type: sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password:{
        type: sequelize.STRING,
        allowNull: false,
      }
},{
    sequelize: db,
    tableName: 'user',
    timestamps: false,
})

export default User