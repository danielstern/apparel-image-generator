import path from "path";
import { createCanvas, loadImage } from 'canvas';

import { desaturate } from '../../filters/desaturate';
import { colorizeRGB } from "../../filters/colorize";

import config from "../../../config";

export async function getGeneratedImageBuffer({red,green,blue}, pepeType){

    let apparelType = `TSHIRT`;
    let canvas = createCanvas(1000, 1000);

    let shirtImageObj = await loadImage(path.resolve(__dirname,'..','..','..','assets',config.shirts[apparelType].url));

    canvas.getContext("2d").drawImage(
        shirtImageObj, 
        0,
        0,
        1000 ,
        1000
    );

    const greyed = desaturate(canvas);
    const colorized = colorizeRGB(greyed, {red,green,blue});
    
    let pepeImageObj = await loadImage(path.resolve(__dirname,'..','..','..','assets',config.logos[pepeType].url));

    let h = 400;
    let w = 400;
    colorized.getContext('2d').drawImage(
        pepeImageObj, 
        config.shirts[apparelType].centerX - w / 2,
        config.shirts[apparelType].centerY - h / 2,
        w,
        h
    );

    var buffer = colorized.toBuffer();
    return buffer;

}