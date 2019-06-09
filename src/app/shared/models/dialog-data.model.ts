export interface DialogData {
    title: string
    message?: string
    input: Input
    buttons?: Button[]
}

interface Input {
    label: string
    value: string
}

interface Button {
    text: string
    result: any
}
