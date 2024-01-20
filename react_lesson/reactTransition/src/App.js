import {useState} from 'react';
import {Container} from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import './App.css';

const Modal = (props) => {

    const duration = 300;

    // Начальное состояние, дефолтное значение для анимации модального окна
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden'
    }

    // Стили, которые у нас будут на переходных этапах
    const transitionStyles = {
        entering: { opacity: 1, visibility: 'visible' },
        entered:  { opacity: 1, visibility: 'visible' },
        exiting:  { opacity: 0, visibility: 'hidden' },
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    return (
        <Transition
            in={props.show}
            timeout={duration}
            // unmountOnExit
            onEnter={() => props.setShowTrigger(false)} // Перед тем как будет происходить анимация мы будем скрыавать кнопку триггер
            onExited={() => props.setShowTrigger(true)} // Когда анимация для исчезновения модального окна закончилась, тогда кнопка сного появится
            // Мы можем не только показывать при помощи стилей эти элементы (скрывать, показывать), но и можем контролировать их рэндеринг
            // Пока мое модальное окно открыто, его не будет существовать в DOM - дереве или наоборот, когда модальное окно закрывается ...
            // ... , тогда оно полностью исчезает из DOM - дерева. Для этого существуют 2-а prop-a unmountOnExit, mountOnEnter
            // Другой пример применения - это скрывать тот элемент, который вызвал какое-то действие с помощью методов ...
            // ... onEnter, onEntering, onEntered, onExit, onExiting, onExited
            // Сейчас мы скажем, что когда у нас модальное окно открыто, тогда мы будем скрывать кнопку которая вызывает его и наоборот
            >
            
            {
                // Это встроенное состояние в компонент Transition (сам себя отслеживает в каком состоянии он сейчас находится)
                state => (
                    // Добавляем inline стили через аттрибут style, для того, чтобы контролировать стили програмно
                    // В ...transitionStyles[state] мы получаем только одно свойство из 4-х, которое будет подходить текущему состоянию
                    <div className="modal mt-5 d-block" style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Typical modal window</h5>
                                    <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Modal body content</p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                                    <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Transition>
    )
}

function App() {
    const [showModal, setShowModal] = useState(false); // Изначально модального окна нет
    const [showTrigger, setShowTrigger] = useState(true); // Изначально кнопку будет видно
    // Смысл состояния showTrigger в том, чтобы показывать кнопку триггер или скрывать когда модальное окно будет всплывать

    return (
        <Container>
            <Modal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
            {showTrigger ? 
                <button 
                    type="button" 
                    className="btn btn-warning mt-5"
                    onClick={() => setShowModal(true)}>Open Modal
                </button> : null}
        </Container>
    );
}

export default App;
