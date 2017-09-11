/* Render process imports */
const fs = require("fs")
const {remote} = require("electron")
const {dialog, Menu} = remote

/* Dom elements */
const dom = {
    "main": document.getElementById("main"),
    "loader": document.getElementById("loader"),
    "toolbar": document.getElementById("toolbar"),

    "background-color": document.getElementById("background-color"),
    "text-color": document.getElementById("text-color"),
    "branch-color": document.getElementById("branch-color"),

    "font-size": document.getElementById("font-size"),
    "image-size": document.getElementById("image-size"),

    "add-image": document.getElementById("add-image"),
    "lock-node": document.getElementById("lock-node"),
    "bold": document.getElementById("bold"),
    "italic": document.getElementById("italic")
}

/* Mindmapp util functions */
const utils = {
    selectedNode: {},
    filePath: "",
    dialog: {},
    actions: {}
}