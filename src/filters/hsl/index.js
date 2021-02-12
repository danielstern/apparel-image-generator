import { getDestination, toImageData, rgbToHsl, hslToRgb } from '../../utility';

export const hsl = function (canvas, hueDelta = 0, satDelta = 0, lightness = 0) {
    
    const { srcPixels, srcLength } = toImageData(canvas),
        { dstCanvas , dstCtx , dstImageData, dstPixels } = getDestination(); 

    hueDelta /= 360;
    satDelta /= 100;
    lightness /= 100;

    let h, s, l, hsl, rgb, i;

    for (i = 0; i < srcLength; i += 4) {

        hsl = rgbToHsl(srcPixels[i], srcPixels[i + 1], srcPixels[i + 2]);

        // hue
        h = hsl[0] + hueDelta;
        while (h < 0) {
            h += 1;
        }
        while (h > 1) {
            h -= 1;
        }

        // saturation
        s = hsl[1] + hsl[1] * satDelta;
        if (s < 0) {
            s = 0;
        }
        else if (s > 1) {
            s = 1;
        }

        // lightness
        l = hsl[2];
        if (lightness > 0) {
            l += (1 - l) * lightness;
        }
        else if (lightness < 0) {
            l += l * lightness;
        }

        // convert back to rgb
        rgb = hslToRgb(h, s, l);

        dstPixels[i]     = rgb[0];
        dstPixels[i + 1] = rgb[1];
        dstPixels[i + 2] = rgb[2];
        dstPixels[i + 3] = srcPixels[i + 3];
    }

    dstCtx.putImageData(dstImageData, 0,0);
    return dstCanvas;
};