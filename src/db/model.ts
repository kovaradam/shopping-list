export type DBRecord = Record<string, unknown>;

export type UpdateData = { value: DBRecord | null; key?: IDBValidKey | IDBKeyRange };
