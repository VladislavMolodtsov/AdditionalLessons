import {useState, memo, useCallback} from 'react';
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
// При использовании PureComponent мы не видим повторного рендеринга, так как в нем уже встроена ф-ия сравнения. И он используем метод shouldComponentUpdate()
// ... но если мы будем передавать props в виде сложных вложеных объектов, массивов, функций, то метод shouldComponentUpdate() не будет срабатывать
// Если мы используем обычный классовый компонент (Component), а не PureComponent, то для сравнения props-ов мы должны использовать метод shouldComponentUpdate()
// Вопрос. Как сравнивать state в функциональных компонентах. И обычно там используют прием когда state передают в props-ах
// Итог ... 
// 1. Функция memo используется для функциональных компонентов
// 2. PureComponent or shouldComponentUpdate используется в классовых компонентах
// 3. Применять такую мемоизацию стоит только на часто rende-щихся компонентах которые могут получают одинаковые prop
// 4. Применять данный принцип ко всем подряд компонентам особенно тем которые получают разные props-ы не стоит, так как это будет негативно влиять на производительность

// class Form extends PureComponent {
// class Form extends Component {

//         // Это компонент жизненного цыкла
//     shouldComponentUpdate(nextProps) { 
//         // Этот метод сравнивает не только props, но и state
//         // Должен ли компонент быть обновлен
//         if (this.props.mail.name === nextProps.mail.name) { 
//             // Если props совпадают, тогда компонент не должен быть обновлен
//             return false;
//         } return true;
//     }
//     // Сейчас при использовании метода. При нажатии кнопки вызова console.log('render'), второй раз render не происходит

//     render() {
//         console.log('render');
    
//         return (
//             <Container>
//                 <form className='w-50 border mt-5 p-3 m-auto'>
//                     <div className='mb-3'>
//                         <label htmlFor='exampleFormControlInput1' className='form-label mt-3'>Email address</label>
//                         <input
//                             // value={props.mail}
//                             value={this.props.mail.name}
//                             type='email'
//                             className='form-control'
//                             id='exampleFormControlInput1'/>
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='exampleFormControlTextarea1' className='form-label'>Example textarea</label>
//                         <textarea
//                             value={this.props.text}
//                             type='email'
//                             className='form-control'
//                             id='exampleFormControlTextarea1' rows='3'>
//                             </textarea>
//                     </div>
//                 </form>
//             </Container>
//         )
//     }
// }

// function propsCompare(prevProps, nextProps) {
//     return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text;
// }

const Form = memo((props) => {

    console.log('render');

    return (
        <Container>
            <form className='w-50 border mt-5 p-3 m-auto'>
                <div className='mb-3'>
                    <label htmlFor='exampleFormControlInput1' className='form-label mt-3'>Email address</label>
                    <input
                        value={props.mail}
                        // value={props.mail.name}
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
})

function App() {
    const [data, setData] = useState({
        mail: 'name@example.com',
        // mail: {
        //     name: 'name@example.com'
        // },
        text: 'some text'
    })

    // Даже если мы создадим  ф-ию и передадим ее как пропс, даже тогда нам выведет 2 render при клике
    // Всеравно при перерендывании компонента мы получаем второй render
    // Это ф-ия каждый раз создается когда запускается наш ф-ий компонент, он перерендывается за счет того, что ...
    // ... запускается команда setData и у нас ф-ия создается заново
    // const onLog = () => {
    //     console.log('wow');
    // }

    // Как можно обойти эту проблему?
    // Решение, использовать useCallback()
    // useCallback используется для того чтобы мы могли передавать ф-ии в дочерние компоненты через props...
    //  А также добавим массив зависимостей для того чтобы ф-ия внутри стала мемоизированой. useCallback ...
    // ... изменится только когда изменятся параметры в массиве завимостей
    const onLog = useCallback(() => {
        console.log('wow');
    }, [])

    return (
        <>
            {/* <Form mail={data.mail} text={data.text} onLog={() => console.log('wow')}/> */}
            <Form mail={data.mail} text={data.text} onLog={onLog}/>
            {/* Передаем в компонент ф-ию через пропс */}
            {/* При клике на button, форма не должна была перерисоваться (так как пропсы не изменились), но ф-ия memo воспринимает нашу ф-ию onLog как новый объект и теперь каждый раз перерисовывает компонент */}
            {/* Даже если мы создадим  ф-ию и передадим ее как пропс, даже тогда нам выведет 2 render при клике*/}
            <button
                // onClick={() => setData({
                //     mail: 'second@example.com',
                //     text: 'another text'
                // })}>
                onClick={() => setData({
                    mail: 'name@example.com',
                    // mail: {
                    //     name: 'name@example.com'
                    // },
                    text: 'some text'
                })}>
                    Click Me
            </button>
        </>
    );
}

export default App;
