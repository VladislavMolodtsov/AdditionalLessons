import {useState} from 'react';
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


// function calcValue(){
//     console.log('random');
    
//     return Math.random() * (50 - 1) + 1;
// }

const Slider = () => {
    
    // const slideStateArray = useState() // Когда запускается наша ф-ия, она вернет нам массив где 1-й элемент - это состояние, 2-й элемент - это ф-ия которая будет менять это состояние
    const [slide, setSlide] = useState(0); // Помещать внутрь useState можно все, Можно сформировать много переменных состояния
    
    // Если наше начальное состояние будет вычисляться в какой то операции, то мы ее можем передавать внутрь useState
    
    // const [slide, setSlide] = useState(calcValue); // вызывается только один раз
    // const [slide, setSlide] = useState(() => calcValue()); // Если нужно передать аргументы, вызывается только один раз
    // const [slide, setSlide] = useState(calcValue()); //  // плохая практика, потому что компонент перерисовывается каждый раз когда срабатывает (изменяется) setState. 
    // Ф-ия calcValue вызывается каждый раз, когда изменяется state
    // const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    
    // const [state, setState] = useState({slide: 0, autoplay: false});
    
    function changeSlide(i) {
        // setSlide(slide => slide + i);
        
        // В этой ситуации мы не учитываем ассинхронности ф-ий, врезультате наш state изменяется всего на 1, а по логике на 2.
        // setSlide(slide + i);
        // setSlide(slide + i);
        // Решение
        setSlide(slide => slide + i);
        // setSlide(slide => slide + i);
        
        // setState(state => ({slide: state.slide + 1})); // Из-за специфмчности setState в состоянии будет лишь свойство slide, без autoplay
        // setState(state => ({...state, slide: state.slide + i})); // Разворачиваем все свойства старого state (...state), изменяем одно из свойств
    }
    
    function toggleAutoplay() {
        // setAutoplay(!autoplay);
        setAutoplay(autoplay => !autoplay);
        // setState(state => ({...state, autoplay: !state.autoplay}))
        
    }
    
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img src="https://www.planetware.com/photos-large/F/eiffel-tower.jpg " alt="slide" className="d-black w-100" />
                <div className="text-center mt-5">Active Slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                {/* <div className="text-center mt-5">Active Slide {state.slide} <br/> {state.autoplay ? 'auto' : null}</div> */}
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
  return (
        <Slider/>
  );
}

export default App;
