class dataWorker {
    // check keys for empty or null values, filter keys for api url
    correctData = data => {
            const res = Object.entries(data).map(item => 
            item[1] === '' ||  item[1] === null ? [item[0], 'data not specified'] : item)
            .filter(([, value]) => !/^https:\/\/api/.test(value))
            return Object.fromEntries(res);
    } 
    // sorting keys by output priority, filtering unnecessary keys
    sortKey = (data, topKeys, notEnteredKey) => {
        const keys = Object.keys(data);
        const minorKeys = keys.filter(key => !topKeys.includes(key)).sort();
        const sortedKeys = topKeys.concat(minorKeys).filter(key => !notEnteredKey.includes(key));
        return sortedKeys;
    }
    // Html for render couple of key-value with need name for key
    renderFields = (correctData, key, keysName, nodeClass, classKey, classValue) => {
        // keysName is the right key name for display. example: 
        // const keysName = {
        //     twitter_username: 'twitter',
        //     html_url: 'gitHub',
        // };
        const fieldName = keysName[key] ? keysName[key] : key;
        return `<li class="${nodeClass}">
                    <span class="${classKey}">${fieldName}:</span>
                    <span class="${classValue}">${correctData[key]}</span>
                </li>`; 
    } 
}

export default new dataWorker();