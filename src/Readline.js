import { createInterface } from "node:readline";

export class Readline {
  exitCommand = "";
  readline;

  // class instances
  messenger;
  command_handler;

  constructor(messenger, command_handler) {
    this.messenger = messenger;
    this.command_handler = command_handler;

    this.exitCommand = ".exit";
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.init();
  }

  init() {
    this.readline.on("line", (line) => {
      const command = line.trim();
      if (command === this.exitCommand) this.readline.close();
      else this.command_handler.handleInput(...command.split(' '));
    });
    this.readline.on("SIGINT", () => this.readline.close());
    this.readline.on("close", () => this.messenger.goodbye());
  }
}
