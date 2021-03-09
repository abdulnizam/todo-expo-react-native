// force the state to clear with fast refresh in Expo
// @refresh reset
const base = require('../api/database');

export default function useDatabase() {
    let isDBLoadingComplete = false;

    async function loadDataAsync() {
        try {
            // await database.dropDatabaseTablesAsync()
            await base.database.setupDatabaseAsync()
            isDBLoadingComplete = true;
            
        } catch (e) {
            console.warn(e);
        }
    }
    loadDataAsync();
    return isDBLoadingComplete;
}