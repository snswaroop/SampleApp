import storage from "./storage";

export const WriteToStorage = (key, value) => {
    storage.setItem(key, value);
}

export function ReadFromStorage(key) {
    return storage.getItem(key);
}