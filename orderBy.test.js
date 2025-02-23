const orderBy = require('./orderBy');
const prop = ['name', 'age'];

test('correct data', () => {
  const pandasDefolt = [
    { name: 'Borya', age: 3 },
    { name: 'Katya', age: 13 },
    { name: 'Misha', age: 19 },
    { name: 'Misha', age: 11 },
    { name: 'Andrey', age: 5 }
  ];

  expect(orderBy(pandasDefolt, prop)).toEqual([
    { name: 'Andrey', age: 5 },
    { name: 'Borya', age: 3 },
    { name: 'Katya', age: 13 },
    { name: 'Misha', age: 11 },
    { name: 'Misha', age: 19 }
  ]);
});
test('Dont have all objects', () => {
  const pandasFailObj = [
    "impostor",
    { name: 'Katya', age: 13 },
    { name: 'Misha', age: 19 },
    { name: 'Misha', age: 11 },
    { name: 'Andrey', age: 5 }
  ];
  expect(() => orderBy(pandasFailObj, prop)).toThrow(new Error("Элемент 0 не является объектом"));
});
test('Dont have some properties', () => {
  const pandasFailProp = [
    { name: 'Borya', age: 3 },
    { name: 'Katya', age: 13 },
    { name: 'Misha', age: 19 },
    { name: 'Misha', age: 11 },
    { name: 'Andrey'}
  ];
  expect(() => orderBy(pandasFailProp, prop)).toThrow(new Error("У элемента 4 отсутствует свойство 'age'"));
});

module.exports = orderBy;