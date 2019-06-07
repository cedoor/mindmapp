import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/**
 * All the API urls used with the http service.
 */
export enum API_URL {
    LOCAL_ASSETS = './assets/data'
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor (private httpClient: HttpClient) {
    }

    /**
     * Constructs a `GET` request that returns the response body as a JSON object.
     */
    public get (apiUrl: API_URL, endpoint: string): Promise<any> {
        return this.httpClient.get(`${apiUrl}/${endpoint}`).toPromise()
    }

    /**
     * Constructs a `POST` request that interprets the body as a JSON object and
     * returns the response body as a JSON object.
     */
    public async post (apiUrl: API_URL, endpoint: string, body: any): Promise<any> {
        return this.httpClient.post(`${apiUrl}/${endpoint}`, body).toPromise()
    }

}
