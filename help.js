let inputArr=process.argv.slice(2);
let fs= require("fs");
let path= require("path");
function helpFn(dirPath){
    console.log('Your code is running very nicely nothing to worry about');
}
module.exports={
    helpKey: helpFn
}