import { Request, Response } from "express";
import { parseFile } from "../utils/parser";

export class FileUploadController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const person = await parseFile(file.path);

    return response.json({
      person,
    });
  }
}
