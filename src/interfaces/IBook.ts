interface IBook{
    id?: number
    name: string
    description: string
    price: number
    author: string
    categories?: number[]
}

export {IBook}