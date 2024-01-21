import {useState} from 'react';
import {Container} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './App.css';

// Остальные 2-а компонента (SwitchTransition, TransitionGroup) позволяют нам модифицировать первые 2-а компонента (Transition, CSSTransition)
// SwitchTransition позволяет изменять режим рендеринга с помощью аттрибута node со значениями (out-in, in-out)
// out-in (компонент сначала дожыдается, пока старый компонент не исчезнет и только потом появляется)
// in-out (компонент сначала дожидается, пока появится новый, и только потом старый компонент начинает удаляться )

// TransitionGroup (он также оборачивает компонент как и SwitchTransition) оборачивает много компонентов
// В TransitionGroup нет аттрибута in, именно он отвечает за отслеживание, появление или исчезновения компонента и применения анимации ...
// ... к ним. Он просто отвечает за запуск анимации, а вот за стили отвечает CSSTransition. Поэтому анимация прописывается в самом компоненте через className в компоненте CSSTransition

// Эти Transition подходять только для простых анимаций, если нужно создавать сложные анимации нужно использовать React-Motion

const Modal = (props) => {

    const duration = 300;

    return (
        <CSSTransition
            in={props.show}
            timeout={duration}
            // unmountOnExit
            onEnter={() => props.setShowTrigger(false)}
            onExited={() => props.setShowTrigger(true)}
            // modal - это базовый класс. В файле css нужно прописать те классы, которые будут указывать на состояние этого компонента
            classNames='modal'
            mountOnEnter // Компонент будет появляться, только тогда, когда мы его вызовим. В DOM структуре нет блока модального окна при загрузке и появляется при нажатии на кнопку
            unmountOnExit // Компонент бедет исчезать, только тогда, когда мы его уничтожим
        >
            <div className="modal mt-5 d-block">
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
        </CSSTransition>
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
