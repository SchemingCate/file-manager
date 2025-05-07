import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { EOL } from "node:os";

export class HashOperations {
  path_manager;

  constructor(path_manager) {
    this.path_manager = path_manager;
  }

  async calculateHash(filePath, ...args) {
    if (!filePath || args.length)
      throw new Error("Invalid amount of arguments");

    this.path_manager.getValidPath(filePath, true).then((fileP) => {
      const hash = createHash("sha256");
      const readStream = createReadStream(fileP);

      readStream.on("data", (chunk) => {
        hash.update(chunk);
      });

      readStream.on("end", () => {
        console.log(`Hash of the file: ${EOL + hash.digest("hex")}`);
      });
    });
  }
}
