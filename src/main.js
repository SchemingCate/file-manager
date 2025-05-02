import { argv } from 'node:process';
import readline from 'node:readline';

import { getArgumentsObj } from './helpers.js';
import { greet } from './messages/greeting.js';

const init = () => {
  const args = getArgumentsObj(argv);
  greet(args.username); //TODO format username my_username > My Username
  //TODO ask username if no arguments on startup

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

init();


