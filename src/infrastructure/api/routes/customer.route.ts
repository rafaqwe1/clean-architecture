import express, {Request, Response} from "express"
import CustomerRepository from "../../customer/repository/customer.repository"
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase"
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase"

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CustomerCreateUseCase(new CustomerRepository())
    try{
        const customerDto = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zip: req.body.address.zip
            }
        }
        const output = await usecase.execute(customerDto)
        res.send(output)
    }catch(error){
        res.status(500).send(error)
    }
})

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository())
    try{
        const output = await usecase.execute({})
        res.send(output)
    }catch(error){
        res.status(500).send(error)
    }
})