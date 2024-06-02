
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const express = require("express");
const brandModel = require("./models/brandName");
require("./db/conn");
const { upload } = require("./middleware/multer");

const app = express();
const PORT = process.env.PORT || 5200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/addImages", upload.single("images"), async (req, res) => {
    let brandNameFromBody = req.body.brandName;
    let brandName = brandNameFromBody.replace(/ /g, "_").toLowerCase();
    console.log("brandName", brandName);
    let imageDetails = req.file;
    const dir = path.join(__dirname, `../uploads/${imageDetails.filename}`);
    console.log('dir', dir);
    try {
        const images = req.file.filename;

        const data = {
            images: `${brandName}${path.extname(imageDetails.originalname)}`,
            brandName: brandName,
        };

        const postData = new brandModel(data);
        const carData = await postData.save();
        console.log('carData', carData);
        
        const filePathUpload = path.join(__dirname, `./public/brandImages/${brandName}`);
        const destinationDirectory = path.join(filePathUpload, `${brandName}${path.extname(imageDetails.originalname)}`);
        console.log('filePathUpload', filePathUpload);
        if (!fs.existsSync(filePathUpload)) {
            fs.mkdirSync(filePathUpload, { recursive: true });
        }

        fs.rename(dir, destinationDirectory, (err) => {
            if (err) {
                console.log("error", err);
                return res.status(500).send({
                    success: false,
                    msg: "Data Not Added"
                });
            }

            res.status(200).send({
                success: true,
                Message: "Data Save Successfully",
                data: carData,
            });
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            success: false,
            Message: "Data Not Saved Successfully",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});