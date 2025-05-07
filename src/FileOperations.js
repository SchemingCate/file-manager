import { createReadStream } from "node:fs";
import { EOL } from "node:os";

export class FileOperations {
  path_manager;

  constructor(path_manager) {
    this.path_manager = path_manager;
  }

  async printFileContent(filePath, ...args) {
    if (!filePath || args.length)
      throw new Error("Invalid amount of arguments");

    this.path_manager.getValidPath(filePath, true).then((fileP) => {
      let content = "";
      const readStream = createReadStream(fileP, { encoding: "utf8" });

      readStream.on("data", (chunk) => {
        content += chunk + EOL;
      });

      readStream.on("end", () => {
        console.log(content);
      });
    });
  }
}
