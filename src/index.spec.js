import express from "express";
import { getImageString } from ".";

const app = new express();

app.listen(7779, console.info("Dev server listening on 7779"));

app.use("*", async(req,res)=>{

    const img = await getImageString();

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });

    res.end(img); 


});