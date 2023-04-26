import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street 1", 1, "12345", "City"))
const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street 2", 2, "123456", "City 2"))

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test list customers use case", () => {

    it("should find a customer", async () => {
        const customerRepository = mockRepository()
        const usecase = new ListCustomerUseCase(customerRepository)
        const input = {}
       

        const output = await usecase.execute(input)
        expect(output.customers.length).toEqual(2)
        expect(output.customers[0].id).toEqual(customer1.id)
        expect(output.customers[0].name).toEqual(customer1.name)
        expect(output.customers[0].address.city).toEqual(customer1.address.city)
        expect(output.customers[0].address.number).toEqual(customer1.address.number)
        expect(output.customers[0].address.street).toEqual(customer1.address.street)
        expect(output.customers[0].address.zip).toEqual(customer1.address.zipcode)

        expect(output.customers[1].id).toEqual(customer2.id)
        expect(output.customers[1].name).toEqual(customer2.name)
        expect(output.customers[1].address.city).toEqual(customer2.address.city)
        expect(output.customers[1].address.number).toEqual(customer2.address.number)
        expect(output.customers[1].address.street).toEqual(customer2.address.street)
        expect(output.customers[1].address.zip).toEqual(customer2.address.zipcode)
    })
})