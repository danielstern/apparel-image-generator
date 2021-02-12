import path from "path";
import { createCanvas, loadImage } from 'canvas';

import { desaturate, redScale } from './filters/desaturate';
import { hsl } from "./filters/hsl";

export async function getImageString(){

    let canvas = createCanvas(1000, 1000);

    const ctx=canvas.getContext("2d");

    let pepeImageObj = await loadImage(path.resolve(__dirname,'..','assets','shirt-red.png'));

    ctx.drawImage(
        pepeImageObj, 
        0,
        0,
        1000 ,
        1000
    );

    const greyed = desaturate(canvas, {r: 1.1, g: 0, b: 1.1});
    // const redded = redScale(canvas);
    const adjusted = hsl(greyed);

    // var buffer = canvas.toBuffer();
    // var buffer = redded.toBuffer();
    var buffer = greyed.toBuffer();

    return buffer;

}