import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Book from "./Book";
import User from "./User";

class Wishlist extends Model{
    declare bookId: number
    declare userId: number
}

Wishlist.init({
    bookId:{
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'book',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
      },
      userId:{
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
      }
},{
    sequelize: db,
    tableName: 'wishlist',
    timestamps: false,
    underscored: true,
})

Book.belongsToMany(User,{
    foreignKey: 'bookId',
    otherKey: 'userId',
    as: 'users',
    through: Wishlist
})

User.belongsToMany(Book,{
    foreignKey: 'userId',
    otherKey: 'bookId',
    as: 'books',
    through: Wishlist
})

export default Wishlist