import { createCanvas } from 'canvas';

export const toImageData = (canvas) => {
     
    const srcImageData = canvas.getContext('2d').getImageData(0,0,1000,1000),
        srcPixels = srcImageData.data;

    return {

        srcImageData,
        srcPixels,
        srcPixels : srcImageData.data,
        srcWidth : srcImageData.width,
        srcHeight :srcImageData.height,
        srcLength : srcPixels.length

    }

}

export const getDestination = () => {

    const dstCanvas = createCanvas(1000, 1000),
        dstCtx = dstCanvas.getContext('2d'),
        dstImageData = dstCtx.getImageData(0,0,1000,1000);

    return {
        dstCanvas,
        dstCtx,
        dstImageData,
        dstPixels : dstImageData.data,
    };
}

export const rgbToHsl = (r, g, b) => {

    r /= 255;
    g /= 255;
    b /= 255;

    var max = (r > g) ? (r > b) ? r : b : (g > b) ? g : b,
        min = (r < g) ? (r < b) ? r : b : (g < b) ? g : b,
        chroma = max - min,
        h = 0,
        s = 0,
        l = (min + max) / 2;

    if (chroma !== 0) {

        if (r === max) {
            h = (g - b) / chroma + ((g < b) ? 6 : 0);
        }
        else if (g === max) {
            h = (b - r) / chroma + 2;
        }
        else {
            h = (r - g) / chroma + 4;
        }
        h /= 6;

        s = (l > 0.5) ? chroma / (2 - max - min) : chroma / (max + min);
    }

    return [h, s, l];

}

export const hslToRgb = (h, s, l) => {
    var m1, m2, hue,
        r, g, b,
        rgb = [];

    if (s === 0) {
        r = g = b = l * 255 + 0.5 | 0;
        rgb = [r, g, b];
    }
    else {
        if (l <= 0.5) {
            m2 = l * (s + 1);
        }
        else {
            m2 = l + s - l * s;
        }

        m1 = l * 2 - m2;
        hue = h + 1 / 3;

        var tmp;
        for (var i = 0; i < 3; i += 1) {
            if (hue < 0) {
                hue += 1;
            }
            else if (hue > 1) {
                hue -= 1;
            }

            if (6 * hue < 1) {
                tmp = m1 + (m2 - m1) * hue * 6;
            }
            else if (2 * hue < 1) {
                tmp = m2;
            }
            else if (3 * hue < 2) {
                tmp = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
            }
            else {
                tmp = m1;
            }

            rgb[i] = tmp * 255 + 0.5 | 0;

            hue -= 1 / 3;
        }
    }

    return rgb;
}