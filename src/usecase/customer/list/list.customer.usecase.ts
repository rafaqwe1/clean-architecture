import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto"

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const allCustomers = await this.customerRepository.findAll()
        return {
            customers: allCustomers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    number: customer.address.number,
                    zip: customer.address.zipcode
                }
            })
            )
        }
    }
}