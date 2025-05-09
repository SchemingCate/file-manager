import { basename } from "node:path";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { join as joinPath } from "node:path";

export class CompressionOperations {
  path_manager;

  constructor(path_manager) {
    this.path_manager = path_manager;
  }

  async compressFileWithBrotli(pathToFile, pathToDestination, ...args) {
    if (!pathToFile || !pathToDestination || args.length)
      throw new Error("Invalid amount of arguments");

    const filePath = await this.path_manager.getValidPath(pathToFile, true);


    const compressedFileName = `${basename(filePath)}.br`;

    const destinationPath = await this.path_manager.getValidPath(
      pathToDestination
    );

    const destPathWithFile = joinPath(destinationPath, compressedFileName);

    return pipeline(
      createReadStream(filePath),
      createBrotliCompress(),
      createWriteStream(destPathWithFile)
    );
  }
}
