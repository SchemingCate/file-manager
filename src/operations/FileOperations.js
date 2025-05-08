import { createReadStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { join as joinPath } from "node:path";

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

  async createFile(name, ...args) {
    if (!name || args.length) throw new Error("Invalid amount of arguments");

    return writeFile(
      joinPath(this.path_manager.currentDirectory, `${name}.txt`),
      ""
    );
  }
}
