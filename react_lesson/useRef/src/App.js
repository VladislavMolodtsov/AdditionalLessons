import {useRef, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// Ref - это ссылки на элементы в DOM дереве, работаю они в классовых элементах и могут быть назначены на элементы или другие классовые компоненты
// Сможем научится добавлять ref внутрь функционалького компонента
// Назначать ref через аттрибут ref внутри ф-ых компонентов нельзя

function Form() {

    const [text, setText] = useState(''); // Установим изначальное состояние в котором будет текст и функция которая будет устанавливать этот текст
    
    const myRef = useRef(null);
    
    // const myRef = useRef(null); // useRef будет создавать объект у которого есть свойство current в который мы изначально помещаем null
    // useRef - не вызывает перерендеринг компонента при его изменении
    // Но потом при rendere верстки в наш current мы записываем ссылку на наш dom элемент
    // Изменения объекта в useRefe не вызывает метод render
    // Ref сушествуют и сохраняются при любом перерендеринге нашего компонента при этом изменения ref-a не вызывают рирендер

    // const myRef = useRef(1);
    
    // const focusFirst = () => {
    //     myRef.current.focus();
    // }
    
    useEffect(() => { // useEffect следит за обновлениями
        // myRef.current++;
        // console.log(myRef.current)

        // Eсли мы хотим сохранить предыдущее состояние с помощью useRef
        myRef.current = text;
        console.log(text); // Когда myRef обновляется, тогда мы записываем text из useState (тоесть предыдущее состояние)
    })

    // Изначально useEffect выводит 1
    // Происходит изменение state, когда вводим чтото в input (method onChange)
    // State при изменении перерендывает компонент
    // Каждый раз когда я кликаю на textarea у нас каждый раз будет изменяться ref
    // Мы можем посчитать количество ререндеров нашего компоенета

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className='form-control'
                        id='exampleFormControlInput1'
                        placeholder='name@example.com'
                        // ref={myRef}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        type="text"
                        className='form-control'
                        id='exampleFormControlTextarea1'
                        placeholder='name@example.com'
                        row='3'
                        // onClick={focusFirst}
                        // onClick={() => myRef.current}
                        value={myRef.current}
                    />
                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;
