import DataSet from './DataSet';

const App = () => {
  const data = [
    { id: 1, name: 'Катя', age: 9, gender: 'женский', location: 'Шанхай' },
    { id: 2, name: 'Тимоха', age: 8, gender: 'мужской', location: 'Владивосток' },
    { id: 3, name: 'Тянь Тянь', age: 25, gender: 'мужской', location: 'Вашингтон' },
    { id: 4, name: 'По', age: 24, gender: 'Воин Дракона', location: 'Япония' },
    { id: 5, name: 'Боря', age: 12, gender: 'мужской', location: 'Челябинск' },
    { id: 6, name: 'Ай блин', age: 5, gender: 'мужской', location: 'Сеул' },
    { id: 7, name: 'Ай Хин', age: 3, gender: 'женский', location: 'Сингапур' },
  ];

  const headers = ['id', 'name', 'age', 'gender', 'location'];

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Крутые панды</h2>
      <DataSet 
        data={data} 
        headers={headers}
        renderHeader={(header) => <th style={{ background: '#f27ed6', fontSize: '23px' }}>{header}</th>}
        renderCell={(value) => <td style={{ padding: '10px' }}>{value}</td>}
      />
    </div>
  );
};

export default App;