export type DBRecord = Record<string, unknown>;

export type UpdateData = {
  value: DBRecord | null;
  key?: IDBValidKey | IDBKeyRange;
  replace?: boolean;
};

export interface BaseReadParams {
  key?: IDBValidKey;
  keyRange?: IDBKeyRange;
  direction?: IDBCursorDirection;
}
