import { homedir } from "node:os";
import { readdir, access } from "node:fs/promises";
import { resolve as resolvePath, sep as pathSeparator } from "node:path";

export class DirectoryOperations {
  homeDirectory;
  currentDirectory = "";

  constructor() {
    this.homeDirectory = homedir();
    this.currentDirectory = this.homeDirectory;
  }

  async printAllFilesInDir(args) {
    if (args) throw new Error("Invalid amount of arguments");

    return readdir(this.currentDirectory, { withFileTypes: true })
      .then((files) => {
        const filesArr = [];
        files.forEach((dirent) => {
          const direntObj = {};
          direntObj.name = dirent.name;
          direntObj.type = dirent.isFile() ? "file" : "directory";
          filesArr.push(direntObj);
        });
        const filesSortedAlphabetically = filesArr.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        const filesSortedWithDir = filesSortedAlphabetically.sort((a, b) => {
          if (a.type === "file" && b.type === "directory") return 1;
          if (a.type === "directory" && b.type === "file") return -1;
          return 0;
        });
        console.table(filesSortedWithDir);
      })
      .catch(() => {
        console.log("Operation failed"); //TODO move to Message
      });
  }

  async goToDirectory(path, ...args) {
    if (!path || args.length) throw new Error("Invalid amount of arguments");

    const resP = resolvePath(this.currentDirectory, path);

    return access(resP)
      .then(() => {
        this.currentDirectory = resP;
      })
      .catch((err) => {
        console.log(`Operation failed: ${err.message}`);
      });
  }

  async goUp(args) {
    return new Promise((resolve) => {
      if (args) throw new Error("Invalid amount of arguments");
      if (this.currentDirectory === this.homeDirectory)
        throw new Error("Cannot go up from the home directory");
      const newPathArr = this.currentDirectory.split(pathSeparator);
      newPathArr.pop();
      this.currentDirectory = newPathArr.join(pathSeparator);
      resolve();
    });
  }
}
