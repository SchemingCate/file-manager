import { EOL, cpus } from "node:os";

export class SystemInfoOperations {
  argsMap;

  constructor() {
    this.argsMap = {
      EOL: this.printEOL,
      cpus: this.printCPUInfo,
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

  printEOL() {
    console.log(EOL + `End of line: ${JSON.stringify(EOL)}`);
  }

  printCPUInfo() {
    const cpusArr = cpus();
    console.log(EOL + `Overall amount of CPUs : ${cpusArr.length}` + EOL);

    cpusArr.forEach((el, i) => {
      console.log(`${i + 1}. ${el.model} ${el.speed / 100}GHz`);
    });
  }
}
