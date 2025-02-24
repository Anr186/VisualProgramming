function orderBy(obj, prop) {
    for (let i = 0; i < (obj.length); i++) {
        if (typeof obj[i] !== 'object') {
            throw new Error(`Элемент ${i} не является объектом`);
        }
    }
    let cObj = obj.slice();
    for (let i = 0; i < cObj.length; i++) {
        for (let j = 0; j < cObj.length - 1; j++) {
            if (!(prop[0] in cObj[j]) || !(prop[0] in cObj[j + 1])) {
                throw new Error(`У элемента ${j + 1} отсутствует свойство '${prop[0]}'`);
            }
            
            if (!(prop[1] in cObj[j]) || !(prop[1] in cObj[j + 1])) {
                throw new Error(`У элемента ${j + 1} отсутствует свойство '${prop[1]}'`);
            }

            if (cObj[j][prop[0]] > cObj[j + 1][prop[0]]) {
                let temp = cObj[j];
                cObj[j] = cObj[j + 1];
                cObj[j + 1] = temp;
            } else if (cObj[j][prop[0]] === cObj[j + 1][prop[0]]) {
                if (cObj[j][prop[1]] > cObj[j + 1][prop[1]]) {
                    let temp = cObj[j];
                    cObj[j] = cObj[j + 1];
                    cObj[j + 1] = temp;
                }
            }
        }
    }
    return cObj;
}
module.exports = orderBy;