import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.usecase"


const product1 = new Product("123", "Product 1", 10)
const product2 = new Product("12345", "Product 2", 30)


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test list product usecase", () => {
    it("should list products", async () => {
        const productRepository = MockRepository()
        const usecase = new ListProductUseCase(productRepository)
        const output = await usecase.execute({})

        expect(output.products).toHaveLength(2)
        expect(output.products[0].id).toEqual(product1.id)
        expect(output.products[0].name).toEqual(product1.name)
        expect(output.products[0].price).toEqual(product1.price)

        expect(output.products[1].id).toEqual(product2.id)
        expect(output.products[1].name).toEqual(product2.name)
        expect(output.products[1].price).toEqual(product2.price)
    })
})