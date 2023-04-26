import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer("123", "John")
customer.Address = new Address("Street", 123, "zip", "city")
const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = mockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)
        const input = {
            id: "123"
        }
        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "city",
                number: 123,
                zip: "zip"
            }
        }
        
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
})