export interface MapOptions {
    centerOnResize: boolean
    autoBranchColors: boolean
    defaultNode: DefaultNode
    rootNode: RootNode
}

interface DefaultNode {
    name: string
    image: Image
    colors: DefaultNodeColors
    font: Font
    locked: boolean
}

interface RootNode {
    name: string
    image: Image
    colors: RootNodeColors
    font: Font
}

interface Image {
    src: string
    size: number
}

interface DefaultNodeColors {
    name: string
    background: string
    branch: string
}

interface RootNodeColors {
    name: string
    background: string
}

interface Font {
    size: number
    style: string
    weight: string
}
