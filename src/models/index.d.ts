import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NoteItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NoteItem {
  readonly id: string;
  readonly title: string;
  readonly desc?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NoteItem, NoteItemMetaData>);
  static copyOf(source: NoteItem, mutator: (draft: MutableModel<NoteItem, NoteItemMetaData>) => MutableModel<NoteItem, NoteItemMetaData> | void): NoteItem;
}

export declare class TaskItem {
  readonly id: string;
  readonly subject: string;
  readonly userID?: string | null;
  readonly done?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TaskItem, TaskItemMetaData>);
  static copyOf(source: TaskItem, mutator: (draft: MutableModel<TaskItem, TaskItemMetaData>) => MutableModel<TaskItem, TaskItemMetaData> | void): TaskItem;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly TaskItems?: (TaskItem | null)[] | null;
  readonly NoteItems?: (NoteItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}