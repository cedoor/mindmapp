utils.dialog.save = function (newFilePath) {
    const data = JSON.stringify(mmp.data())
    if (utils.filePath && !newFilePath) {
        fs.writeFileSync(utils.filePath, data)
    } else {
        dialog.showSaveDialog({
            title: "Salva mappa",
            filters: [
                {name: "Mind map", extensions: ["mmp"]}
            ]
        }, function (path) {
            if (typeof path === "string") {
                fs.writeFileSync(path, data)
                utils.filePath = path
            }
        })
    }
}

utils.dialog.export = function (type, background) {
    mmp.image(function (url) {
        const data = url.replace(/^data:image\/\w+;base64,/, ""),
            ext = type && type.replace(/^.*[\\\/]/, "") || "png",
            buf = new Buffer(data, "base64")
        dialog.showSaveDialog({
            title: "Esporta immagine",
            filters: [
                {name: "Image", extensions: [ext]}
            ]
        }, function (path) {
            if (typeof path === "string") fs.writeFileSync(path, buf)
        })
    }, type, background)
}

utils.dialog.open = function () {
    dialog.showMessageBox({
        type: "question",
        title: "Salva mappa",
        message: "Vuoi salvare la mappa corrente prima di aprirne un'altra?",
        buttons: ["Si", "No", "Annulla"]
    }, function (index) {
        if (index === 0) utils.dialog.save()
        else if (index === 1) {
            dialog.showOpenDialog({
                title: "Apri mappa",
                properties: ["openFile"],
                filters: [
                    {name: "Mmapp file", extensions: ["mmp"]}
                ]
            }, function (files) {
                if (files) {
                    const data = fs.readFileSync(files[0], "utf8")
                    mmp.data(JSON.parse(data))
                    utils.filePath = files[0]
                }
            })
        }
    })
}

utils.dialog.new = function () {
    dialog.showMessageBox({
        type: "question",
        title: "Salva mappa",
        message: "Vuoi salvare la mappa corrente prima di crearne un'altra?",
        buttons: ["Si", "No", "Annulla"]
    }, function (index) {
        if (index === 0) utils.dialog.save()
        else if (index === 1) {
            mmp.new()
            utils.filePath = ""
        }
    })
}

utils.dialog.addImage = function () {
    if (utils.selectedNode.value["image-src"]) {
        mmp.node.update("image-src", "")
        dom["add-image"].className = "toolbar-buttons"
    } else {
        dialog.showOpenDialog({
            title: "Inserisci un immagine nel nodo",
            properties: ["openFile"],
            filters: [
                {name: "Image", extensions: ["png", "gif", "jpg", "jpeg"]}
            ]
        }, function (files) {
            if (files) {
                let url = files[0],
                    ext = url.split(".").pop(),
                    buffer = new Buffer(fs.readFileSync(url)).toString("base64"),
                    base64 = "data:image/" + ext + ";base64," + buffer
                mmp.node.update("image-src", "" + base64)
                dom["add-image"].className += " active"
                dom["image-size"].style.display = "block"
            }
        })
    }
}
