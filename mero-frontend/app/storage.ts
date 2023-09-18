import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key:string, value: string) => {
    const jsonValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      return e
    }
  };

export {storeData, getData}