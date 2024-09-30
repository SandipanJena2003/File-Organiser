#!/usr/bin/env node
let inputArr=process.argv.slice(2);
let fs= require("fs");
let path= require("path");
let helpobj= require("./commands/help");
let treeobj= require("./commands/tree");
let organizeobj= require("./commands/organize");
let destpath;
const { deserialize } = require("v8");
//console.log(inputArr);
//node main.js tree "directorypath"
// node main.js organize "directory path"
// node main.js help
let command=inputArr[0];
let types={
    media:["mp4,mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso',"xz"],
    docoments:['docx','doc','pdf','xlsx','xls','odt','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg',"deb"]
}
switch (command) {
    case "tree": 
        treeobj.treekey(inputArr[1]);
        break;
    case "organize":
        organizeobj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpobj.helpKey();
        break;
    default:
        console.log("Please input right command");
        break;
}
