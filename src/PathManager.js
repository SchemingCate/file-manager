import { lstat } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve as resolvePath } from "node:path";

export class PathManager {
  homeDirectory = "";
  currentDirectory = "";

  constructor() {
    this.homeDirectory = homedir();
    this.currentDirectory = this.homeDirectory;
  }

  async getValidPath(path, isFile = false) {
    const resP = resolvePath(this.currentDirectory, path);

    await lstat(resP)
      .then((statsObj) => {
        if (isFile && !statsObj.isFile()) {
          throw new Error("Wrong file path");
        }
        if (!isFile && !statsObj.isDirectory()) {
          throw new Error("No such directory");
        }
        return resP;
      })
      .catch((err) => {
        console.log(`Operation failed: ${err}`);
      });
    return resP;
  }
}
