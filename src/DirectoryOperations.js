import { homedir } from "node:os";
import { readdir } from "node:fs/promises";

export class DirectoryOperations {
  currentDirectory = "";

  constructor() {
    this.currentDirectory = homedir();
  }

  async printAllFilesInDir() {
    readdir(this.currentDirectory, { withFileTypes: true }).then((files) => {
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
    }).catch(() => {
      console.log('Operation failed'); //TODO move to Message
    });
  }
}
