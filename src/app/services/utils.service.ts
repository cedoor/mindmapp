import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UtilsService {

    shell: Electron.Shell;

    constructor(private http: HttpClient) {
        this.shell = window.require("electron").remote.shell;
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

    /**
     * Open a link with the default browser.
     * @param {string} href
     */
    public openExternalLink(href: string) {
        this.shell.openExternal(href);
    }

}
