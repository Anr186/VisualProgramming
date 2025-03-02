async function loadData() {
    const URL = "https://catfact.ninja/breeds";
    let data = [];
    let curPage = URL;
    let count = 0;
    while(curPage){
        const response = await fetch(curPage);

        if(!response.ok) throw new Error(`Error! Status: ${response.status}`);
        
        const json = await response.json(); 
        data.push(...json.data);
        count += json.data.length;
        curPage = json.next_page_url;
    }
    // console.log(count);
    return data;
}
// const f = async () => {
//     const data = await loadData("https://catfact.ninja/breeds");
//     console.log(data);
// };
// f();
module.exports.loadData = loadData;