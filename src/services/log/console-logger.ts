class ConsoleLogger {
  public log(obj: unknown) {
    console.log(obj);
  }

  public error(obj: unknown) {
    console.error(obj);
  }
}

export default new ConsoleLogger();
