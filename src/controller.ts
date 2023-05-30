import { Request, Response, NextFunction } from "express";
import formidable, { Files } from "formidable";
import { readFile, rename } from "fs/promises";
import path from "path";

export const getImageByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageId } = req.params;
    const filePath = path.join(__dirname, "../uploads", imageId);
    const ext = imageId.split(".")[1];

    const image = await readFile(filePath);

    res.setHeader("Content-Type", `image/${ext}`);
    return res.status(200).send(image);
  } catch (error) {
    return next(error);
  }
};

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uploadDir = path.join(__dirname, "../uploads");

    const form = formidable({
      multiples: false,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
      uploadDir,
    });

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        return next(err);
      }

      const file = files.image as formidable.File;

      const fieldname = file.originalFilename?.split(".")[0];
      const currentDate = Date.now();
      const random = Math.round(Math.random() * 1e9);
      const ext = file.mimetype?.split("/")[1];
      const name = `${fieldname}-${currentDate}-${random}.${ext}`;

      const newPath = path.join(uploadDir, name);

      await rename(file.filepath, newPath);

      res.setHeader("Content-Type", "application/json");
      return res.send(JSON.stringify({ fields, files, uuid: name }));
    });
  } catch (error) {
    return next(error);
  }
};

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
