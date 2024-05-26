import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Sale from "./Sale";
import Book from "./Book";

class BookSale extends Model{
    declare saleId: number
    declare bookId: number
    declare quantity: number
}

BookSale.init({
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
      saleId:{
        primaryKey:true,
        type: sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'sale',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
      },
      quantity:{
        type: sequelize.INTEGER,
        allowNull: false,
      }
},{
    sequelize: db,
    tableName: 'book_sale',
    timestamps: false,
    underscored: true,
})

Book.belongsToMany(Sale,{
    foreignKey: 'bookId',
    otherKey: 'saleId',
    as: 'sales',
    through: BookSale
})

Sale.belongsToMany(Book,{
    foreignKey: 'saleId',
    otherKey: 'bookId',
    as: 'books',
    through: BookSale
})

export default BookSale