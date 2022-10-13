import { Router } from "express";
import { uploadAvatar } from "../../loaders/multer";

const router = Router();

router.post("/upload", uploadAvatar, (req, res) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
    const { name } = req.body;

    console.log(destination, filename, size);
});

export default router;