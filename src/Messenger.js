import { EOL } from "node:os";

export class Messenger {
  username = "";

  path_manager;

  constructor(username, path_manager) {
    this.username = username ? username : "Anonymous";
    this.path_manager = path_manager;
    this.greet();
    this.directory();
  }

  greet() {
    console.log(`Welcome to File Manager, ${this.username}!` + EOL);
    //TODO format username my_username > My Username
    //TODO ask username if no arguments on startup
  }

  goodbye() {
    console.log(
      EOL + `Thank you for using File Manager, ${this.username}, goodbye!` + EOL
    );
  }

  directory() {
    console.log(
      EOL + `You are currently in ${this.path_manager.currentDirectory}` + EOL
    );
  }
}
