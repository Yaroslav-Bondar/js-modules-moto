class dataWorker {
    correctData = data => 
        Object.fromEntries(Object.entries(data).map(item => 
            item[1] === '' ||  item[1] === null ? [item[0], 'data not specified'] : item
        ).filter(([, value]) => !/^https:\/\/api/.test(value)));
    
    sortData = (data, topKeys, notEnteredKey) => {
        let keys = Object.keys(data);
        let minorKeys = keys.filter(key => !topKeys.includes(key)).sort();
        return topKeys.concat(minorKeys).filter(key => !notEnteredKey.includes(key));
    }
    renderFields = (correctData, key, keysName, nodeClass, classKey, classValue) => {
        const fieldName = keysName[key] ? keysName[key] : key;
        return `<li class="${nodeClass}">
                    <span class="${classKey}">${fieldName}:</span>
                    <span class="${classValue}">${correctData[key]}</span>
                </li>`; 
    } 
}

export default new dataWorker();