export type DBRecord = Record<string, unknown>;

export type UpdateData = { value: DBRecord | null; key?: IDBValidKey | IDBKeyRange };

export interface BaseReadParams {
  key?: IDBValidKey;
  keyRange?: IDBKeyRange;
  direction?: IDBCursorDirection;
}
