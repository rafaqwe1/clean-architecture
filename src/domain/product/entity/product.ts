import Entity from "../../@shared/entity/entity.abstract"
import ProductValidatorFactory from "../factory/product.validator.factory"
import ProductInterface from "./product.interface"

export default class Product extends Entity implements ProductInterface {
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number){
        super(id)
        this._name = name
        this._price = price
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    changeName(name: string){
        this._name = name
        this.validate()
    }

    get price(): number {
        return this._price
    }

    changePrice(price: number){
        this._price = price
        this.validate()
    }

    _validate(){
        ProductValidatorFactory.create().validate(this)
    }
}