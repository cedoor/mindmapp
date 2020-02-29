import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {SettingsService} from '../settings/settings.service'
import {UtilsService} from '../utils/utils.service'
import * as JsPDF from 'jspdf'
import * as mmp from 'mmp'

/**
 * Mmp wrapper service with mmp and other functions.
 */
@Injectable({
    providedIn: 'root'
})
export class MmpService {

    private maps: Map<string, any>
    private currentMap: any
    private currentId: string

    private readonly branchColors: Array<string>

    constructor (public settingsService: SettingsService) {
        this.maps = new Map<string, any>()

        this.branchColors = [
            '#FFC107',
            '#2196F3',
            '#9C27B0',
            '#f44336',
            '#4CAF50',
            '#3F51B5',
            '#FF9800',
            '#CDDC39',
            '#795548',
            '#673AB7',
            '#009688',
            '#E91E63',
            '#03A9F4',
            '#8BC34A',
            '#00BCD4',
            '#607D8B',
            '#FFEB3B',
            '#FF5722'
        ]
    }

    /**
     * Return the version of mmp library.
     */
    public static version (): string {
        return mmp.version
    }

    /**
     * Create a mind mmp and save the instance with corresponding id.
     * All function below require the mmp id.
     */
    public create (id: string, options?: any) {
        const map = mmp.create(id, options)

        this.maps.set(id, map)

        this.currentMap = map
        this.currentId = id
    }

    /**
     * Remove the mind mmp.
     */
    public remove () {
        this.currentMap.remove()
    }

    /**
     * Clear or load an existing mind mmp.
     */
    public new (map?: any) {
        this.currentMap.new(map)
    }

    /**
     * Zoom in the mind mmp.
     */
    public zoomIn (duration?: number) {
        this.currentMap.zoomIn(duration)
    }

    /**
     * Zoom out the mind mmp.
     */
    public zoomOut (duration?: number) {
        this.currentMap.zoomOut(duration)
    }

    /**
     * Update the mind mmp option properties.
     */
    public updateOptions (property: string, value: any) {
        this.currentMap.updateOptions(property, value)
    }

    /**
     * Return the json of the mind mmp.
     */
    public exportAsJSON (): any {
        return this.currentMap.exportAsJSON()
    }

    /**
     * Return a promise with the uri of the mind mmp image.
     */
    public exportAsImage (type?: string): Promise<any> {
        return new Promise((resolve) => {
            this.currentMap.exportAsImage((uri) => {
                resolve(uri)
            }, type)
        })
    }

    /**
     * Reverse the last one change of the mind mmp.
     */
    public undo () {
        this.currentMap.undo()
    }

    /**
     * Repeat a previously undoed change of the mind mmp.
     */
    public redo () {
        this.currentMap.redo()
    }

    /**
     * Return the array of snapshots of the mind map.
     */
    public history (): any {
        return this.currentMap.history()
    }

    /**
     * Center the mind mmp.
     */
    public center (type?: 'position' | 'zoom', duration?: number) {
        this.currentMap.center(type, duration)
    }

    /**
     * Return the subscribe of the mind mmp event with the node or nothing.
     */
    public on (event: string): Observable<Array<any>> {
        return new Observable((observer) => {
            this.currentMap.on(event, (...args) => {
                observer.next(...args)
            })
        })
    }

    /**
     * Add a node in the mind mmp.
     */
    public addNode (properties: any = {}) {
        const selected = this.selectNode()
        const settings = this.settingsService.getCachedSettings()

        if (selected.colors.branch) {
            properties.colors = {
                branch: selected.colors.branch
            }
        } else if (settings.mapOptions.autoBranchColors === true) {
            const children = this.nodeChildren().length

            properties.colors = {
                branch: this.branchColors[children % this.branchColors.length]
            }
        }

        this.currentMap.addNode(properties)
    }

    /**
     * Select the node with the id or in the direction passed as parameter.
     * If the node id is not defined return the current selected node.
     */
    public selectNode (nodeId?: string | 'left' | 'right' | 'up' | 'down'): any {
        return this.currentMap.selectNode(nodeId)
    }

    /**
     * Focus the text of the selected node to edit it.
     */
    public editNode () {
        this.currentMap.editNode()
    }

    /**
     * Deselect the current node.
     */
    public deselectNode () {
        this.currentMap.deselectNode()
    }

    /**
     * Update a property of the current selected node.
     */
    public updateNode (property: string, value?: any, graphic?: boolean) {
        this.currentMap.updateNode(property, value, graphic)
    }

    /**
     * Remove the node with the id passed as parameter or, if the id is
     * not defined, the current selected node.
     */
    public removeNode (nodeId?: string) {
        this.currentMap.removeNode(nodeId)
    }

    /**
     * Copy a node with his children in the mmp clipboard.
     * If id is not specified, copy the selected node.
     */
    public copyNode (nodeId?: string) {
        this.currentMap.copyNode(nodeId)
    }

    /**
     * Remove and copy a node with his children in the mmp clipboard.
     * If id is not specified, copy the selected node.
     */
    public cutNode (nodeId?: string) {
        this.currentMap.cutNode(nodeId)
    }

    /**
     * Paste the node of the mmp clipboard in the map. If id is not specified,
     * paste the nodes of the mmp clipboard in the selected node.
     */
    public pasteNode (nodeId?: string) {
        this.currentMap.pasteNode(nodeId)
    }

    /**
     * Return the children of the current node.
     */
    public nodeChildren (): Array<any> {
        return this.currentMap.nodeChildren()
    }

    /**
     * Move the node in a direction.
     */
    public moveNodeTo (direction: 'left' | 'right' | 'up' | 'down', range: number = 10) {
        const coordinates = this.currentMap.selectNode().coordinates

        switch (direction) {
            case 'left':
                coordinates.x -= range
                break
            case 'right':
                coordinates.x += range
                break
            case 'up':
                coordinates.y -= range
                break
            case 'down':
                coordinates.y += range
                break
        }

        this.currentMap.updateNode('coordinates', coordinates)
    }

    /**
     * Export the current mind map with the format passed as parameter.
     */
    public async exportMap (format: string = 'json') {
        const name = this.selectNode('map_1_node_0').name
            .replace(/\n/g, ' ').replace(/\s+/g, ' ')

        switch (format) {
            case 'json':
                const json = JSON.stringify(this.exportAsJSON())
                const uri = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`

                UtilsService.downloadFile(`${name}.${format}`, uri)

                break
            case 'pdf':
                const imageUri = await this.exportAsImage('jpeg')
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
                const image = await this.exportAsImage(format)

                UtilsService.downloadFile(`${name}.${format === 'jpeg' ? 'jpg' : format}`, image)

                break
        }
    }

    /**
     * Import an existing map from the local file system.
     */
    public async importMap () {
        const json = await UtilsService.uploadFile()

        this.new(JSON.parse(json))
    }

    /**
     * Insert an image in the selected node.
     */
    public async addNodeImage () {
        if (!this.selectNode().image.src) {
            const image = await UtilsService.uploadFile(['image/png', 'image/gif', 'image/jpg', 'image/jpeg'])

            this.updateNode('imageSrc', image)
        } else {
            this.updateNode('imageSrc', '')
        }
    }

    /**
     * Set the current mind mmp.
     */
    public setCurrentMap (id: string) {
        this.currentMap = this.maps.get(id)
        this.currentId = id
    }

}
