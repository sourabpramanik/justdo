import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TodoItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TodoItem {
  readonly id: string;
  readonly content: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TodoItem, TodoItemMetaData>);
  static copyOf(source: TodoItem, mutator: (draft: MutableModel<TodoItem, TodoItemMetaData>) => MutableModel<TodoItem, TodoItemMetaData> | void): TodoItem;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly TodoItems?: (TodoItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}