import {Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';

// 12:58
// Выводы ...
// 1-ое: в реальных приложениях намного проше использовать компонент Formik
// 2-ое: теперь мы знаем как он работает изнутри
// 3-ье: валидацию намного проще проводить через сторонние библиотеки, а не прописывать свои большие условия
// 4-ое: при помощи данной логики, мы можем валидировать любую форму

const MyTextInput = ({label, ...props}) => {
  // Передаем пропсы, затем мы их диструктурируем в props используем spread operator. label - это текст внутри label, ...props - это attr компонента field
  const [field, meta] = useField(props);
  // useField позволяет получать массив из 2-х объектов
  // field - это props-ы, value, onBlur, onChange которые отвечают за текущее состояние нашего input
  // meta - это метаданные с ошибками и был ли уже использован данный input
  // В useField вторым аргументом можем использовать тип аргумента который мы будем испльзовать (checkbox, select)

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field}/>
      {/* В данный input мы должны поместить все props (id, name, type и др.) для этого мы помещаем их в конструкцию {...props} */}
      {/* Теперь нам нужно связать наш компонент с нашей формой Formik - это значит, что наш input должен получить такие характеристики как ... */}
      {/* ...  value, onBlur, onChange - для этого соществует hook useField, он через контекст будет получать эти property, когда он используется внутри Formik-a*/}
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
      {/* .touched - использовал ли input наш пользователь */}
      {/* .error - описание ошибки */}
    </>
  )
}

const MyCheckbox = ({children, ...props}) => {
  // Передаем пропсы, затем мы их диструктурируем в props используем spread operator
    // children - это необезательно текст, это может быть компонент или что-то еще
    // 
    // В useField вторым аргументом можем использовать тип аргумента который мы будем испльзовать (checkbox, select)
    // за счет данногo type у нас в field прийдет не value а checked значение, которые мы меняем как пользователь
  const [field, meta] = useField({...props, type: 'checkbox'});
  return (
    <>
      <label className='checkbox'>
        <input type="checkbox" name="terms" {...props} {...field}/>
            {children}
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}

const CustomForm = () => {
  return (
    <Formik
      // initialValues - теперь это properties, а не объект, все что внутри мы должны окружить фигурными скобками
      initialValues = {{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false
      }}
      validationSchema = {Yup.object({
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
      })}
      onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>

        {/* <label htmlFor="name">Ваше имя</label> */}
        {/* <Field 
          // Компонент Field получает props value, handleChange, handleBlur - через контекст компонента Form 
          id="name"
          name="name" 
          type="text"/> */}
        {/* <ErrorMessage className="error" name='name' component='div'/> */}
        {/* component - мы указываем потому что без него наш компонент ErrorMessage будет рендериться в формате строки, а с данным компонентом у нас будет рендериться div внутри которого будет сообщение об ошибке, который приходит от validationSchema*/}

        <MyTextInput
          label="Ваше имя"
          id="name"
          name="name" 
          type="text"/>

        {/* <label htmlFor="email">Ваша почта</label>
        <Field 
          id="email"
          name="email" 
          type="email"/>
        <ErrorMessage className="error" name='email' component='div'/> */}

        <MyTextInput
          label="Ваша почта"
          id="email"
          name="email" 
          type="email"/>

        {/* <label htmlFor="amount">Количество</label>
        <Field
          id="amount" 
          name="amount"
          type="number"/>
        <ErrorMessage className="error" name='amount' component='div'/> */}

        <MyTextInput
          label="Количество"
          id="amount" 
          name="amount"
          type="number"/>

        <label htmlFor="currency">Валюта</label>
        <Field 
          id="currency"
          name="currency"
          // Field по умолчанию рендерит input, поэтому нам нужно указать аттрибут as, для того чтобы указать какой ...
          // ... какой компонент нам нужно отрендерить. Мы рендерим Field в качестве select
          as='select'>
            <option value="">Выберите валюту</option>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
            <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage className="error" name='currency' component='div'/>

        <label htmlFor="text">Ваше сообщение</label>
        <Field
          id="text"
          name="text"
          as='textarea'/>
        <ErrorMessage className="error" name='text' component='div'/>

        {/* <label className="checkbox">
          <Field
            name="terms"
            type="checkbox"/>
              Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage className="error" name='terms' component='div'/> */}
        <MyCheckbox
          name="terms">
          Соглашайтесь с политикой конфиденциальности?
        </MyCheckbox>

        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;