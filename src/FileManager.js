import { argv } from "node:process";
import { Messenger } from "./Messenger.js";
import { Readline } from "./Readline.js";
import { CommandHandler } from "./CommandHandler.js";
import { DirectoryOperations } from "./operations/DirectoryOperations.js";
import { SystemInfoOperations } from "./operations/SystemInfoOperations.js";
import { PathManager } from "./PathManager.js";
import { HashOperations } from "./operations/HashOperations.js";
import { FileOperations } from "./operations/FileOperations.js";

export class FileManager {
  startupArguments = {};
  username = "";
  rl;

  // class instances
  path_manager;
  messenger;
  readline;
  command_handler;
  directory_operations;
  system_info_operations;
  hash_operations;
  file_operations;

  constructor() {
    this.init();
  }

  init() {
    this.setStartupArguments(argv);
    this.username = this.startupArguments["username"];

    this.path_manager = new PathManager();
    this.file_operations = new FileOperations(this.path_manager);
    this.hash_operations = new HashOperations(this.path_manager);
    this.system_info_operations = new SystemInfoOperations();
    this.directory_operations = new DirectoryOperations(this.path_manager);
    this.messenger = new Messenger(this.username, this.path_manager);
    this.command_handler = new CommandHandler(
      this.directory_operations,
      this.messenger,
      this.system_info_operations,
      this.hash_operations,
      this.file_operations,
    );
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
