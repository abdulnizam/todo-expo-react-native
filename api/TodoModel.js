import * as  SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm';

export default class TodoModel extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase("todoLists.db", "1.0", "Todos Database");
    }

    static get tableName() {
        return 'todos'
    }

    static get columnMapping() {
        return {
        id: { type: types.INTEGER, primary_key: true },
        title: { type: types.TEXT, not_null: '' },
        completed: { type: types.Boolean, default: () => false },
        created_at: { type: types.INTEGER, default: () => Date.now() },
        updated_at: { type: types.INTEGER, default: () => Date.now() }
        }
    }
}