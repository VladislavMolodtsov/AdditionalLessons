import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';

// Может быть что мы хотим что то сделать с компонентом не перерисовывая его например постовить или снять фокус, узнать какой текст выделил пользователь и т.п.
// Чаще всего их можно увидеть в формах и фокусах
// ref - это ссылка на элемент или компонент в дереве уже отрисованный в браузере
// ref-ы отличаются в зависисости от того на что повешен этот атрибут (может на элемент и на компонент(чтобы воспользоваться методами компонента))
// ref назначается перед componentDidMount and Update
// ref нельзя назначать на функциональные компоненты

class Form extends Component {

    // myRef = React.createRef();
    // И для того чтобы создать ссылку на элемент используем команду myRef = React.createRef();
    // теперь эту ссылку необходимо присвоить к нужному нам элементу

    // componentDidMount() {
    //     this.myRef.current.focus();
    //     // ссылка на элемент хранится в специальном свойстве current
    // }

    setInputRef = elem => {
        this.myRef = elem;
    }

    // callback ref - это когда ref мы создаем с помощью ф-ии, а не с помощью createRef и записываем ссылку на экземпляр класса
    // ref - не работают на функциональных компонентах, так как у них нет своего экземпляра
    onFocusFirstTextInput = () => {
        if (this.myRef) {
            this.myRef.focus();
        }
    }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            // ref={this.myRef}
                            ref={this.setInputRef}/>
                            {/* Когда запустится ref и ф-ия в нем, элемент на котором он установлен запишется в elem */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                            onClick={this.onFocusFirstTextInput}>
                        </textarea>
                    </div>
                </form>
            </Container>
        )
    }
}

function App() {
    return (
        <Form/>
    );
}

export default App;