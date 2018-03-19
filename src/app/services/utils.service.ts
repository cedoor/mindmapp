import {Injectable} from "@angular/core";

@Injectable()
export class UtilsService {

    constructor() {
    }

    static isJsonString(string: string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }

}
