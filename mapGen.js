const Jimp = require('jimp')
const fs = require('fs')
const yaml = require('js-yaml')
async function main(){
const image = await Jimp.read(process.argv[2]);
var colors={grass:[0,171,61],snow:[255,255,255]}
var img={}
for(var x=0;x<image.bitmap.height;x++){
    img[x]=[]
    for(var y=0;y<image.bitmap.width;y++){
        //img[x].push(Jimp.intToRGBA(image.getPixelColor(x, y)))
        var tmp=Jimp.intToRGBA(image.getPixelColor(x, y))
        //console.log(img.colors.indexOf(tmp))
        
        img[x].push(tmp)
    }
}
if((x==320)&&(y==180)){
    console.log('correct size')

}
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
