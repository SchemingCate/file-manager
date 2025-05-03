export class Messenger {
  username = "";

  directory_operations;

  constructor(username, directory_operations) {
    this.username = username;
    this.directory_operations = directory_operations;
    this.greet();
    this.directory();
  }

  greet() {
    console.log(`Welcome to File Manager, ${this.username}!\n`);
    //TODO format username my_username > My Username
    //TODO ask username if no arguments on startup
  }

  goodbye() {
    console.log(
      `\nThank you for using File Manager, ${this.username}, goodbye!\n`
    );
  }

  directory() {
    console.log(
      `\nYou are currently in ${this.directory_operations.currentDirectory}\n`
    );
  }
}
