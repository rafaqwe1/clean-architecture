import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCreateUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "Zip", "City"))

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test update customer usecase", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCreateUseCase(customerRepository)
        const output = await customerUpdateUseCase.execute(input)
        expect(output).toEqual({
            id: customer.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCreateUseCase(customerRepository)
        input.name = ""
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCreateUseCase(customerRepository)
        input.name = "John"
        input.address.street = ""
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required")
    })
})