import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import Logger from "./logger";
import fs from "fs";

dotenv.config();

const IMAGE_PATH = path.resolve('./public/images');

try {
	fs.readdirSync(IMAGE_PATH);
} catch (error) {
	Logger.error('❌Not exist direcotry');
	fs.mkdirSync(IMAGE_PATH, { recursive: true });
}


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, IMAGE_PATH);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '_' + uniqueSuffix + '.' + file.mimetype.split("/")[1] ?? "");
	}
})
/**
 * 유저 프로필 사진 업로드에 대한 multer 세팅
 */
const multerAvatar = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 5MB 제한
	fileFilter: function (req, file, done) { // 이미지 형식 파일만 필터링
		if (file.mimetype.lastIndexOf('image') > -1) {
			done(null, true); // 파일 허용
		} else {
			done(null, false); // 파일 거부
		}
	},

});

export const uploadAvatar = multerAvatar.single('avatar'); // 'avatar'는  front에서 받아오는 field 명