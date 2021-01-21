
# Крестики-нолики на JavaScript + React
В этой статье я расскажу как можно написать эту классическую игру с помощью фреймворка React. Мы будем использовать функциональные компоненты **React**, чуть **HTML**, **CSS** и конечно же **JavaScript**!

### Инициализация проекта

Не будем сильно заморачиваться и используем готовый бойлер-плейт для одностраничного приложения, с помощью команды:
``` npx create-react-app **name** ```

![](https://sun9-51.userapi.com/impf/tfrd_u0U5uPTAKtreZ74t38dXSF7NGXGO0Hwdw/kFAjDTP8S2w.jpg?size=1364x966&quality=96&proxy=1&sign=f1bdbe61169aa630b45d18d5aeb9effc&type=album)

После установки, у нас есть готовая среда и нужные инструменты для удобной разботки. «Под капотом» используются Babel и webpack, но нам о них не нужно знать.
Несколько основных команд:
- **npm run build** - создание оптимизированного билда для продакшена
- **npm run start** - запуск веб-сервера для разработки приложения.
- **npm run test** - запуск тестов, но в нашем приложении мы не будем их использовать.

Запустим наше приложение с помощью команды **npm run start** и проверим работает ли оно вообще. После запуска команды, можно увидеть страницу с логотипом React. Приложение работает.

Удалим ненужные файлы из проекта:
В папке **public** удаляем все, кроме index.html и favicon.ico.
В папке **src** оставим только index.js и очистим содержимое файла.

Структура нашего проекта будет выглядеть следующим образом:
- src
	- index.js
	- index.css
	- components
		- App.js
		- Component1.js
		- ...

Для каждого компонента нам нужно обязательно импортировать React.

Проект небольшой поэтому все стили будем записывать в один файл index.css, который нужно будет обязательно импортировать в основном файле index.js.

### Создание основных компонентов

Главным компонентом будет App.js, который сейчас мы и создадим.  Внутри напишем самый простой функциональный компонент.

```JavaScript
import React from 'react';

const  App = (props) => {
	return (
		<div className='app'>
			Hello World!
		</div>
	)
}

export default App;
```
Теперь импортируем этот компонент в файле index.js и отобразим наше приложение.
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const root = document.getElementById('root');

ReactDOM.render(<App />, root;
```
После чего на нашей странице отображается надпись "Hello World!", а значит все работает.

Создадим компонент **Grid**, который будет отображать наше игровое поле. Этот компонент будет принимать в качестве свойств двумерный массив, который и будет игровым полем. 

Каждая строка матрицы (игрового поля) будет предаваться в компонент **Row**, а каждый элемент строки, то есть каждая клетка будет передаваться в компонент **Cell**.

Массив будет состоять из целых чисел:
- &nbsp;**0** -- Клетка пустая.
-  &nbsp;**1** -- Клетка содержит крестик.
- **-1** -- Клетка содержит нолик.

Компонент **Grid**:
```JavaScript
import React from 'react';
import Row from './Row';

const Grid = ({ field }) => {

return (
		<div className='field-wrapper'>
			{ field.map(row => <Row row={row} />) }
		</div>
	)
}
export  default Grid;
```
С помощью функции **map** очень удобно работать с массивами. В качестве аргумента передаем функцию, которая будет применяться для каждого элемента массива, а после функция возвращает измененный массив (в нашем случае массив компонентов).

Для каждой строки массива мы отобразили компонент **Row**, которому в свойства передали эту строку.

 Для каждого элемента строки с будем отображать компонент **Cell**.
 
 Компонент **Row**:
```JavaScript
import React from 'react';
import Cell from './Cell';

const Row = ({ row }) => {
	return (
		<div className='row'>
			{ row.map(value => <Cell value={value} />) }
		</div>
	)
}

export  default Row;
```
В зависимости от значения, будем отображать пустую ячейку, крестик или нолик.
Компонент **Cell**:
```JavaScript
import React from 'react';

const Cell = ({ value }) => {
	let a = null;

	if (value === 1)
		a = 'X';
	else if (value === -1)
		a = 'O';
		
	return (
		<div className='cell'>
			{ a }
		</div>
	)
}

export default Cell;
```


Попробуем протестировать написанный код. Вручную передадим матрицу компоненту **Grid**.

```JavaScript
const App = (props)  =>  {
const field = [
	 [ 0,   0,   1],
	 [-1,  -1,   1],
	 [ 1,   0,   0]
];

return (
	<div className='app'>
		<Grid field={field}/>
	</div>
	)
}
```

Добавляем чуть-чуть стилей:
```CSS
body {
     margin: 0;
     height: 100%;
     width: 100vw;
     min-height: 100vh;
     font-family: 'Montserrat', sans-serif;
}
 #root {
     display: flex;
     min-height: 100vh;
    /* Отобразим все приложение по центру */
     justify-content: center;
     align-items: center;
}
 .field-wrapper {
    /* отобразим наше игровое поле как таблицу */
     display: table;
     border-collapse: collapse;
}
 .row {
    /* отобразим как строку таблицы */
     display: table-row;
}
 .cell {
    /* отобразим как ячейку таблицы и добавим границы, размер ячейки. */
     display: table-cell;
     border: 1px solid #3b3b3b;
     height: 6rem;
     width: 6rem;
     text-align: center;
     margin-left: auto;
     margin-right: auto;
     vertical-align: middle;
     font-weight: 300;
     font-size: 3rem;
}
```

И видим наше игровое поле:

![](https://sun9-50.userapi.com/impf/S8YMYggCESUkniuWH6MFraHS5qqQiY0C1e3mWA/bYT-envCQJM.jpg?size=608x614&quality=96&proxy=1&sign=39e7dead005ad855df332a56ca819a5c&type=album =250x)

### Состояние компонента App

Теперь добавим состояние для компонента **App**, которое будет хранить наш массив. Это нужно для того, чтобы когда мы изменяем массив, то **React** будет понимать, что данные изменились и нужно заново перерисовать компоненты, которым эти данных передаются как параметры.
Также создадим функцию, которая будет создавать пустой двумерный массив.
```JavaScript
const  [field,  setField]  = React.useState(createField(3,  3));
```
Добавим состояние , с помощью которого мы будем понимать кто сейчас должен сделать ход.

```JavaScript
 const  [isNextStepX,  toggleNextStep]  = React.useState(true);
 ```


 
Реализуем функцию **onClick**, которая будет выполнять когда пользователь кликает по игровому полю. В качестве аргументов будем передавать позицию ячейки в нашем массиве и в зависимости от флага, будем ставить или крестик или нолик.

```JavaScript
const copyMatrix = (n) => {
    return n.map(m => [...m]);
}

const onClick = (i, j) => {
    if (!field[i][j]) {
        let newField = copyMatrix(field);
        newField[i][j] = (isNextStepX) ? 1 : -1;
        setField(newField);
        toggleNextStep(prevStep => !prevStep);
    }
}
```
По правилам **React**, мы не может напрямую изменять состояние компонента. Вместо этого мы должны скопировать текущее, затем изменить его, а после передать в функцию **setField**.

Теперь нужно передать эту функцию компоненту **Cell** через все остальные компоненты и так же передать компоненту **Cell** его позицию, чтобы при вызове функции **onClick**, передать номер линии и строки в качестве аргумента:
### Компонент App
```JavaScript
return (
	<div className='app'>
		<Grid field={field} onStep={onClick}/>
	</div>
)
```
### Компонент Grid
```JavaScript
const Grid = ({ field, onStep })  =>  {
return (
	<div className='field-wrapper'>
		{ field.map((row, i) => <Row 
			row={row}
			onStep={onStep} /* Передаем функцию вниз по компонентам */
			i={i} /* Передаем каждой строке ее номер */
			key={i} />)
		}
	</div>
	)
}
```
### Компонент Row
```JavaScript
const Row = ({ row, onStep, i }) => {
	return (
		<div  className='row'>
			{ row.map((value, j) => <Cell 
				value={value} 
				onStep={onStep} 
				i={i} 
				j={j} 
				key={j} />) 
			}
		</div>
	)
}
```

### Компонент Cell
```JavaScript
const  Cell  =  ({  value,  i,  j,  onStep  })  =>  {
	let a =  null;
	
	if (value ===  1)
		a =  'X';
	else  if (value ===  -1)
		a =  'O';

	let classNames = ['cell'];
	if(!a) classNames.push('empty');
	classNames = classNames.join('  ');
		
	return (
		/* При клике, будет вызываться функция onStep */
		<div className={classNames} onClick={() => onStep(i, j)}>
			{ a }
		</div>
	)
}
```
Если ячейка пустая, добавляем класс **empty**.

Добавим компоненту App состояние **isGameEnd** для отслеживания статуса текущей игры.

После каждого хода будем проверять, остались ли пустые клетки и проверять не победил ли один из игроков. Для этого реализуем функции:
- Проверки горизонтальных и вертикальных линий.
- Проверки диагоналей. 
- Проверки пустых ячеек

### Проверка горизонтальных линий
С помощью цикла будем параллельно проверять вертикальные и горизонтальные линии. Для этого создадим переменные, в которых хранится значение предыдущего элемента или -2, если предыдущего элемента не было. 

Если текущий элемент отличается от предыдущего или ячейка, которую мы проверяем пустая, тогда игра ещё не завершена.
Функция в случае победы возвращает выигранную сторону с соответствующим значением. Иначе возвращает логическое "нет".

```JavaScript
const checkDiagonal = (grid) => {
    let height = grid.length - 1;
    let firstDiagonal = {
        canWinO: true,
        canWinX: true
    }
    let secondDiagonal = {
        canWinO: true,
        canWinX: true
    }
    for (let i = 0; i <= height; i++) {
        if (grid[i][i] === 1) firstDiagonal.canWinO = false; // Элемент по диагонали - крестик
        else if (grid[i][i] === -1) firstDiagonal.canWinX = false; // Элемент по диагонали нолик
        else { // Если ячейка на диагонали пустая
            firstDiagonal.canWinO = false;
            firstDiagonal.canWinX = false;
        }

        if (grid[i][height - i] === 1) secondDiagonal.canWinO = false; // Элемент по диагонали - крестик
        else if (grid[i][height - i] === -1) secondDiagonal.canWinX = false; // Элемент по диагонали нолик
        else { // Если ячейка на диагонали пустая
            secondDiagonal.canWinO = false;
            secondDiagonal.canWinX = false;
        }
    }

    if (firstDiagonal.canWinO || secondDiagonal.canWinO) return -1;
    if (firstDiagonal.canWinX || secondDiagonal.canWinX) return 1;

    return 0;
}

function checkLines(grid) {
    var height = grid.length;
    var width = grid[0].length;

    for (let i = 0; i < height; i++) {
        var horizontal = -2,
            vertical = -2 // Стандартное значение

        for (let j = 0; j < width; j++) {

            if (vertical === -2) vertical = grid[j][i]; // Первая ячейка, предыдущей нет.
            if (vertical === grid[j][i]) {
                vertical = grid[j][i] // Предыдущая совпадает с текущей
            } else vertical = 0; // Предыдущая не совпадает с текущей

            if (horizontal === -2) horizontal = grid[i][j]; // Первая ячейка, предыдущей нет.
            if (grid[i][j] === horizontal) {
                horizontal = grid[i][j]; // Предыдущая совпадает с текущей
            } else horizontal = 0; // Предыдущая не совпадает с текущей

        }
		if (vertical ===  -1  || horizontal ===  -1) return  -1;
		if (vertical ===  1  || horizontal ===  1) return  1;
    }
    return 0; // В случае если нет заполненных линий
}

function getStatus(grid) {
    let isAnyEmpty = false;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (!grid[i][j]) isAnyEmpty = true;
        }
    }

    return checkDiagonal(grid) || checkLines(grid) || !isAnyEmpty;
}
```

Если игра закончилась, компонент App меняет свое состояние:
- Больше нельзя поставить крестик или нолик на поле.
- Появляется надпись, о завершении игры.
- Отображается победитель

Добавим проверку, что игра не закончилась в функцию, которая вызывается при клике на элемент.
`if (!field[i][j] &&  !isGameEnd) {...`

Создадим новый компонент **GameInfo**, который будет показывать игровую информацию. Если игра закончилась, компонент будет отображать победителя и кнопку рестарта игры, иначе пользователя, который должен сделать ход.

Дополнительно реализуем функцию, которая будет начинать игру заново. Для этого просто обнулим состояние компонента **App**.

```JavaScript
const restartGame = () => {
	setField(createField(3, 3));
	toggleNextStep(true);
	setGameStatus(0);
}
```
### Компонент GameInfo:
```JavaScript
import React from  'react';

const GameInfo = ({ gameStatus, isNextStepX }) => {
	let content;
	
	if (gameStatus === -1) content = 'Победа O';
	else if (gameStatus === 1) content = 'Победа X';
	else if (gameStatus) content = 'Ничья';
	else if (isNextStepX) content = 'Ход X';
	else content = 'Ход O';
	
	return (
		<div  className='game-info'>
			{ content }
		</div>
	)
}

export  default GameInfo;
```

Добавим стили для нашего компонента:

```CSS
.game-info  {
	display:  flex;
	flex-direction:  column;
	justify-content:  center;
	align-items:  center;
	font-size:  2rem;
	margin-bottom:  2rem;
}

button  {
	background-color:  white;
	border:  1px  solid  #808080;
	font-size:  18px;
	cursor:  pointer;
	margin:  1px;
	padding:  3px  8px;
}

button:hover  {
	background-color:  black;
	color:  white;
	border:  1px  solid  black;
}
```
В результате, наше приложение имеет следующий вид:




