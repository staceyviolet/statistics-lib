import { makeAutoObservable } from 'mobx'
import { generateUniqueId } from '../utils/uniqueIdGenerator'

class GlobalErrorsStore {
    errors: ErrorStore[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addError = (message: string) => {
        this.errors.push(new ErrorStore(this, message))
    }

    removeError = (error: ErrorStore) => {
        this.errors = this.errors.filter((err) => err !== error)
    }

    removeAllErrors = () => {
        this.errors = []
    }
}

class ErrorStore {
    id = generateUniqueId()
    globalStore: GlobalErrorsStore
    message: string

    constructor(globalStore: GlobalErrorsStore, message: string) {
        makeAutoObservable(this)

        this.globalStore = globalStore
        this.message = message

        // setTimeout(this.remove, 15000)
    }

    remove = () => {
        this.globalStore.removeError(this)
    }
}

export const globalErrorsStore = new GlobalErrorsStore()
