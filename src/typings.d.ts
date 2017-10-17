/* SystemJS module definition */
declare var nodeModule: NodeModule;

interface NodeModule {
    id: string;
}

declare var window: Window;
declare var mmp: any;

interface Window {
    process: any;
    require: any;
}
