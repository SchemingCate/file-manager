import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, mkdir, rename as renameDir } from "node:fs/promises";
import { EOL } from "node:os";
import { join as joinPath, dirname, basename } from "node:path";
import { pipeline } from "node:stream/promises";

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

  async createNewDirectory(directoryName, ...args) {
    if (!directoryName || args.length)
      throw new Error("Invalid amount of arguments");

    return mkdir(
      joinPath(this.path_manager.currentDirectory, directoryName)
    ).catch((err) => console.log(`Operation failed: ${err}`));
  }

  async renameFile(pathToFile, newFilename, ...args) {
    if (!pathToFile || !newFilename || args.length)
      throw new Error("Invalid amount of arguments");

    const path = await this.path_manager.getValidPath(pathToFile, true);

    renameDir(path, joinPath(dirname(path), newFilename)).catch((err) => {
      console.log(`Operation failed: ${err}`);
    });
  }

  async copyFile(pathToFile, pathToTheNewDirectory, ...args) {
    if (!pathToFile || !pathToTheNewDirectory || args.length)
      throw new Error("Invalid amount of arguments");

    const path = await this.path_manager.getValidPath(pathToFile, true);

    const newPath = joinPath(
      await this.path_manager.getValidPath(pathToTheNewDirectory),
      basename(path)
    );

    return pipeline(createReadStream(path), createWriteStream(newPath)).catch(
      (err) => {
        console.log(`Operation failed:${err}`);
      }
    );
  }
}
