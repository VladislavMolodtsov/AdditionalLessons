import {useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// Собственные хуки занимаются обработкой какой-то однотипной логики. Когда разные компоненты используют одинаковую логику

// Эта та функция которая будет заменять нам дублирование состояний // Пользовательский хук - это метод повторного использования логики с состоянием
function useInputWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue);
    // Мы не знаем каким будет первичное состояние initialValue (может строка или что-то еще)

    // Метод изменяет состояние
    const onChange = (e) => {
        setValue(e.target.value);
    }

    // Метод валидации для поиска числа в строке метода, в value записывается перевоначальное значение
    // validateInput - возвращает нам true or false, которое мы используем в переменной color для определения цвета текса input при вводе числа 
    const validateInput = () => {
        return value.search(/\d/) >= 0
    }

    return {value, onChange, validateInput}
    // Мы возвращаем объект (это состояние и ф-ии) {value: value, onChange: onChange}  
}

const Form = () => {

    // Внутри переменных input, textArea скрыт объект состояние и методов // Состояния будет хранится внутри этих переменных
    const input = useInputWithValidate('');
    const textArea = useInputWithValidate('');

    const colorInput = input.validateInput() ? 'text-danger' : null;
    const colorTextArea = textArea.validateInput() ? 'text-danger' : null;

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input
                        value={`${input.value} / ${textArea.value}`} 
                        type="text" 
                        className="form-control" 
                        readOnly
                    />
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input
                        onChange={input.onChange}
                        value={input.value}
                        type="email"
                        className={`form-control ${colorInput}`} // Как только в input введется число - этот input подсветится красным
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        onChange={textArea.onChange}
                        value={textArea.value}
                        className={`form-control ${colorTextArea}`} // Как только в input введется число - этот input подсветится красным
                        id="exampleFormControlTextarea1" 
                        rows="3">
                    </textarea>
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