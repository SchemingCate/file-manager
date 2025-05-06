import { argv } from "node:process";

export class CommandHandler {
  directory_operations;
  messenger;

  commandsMap;

  constructor(directory_operations, messenger) {
    this.directory_operations = directory_operations;
    this.messenger = messenger;

    this.commandsMap = {
      ls: this.directory_operations.printAllFilesInDir.bind(
        this.directory_operations
      ),
      cd: this.directory_operations.goToDirectory.bind(
        this.directory_operations
      ),
      up: this.directory_operations.goUp.bind(this.directory_operations),
    };
  }

  handleInput(command, ...args) {
    const mapped = this.commandsMap[command];

    if (!mapped) {
      console.log("Invalid input");
      return;
    }

    mapped(...args)
      .catch((err) => {
        console.log(`Invalid input: ${err.message}`);
      })
      .finally(()=> {
        this.messenger.directory();
      })
  }
}
