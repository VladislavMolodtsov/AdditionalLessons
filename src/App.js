import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// class Slider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img
//                         className="d-block w-100" 
//                         src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" 
//                     />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

const Slider = () => {
    const [slide, setSlide] = useState(0); 
    const [autoplay, setAutoplay] = useState(false);

    // function logger() {
    //     console.log('log');
    // }

    // Эта ф-ия сработает сразу как только компонент отрендерился, а также когда компонент обновился (изменение props, state), объединяя тем самым componentDidMount and componentDidUpdate 
    useEffect(() => {
        console.log('Effect');
        document.title = `Slide: ${slide}`

        // window.addEventListener('click', logger)
        // return () => {
        //     window.removeEventListener('click', logger)
        // }
        // Timeout, обработчики событий - называются подписками. Все подписки необходимо удалять при удалении компонента. В class-овом компоненте это реализуется при помощи componentWillUnmount        // Данной записью () => { window.removeEventListener('click', logger)} мы выполнили отписку от обработчика событий
        // Когда компонент Slider исчез с DOM структуры произошла отписка тоесть () => { window.removeEventListener('click', logger)}
    }, [slide])
    // [slide] - массив зависимостей, если ни одна из этих зависимостей не изменилась, то эффект у нас будет пропущен
    // При помощи [] в useEffect, мы может симулировать componentDidMount (вызываем useEffect один раз при 1-ом рэндере)
    // Можно создавать несколько useEffect в 1-ом компоненте

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay])
    
    function changeSlide(i) {
        setSlide(slide => slide + i);
    }
    
    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
        
    }
    
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img src="https://www.planetware.com/photos-large/F/eiffel-tower.jpg " alt="slide" className="d-black w-100" />
                <div className="text-center mt-5">Active Slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>
                        -1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>
                        +1
                    </button>
                    <button
                         className="btn btn-primary me-2"
                         onClick={toggleAutoplay}>
                         Toggle Autoplay
                    </button>
                </div>
            </div>
        </Container>
    )
}


function App() {
    const [slider, setSlider] = useState(true); // callback - потому что передаем аргументы

    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
            {/* Если slider в позиции true, мы возвращаем компонент, если нет то null */}
            {/* Таким образом мы иметируем удаления обработчика событий на window, когда компонент slider был удален (описание выше) */}
        </>
    );
}

export default App;
