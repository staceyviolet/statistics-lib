import isofetch from 'isomorphic-fetch'

export function customFetch(accessToken: string, errorCallback: () => void) {
    return function (
        input: RequestInfo,
        init?: RequestInit
    ): Promise<Response> {
        init = init || {}
        init = {
            ...init,
            credentials: 'include',
            headers: {
                ...init.headers
            }
        }

        init.headers = {
            ...init.headers,
            'X-Access-Token': accessToken
        }

        if (init.body && !(init.headers && init.headers['Content-Type'])) {
            init = {
                ...init,
                headers: {
                    ...init.headers,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        }

        console.log('Trace fetch ', input, init)
        return isofetch(input, init)
            .then((resp: Response) => {
                if (resp.ok) {
                    return Promise.resolve(resp)
                }
                if (resp && resp.status === 401) {
                    // Unauthorized
                    errorCallback()
                    // resetStore()
                    return Promise.reject(resp)
                }
                return Promise.reject(resp)
            })
            .catch((resp: Response) => {
                return Promise.reject(resp)
            })
    }
}
