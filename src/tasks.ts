import {ACTION_NAMES} from "./actions";
import {Connector} from "./db/connector";

class Tasks<Connector, ActionNames> {
  private connection;
  constructor(connection: Connector) {
    this.connection = connection;
  }

  action(name: ActionNames) {}
}

export const tasks = new Tasks<Connector, ACTION_NAMES>(new Connector());
