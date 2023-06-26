import CreateProductUseCase from "./create.product.usecase"
const input = {
    name: "Product 1",
    price: 10
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product usecase", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should throw an error when price is 0", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)
        input.price = 0
        await expect(usecase.execute(input)).rejects.toThrow("product: Price must be greater than 0")
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)
        input.price = 10
        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("product: Name is required")
    })
})