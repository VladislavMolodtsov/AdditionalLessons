import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';

// В разных браузерах по разному отображаются разные виды встроенных валидаций
// Далее мы бы хотели научится валидировать форму (поэтому мы напишем собственную ф-ию)
// В validate мы будем передавать ф-ию по валидации каждаго интерактивного элемента, который есть у нас в форме
// Данная ф-ия принимает значение values - это объект которой будет приходить из нашей формы
// const validate = values => {
//   const errors = {};
//   console.log(values);

//   if (!values.name) {
//     errors.name = 'Обязательное поле';
//   } else if (values.name.length < 2) {
//     errors.name = 'Минимум 2 символа для заполнения';
//   }

//   if (!values.email) {
//     errors.email = 'Обязательное поле';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { // Регулярные выражения.
//     // Если вдруг по шаблону наш email не подошел, то мы...
//     errors.email = 'Неправильный email адресс';
//   }

//   return errors;
// }

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false
    },
    // validate - это свойство useFormik, которое является ссылкой на функцию
    // Данная ф-ия валидации будет срабатывать каждый раз, когда вызывается handleChange ...
    // ... ввели мы что-то в input, у нас сработала ф-ия валидации, а также изменился state (initialValue)
    // validate,

    // validationSchema - это набор правил, которое мы можем применять к каждому с этих полей (тоесть initialValues)
    // Yup.object - означает, что мы вернем объект с какими-то ключами
    // Chaining - это набор команд в цепочке
    validationSchema: Yup.object({
      name: Yup.string()
              .min(2, 'Минимум 2 символа!')
              .required('Обязательное поле!'),
      email: Yup.string()
              .email('Неправильный email адрес!')
              .required('Обязательное поле!'),
      amount: Yup.number()
              .min(5, 'Не менее 5')
              .required('Обязательное поле!'),
      currency: Yup.string().required('Выберите валюту'),
      text: Yup.string()
              .min(10, 'Не менее 10 символов'),
      terms: Yup.boolean()
              .required('Необходимо согласие')
              .oneOf([true], 'Необходимо согласие')
    }),
    onSubmit: values => console.log(JSON.stringify(values, null, 2))
  })

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>

      <label htmlFor="name">Ваше имя</label>
      <input 
        id="name"
        name="name" 
        type="text" 
        value={formik.values.name} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}/>
        {/* onBlur - это событие срабатывает, когда мы уводим фокус с элемента (противоположное событие называется onFocus (когда нажымаем на элемент)) */}
        {/* Когда пользователь проивзаимодействовал с input срабатывает метод onBlur и свойство name на input записывается в объект touch , теперь мы... */}
        {/* ... мы можем правильно отображать сообщения с ошибкой ( func validate), а не когда при вводе срабатывают все input */}
        {formik.errors.name && formik.touched.name ? <div className='error'>{formik.errors.name}</div> : null}
        {/*  Мы обращается к формику, к его методу с ошибками */}
        {/* Если в поле input будет ошибка, то мы рэндерим (то что было указано в ф-ии validate (в условиях))... */}
        {/* ... и пользователь уже полностью провзаимодействовал с input, то только тогда мы выводим сообщение */}

      <label htmlFor="email">Ваша почта</label>
      <input 
        id="email"
        name="email" 
        type="email" 
        value={formik.values.email} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div className='error'>{formik.errors.email}</div> : null}

      <label htmlFor="amount">Количество</label>
      <input 
        id="amount" 
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
      {formik.errors.amount && formik.touched.amount ? <div className='error'>{formik.errors.amount}</div> : null}

      <label htmlFor="currency">Валюта</label>
      <select 
        id="currency"
        name="currency"
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}>
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
      </select>
      {formik.errors.currency && formik.touched.currency ? <div className='error'>{formik.errors.currency}</div> : null}

      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
      {formik.errors.text && formik.touched.text ? <div className='error'>{formik.errors.text}</div> : null}

      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
            Соглашаетесь с политикой конфиденциальности?
      </label>
      {formik.errors.terms && formik.touched.terms ? <div className='error'>{formik.errors.terms}</div> : null}

      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;