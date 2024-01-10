import {useState, memo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 11_20 - 177

// React.memo - это компонент высшего порядка. Если ваш компонент рэндерит одни и то же пропсы, вы можете обернуть его в вызов react.memo...
// ...для повышения производительности, мемоизируя тем самым результат (это значит что react будет использовать результат последнего рендера)
// Представим что у нас есть компоненты, которые рендерятся на основании динамических пропсов
// React.memo занимается только пропсами
// Ф-ия memo сравнивает поверхностно (это когда копия сравнивается на верхнем уровне вложености, а на уровень ниже идут уже ссылки на объек родителя)...
//...Здесь тоже самое, сравнение пропсов происходит только по верхнему уровню
// console.log('render') сного выводится 2 раза, так как ф-ия memo сравнивает поверхносно и она думает, что в объекте mail уже лежит другой пропс

function propsCompare(prevProps, nextProps) {
    return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text;
}

const Form = memo((props) => {

    console.log('render');

    return (
        <Container>
            <form className='w-50 border mt-5 p-3 m-auto'>
                <div className='mb-3'>
                    <label htmlFor='exampleFormControlInput1' className='form-label mt-3'>Email address</label>
                    <input
                        // value={props.mail}
                        value={props.mail.name}
                        type='email'
                        className='form-control'
                        id='exampleFormControlInput1'/>
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
}, propsCompare) // Первым аргументов у нас будет компонент который должен мемоизироватся, а вторым ф-ия сравнения
// После создания ф-ии сравнения propsCompare. console.log('render') выводится только один раз (так как она сравнивает предыдущий и новый пропс)

function App() {
    const [data, setData] = useState({
        // mail: 'name@example.com',
        mail: {
            name: 'name@example.com'
        },
        text: 'some text'
    })

    return (
        <>
            <Form mail={data.mail} text={data.text} />
            <button
                // onClick={() => setData({
                //     mail: 'second@example.com',
                //     text: 'another text'
                // })}>

                // Меняем состояние на точно такое же которое и было, чтобы увидеть будет ли вывод 'render' повторно? ...
                // ... Ответ да, так как объекты не равны друг другу если у них одинаковые внутренности (сравнение идет ...
                // ... по ссылкам а не по значениям)
                // Компонент не перерендывается так как мы использовали React.memo, а props абсолютно одинаковые
                onClick={() => setData({
                    // mail: 'name@example.com',
                    mail: {
                        // Теперь мы свойство mail передаем как объект.
                        // При нажатии Click me мы в консоли видим второй раз 'render' так как React.memo думает что ...
                        // ... это уже другой props лежит внутри mail ...
                        // ... Потому что когда мы вызвали setData здесь был создан новый объект, который содержит те же данные
                        // ... Решение написать свою ф-ию сравнения propsCompare
                        name: 'name@example.com'
                    },
                    text: 'some text'
                })}>
                    Click Me
            </button>
        </>
    );
}

export default App;
