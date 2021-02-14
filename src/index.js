import express from "express";
import { getGeneratedImageBuffer } from "./tools/generateImage";
import path from "path";
import fs from 'fs';

import colors from '../config/colors.json';
import apparel from '../config/apparel.json';
import hexRgb from "hex-rgb";

const PORT = process.env.PORT || 7780;
const app = new express();
const validLogos = Object.keys(apparel.logos);

function colorSearch(color) {

    for (let key in colors) {

        if (key.toUpperCase().replace(' ', '') === color.toUpperCase()) {

            return colors[key];

        }
    }

    return null;
    

}

app.listen(PORT, console.info("Image generation server listening on " + PORT));;

app.use("/color-index", async(_req, res)=>{

    res.send(`
    <table>
      ${Object.keys(colors).map(color => `<tr><td style='border: 1px solid sandybrown'>${color}</td><td style='width:200;background-color: ${colors[color]}'></td></tr>`).join('')}
    </table>
    `)

});

app.use("/generate/:color/:logo", async(req,res)=>{

    let { color, logo } = req.params;
    let colorsRGB;
    if (color.includes(',')) {

        colorsRGB = color.split(',');
    
        if (colorsRGB.length !== 3) {

            res.send("<h2>Error: Invalid color selection. Define color as RGB seperated by commas, e.g. 4,25,0");
            return;

        }

    } else {

        let found = colorSearch(color);

        if (found) {

            let foundColor = hexRgb(found);
            colorsRGB = [foundColor.red, foundColor.green, foundColor.blue];

        } else {

            res.send(`Error. No color found matching ${color}. Possible matches: ${Object.keys(colors)
                .map(_color => _color.toUpperCase())
                .filter(_color => _color.includes(color.toUpperCase()))
                .join(', ')}`
            );
            return;

        }

    }

    if (!logo || !validLogos.includes(logo.toUpperCase())) {

        res.send("<h2>Error: Invalid logo selection. Valid logos:" + validLogos.join(", "));
        return;
    }

    const img = await getGeneratedImageBuffer(colorsRGB, logo.toUpperCase());

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });

    res.end(img); 


});

app.use('/', (_req, res) => {

    const index = fs.readFileSync(path.join(__dirname,"..","public","index.html"), "utf8");
    res.send(index
        .replace(`<!--%VALIDLOGOS%-->`, validLogos.join(', ')));

});