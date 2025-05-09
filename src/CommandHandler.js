export class CommandHandler {
  directory_operations;
  messenger;
  system_info_operations;
  hash_operations;
  file_operations;

  commandsMap;

  constructor(
    directory_operations,
    messenger,
    system_info_operations,
    hash_operations,
    file_operations
  ) {
    this.directory_operations = directory_operations;
    this.messenger = messenger;
    this.system_info_operations = system_info_operations;
    this.hash_operations = hash_operations;
    this.file_operations = file_operations;

    this.commandsMap = {
      ls: this.directory_operations.printAllFilesInDir.bind(
        this.directory_operations
      ),
      cd: this.directory_operations.goToDirectory.bind(
        this.directory_operations
      ),
      up: this.directory_operations.goUp.bind(this.directory_operations),
      os: this.system_info_operations.execSystemInfoOperation.bind(
        this.system_info_operations
      ),
      hash: this.hash_operations.calculateHash.bind(this.hash_operations),
      cat: this.file_operations.printFileContent.bind(this.file_operations),
      add: this.file_operations.createFile.bind(this.file_operations),
      mkdir: this.file_operations.createNewDirectory.bind(this.file_operations),
      rn: this.file_operations.renameFile.bind(this.file_operations),
      cp: this.file_operations.copyFile.bind(file_operations),
      rm: this.file_operations.deleteFile.bind(file_operations),
      mv: this.file_operations.moveFile.bind(file_operations),
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
      .finally(() => {
        this.messenger.directory();
      });
  }
}
