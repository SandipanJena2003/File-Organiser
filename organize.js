let inputArr=process.argv.slice(2);
let fs= require("fs");
let path= require("path");
let types={
    media:["mp4,mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso',"xz"],
    docoments:['docx','doc','pdf','xlsx','xls','odt','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg',"deb"]
}
function organizeFn(dirPath){
    // console.log("Orgnaise command is implemneted for",dirPath);
    //input -> directory path given
    if(dirPath==undefined){
        destpath=process.cwd();
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist){
            //create -> organize files-> directory
            destpath= path.join(dirPath,"organized_files");
            if (fs.existsSync(destpath)==false) {
                 fs.mkdirSync(destpath);
            }
        }
        else{
            console.log("Kindly enter the correct Path");
            return;
        }
    }
    organizehelper(dirPath,destpath);
    
   
}
function organizehelper(src,dest) {
    //Identify categories of all files in that folder->
    let childname=fs.readdirSync(src);
    // console.log(childname);
    for(let i=0;i<childname.length;i++)
    {
        let childaddress=path.join(src,childname[i]);
        let isfile=fs.lstatSync(childaddress).isFile();
        if(isfile){ 
        
        // console.log(childname[i]);
            let category=getCategory(childname[i]);
            console.log(childname[i],"belongs to ==>",category);
            //copy / cut files to that organized directory inside any of category folder
            sendFiles(childaddress,dest,category);
        }
    }
}
function sendFiles(srcFile,dest,category){
    let categorypath= path.join(dest,category);
    if(fs.existsSync(categorypath)==false)
    {
        fs.mkdirSync(categorypath);
    }
    let fileName=path.basename(srcFile);
    let destfilePath= path.join(categorypath,fileName);
    fs.copyFileSync(srcFile,destfilePath);
    fs.unlinkSync(srcFile);
    console.log(fileName,"copied To",category);
}
function getCategory(name) {
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {
        let cTypeArr=types[type];
        for(let i=0;i<cTypeArr.length;i++)
        {
            if(ext==cTypeArr[i])
            {
                return type;
            }

        }
    }
    return "others";    
    // console.log(ext);
}
module.exports={
    organizeKey:organizeFn
}