const loadModule = require('./loadModule');
const calcStats = require('./calcStats');

async function calcStatsFromAPI(){
    let data = await loadModule.loadData();
    return calcStats(data);
}
// const f = async () => {
//     const data = await calcStatsFromAPI();
//     console.log(data);
// };
// f();
module.exports.calcStatsFromAPI = calcStatsFromAPI;