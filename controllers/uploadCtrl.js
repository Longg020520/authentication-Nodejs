const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_API_SECRET,
    api_key: process.env.CLOUD_API_KEY,
})

const uploadCtrl = {
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath)
                console.log({ result })
                res.json({ url: result.secure_url })
            })

            // cloudinary.v2.api.resources({
            //     type: 'upload',
            //     prefix: 'avatar/'
            // },
            //     function (error, result) {
            //         if (error) throw error
            //         console.log(result)
            //     });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message })
        }

    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = uploadCtrl