import { homedir } from "node:os";
import { readdir } from "node:fs/promises";

export class DirectoryOperations {
  currentDirectory = "";

  constructor() {
    this.currentDirectory = homedir();
  }

  async printAllFilesInDir() {
    readdir(this.currentDirectory, { withFileTypes: true }).then((files) => {
      console.log(files);
    });
    console.log("file and folder list");
  }
}
