const fs = require('fs')
const yaml = require('js-yaml')
async function main(){
function getPixels1D(img){return new Promise((resolve)=>{require('png-js').decode(img,(img)=>resolve(img))})};
async function getPixels(img,size){
    function toMatrix(arr, size) 
    {
      var res = []; 
      for(var i=0;i < arr.length;i = i+size)
      res.push(arr.slice(i,i+size));
      return res;
    }
    var raw = await getPixels1D(img)
    raw = toMatrix(raw,size[0])
    raw.forEach((pixel,i)=>{
        var x = Math.floor(i/size.width)
        
    })
}
var colors={grass:[0,171,61],snow:[255,255,255]}
var img={}
image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
  // x, y is the position of this pixel on the image
  // idx is the position start position of this rgba tuple in the bitmap Buffer
  // this is the image
    
  var red = this.bitmap.data[idx + 0];
  var green = this.bitmap.data[idx + 1];
  var blue = this.bitmap.data[idx + 2];
  var alpha = this.bitmap.data[idx + 3];
    if(!img[x]){img[x]=[]}
    img[x].push([red,green,blue,alpha])
  // rgba values run from 0 - 255
  // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
});

fs.writeFileSync('img.bin',image.bitmap.data.toString().match(/(.|[\r\n]){1,4}/g).join())
   
//var pixelObj ={x:"",y:"",tile:""}
var file=[]
Object.values(img).forEach((imgRows,x)=>{
    //console.log(imgRows)
    imgRows.forEach((pixel,y)=>{
        //pixelObj.x =x
        //pixelObj.y =y
        //f(Object.values(pixel).slice(0,-1)[2]==61){
        //console.log(Object.values(colors),Object.values(pixel).slice(0,-1))}

            var tile="ocean";
            //console.log(Object.values(pixel).slice(0,-1),[0,171,61],[0,171,61]==[0,171,61],Object.values(pixel).slice(0,-1)==[0,171,61])
            if(JSON.stringify(Object.values(pixel).slice(0,-1))==JSON.stringify([0,171,61])){
                tile ="zcHDLCkm6n9dWR"
            }else if(JSON.stringify(Object.values(pixel).slice(0,-1))==JSON.stringify([255,255,255])){
                tile ="k5FQ6K4TLwdWCk"
            }
            /*Object.values(colors).forEach((colorVal,index)=>{
                console.log(colors[Object.keys(colors)[index]],Object.values(pixel).slice(0,-1),colors[Object.keys(colors)[index]]===Object.values(pixel).slice(0,-1))
                if(colors[Object.keys(colors)[index]]===Object.values(pixel).slice(0,-1)){
                    color = Object.keys(colors)[index]
                }
            })
            pixelObj.tile= color
            //console.log(pixelObj.tile)*/
            if(!(tile=="ocean")){
            file.push({x,y,texture:tile,opacity:1,tint:16777215,scale:{x:1,y:1},frame:0,rotation:0})

            }

    })
})
var game = yaml.load(fs.readFileSync(process.argv[3]))
file.forEach((elm,index)=>{

        game.rooms["0"].tiles["0"].tiles[index]=elm
})

 fs.writeFileSync(process.argv[4],yaml.dump(game))
}
main()
