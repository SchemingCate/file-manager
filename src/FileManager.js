import { argv } from "node:process";
import readline from "node:readline";

export class FileManager {
  startupArguments = {};
  username = "";
  rl;

  constructor() {
    this.init();
  }

  init() {
    this.setStartupArguments(argv);
    this.username = this.startupArguments["username"];

    this.greet(this.username); //TODO format username my_username > My Username
    //TODO ask username if no arguments on startup

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on("line", (line) => {
      switch (line.trim()) {
        case ".exit":
          this.close();
          break;
      }
    });

    this.rl.on("SIGINT", () => {
      this.rl.close();
    });

    this.rl.on("close", () => {
      this.goodbye(this.username);
    });
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

  greet(name) {
    console.log(`Welcome to File Manager, ${name}!`);
  }

  goodbye(name) {
    console.log(`Thank you for using File Manager, ${name}, goodbye!`);
  }

  close() {
    this.rl.close();
  }
}
