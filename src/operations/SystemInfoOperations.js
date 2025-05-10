import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export class SystemInfoOperations {
  argsMap;

  constructor() {
    this.argsMap = {
      EOL: this.printEOL,
      cpus: this.printCPUInfo,
      homedir: this.printHomeDir,
      username: this.printSystemUsername,
      architecture: this.printCPUArch,
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
      console.log(`${i + 1}. ${el.model} ${el.speed / 1000}GHz`);
    });
  }

  printHomeDir() {
    console.log(EOL + `Home directory: ${homedir()}`);
  }

  printSystemUsername() {
    console.log(EOL + `Your system username: ${userInfo().username}`);
  }

  printCPUArch() {
    console.log(EOL + `CPU architecture: ${arch()}`);
  }
}
