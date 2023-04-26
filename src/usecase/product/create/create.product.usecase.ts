import Product from "../../../domain/product/entity/product"
import ProductFatory from "../../../domain/product/factory/product.factory"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto"

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository
    }
    
    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFatory.create("a", input.name, input.price)
        await this.productRepository.create(new Product(product.id, product.name, product.price))
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}