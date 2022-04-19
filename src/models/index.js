// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { NoteItem, TaskItem, User } = initSchema(schema);

export {
  NoteItem,
  TaskItem,
  User
};