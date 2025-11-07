/**
 * StorageService - Handles localStorage operations for the TODO app
 */
export class StorageService {
    /**
     * creates a new storage service
     * @param {string} storageKey - prefix for localStorage keys
     */
    constructor(storageKey = 'todos') {
        this.storageKey = storageKey;
    }

    /**
     * saves data to localStorage
     * @param {string} k - key to store under
     * @param {*} d - data to store (will be JSON stringified)
     */
    save(k, d) {
        try {
            const fk = `${this.storageKey}_${k}`;
            localStorage.setItem(fk, JSON.stringify(d));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    /**
     * loads data from localStorage
     * @param {string} key - key to load from
     * @param {*} defaultValue - value to return if key doesn't exist
     * @returns {*} parsed data from storage or default value
     */
    load(key, defaultValue = null) {
        try {
            const fullKey = `${this.storageKey}_${key}`;
            const item = localStorage.getItem(fullKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * removes data from localStorage
     * @param {string} k - key to remove
     */
    remove(k) {
        try {
            const fullK = `${this.storageKey}_${k}`;
            localStorage.removeItem(fullK);
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
        }
    }

    /**
     * clears all data for this app from localStorage
     */
    clear() {
        try {
            const keysToRemove = [];
            //find all keys that start with our prefix
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.storageKey)) {
                    keysToRemove.push(key);
                }
            }
            //remove all matching keys
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
}