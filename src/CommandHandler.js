export class CommandHandler {
  directory_operations;

  commandsMap;

  constructor(directory_operations) {
    this.directory_operations = directory_operations;

    this.commandsMap = {
      ls: this.directory_operations.printAllFilesInDir.bind(
        this.directory_operations
      ),
    };
  }

  handleCommand(command) {
    const mapped = this.commandsMap[command];
    if (mapped) mapped();
    else console.log(command.toUpperCase());
  }
}
