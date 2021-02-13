import express from "express";
import { getGeneratedImageBuffer } from "./tools/generateImage";
import path from "path";

const app = new express();

app.listen(7779, console.info("Dev server listening on 7779"));

app.use("/test", async(req,res)=>{

    const { red = 255, green = 0, blue = 0, image} = req.query;
    const img = await getGeneratedImageBuffer({red,green,blue});

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });

    res.end(img); 


});

app.use('/', (req, res) => {

    res.sendFile(path.join(__dirname,"index.spec.html"));

});