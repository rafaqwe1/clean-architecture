import { Sequelize } from "sequelize-typescript"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"
import FindProductUseCase from "./find.product.usecase"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/model/product.model"

describe("Test find product use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new FindProductUseCase(productRepository);
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const input = {
            id: product.id
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})