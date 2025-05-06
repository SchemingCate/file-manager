import { readdir, access } from "node:fs/promises";
import { resolve as resolvePath, sep as pathSeparator } from "node:path";

export class DirectoryOperations {
  path_manager;

  constructor(path_manager) {
    this.path_manager = path_manager;
  }

  async printAllFilesInDir(args) {
    if (args) throw new Error("Invalid amount of arguments");

    return readdir(this.path_manager.currentDirectory, { withFileTypes: true })
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

    const resP = resolvePath(this.path_manager.currentDirectory, path);

    return access(resP)
      .then(() => {
        this.path_manager.currentDirectory = resP;
      })
      .catch((err) => {
        console.log(`Operation failed: ${err.message}`);
      });
  }

  async goUp(args) {
    return new Promise((resolve) => {
      if (args) throw new Error("Invalid amount of arguments");
      if (
        this.path_manager.currentDirectory === this.path_manager.homeDirectory
      )
        throw new Error("Cannot go up from the home directory");
      const newPathArr =
        this.path_manager.currentDirectory.split(pathSeparator);
      newPathArr.pop();
      this.path_manager.currentDirectory = newPathArr.join(pathSeparator);
      resolve();
    });
  }
}
