import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';

import './App.css';

class Form extends Component {

    state = {
        advOpen: false
    }

    componentDidMount() {
        setTimeout(this.handleClick, 2000)
    }

    // Кнопка переключается при клике
    // При клике на форму Form срабатывает console.log, но и на компоненте Portal срабатывает onClick
    // Хоть компонент Msg находится за границей Form, но на нем всеравно срабатывает объект события

    handleClick = () => {
        this.setState(({advOpen}) => ({
            advOpen: !advOpen
        }))
    }

    render() {
        return (
            <Container>
                <form
                    onClick={this.handleClick} 
                    className="w-50 border mt-5 p-3 m-auto" 
                    style={{
                        'overflow': 'hidden', 
                        'position': 'relative'
                    }}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input  type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    {/* <Portal>
                        <Msg/>
                    </Portal> */}
                    {
                        this.state.advOpen ? 
                        <Portal>
                            <Msg/>
                        </Portal> : null
                    }
                </form>
            </Container>
        )
    }
}

// Проблема состоит в том, что мы не всегда можем изменить стили. Один из вариантом, чтобы наша структура рэндерилась где-то в другом месте DOM-дерева
// Порталы позволяют отрендерить любые элементы вне своего родительского компонента в браузере
// Наш portal находится в другом месте DOM дерева, НО события созданные внутри компонента Form срабатывают и в компаненте Portal

const Portal = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    // Команда для создания ПОРТАЛА // props.children - что будем помещать // node - во что будем помещать
    return ReactDOM.createPortal(props.children, node);
}

// Различные уведомления, всплывающие подсказки, модальные окна, подтверждение
// Элемент который нам нужно показать мы вынесем в отлельный компонент (Msg)

const Msg = () => {
    return (
        <div 
            style={{
                'width': '500px', 
                    'height': '150px', 
                    'backgroundColor': 'red', 
                    'position': 'absolute', 
                    'right': '0', 
                    'bottom': '0'
                }}>
            Hello
        </div>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;