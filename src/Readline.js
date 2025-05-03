import { createInterface } from "node:readline";
import { CommandHandler } from "./commandHandler.js";

export class Readline {
  exitCommand = "";
  readline;

  // class instances
  messenger;
  command_handler;

  constructor(messenger) {
    this.messenger = messenger;
    this.command_handler = new CommandHandler();

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
      else this.command_handler.handleCommand(command);
    });
    this.readline.on("SIGINT", () => this.readline.close());
    this.readline.on("close", () => this.messenger.goodbye());
  }
}
