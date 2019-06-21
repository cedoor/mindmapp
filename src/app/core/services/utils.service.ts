import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'
import {Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor () {
    }

    /**
     * Return an observable for drop events for images.
     */
    public static observableDroppedImages (): Observable<string> {
        return new Observable((subscriber) => {
            window.document.ondragover = (event: DragEvent) => {
                event.preventDefault()
            }

            window.document.body.ondrop = (event: DragEvent) => {
                event.preventDefault()

                if (event.dataTransfer.files[0]) {
                    const fileReader = new FileReader()

                    fileReader.onload = () => {
                        subscriber.next(fileReader.result.toString())
                    }

                    fileReader.onerror = subscriber.error

                    fileReader.readAsDataURL(event.dataTransfer.files[0])
                } else {
                    subscriber.next(event.dataTransfer.getData('text/html').match(/src\s*=\s*"(.+?)"/)[1])

                }
            }
        })
    }

    /**
     * Upload a file with a fake input click.
     */
    public static uploadFile (accept: string[] | string = 'application/json'): Promise<string> {
        return new Promise((resolve, reject) => {
            const fakeInput = document.createElement('input')

            fakeInput.type = 'file'
            fakeInput.accept = Array.isArray(accept) ? accept.join(', ') : accept

            document.body.appendChild(fakeInput)

            fakeInput.click()

            fakeInput.oninput = () => {
                const fileReader = new FileReader()

                fileReader.onload = () => {
                    resolve(fileReader.result.toString())
                }
                fileReader.onerror = reject

                if (accept === 'application/json') {
                    fileReader.readAsText(fakeInput.files[0])
                } else {
                    fileReader.readAsDataURL(fakeInput.files[0])
                }
            }

            fakeInput.onerror = reject

            document.body.removeChild(fakeInput)
        })
    }

    /**
     * Download a file with a fake link click.
     */
    public static downloadFile (name: string, content: string) {
        const fakeLink = document.createElement('a')

        fakeLink.href = content
        fakeLink.download = name

        document.body.appendChild(fakeLink)

        fakeLink.click()

        document.body.removeChild(fakeLink)
    }

    /**
     * Return the HTML image element from an image URI.
     */
    public static imageFromUri (uri: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image()

            image.onload = () => {
                resolve(image)
            }
            image.onerror = reject
            image.src = uri
        })
    }

    /**
     * Return the status of the full screen mode.
     */
    public static isFullScreen (): boolean {
        return !!window.document.fullscreenElement
    }

    /**
     * Toggle the full screen mode.
     */
    public static toggleFullScreen () {
        if (UtilsService.isFullScreen()) {
            window.document.exitFullscreen()
        } else {
            window.document.querySelector('html').requestFullscreen()
        }
    }

    /**
     * Return true if the string is a JSON Object.
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
     * Open a link with the default browser (for Electron application).
     */
    public static openExternalLink (href: string) {
        if (environment.electron) {
            window.require('electron').remote.shell.openExternal(href)
        } else {
            window.open(href)
        }
    }

    /**
     * Return true if the two objects have the same structure (same keys).
     */
    public static isSameJSONStructure (json1: object, json2: object): boolean {
        function checkObjectStructure (object1: object, object2: object): boolean {
            for (const key in object1) {
                if (!object1.hasOwnProperty(key) || !object2.hasOwnProperty(key)) {
                    return false
                }

                if (typeof object1[key] === 'object') {
                    if (!checkObjectStructure(object1[key], object2[key])) {
                        return false
                    }
                }
            }

            return true
        }

        return checkObjectStructure(json1, json2) && checkObjectStructure(json2, json1)
    }

}
