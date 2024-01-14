import {useState, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// useReducer является альтернативой useState
// Максимальную пользу мы получим когда будем использовать Redux
// Проблему которую решает useReducer - это сложная логика состояния, например при одном ... 
// ... клике у нас может выполниться несколько действий и так далее.
// В нашем примере мы можем установить разные кнопки, который устанавливают разную скорость ...
// ... автопереключения слайда. useReducer - объединяет разные ф-ии в одну структуру


function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            return {autoplay: !state.autoplay}
        case 'slow':
            return {autoplay: 300}
        case 'fast':
            return {autoplay: 700}
        case 'custom':
            return {autoplay: action.payload}
        default:
            throw new Error();
    }
}

function init(initial) {
    return {autoplay: initial}
}

const Slider = ({initial}) => {
    
    const [slide, setSlide] = useState(0);
    const [autoplay, dispatch] = useReducer(reducer, initial, init);
    // Теперь первичное значение initial будет передаваться в ф-ию init. А данная ф-ия возвращает нам уже объект с состоянием
    // const [autoplay, dispatch] = useReducer(reducer, {autoplay: false}, init);
    // dispatch - это ф-ия которая меняет state (autoplay), не пересоздается при изменении значения. Не переименовывать!!!
    // В dispatch мы должны передать объект, главным свойством которого является type
    // useReducer принимает в себя ф-ию reducer, начальное состояние false, ленивое создание ленивого состояния
    // reducer - это ф-ия которая отвечает за модификацию состояния, а не за вызов, как было до этого
    // чаще всего мы в useReducer вторым аргументом будем видеть объект useReducer(reducer, {autoplay: false});
    // Третим аргументом является ф-ия, которая будет лениво создавать начальное значение. Это может быть полезно в ...
    // ... в асинхронных операциях или после определенного действия

    function changeSlide(i) {
        setSlide(slide => slide + 1)
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img src="https://www.planetware.com/photos-large/F/eiffel-tower.jpg " alt="slide" className="d-black w-100" />
                <div className="text-center mt-5">Active Slide {slide} <br/> {autoplay.autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button className='btn btn-primary me-2' onClick={() => changeSlide(-1)}>-1</button>
                    <button className='btn btn-primary me-2' onClick={() => changeSlide(1)}>+1</button>
                    <button className='btn btn-primary me-2' onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    {/* в ф-ию dispatch мы должны передать объект, а не как раньше мы раньше передавали сразу изменения state (как указано в onClick={() => changeSlide(1)} ) */}
                    {/* в ф-ию dispatch мы должны передать объект, где главным свойством является type ...*/}
                    {/* ... этот объект называется ( action ) */}
                    <button className='btn btn-primary me-2' onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                    <button className='btn btn-primary me-2' onClick={() => dispatch({type: 'fast'})}>fast autoplay</button>
                    {/* Создали кнопку, где пользователь ввел значение вручную */}
                    {/* Мы в наш action добавили новое свойство payload вторым аргументом в dispatch*/}
                    <button className='btn btn-primary me-2' onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}


function App() {
  return (
        <Slider initial={false}/>
        // Когда наш слайдер будет вызываться мы передадим props
  );
}

export default App;
