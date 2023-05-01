import { Sequelize } from "sequelize-typescript"
import ProductRepository from "../../../infrastructure/product/repository/product.repository"
import ListProductUseCase from "./list.product.usecase"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/model/product.model"

describe("Test list product use case", () => {
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

    it("should list products", async () => {
        const productRepository = new ProductRepository()
        const usecase = new ListProductUseCase(productRepository);
        const product = new Product("123", "Product 1", 10)
        const product2 = new Product("1234", "Product 2", 20)
        await productRepository.create(product)
        await productRepository.create(product2)


        const output = {
            products: [
                {
                    id: product.id,
                    name: product.name,
                    price: product.price
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price
                }
            ]
        }
        const result = await usecase.execute({})
        expect(result).toEqual(output)
    })
})