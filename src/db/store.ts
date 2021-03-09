class Store {
  private static db: IDBDatabase;

  public static setDB = (db: IDBDatabase): void => {
    Store.db = db;
  };
  public static getDB = (): IDBDatabase => Store.db;
}

export default Store;
