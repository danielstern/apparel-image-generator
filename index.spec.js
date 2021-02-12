import express from "express";

import { urlencoded, json } from 'body-parser';
import { getImageString } from ".";

// import cors from 'cors';

const app = new express();

app.use(json());
app.listen(7778, console.info("Dev server listening on 7778"));



app.use("/image", async(req,res)=>{

    const img = await getImageString();

    // const im = image_string.split(",")[1];


    // const img = Buffer.from(im, 'base64');

    res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
    });

    res.end(img); 

// res.send("Hello world");


});