mmp.on("mmcreate", function () {
    dom.loader.remove()
    dom.main.style.visibility = "visible"
})

mmp.on("nodeselect", function (key, value) {
    setTimeout(function () {
        dom["background-color"].value = value["background-color"]
        dom["background-color"].jscolor.importColor()

        dom["text-color"].value = value["text-color"]
        dom["text-color"].jscolor.importColor()

        if (key !== "node0") {
            dom["branch-color"].value = value["branch-color"]
            dom["branch-color"].jscolor.importColor()
        }
    }, 50)

    dom["font-size"].value = value["font-size"]

    if (key === "node0") {
        dom["branch-color"].style.display = "none"
    } else {
        dom["branch-color"].style.display = "block"
    }

    if (value["image-src"]) {
        dom["image-size"].style.display = "block"
        dom["add-image"].className += " active"
    } else {
        dom["image-size"].style.display = "none"
        dom["add-image"].className = "toolbar-buttons"
    }

    if (value["fixed"]) {
        dom["lock-node"].src = "img/toolbar/lock.png"
    } else {
        dom["lock-node"].src = "img/toolbar/unlock.png"
    }

    if (value["bold"]) {
        dom["bold"].className += " active"
    } else {
        dom["bold"].className = "toolbar-buttons"
    }

    if (value["italic"]) {
        dom["italic"].className += " active"
    } else {
        dom["italic"].className = "toolbar-buttons"
    }

    utils.selectedNode = {key, value}
})

mmp.onclick = function () {
    dom["background-color"].jscolor.hide()
    dom["text-color"].jscolor.hide()
    dom["branch-color"].jscolor.hide()
}

mmp.init("mmp")