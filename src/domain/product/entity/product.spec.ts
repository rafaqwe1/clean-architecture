import Product from "./product"

describe("Order item unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 1)
        }).toThrowError("product: Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 1) 
        }).toThrowError("product: Name is required")
    })

    it("should throw error when price is less then 0", () => {
        expect(() => {
            new Product("123", "Product 1", -1)
        }).toThrowError("product: Price must be greater than 0")
    })

    it("should throw error when name and price are invalid", () => {
        expect(() => {
            new Product("123", "", -1)
        }).toThrowError("product: Name is required,product: Price must be greater than 0")
    })

    it("should change name", () => {
        const product = new Product("123", "Product 1", 1)
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2")
    })

    it("should change price", () => {
        const product = new Product("123", "Product 1", 1)
        product.changePrice(2)
        expect(product.price).toBe(2)
    })
})