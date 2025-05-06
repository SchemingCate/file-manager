import { access } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve as resolvePath } from "node:path";

export class PathManager {
  homeDirectory = '';
  currentDirectory = '';
  // why need?
  // - have current path
  // - have home path
  // - check if path exists
  // - update current path
  constructor() {
    this.homeDirectory = homedir();
    this.currentDirectory = this.homeDirectory;
  }

  isPathValid(path) {
    //
    const resP = resolvePath(this.currentDirectory, path);

    access(resP)
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false
      });
  }
}
