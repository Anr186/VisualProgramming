function calcStats(catsInfo){
    let stats = {};
    for(let cat of catsInfo){
        let country = cat.country;
        stats.hasOwnProperty(country) ? stats[country]++ : stats[country] = 1;
    }
    return stats;
}
module.exports = calcStats;

