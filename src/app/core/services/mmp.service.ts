import {Injectable} from '@angular/core'
import * as mmp from 'mmp'
import {Observable} from 'rxjs'
import {SettingsService} from './settings.service'

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

    private branchColors: Array<string>

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
     * Return the version of mmp.
     * @returns {string}
     */
    public static version (): string {
        return mmp.version
    }

    /**
     * Create a mind mmp and save the instance with corresponding id.
     * All function below require the mmp id.
     * @param {string} id
     * @param options
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
     * @param map
     */
    public new (map?: any) {
        this.currentMap.new(map)
    }

    /**
     * Zoom in the mind mmp.
     * @param {number} duration
     */
    public zoomIn (duration?: number) {
        this.currentMap.zoomIn(duration)
    }

    /**
     * Zoom out the mind mmp.
     * @param {number} duration
     */
    public zoomOut (duration?: number) {
        this.currentMap.zoomOut(duration)
    }

    /**
     * Update the mind mmp option properties.
     * @param {string} property
     * @param value
     */
    public updateOptions (property: string, value: any) {
        this.currentMap.updateOptions(property, value)
    }

    /**
     * Return the json of the mind mmp.
     * @returns {any}
     */
    public exportAsJSON (): any {
        return this.currentMap.exportAsJSON()
    }

    /**
     * Return a promise with the uri of the mind mmp image.
     * @param {string} type
     * @returns {Promise<any>}
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
     * @param {"position" | "zoom"} type
     * @param {number} duration
     */
    public center (type?: 'position' | 'zoom', duration?: number) {
        this.currentMap.center(type, duration)
    }

    /**
     * Return the subscribe of the mind mmp event with the node or nothing.
     * @param {string} event
     * @returns {Observable<Array<any>>}
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
     * @param properties
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
     * @param {string | "left" | "right" | "up" | "down"} nodeId
     * @returns {any}
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
     * @param {string} property
     * @param value
     * @param {boolean} graphic
     */
    public updateNode (property: string, value?: any, graphic?: boolean) {
        this.currentMap.updateNode(property, value, graphic)
    }

    /**
     * Remove the node with the id passed as parameter or, if the id is
     * not defined, the current selected node.
     * @param {string} nodeId
     */
    public removeNode (nodeId?: string) {
        this.currentMap.removeNode(nodeId)
    }

    /**
     * Copy a node with his children in the mmp clipboard.
     * If id is not specified, copy the selected node.
     * @param {string} nodeId
     */
    public copyNode (nodeId?: string) {
        this.currentMap.copyNode(nodeId)
    }

    /**
     * Remove and copy a node with his children in the mmp clipboard.
     * If id is not specified, copy the selected node.
     * @param {string} nodeId
     */
    public cutNode (nodeId?: string) {
        this.currentMap.cutNode(nodeId)
    }

    /**
     * Paste the node of the mmp clipboard in the map. If id is not specified,
     * paste the nodes of the mmp clipboard in the selected node.
     * @param {string} nodeId
     */
    public pasteNode (nodeId?: string) {
        this.currentMap.pasteNode(nodeId)
    }

    /**
     * Return the children of the current node.
     * @returns {Array<any>}
     */
    public nodeChildren (): Array<any> {
        return this.currentMap.nodeChildren()
    }

    /**
     * Move the node in a direction.
     * @param {"left" | "right" | "up" | "down"} direction
     * @param {number} range
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
     * Create a listener to add a node on right click event.
     */
    public addNodesOnRightClick () {
        const svg: HTMLElement = window.document.querySelector('#' + this.currentId + '> svg')

        svg.oncontextmenu = (event: MouseEvent) => {
            const x = event.offsetX
            const y = event.offsetY

            this.addNode({
                coordinates: {x, y}
            })
        }
    }

    /**
     * Set the current mind mmp.
     * @param {string} id
     */
    public setCurrentMap (id: string) {
        this.currentMap = this.maps.get(id)
        this.currentId = id
    }

}
