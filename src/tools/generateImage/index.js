import path from "path";
import { createCanvas, loadImage } from 'canvas';

import { desaturate } from '../../filters/desaturate';
import { colorizeRGB } from "../../filters/colorize";

import apparel from "../../../config/apparel.json";

export async function getGeneratedImageBuffer([red,green,blue], pepeType){

    let apparelType = `TSHIRT`;
    let apparelObject = apparel.shirts[apparelType];
    let logoObject = apparel.logos[pepeType];
    let canvas = createCanvas(1000, 1000);

    let shirtImageObj = await loadImage(path.resolve(__dirname,'..','..','..','assets',apparelObject.url));

    canvas.getContext("2d").drawImage(
        shirtImageObj, 
        0,
        0,
        1000 ,
        1000
    );

    const greyed = desaturate(canvas);
    const colorized = colorizeRGB(greyed, {red,green,blue});
    
    let pepeImageObj = await loadImage(path.resolve(__dirname,'..','..','..','assets',logoObject.url));

    let h = 400;
    let w = 400;
    colorized.getContext('2d').drawImage(
        pepeImageObj, 
        apparelObject.centerX - w / 2,
        apparelObject.centerY - h / 2,
        w,
        h
    );

    var buffer = colorized.toBuffer();
    return buffer;

}