import {useContext} from 'react';
import dataContext from './context';

// Теперь мы будем создавать ф-ий компонент с использованием хука useContext
const InputComponent = () => {
    const context = useContext(dataContext);

    return (
        <input
            value={context.mail}
            type='email'
            className='form-control'
            id='exampleFormControlInput1'
            // Когда наш пользователь будет фокусироваться на этом input (мы вызовем focus)
            onFocus={context.forceChangeMail}/>
    )
}

export default InputComponent;