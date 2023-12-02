import {useState, useEffect} from 'react';
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

const Slider = () => { // 8:22
    
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    
    useEffect(() => { // useEffect содержит внутри себя callback f-ion которая будет вызыватся, когда
        document.title = `Slide: ${slide}`;
    }, [])
    
    // Эта ф-ия сработает сразу как только компонент отрендерился, а также когда компонент обновился (изменение props, state), объединяя тем самым componentDidMount and componentDidUpdate 
    // useEffect(() => { 
    //     console.log('Effect');
    //     document.title = `Slide: ${slide}`;
    // }, []) 
    // [slide] - массив зависимостей, если ни одна из этих зависимостей не изменилась, то эффект у нас будет пропущен
    // Проблема состоит в том, что useEffect следит за slide. Но когда у нас происходит изменения autoplay (useState), то помимо useState сразабывает useEffect. Поэтому используем 2-ым аргументов [] в useEffect
    // Eсли setSlide(i) изменился, то запустится useEffect, который следит за slide
    // При помощи [] в useEffect, мы может симулировать componentDidMount (вызываем useEffect один раз при 1-ом рэндере)
    // Можно создавать несколько useEffect в 1-ом компоненте
    
    // useEffect(() => {
    //     console.log('Effect Update');
    //     document.title = `Slide: ${slide}`;
    // }, [slide])
    
    // Timeout, обработчики событий - называются подписками. Все подписки необходимо удалять при удалении компонента. В class-овом компоненте это реализуется при помощи componentWillUnmount
    // В useEffect это реализуется при помощи возвращением (return) call-back function из него
    
    // Это ф-ия при ее вызове будет возвращать какое-то сообщение
    function logger() { 
        console.log('log!');
    }
    
    useEffect(() => {
        console.log('Effect');
        document.title = `Slide: ${slide}`;
        
        window.addEventListener('click', logger); 
        // Обработчик события. Чтобы удалить обработчик события, нам нужно иметь ссылку на одну и ту же ф-ию
        
        return () => {
            window.removeEventListener('click', logger); 
            // Возвращаем callback function, чтобы удалить обработчик события
        }
    }, [slide]);
    
    // Если мы хотим отслеживать autoplay при каждом обновлении
    useEffect(() => {
        console.log('autoplay');
    }, [autoplay])
     
    function changeSlide(i) {
        setSlide(slide => slide + i)
    }
    
    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay); 
    }
    
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img src="https://www.planetware.com/photos-large/F/eiffel-tower.jpg " alt="slide" class="d-black w-100" />
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
    const [slider, setSlider] = useState(true); // Говорим, что слайдер будет виден на странице
    
    return (
        <> 
            <button onClick={() => setSlider(() => !slider)}>Click Me</button> {/* callback - потому что передаем аргументы */}
            {slider ? <Slider/> : null} 
            {/* Если slider в позиции true, мы возвращаем компонент, если нет то null */}
            {/* Таким образом мы иметируем удаления обработчика событий на window, когда компонент slider был удален (описание выше) */}
        </>
    )
}

export default App;
