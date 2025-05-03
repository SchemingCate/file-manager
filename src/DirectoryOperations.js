import { homedir } from "node:os";

export class DirectoryOperations {
  currentDirectory = "";

  constructor() {
    this.currentDirectory = homedir();
  }

  printAllFilesInDir() {
    console.log("file and folder list");
  }
}
