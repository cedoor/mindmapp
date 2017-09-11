Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
        label: "File",
        submenu: [{
            label: "Nuovo",
            accelerator: "Ctrl+n",
            click() {
                utils.dialog.new()
            }
        }, {
            label: "Apri",
            accelerator: "Ctrl+o",
            click() {
                utils.dialog.open()
            }
        }, {
            type: "separator"
        },{
            label: "Salva",
            accelerator: "Ctrl+s",
            click() {
                utils.dialog.save()
            }
        }, {
            label: "Salva con nome",
            click() {
                utils.dialog.save(true)
            }
        }, {
            label: "Esporta immagine",
            accelerator: "Ctrl+e",
            click() {
                utils.dialog.export()
            }
        }, {
            type: "separator"
        }, {
            label: "Esci",
            role: "quit"
        }]
    }, {
        label: "Modifica",
        submenu: [{
            label: "Annulla",
            accelerator: "Ctrl+z",
            click() {
                mmp.undo()
            }
        }, {
            label: "Ripeti",
            accelerator: "Ctrl+Shift+z",
            click() {
                mmp.repeat()
            }
        }, {
            type: "separator"
        }, {
            label: "Aggiungi nodo",
            accelerator: "Alt+=",
            click() {
                mmp.node.add()
            }
        }, {
            label: "Rimuovi nodo",
            accelerator: "Alt+-",
            click() {
                mmp.node.remove()
            }
        }, {
            type: "separator"
        }, {
            label: "Preferenze",
            click() {
                console.log("preferences")
            }
        }
        ]
    }, {
        label: "Visualizza",
        submenu: [{
            role: "reload"
        }, {
            type: "separator"
        }, {
            label: "Reset zoom",
            accelerator: "Alt+c",
            click() {
                mmp.center()
            }
        }, {
            label: "Zoom in",
            accelerator: "Ctrl+=",
            click() {
                mmp.zoomIn()
            }
        }, {
            label: "Zoom out",
            accelerator: "Ctrl+-",
            click() {
                mmp.zoomOut()
            }
        }, {
            type: "separator"
        }, {
            label: "Schermo intero",
            role: "togglefullscreen"
        }]
    }, {
        label: "Aiuto",
        role: "help",
        submenu: [{
            label: "Informazioni"
        }, {
            label: "Tutorial"
        }]
    }
]))

