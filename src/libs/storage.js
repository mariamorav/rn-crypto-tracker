import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    static instance = Storage();

    add = async (key, value) => {
        try {

            await AsyncStorage.setItem(key, value);
            return true;

        } catch (err) {

            console.log(`STORAGE/ADD error: ${err}`)
            return false;

        }
    }

    get = async (key) => {
        try {
            
            return await AsyncStorage.getItem(key);

        } catch (err) {

            console.log(`STORAGE/GET error: ${err}`)
            throw Error(err);
        }
    }

    multiGet = async (keys) => {
        try {

            return await AsyncStorage.multiGet(keys)
        
        } catch (err) {
            
            console.log(`STORAGE/MULTIGET error: ${err}`)
            throw Error(err);

        }
    }

    getAllKeys = async () => {
        try {
            
            return await AsyncStorage.getAllKeys(); 

        } catch (err) {
            
            console.log(`STORAGE/GETALLKEYS error: ${err}`)
            throw Error(err);

        }
    }

    remove = async (key) => {
        try {

            await AsyncStorage.removeItem(key);

            return true;
        
        } catch (err) {

            console.log(`STORAGE/REMOVE error: ${err}`)
            throw Error(err);

        }
    }

}

export default Storage;