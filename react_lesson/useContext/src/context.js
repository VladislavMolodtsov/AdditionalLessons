import {createContext} from 'react';

// Обычно создание контекста создается в отлельном файле

const dataContext = createContext({
    mail: 'name@example.com',
    text: 'some text',
    // forceChangeMail: () => {} - значение пустой объект, но не undefinied
    forceChangeMail: () => {}
});

export default dataContext;