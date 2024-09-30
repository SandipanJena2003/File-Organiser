let inputArr=process.argv.slice(2);
let fs= require("fs");
let path= require("path");
function treeFn(dirPath){
    if(dirPath==undefined){
        treehelper(process.cwd()," ");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist){
           treehelper(dirPath," ");
        }
        else{
            console.log("Kindly enter the correct Path");
            return;
        }
    }
}
function treehelper(dirPath,indent) {
    //is file or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if (isFile==true) {
        let fileName=path.basename(dirPath);
        console.log(indent+"-----"+fileName);
    }
    else{
        let dirname=path.basename(dirPath);
        console.log(indent+"~~~~~"+dirname);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
        {
            let childpath=path.join(dirPath,childrens[i]);
            treehelper(childpath,indent+"\t");
        }
    }
}
module.exports={
    treekey:treeFn
}