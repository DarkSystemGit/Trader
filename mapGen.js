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
    img ={}
    raw.forEach((pixels,x)=>{
        img[x]=[]
        pixels.forEach((pixel,y)=>{
            img[x][y]=pixel
        })
        
    })
}
var img = getPixels(process.argv[2],[320])    
var colors={grass:[0,171,61],snow:[255,255,255]}


//fs.writeFileSync('img.bin',image.bitmap.data.toString().match(/(.|[\r\n]){1,4}/g).join())
   
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
