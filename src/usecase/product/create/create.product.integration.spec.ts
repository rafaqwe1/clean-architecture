import { Sequelize } from "sequelize-typescript"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/model/product.model"

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()

    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product p",
            price: 15
        }

        const output = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)

        const product = await productRepository.find(result.id)

        expect(product.id).toEqual(result.id)
        expect(product.name).toEqual(result.name)
        expect(product.price).toEqual(result.price)
    })
})