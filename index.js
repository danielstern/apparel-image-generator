import path from "path";
import { createCanvas, loadImage } from 'canvas';


export async function getImageString(){

    let canvas = createCanvas(750, 750);

    
    const ctx=canvas.getContext("2d");

    let pepeImageObj = await loadImage(path.resolve(__dirname,'assets','shirt-red.png'));

    ctx.drawImage(
        pepeImageObj, 
        0,
        0,
        1000 ,
        1000
    );

    var buffer = canvas.toBuffer();

    return buffer;

    // let image_string = canvas.toDataURL();
    // // const im = image_string.split(",")[1];

    // const img = Buffer.from(image_string, 'base64');

    // return img;
}