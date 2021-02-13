import hexRgb from 'hex-rgb';
import { Color } from '../../config';
// import { getDestination, toImageData } from '../../utility';
import { desaturate } from '../desaturate';

export const colorizeRGB = (canvas, options) => {

    const { red, green, blue } = options;
    const k = 1.2;
    return desaturate(canvas, {r: red / 255 * k, g: green / 255 * k, b: blue / 255 * k});

}
export const colorize = (canvas, options = {hex : Color.chartreuse}) => {

    const { red, green, blue } = hexRgb(options.hex) ;
    return colorizeRGB(canvas, {red, green, blue})
    
}