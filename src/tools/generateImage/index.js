import path from "path";
import { createCanvas, loadImage } from 'canvas';

import { desaturate } from '../../filters/desaturate';
import { colorizeRGB } from "../../filters/colorize";

import apparel from "../../../config/apparel.json";

import { path as root } from 'app-root-path';

export async function getGeneratedImageBuffer([red,green,blue], pepeType, apparelType){

    let apparelDefinition = apparel.apparelTypes[apparelType];
    let logoDefinition = apparel.logos[pepeType];

    let apparelImage = await loadImage(path.resolve(root,'assets',apparelDefinition.url));
    let logoImage = await loadImage(path.resolve(root,'assets',logoDefinition.url));


    let mainCanvas = createCanvas(1000, 1000);
    let colorizeCanvas = createCanvas(1000, 1000); 
    let ctx = mainCanvas.getContext("2d");

    ctx.fillStyle ="#FFFFFF";
    ctx.fillRect(0,0,1000,1000);

    colorizeCanvas.getContext("2d").drawImage(
        apparelImage, 
        0,
        0,
        1000 ,
        1000
    );

    const greyed = desaturate(colorizeCanvas);
    const colorized = colorizeRGB(greyed, {red,green,blue});

    let h = 400 * (logoDefinition.adjustScale || 1) * (apparelDefinition.adjustScale || 1);
    let w = 400 * (logoDefinition.adjustScale || 1) * (apparelDefinition.adjustScale || 1);
    colorized.getContext('2d').drawImage(
        logoImage, 
        (apparelDefinition.centerX - w / 2) + (logoDefinition.adjustHorizontalPosition || 0) * w,
        (apparelDefinition.centerY - h / 2) + (logoDefinition.adjustVerticalPosition || 0) * h,
        w,
        h
    );

    mainCanvas.getContext('2d').drawImage(colorized, 0, 0);

    var buffer = mainCanvas.toBuffer();
    return [buffer, mainCanvas.getContext('2d').getImageData(0,0,1000,1000)];

}