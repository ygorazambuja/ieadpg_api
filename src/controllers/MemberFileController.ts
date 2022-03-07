import { Request, Response } from "express";
import { join } from "path";
import { renderFile } from "ejs";

export class MemberFileController {
  async handle(request: Request, response: Response) {
    const member = request.body;
    const memberFilePath = join(__dirname, "..", "assets", "memberFile.ejs");

    renderFile(memberFilePath, { member }, (err, html) => {
      if (err) {
        response.status(500).send(err);
      }

      return response.send(html);
    });
  }
}
