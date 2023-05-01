import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase"
import ProductRepository from "../../product/repository/product.repository"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    try {
        const output = await usecase.execute({
            name: req.body.name,
            price: req.body.price
        })
        res.send(output)
    } catch (error) {
        res.status(500).send({msg: (error as Error).message})
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository()
    const usecase = new ListProductUseCase(repository)

    try {
        const output = await usecase.execute({})
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})