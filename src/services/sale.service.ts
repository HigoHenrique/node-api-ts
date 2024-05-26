import { ModelStatic } from "sequelize";
import Sale from "../database/models/Sale";
import { resp, respM } from "../utils/resp";
import BookSale from "../database/models/BookSale";
import Book from "../database/models/Book";
import ISale from "../interfaces/ISale";
import schema from "./validations/schema";

BookSale.associations

class SaleService {
    private model: ModelStatic<Sale> = Sale;

    async get(userId: number) {

        const sales = await this.model.findAll({
            where: { userId },
            include: [{ model: Book, as: 'books' }]
        })

        return resp(200, sales)
    }

    async create(sale:ISale){
        const {error} = schema.sale.validate(sale)
        if(error) return respM(422, error.message)

        const books = await Promise.all(sale.books!.map( async (e) =>{
            return await Book.findByPk(e.bookId)
        }))
        if(books.some((e) => !e)){
            return respM(404, 'Book not found')
        }
        const createdSale = await this.model.create({...sale})

        const bookSale = sale.books!.map((e) =>({
            ...e,
            saleId: createdSale.id,
        }))

        await BookSale.bulkCreate(bookSale)
        return resp(201,createdSale)
    }
}

export default SaleService