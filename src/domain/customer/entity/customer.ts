import Entity from "../../@shared/entity/entity.abstract"
import CustomerValidatorFactory from "../factory/customer.validator.factory"
import Address from "../value-object/address"

export default class Customer extends Entity {
	private _name: string
	private _address!: Address
	private _active: boolean = false
	private _rewardPoints: number = 0

	constructor(id: string, name: string) {
		super(id)
		this._name = name
		this.validate()

	}

	_validate() {
		CustomerValidatorFactory.create().validate(this)
	}

	changeName(name: string) {
		this._name = name
		this.validate()
	}

	activate() {
		if (this._address === undefined) {
			throw new Error("Address is mandatory to activate a customer")
		}
		this._active = true
	}

	deactivate() {
		this._active = false
	}

	addRewardPoints(points: number) {
		this._rewardPoints += points
	}

	isActive(): boolean {
		return this._active
	}

	set Address(address: Address) {
		this._address = address
	}

	get name(): string {
		return this._name
	}

	get rewardPoints(): number {
		return this._rewardPoints
	}

	get address(): Address {
		return this._address
	}

}
