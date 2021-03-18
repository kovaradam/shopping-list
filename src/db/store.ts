import { Config, ObjectStoreParams } from './init';

class Store {
  private static db: IDBDatabase;
  private static config: Config;
  public static triggerUpdate: (storeName: string) => void;

  public static setDB = (db: IDBDatabase): void => {
    Store.db = db;
  };

  public static getDB = (): IDBDatabase => Store.db;

  public static setTriggerUpdate = (triggerUpdate: typeof Store.triggerUpdate): void => {
    Store.triggerUpdate = triggerUpdate;
  };

  public static setConfig = (config: Config): void => {
    Store.config = config;
  };

  public static getStoreConfig = (storeName: string): ObjectStoreParams => {
    const storeConfig = Store.config.objectStores.find(({ name }) => name === storeName);
    if (!storeConfig) {
      throw new Error(`Store name ${storeName} was not defined`);
    }
    return storeConfig;
  };
}

export default Store;
