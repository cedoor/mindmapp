utils.actions.updateColor = function (el, vis) {
    let props = ["background-color", "text-color", "branch-color"],
        value = "#" + el.value
    switch (el.id) {
        case props[0]:
            mmp.node.update(props[0], value, vis)
            break
        case props[1]:
            mmp.node.update(props[1], value, vis)
            break
        case props[2]:
            mmp.node.update(props[2], value, vis)
    }
}

utils.actions.lock = function () {
    if (utils.selectedNode.key !== "node0") {
        if (utils.selectedNode.value["fixed"]) {
            dom["lock-node"].src = "img/toolbar/unlock.png"
        } else {
            dom["lock-node"].src = "img/toolbar/lock.png"
        }
        mmp.node.update("fixed")
    }
}

utils.actions.bold = function () {
    if (!utils.selectedNode.value["bold"]) {
        dom["bold"].className += " active"
    } else {
        dom["bold"].className = "toolbar-buttons"
    }
    mmp.node.update("bold")
}

utils.actions.italic = function () {
    if (!utils.selectedNode.value["italic"]) {
        dom["italic"].className += " active"
    } else {
        dom["italic"].className = "toolbar-buttons"
    }
    mmp.node.update("italic")
}
