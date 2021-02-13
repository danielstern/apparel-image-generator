import express from "express";
import { getGeneratedImageBuffer } from "./tools/generateImage";
import path from "path";
import fs from 'fs';

import config from '../config';

const PORT = process.env.PORT || 7780;
const app = new express();
const validLogos = Object.keys(config.logos);

app.listen(PORT, console.info("Image generation server listening on " + PORT));;

app.use("/generate/:color/:logo", async(req,res)=>{

    const [red,green,blue] = req.params.color.split(',');

    if (red === undefined || blue === undefined || green === undefined) {

        res.send("<h2>Error: Invalid color selection. Define color as RGB seperated by commas, e.g. 4,25,0");
        return;
    }

    if (!req.params.logo.toUpperCase || !validLogos.includes(req.params.logo.toUpperCase())) {

        res.send("<h2>Error: Invalid logo selection. Valid logos:" + validLogos.join(", "));
        return;
    }

    const img = await getGeneratedImageBuffer({red,green,blue}, req.params.logo.toUpperCase());

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });

    res.end(img); 


});

app.use('/', (req, res) => {

    const index = fs.readFileSync(path.join(__dirname,"..","public","index.html"), "utf8");
    res.send(index
        .replace(`<!--%VALIDLOGOS%-->`, validLogos.join(', ')));

});