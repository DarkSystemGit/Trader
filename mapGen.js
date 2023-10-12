const Jimp = require('jimp')
const fs = require('fs')
async function main(){
const image = await Jimp.read(process.argv[2]);
var colors={grass:[0,171,61],snow:[255,255,255]}
var img={}
for(var x=0;x<image.bitmap.height+1;x++){
    img[x]=[]
    for(var y=0;y<image.bitmap.width+1;y++){
        //img[x].push(Jimp.intToRGBA(image.getPixelColor(x, y)))
        var tmp=Jimp.intToRGBA(image.getPixelColor(x, y))
        //console.log(img.colors.indexOf(tmp))
        
        img[x].push(tmp)
    }
}

var pixelObj ={x:"",y:"",tile:""}
var file=[]
Object.values(img).slice(1).forEach((imgRows,x)=>{
    //console.log(imgRows)
    imgRows.forEach((pixel,y)=>{
        pixelObj.x =x
        pixelObj.y =y
        //f(Object.values(pixel).slice(0,-1)[2]==61){
        //console.log(Object.values(colors),Object.values(pixel).slice(0,-1))}
        if(Object.values(colors).indexOf(Object.values(pixel).slice(0,-1))){
            var color="ocean";
            //console.log(Object.values(pixel).slice(0,-1),[0,171,61],[0,171,61]==[0,171,61],Object.values(pixel).slice(0,-1)==[0,171,61])
            if(JSON.stringify(Object.values(pixel).slice(0,-1))==JSON.stringify([0,171,61])){
                color ="PgH9Mr1DWW5Qgp"
            }else if(JSON.stringify(Object.values(pixel).slice(0,-1))==JSON.stringify([255,255,255])){
                color ="id2fWqw7gGj1QC9"
            }
            /*Object.values(colors).forEach((colorVal,index)=>{
                console.log(colors[Object.keys(colors)[index]],Object.values(pixel).slice(0,-1),colors[Object.keys(colors)[index]]===Object.values(pixel).slice(0,-1))
                if(colors[Object.keys(colors)[index]]===Object.values(pixel).slice(0,-1)){
                    color = Object.keys(colors)[index]
                }
            })
            pixelObj.tile= color
            //console.log(pixelObj.tile)*/
            if(!(color=="ocean")){
            file.push(`
            - x: ${pixelObj.x}
                'y': ${pixelObj.y}
                opacity: 1
                tint: 16777215
                scale:
                    x: 1
                    'y': 1
                frame: 0
                rotation: 0
                texture: PgH9Mr1DWW5Qgp
            `)}
        }
    })
})
 fs.writeFileSync("./map.ict",file.join('')) 
}
main()
