import {Command} from "commander";
import {actions} from "./actions";

const program = new Command();

program
  .name("file-manager")
  .description("CLI to manage files")
  .version("1.0.0");

program.command("add <taskTitle>").description("Add task").action(actions.add);
program.command("clear-tasks").action(actions.clearTasks);

program.parse(process.argv);
