import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto"
import Address from "../../../domain/customer/value-object/address"

export default class CustomerCreateUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id)
        customer.changeName(input.name)
        customer.Address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        await this.customerRepository.update(customer)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city,
                number: customer.address.number,
                street: customer.address.street,
                zip: customer.address.zipcode
            }
        }
    }
}