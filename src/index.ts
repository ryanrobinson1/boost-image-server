import express, { Request, Response, NextFunction } from "express";
import { getImageByIdController, uploadImageController } from "./controller";

const app = express();
const port = 3000;

// APP CONFIG
interface CustomError {
  custom: boolean;
  message: string;
  status: number;
  error: any;
}

// ROUTES
app.post("/upload", uploadImageController);

app.get("/image/:imageId", getImageByIdController);

// ERROR HANDLING
app.use("*", (e: any, req: Request, res: Response, next: NextFunction) => {
  let error: CustomError;

  if (e.custom === true) {
    error = e as CustomError;
  } else {
    error = {
      custom: false,
      message: "something went wrong",
      status: 500,
      error: e,
    };
  }

  // intentional for debugging
  console.log("error = ", error);

  return res.status(error.status || 500).json({
    ...error,
  });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Image server app listening on port ${port}`);
});
