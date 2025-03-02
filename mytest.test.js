const loadModule = require('./loadModule');
const calmodule = require('./calcStatsFromAPImodule');

test("test", async () => {
    const fMock = jest.spyOn(loadModule, "loadData");
    fMock.mockImplementation(() => new Promise(resolve => resolve([
        {
            breed: 'Turkish Van',
            country: 'developed in the United Kingdom (founding stock from Turkey)',
            origin: 'Natural',
            coat: 'Semi-long',
            pattern: 'Van'
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        }
       ])));
    let res = await calmodule.calcStatsFromAPI();
    expect(loadModule.loadData).toHaveBeenCalledTimes(1);
    fMock.mockRestore();
    expect(res).toEqual(
        {
            "developed in the United Kingdom (founding stock from Turkey)": 1,
            "United States (New York)": 2
        }
    );
});