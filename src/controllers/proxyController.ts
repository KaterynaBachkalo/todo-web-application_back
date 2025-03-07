import { Request, Response } from "express";
import { catchAsync } from "../utils";
import axios from "axios";

interface CustomRequest extends Request {
  query: {
    url: string;
  };
}

const proxyController = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const response = await axios(url, {
      responseType: "stream", // Потокова передача даних
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    // Стрімимо тіло відповіді напряму в респонс
    response.data.pipe(res);
  }
);

export default proxyController;
