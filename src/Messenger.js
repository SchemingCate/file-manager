export class Messenger {
  username = "";

  constructor(username) {
    this.username = username;
    this.greet();
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
}
