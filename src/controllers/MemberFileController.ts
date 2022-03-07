import { Request, Response } from "express";
import { resolve } from "path";
import { renderFile } from "ejs";

export class MemberFileController {
  async handle(request: Request, response: Response) {
    const member = request.body;

    const memberFilePath = resolve(__dirname, "..", "pdfs", "memberFile.ejs");

    renderFile(memberFilePath, { member }, (err, html) => {
      if (err) {
        response.status(500).send(err);
      }

      return response.send(html);
    });
  }
}
