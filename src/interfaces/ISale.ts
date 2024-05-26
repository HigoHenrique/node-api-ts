interface ISale {
    userId?: number
    total: number
    date: string
    books?: {bookId: number, quantity: number}[]
}

export default ISale