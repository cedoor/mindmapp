import {Injectable} from "@angular/core";
import * as mmp from "mmp";
import {Observable} from "rxjs/Observable";

/**
 * Mmp wrapper service with mmp and other functions.
 */
@Injectable()
export class MmpService {

    private maps: Map<string, any>;
    private currentMap: any;

    constructor() {
        this.maps = new Map<string, any>();
    }

    /**
     * Create a mind mmp and save the instance with corresponding id.
     * All function below require the mmp id.
     * @param {string} id
     * @param options
     */
    public create(id: string, options?: any) {
        let map = mmp.create(id, options);

        this.maps.set(id, map);
        this.currentMap = map;
    }

    /**
     * Remove the mind mmp.
     */
    public remove() {
        this.currentMap.remove();
    }

    /**
     * Clear or load an existing mind mmp.
     * @param map
     */
    public new(map?: any) {
        this.currentMap.new(map);
    }

    /**
     * Zoom in the mind mmp.
     * @param {number} duration
     */
    public zoomIn(duration?: number) {
        this.currentMap.zoomIn(duration);
    }

    /**
     * Zoom out the mind mmp.
     * @param {number} duration
     */
    public zoomOut(duration?: number) {
        this.currentMap.zoomOut(duration);
    }

    /**
     * Update the mind mmp option properties.
     * @param {string} property
     * @param value
     */
    public updateOptions(property: string, value: any) {
        this.currentMap.updateOptions(property, value);
    }

    /**
     * Return the json of the mind mmp.
     * @returns {any}
     */
    public exportAsJSON(): any {
        return this.currentMap.exportAsJSON();
    }

    /**
     * Return a promise with the uri of the mind mmp image.
     * @param {string} type
     * @returns {Promise<any>}
     */
    public exportAsImage(type?: string): Promise<any> {
        return new Promise((resolve) => {
            this.currentMap.exportAsImage((uri) => {
                resolve(uri);
            }, type);
        });
    }

    /**
     * Reverse the last one change of the mind mmp.
     */
    public undo() {
        this.currentMap.undo();
    }

    /**
     * Repeat a previously undoed change of the mind mmp.
     */
    public redo() {
        this.currentMap.redo();
    }

    /**
     * Center the mind mmp.
     * @param {"position" | "zoom"} type
     * @param {number} duration
     */
    public center(type?: "position" | "zoom", duration?: number) {
        this.currentMap.center(type, duration);
    }

    /**
     * Return the subscribe of the mind mmp event with the node or nothing.
     * @param {string} event
     * @returns {Observable<Array<any>>}
     */
    public on(event: string): Observable<Array<any>> {
        return new Observable((observer) => {
            this.currentMap.on(event, (...args) => {
                observer.next(...args);
            });
        });
    }

    /**
     * Add a node in the mind mmp.
     * @param properties
     */
    public addNode(properties?: any) {
        this.currentMap.addNode(properties);
    }

    /**
     * Select the node with the id or in the direction passed as parameter.
     * If the node id is not defined return the current selected node.
     * @param {string | "left" | "right" | "up" | "down"} nodeId
     * @returns {any}
     */
    public selectNode(nodeId?: string | "left" | "right" | "up" | "down"): any {
        return this.currentMap.selectNode(nodeId);
    }

    /**
     * Deselect the current node.
     */
    public deselectNode() {
        this.currentMap.deselectNode();
    }

    /**
     * Update a property of the current selected node.
     * @param {string} property
     * @param value
     * @param {boolean} graphic
     */
    public updateNode(property: string, value: any, graphic?: boolean) {
        this.currentMap.updateNode(property, value, graphic);
    }

    /**
     * Remove the node with the id passed as parameter or, if the id is
     * not defined, the current selected node.
     * @param {string} nodeId
     */
    public removeNode(nodeId?: string) {
        this.currentMap.removeNode(nodeId);
    }

    /**
     *
     * @param {"left" | "right" | "up" | "down"} direction
     * @param {number} range
     */
    public moveNodeTo(direction: "left" | "right" | "up" | "down", range: number = 10) {
        let coordinates = this.currentMap.selectNode().coordinates;

        switch (direction) {
            case "left":
                coordinates.x -= range;
                break;
            case "right":
                coordinates.x += range;
                break;
            case "up":
                coordinates.y -= range;
                break;
            case "down":
                coordinates.y += range;
                break;
        }

        this.currentMap.updateNode("coordinates", coordinates);
    }

    /**
     * Set the current mind mmp.
     * @param {string} id
     */
    public setCurrentMap(id: string) {
        this.currentMap = this.maps.get(id);
    }

    /**
     * Return true if the map has not been modified.
     * @returns {boolean}
     */
    public isInitialMap(): boolean {
        return this.currentMap.history().index === 0;
    }

    /**
     * Return the version of mmp.
     * @returns {string}
     */
    public static version(): string {
        return mmp.version;
    }

}
