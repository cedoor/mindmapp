import {Injectable} from '@angular/core'
import {MmpService} from './mmp.service'
import {UtilsService} from './utils.service'
import * as JsPDF from 'jspdf'

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor (private mmpService: MmpService) {
    }

    /**
     * Export the current mind map with the format passed as parameter.
     */
    public async exportMap (format: 'png' | 'jpeg' | 'pdf' | 'json' = 'json') {
        const name = this.mmpService.selectNode('map_1_node_0').name

        switch (format) {
            case 'json':
                const json = JSON.stringify(this.mmpService.exportAsJSON())
                const uri = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`

                UtilsService.downloadFile(`${name}.${format}`, uri)

                break
            case 'pdf':
                const imageUri = await this.mmpService.exportAsImage('jpeg')
                const htmlImageElement = await UtilsService.imageFromUri(imageUri)
                const pdf = new JsPDF({
                    orientation: htmlImageElement.width > htmlImageElement.height ? 'l' : 'p',
                    format: [htmlImageElement.width * 0.75, htmlImageElement.height * 0.75]
                })

                pdf.addImage(imageUri, 'JPEG', 0, 0)

                pdf.save(`${name}.${format}`)

                break
            case 'jpeg':
            case 'png':
                const image = await this.mmpService.exportAsImage(format)

                UtilsService.downloadFile(`${name}.${format === 'jpeg' ? 'jpg' : format}`, image)

                break
        }
    }

    /**
     * Import an existing map from the local file system.
     */
    public async importMap () {
        const json = await UtilsService.uploadFile()

        this.mmpService.new(JSON.parse(json))
    }

    /**
     * Insert an image in the selected node.
     */
    public async addNodeImage () {
        if (!this.mmpService.selectNode().image.src) {
            const image = await UtilsService.uploadFile(['image/png', 'image/gif', 'image/jpg', 'image/jpeg'])

            this.mmpService.updateNode('imageSrc', image)
        } else {
            this.mmpService.updateNode('imageSrc', '')
        }
    }

}
