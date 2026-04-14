const express = require("express");
const multer = require("multer");
const { create } = require("ipfs-http-client");
const crypto = require("crypto");

const app = express();
const upload = multer();

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

app.use(express.json());

// Upload Certificate to IPFS
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file.buffer;

        const result = await ipfs.add(file);

        const hash = crypto.createHash("sha256")
            .update(file)
            .digest("hex");

        res.json({
            ipfsHash: result.path,
            certHash: hash
        });

    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));