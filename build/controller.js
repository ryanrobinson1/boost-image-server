"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageController = exports.getImageByIdController = void 0;
const formidable_1 = __importDefault(require("formidable"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const getImageByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageId } = req.params;
        const filePath = path_1.default.join(__dirname, "../uploads", imageId);
        const ext = imageId.split(".")[1];
        const image = yield (0, promises_1.readFile)(filePath);
        res.setHeader("Content-Type", `image/${ext}`);
        return res.status(200).send(image);
    }
    catch (error) {
        return next(error);
    }
});
exports.getImageByIdController = getImageByIdController;
const uploadImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadDir = path_1.default.join(__dirname, "../uploads");
        const form = (0, formidable_1.default)({
            multiples: false,
            maxFileSize: 5 * 1024 * 1024,
            keepExtensions: true,
            uploadDir,
        });
        form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (err) {
                return next(err);
            }
            const file = files.image;
            const fieldname = (_a = file.originalFilename) === null || _a === void 0 ? void 0 : _a.split(".")[0];
            const currentDate = Date.now();
            const random = Math.round(Math.random() * 1e9);
            const ext = (_b = file.mimetype) === null || _b === void 0 ? void 0 : _b.split("/")[1];
            const name = `${fieldname}-${currentDate}-${random}.${ext}`;
            const newPath = path_1.default.join(uploadDir, name);
            yield (0, promises_1.rename)(file.filepath, newPath);
            res.setHeader("Content-Type", "application/json");
            return res.send(JSON.stringify({ fields, files, uuid: name }));
        }));
    }
    catch (error) {
        return next(error);
    }
});
exports.uploadImageController = uploadImageController;
/**
 * Deployment
 *
 * 1. Dockerise the app
 * 2. Deploy to AWS ECR
 * 3. Deploy to AWS ECS, fargate (i'd need a few days to setup) or deploy to AWS EC2
 * 3.1. EC2, login to EC2 and pull the image from ECR and run it
 *
 * Notes:
 * As scaling is important, fargate would be the best option as it scales automatically.
 *
 *
 *
 * Features
 * UploadImageController
 * - add validation for file type
 * - allow user to specify the name of the file
 * - allow multiple files to be uploaded
 * - extend to allow for requirements in the context of the project e.g. remote URLs, images in the repo
 * - add a service layer to handle the business logic such as image manipulation
 *
 *
 *
 *
 * Tests
 * - test for invalid file types (both create and read)
 * - test for invalid file size upload
 * - test error handling for any unexpected errors
 *
 */
