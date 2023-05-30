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
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
jest.mock("fs/promises", () => {
    return {
        readFile: jest.fn().mockResolvedValue("hello"),
    };
});
describe("getImageByIdController", () => {
    beforeEach(() => { });
    it("returns a 200 for a JPG file", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                imageId: "test.jpg",
            },
        };
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();
        yield (0, controller_1.getImageByIdController)(req, res, next);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/jpg");
        expect(res.send).toHaveBeenCalledWith("hello");
        expect(res.status).toHaveBeenCalledWith(200);
    }));
    it("returns a 201 for a PNG file", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                imageId: "test.png",
            },
        };
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();
        yield (0, controller_1.getImageByIdController)(req, res, next);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/png");
        expect(res.send).toHaveBeenCalledWith("hello");
        expect(res.status).toHaveBeenCalledWith(200);
    }));
});
