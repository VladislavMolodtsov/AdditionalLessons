import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// Используется для повторного использования логики
// Существует общие принципы формирования таких компонентов, а также часные
// HOC - это ф-ии которые принимают компонент и возвращают новый компонент, но уже с какими то модификациями
// React.memo - компонент высшего порядка (его можно использовать для оптимизации производительности или для добавления новых свойст компонента

// Когда не стоит использовать HOC: 
// 1. Когда нужно использовать или передавать много пропсов (чем больше пропсов, тем меньше смысла)
// 2. Если только один компонент использует компонент высшего порядка (нет смысла тогда использовать)
// Когда стоит использовать HOC: 

// Часто бывает так, что у нас есть очень похожие компоненты с незначительной отличием. 
// Логика у них одинаковая, но на входе компоненты могут получать разные пропсы(данные), от которых внутри, что-то немного меняется
// В нашем примере есть 2-а компонента, которые схожи между собой, но с небольшим отличием в useEffect (где вызываются разные ф-ии).
// Обе эти ф-ии имитируют запрос на сервер с получением разных данных
// Мы хотим вынести логику в отдельное место и при необходимости передавать разные пропсы. Сами компоненты заняты отрисовкой

const withSlider = (BaseComponent, getData) => {
    // префикс with обозначает компонент высшего порядка (с чем-то, что будем менять)
    // BaseComponen - это компонент который приходит
    // getData - сюда будет приходить какае-то из ф-ий (getDataFromFirstFetch либо getDataFromSecondFetch)

    // из этой ф-ии мы возвращаем другую ф-ию (ф-ный компонент). // В props лежит отдельный объект, который мы ...
    // ... деструктурируем в return. Для того чтобы прокинуть дальше
    return (props) => {
        const [slide, setSlide] = useState(0);
        const [autoplay, setAutoplay] = useState(false)

        useEffect(() => {
            setSlide(getData());
        }, [])

        function changeSlide(i) {
            setSlide(slide => slide + i);
        }

        return <BaseComponent
                    // Мы используем spread operator для разворачивания. Деструктурируем props, который приходит ...
                    //  в компонент withSlider(для того чтобы прокинуть их дальше)
                    {...props}
                    slide={slide}
                    autoplay={autoplay}
                    changeSlide={changeSlide}
                    setAutoplay={setAutoplay}/>
    }
}

// Мы создаем новую переменную в ней будет лежать компонент
const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

const SliderFirst = (props) => {
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

const SliderSecond = (props) => {
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

// Мы создаем новую переменную в ней будет лежать компонент
const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

// withLogger - это hook, как аргумент к нам приходит WrapperComponent - это компонент который приходит(который будем оборачивать)...
const withLogger = WrapperComponent => props => {
    useEffect(() => {
        console.log('First render');
    })

    return <WrapperComponent {...props} />
}

// Создадим любой компонент
// Теперь нам нужно добавить какое то дополнительное поведение, нетрогая его ...
// ... внутрености (в этом могут помочь компоненты высшего порядка)
const Hello = (props) => {
    return (
        <>
            <h1>HELLO</h1>
            <h2>{props.name}</h2>
        </>
    )
}

const HelloWithLogger = withLogger(Hello);

function App() {
    return (
        <>
            {/* Мы можем передавать props прямо внутрь этих компонентов */}
            <HelloWithLogger name={'John'}/>
            <SliderWithFirstFetch/>
            <SliderWithSecondFetch/>
        </>
    );
}

export default App;