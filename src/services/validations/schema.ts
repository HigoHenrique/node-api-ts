import joi from "joi";

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
})

const book = joi.object({
    name: joi.string().min(1).required(),
    description: joi.string().min(10).required(),
    price: joi.number().required(),
    author: joi.string().min(3).required(),
    categories: joi.array().items(joi.number().required()).min(1).required(),
})

const itemSale = joi.object({
    bookId: joi.number().integer().required(),
    quantity: joi.number().integer().required(),
})

const sale = joi.object({
    total: joi.number().integer().required(),
    date: joi.string().min(6).max(10).required(),
    books: joi.array().items(itemSale).min(1).required(),
    userId: joi.number().integer().required(),
})

export = {user, book, sale}