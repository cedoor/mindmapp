import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UtilsService {

    constructor(private http: HttpClient) {
    }

    /**
     * Return true if the string is a JSON Object.
     * @param {string} JSONString
     * @returns {boolean}
     */
    public static isJSONString(JSONString: string) {
        try {
            JSON.parse(JSONString);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Return the json of package.json.
     * @returns {Promise<any>}
     */
    public getPackageInformations(): Promise<any> {
        return this.http.get("./package.json").toPromise();
    }

}
