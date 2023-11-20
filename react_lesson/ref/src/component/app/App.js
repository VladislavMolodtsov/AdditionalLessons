import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';

class Form extends Component {

    setInputRef = elem => {
        this.myRef = elem;
    }

    onFocusFirstTextInput = () => {
        if (this.myRef) {
            this.myRef.doSmth();
        }
    }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <TextInput ref={this.setInputRef}/>
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

// Превращаем компонент в классовый для того, чтобы в this.myRef хранилась ссылка на экземпляр класса ...
// ... но в this.myRef нельзя вызывать следующим образом this.myRef.current.focus(), так как class TextInput является компонентом (экземпляром класса (это объект мы не можем получить ссылку на DOM API)), 

class TextInput extends Component {
    doSmth = () => {
        console.log('smth');
    }

    render() {
        return (
            <input 
                type="text"
                className='form-control'
                id='exampleFormControlInput1'
                placeholder='name@example.com' />
        )
    }
}

function App() {
    return (
        <Form/>
    );
}

export default App;