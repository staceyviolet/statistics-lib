import { BaseApi } from './BaseApi'
import { customFetch } from './customFetch'
import { Configuration } from './configuration'
// eslint-disable-next-line no-unused-vars
import { PartnerSiteControllerApi } from './api'

export class SiteApi extends BaseApi {
    api: PartnerSiteControllerApi

    constructor(
        accessToken: string,
        basePath: string,
        errorCallback: () => void
    ) {
        super()
        this.api = new PartnerSiteControllerApi(
            new Configuration({ accessToken, basePath }),
            undefined,
            customFetch(accessToken, errorCallback)
        )
    }

    public getSite(siteId: number) {
        return this.wrap(this.api.getSiteUsingGET(siteId))
    }
}
