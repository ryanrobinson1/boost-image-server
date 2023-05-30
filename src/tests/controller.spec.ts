import { getImageByIdController } from "../controller";

jest.mock("fs/promises", () => {
  return {
    readFile: jest.fn().mockResolvedValue("hello"),
  };
});

describe("getImageByIdController", () => {
  beforeEach(() => {});

  it("returns a 200 for a JPG file", async () => {
    const req: any = {
      params: {
        imageId: "test.jpg",
      },
    };
    const res: any = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await getImageByIdController(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/jpg");
    expect(res.send).toHaveBeenCalledWith("hello");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns a 201 for a PNG file", async () => {
    const req: any = {
      params: {
        imageId: "test.png",
      },
    };
    const res: any = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await getImageByIdController(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/png");
    expect(res.send).toHaveBeenCalledWith("hello");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
