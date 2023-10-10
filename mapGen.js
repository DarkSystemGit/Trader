const Jimp = require('jimp')
async function main(){
const image = await Jimp.read(process.argv[0]);
var img={colors:[]}
for(var x=0;i<image.bitmap.height+1;i++){
    img[x]=[]
    for(var y=0;y<image.bitmap.width+1;y++){
        img[x].push(Jimp.intToRGBA(image.getPixelColor(x, y)))
        if(!img.colors.includes(Jimp.intToRGBA(image.getPixelColor(x, y)))&&!(Jimp.intToRGBA(image.getPixelColor(x, y)).b==Math.max(...Object.values(Jimp.intToRGBA(image.getPixelColor(x, y)))))){
            img.colors.push(Jimp.intToRGBA(image.getPixelColor(x, y)))
        }
    }
}
console.log(img.colors)    
}
main()
