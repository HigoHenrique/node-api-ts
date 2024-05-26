import { NextFunction, Request, Response } from "express";
import BookService from "../services/book.service";

class BookController{
    private service = new BookService();

    async get( req: Request ,res: Response , next: NextFunction){
        try {
            const {status, message} = await this.service.get();
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.create(req.body);
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
    async wishlist(req: Request, res: Response, next: NextFunction){
        try {
            const {bookId} = req.params;
            const userId = res.locals.user.id;
            const {status, message} = await this.service.wishlist(+bookId, userId);
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}

export default BookController