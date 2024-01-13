import {useState, Component, createContext} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях
// Контекст используют как третий вариант построения приложения и одним общим состоянием
// Любой компонент может иметь любое количество конекстов 
// Контекст используют для того, чтобы передавать определенные данные ниже по иерархии не используя props
// Основными компонентами Контекста являются CreateContext, Provider, Consumer

// Для начала создадим контекст. В переменную dataContext мы должны поместить результат вызова createContext
// createContext - как единственный аргумент эта команда createContext принимает в себя значение по умолчанию
const dataContext = createContext({
    mail: 'name@example.com',
    text: 'some text'
});
// createContext имеет несколько свойств - это Consumer, Provider, _currentValue
// Consumer - это компонент который отвечает за получения этих данных, а также он подписывается на изменения ...
// ... значений в context
// Provider - отвечает за прокидывание другим компонентам props ниже по иерархии
// Значение которое мы туда передали _currentValue: {mail: '', text: ''}
// console.dir(dataContext);

// Далее мы создадим 2-е новые переменные, которые называются Provider, Consumer
// Зделали деструктуризацию для того, чтобы легче было работать с createContext
const {Provider, Consumer} = dataContext;

const Form = (props) => {

    console.log('render');

    return (
        <Container>
            <form className='w-50 border mt-5 p-3 m-auto'>
                <div className='mb-3'>
                    <label htmlFor='exampleFormControlInput1' className='form-label mt-3'>Email address</label>
                    <InputComponent/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleFormControlTextarea1' className='form-label'>Example textarea</label>
                    <textarea
                        value={props.text}
                        type='email'
                        className='form-control'
                        id='exampleFormControlTextarea1' rows='3'>
                     </textarea>
                </div>
            </form>
        </Container>
    )
}

class InputComponent extends Component {

    static contextType = dataContext;

    render() {
        return (
            // Consumer принемает в себя ф-ию и которая рендерит JSX элемент
            // <Consumer>
            //     {
            //         // value - это props которое мы передали через Provider
            //         value => {
            //             return (
            //                 <input
            //                 value={value.mail}
            //                 type='email'
            //                 className='form-control'
            //                 id='exampleFormControlInput1'/>
            //             )
            //         }
            //     }
            // </Consumer>

            <input
                // value={this.props.mail}
                value={this.context.mail}
                type='email'
                className='form-control'
                id='exampleFormControlInput1'/>
        )
    }
}

// Мы к inputContext привязываем контекст dataContext при помощи свойства .contextType ...
// ... теперь внутри классового компонента благодаря такой записи у нас появилось такое свойство как this.context ...
// ... мы его подставляем в строку 74
// Есть и более современный способ получения контекста это использования static внутри классового компонента строка 55
// InputComponent.contextType = dataContext;

function App() {
    const [data, setData] = useState({
        mail: 'name@example.com',
        text: 'some text'
    })

    return (
        // Когда мы создали деструктуризация Provider, Consumer. Мы обернули внутренности компонента App
        // Далее мы должны передать те данные, которые будут доступны по иерархии ниже через attr value component Provid
        // Если вдруг не будет props value, мы будем брать значение из контекста createContext, строка 13
        // Все компоненты ниже по иерархии будут повторно рендерится, как только prop value у Provider будет менятся
        <Provider value={data}>
            <Form text={data.text}/>
            <button
                onClick={() => setData({
                    mail: 'second@example.com',
                    text: 'some text'
                })}>
                    Click Me
            </button>
        </Provider>
    );
}

export default App;
