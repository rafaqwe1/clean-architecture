import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto"
import Address from "../../../domain/customer/value-object/address"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"

export default class CustomerCreateUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
        
        await this.customerRepository.create(customer)
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