import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Book from "./Book";
import Category from "./Category";

class BookCategory extends Model{
    declare bookId: number
    declare categoryId: number
}

BookCategory.init({
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
      categoryId:{
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
      }
},{
    sequelize: db,
    tableName: 'book_category',
    timestamps: false,
    underscored: true,
})

Book.belongsToMany(Category,{
    foreignKey: 'bookId',
    otherKey: 'categoryId',
    as: 'categories',
    through: BookCategory
})

Category.belongsToMany(Book,{
    foreignKey: 'categoryId',
    otherKey: 'bookId',
    as: 'books',
    through: BookCategory
})

export default BookCategory