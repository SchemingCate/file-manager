import { argv } from "node:process";
import { Messenger } from "./Messenger.js";
import { Readline } from "./Readline.js";
import { CommandHandler } from "./commandHandler.js";
import { DirectoryOperations } from "./DirectoryOperations.js";
export class FileManager {
  startupArguments = {};
  username = "";
  rl;

  // class instances
  messenger;
  readline;
  command_handler;
  directory_operations;

  constructor() {
    this.init();
  }

  init() {
    this.setStartupArguments(argv);
    this.username = this.startupArguments["username"];

    this.directory_operations = new DirectoryOperations();
    this.command_handler = new CommandHandler(this.directory_operations);
    this.messenger = new Messenger(this.username, this.directory_operations);
    this.readline = new Readline(this.messenger, this.command_handler);
  }

  setStartupArguments(argv) {
    const args = argv.slice(2);
    const argObj = {};

    args.forEach((argPair) => {
      const argPairArr = argPair.replace("--", "").replace("=", " ").split(" ");
      argObj[argPairArr[0]] = argPairArr[1];
    });

    this.startupArguments = argObj;
  }
}
