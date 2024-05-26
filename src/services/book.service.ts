import { ModelStatic } from "sequelize";
import Book from "../database/models/Book";
import Category from "../database/models/Category";
import { resp, respM } from "../utils/resp";
import BookCategory from "../database/models/BookCategory";
import { IBook } from "../interfaces/IBook";
import schema from "./validations/schema";
import Wishlist from "../database/models/Wishlist";

BookCategory.associations

class BookService{
    private model: ModelStatic<Book> = Book;
    
     async get(){
        const books = await this.model.findAll({
            include: [{model: Category, as: 'categories'}],
        })
        return resp(200,books);
     }

     async create(book: IBook){
        const {error} = schema.book.validate(book)
        if(error) return respM(422, error.message);
        const createdBook = await this.model.create({...book})

        const categories = await Promise.all(book.categories!.map(async (e) =>{
            return await Category.findByPk(e)
        }))

        if(categories.some((e) =>!e)) return respM(404, 'Category not found');

        const bookCategory = book.categories!.map((e)=>({
            bookId:createdBook.id,
            categoryId: e
        }))

        await BookCategory.bulkCreate(bookCategory)
        return resp(201, createdBook);
     }

     async wishlist(bookId: number, userId: number){
        const findBook = await this.model.findByPk(bookId)
        if(!findBook) return respM(404,'Book not found');
        const book = await Wishlist.findOne({where:{
            bookId, userId
        }})
        if(book){
            await Wishlist.destroy({where:{bookId, userId}})
            return resp(204,'removed to wishlist')
        }
        await Wishlist.create({bookId, userId})
        return resp(201,'add to wishlist')
     }
}

export default BookService