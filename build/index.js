"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const app = (0, express_1.default)();
const port = 3000;
// ROUTES
app.post("/upload", controller_1.uploadImageController);
app.get("/image/:imageId", controller_1.getImageByIdController);
// ERROR HANDLING
app.use("*", (e, req, res, next) => {
    let error;
    if (e.custom === true) {
        error = e;
    }
    else {
        error = {
            custom: false,
            message: "something went wrong",
            status: 500,
            error: e,
        };
    }
    // intentional for debugging
    console.log("error = ", error);
    return res.status(error.status || 500).json(Object.assign({}, error));
});
// START THE SERVER
app.listen(port, () => {
    console.log(`Image server app listening on port ${port}`);
});
