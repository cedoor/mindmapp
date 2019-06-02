import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import * as packageInformations from '../../../../package.json'

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    private remote: Electron.Remote

    private serviceCache: {
        packageInformations
    }

    constructor (private http: HttpClient) {
        if (window.require) {
            this.remote = window.require('electron').remote
        }

        this.serviceCache = {
            packageInformations: false
        }

        this.serviceCache.packageInformations = packageInformations
    }

    /**
     * Return true if the string is a JSON Object.
     * @param {string} JSONString
     * @returns {boolean}
     */
    public static isJSONString (JSONString: string) {
        try {
            JSON.parse(JSONString)
        } catch (e) {
            return false
        }
        return true
    }

    /**
     * Open a link with the default browser.
     * @param {string} href
     */
    public openExternalLink (href: string) {
        this.remote.shell.openExternal(href)
    }

    /**
     * Close the application.
     */
    public closeApplication () {
        let currentWindow = this.remote.getCurrentWindow()

        currentWindow.close()
    }

    /**
     * Minimize the application.
     */
    public minimizeApplication () {
        let currentWindow = this.remote.getCurrentWindow()

        currentWindow.minimize()
    }

    /**
     * Invert the full screen setting of the application.
     */
    public toggleFullScreen () {
        let currentWindow = this.remote.getCurrentWindow()

        if (this.isFullScreen()) {
            currentWindow.setFullScreen(false)
        } else {
            currentWindow.setFullScreen(true)
        }
    }

    /**
     * Return the status of the fullScreen setting.
     * @returns {boolean}
     */
    public isFullScreen (): boolean {
        let currentWindow = this.remote.getCurrentWindow()

        return currentWindow.isFullScreen()
    }

    /**
     * Return true if the two objects have the same structure (same keys).
     * @param {object} JSONObject1
     * @param {object} JSONObject2
     * @returns {boolean}
     */
    public haveSameStructure (JSONObject1: object, JSONObject2: object): boolean {
        const fun = (JSONObject1: object, JSONObject2: object) => {
            for (const key in JSONObject1) {
                if (!JSONObject1.hasOwnProperty(key) || !JSONObject2.hasOwnProperty(key)) {
                    return false
                }

                if (typeof JSONObject1[key] === 'object') {
                    if (!fun(JSONObject1[key], JSONObject2[key])) {
                        return false
                    }
                }
            }

            return true
        }

        return fun(JSONObject1, JSONObject2) && fun(JSONObject2, JSONObject1)
    }

}
