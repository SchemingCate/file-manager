import { EOL } from "node:os";

export class SystemInfoOperations {
  argsMap;

  constructor() {
    this.argsMap = {
      EOL: this.getEOL,
    };
  }

  async execSystemInfoOperation(arg, ...args) {
    return new Promise((resolve) => {
      if (!arg || args.length) throw new Error("Invalid amount of arguments");

      const argument = arg.replace("--", "");
      const mapped = this.argsMap[argument];

      if (!mapped) {
        throw new Error("Unknown argument");
      }

      mapped();
      resolve();
    });
  }

  getEOL() {
    console.log(EOL + `End of line: ${JSON.stringify(EOL)}`);
  }
}
