import Notification from "../notification/notification"
import NotificationError from "../notification/notification.error"

export default abstract class Entity {
    protected _id: string
    public notification: Notification

    constructor(id: string){
        this._id = id
        this.notification = new Notification()
    }

    get id(): string {
		return this._id
	}

    validate(){
        this.notification.reset()
        this._validate()
        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }

    abstract _validate(): void
}