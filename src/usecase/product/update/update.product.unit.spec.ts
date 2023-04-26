import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"


const product = new Product("123", "Product 1", 10)
const input = {
    id: product.id,
    name: "Product 1 updated",
    price: 15
}
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test update product usecase", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

    it("should throw an error when price is 0", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)
        input.price = 0
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater then 0")
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)
        input.price = 10
        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })
})