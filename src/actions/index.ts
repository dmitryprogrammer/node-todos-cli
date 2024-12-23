import { add } from "./add.action";

export enum ACTION_NAMES {
  ADD = "add",
  GET = "get",
  DELETE = "delete",
  LIST = "list",
}

export const actions = {
  add,
};
