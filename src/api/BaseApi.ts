export class BaseApi {
    protected wrap<T>(promise: Promise<T>) {
        return promise
            .then(
                (resp) => {
                    return resp
                },
                (err) => {
                    // TODO: handle server errors
                    throw err
                }
            )
            .catch((err) => {
                throw err
            })
    }
}
