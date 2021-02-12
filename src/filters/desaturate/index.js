import { getDestination, toImageData } from '../../utility';

export const desaturate = (canvas, options = {}) => {
    
    const { srcPixels, srcLength } = toImageData(canvas),
        { dstCanvas , dstCtx , dstImageData, dstPixels } = getDestination(),
        r = options.r === undefined ? 1 : options.r,
        g = options.g === undefined ? 1 : options.g,
        b = options.b === undefined ? 1 : options.b;

    for (let i = 0; i < srcLength; i += 4) {

        const intensity = (srcPixels[i] * 19595 + srcPixels[i + 1] * 38470 + srcPixels[i + 2] * 7471) >> 16;
        dstPixels[i] = intensity * r;
        dstPixels[i + 1] = intensity * g;
        dstPixels[i + 2] = intensity * b;
        dstPixels[i + 3] = srcPixels[i + 3];
        
    }

    dstCtx.putImageData(dstImageData, 0,0);

    return dstCanvas;

}

// export const redScale = function(canvas, options){

        
//     const { srcPixels, srcLength } = toImageData(canvas);
//     const { dstCanvas , dstCtx , dstImageData, dstPixels } = getDestination(); 

//     for (var i = 0; i < srcLength; i += 4) {

//         var intensity = (srcPixels[i] * 19595 + srcPixels[i + 1] * 38470 + srcPixels[i + 2] * 7471) >> 16;
//         dstPixels[i] = intensity * 1.16;
//         dstPixels[i + 1] = dstPixels[i + 2] = 0;
        
//         dstPixels[i + 3] = srcPixels[i + 3];
        
//     }

//     dstCtx.putImageData(dstImageData, 0,0);

//     return dstCanvas;

// }