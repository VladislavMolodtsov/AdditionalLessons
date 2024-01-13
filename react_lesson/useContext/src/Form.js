import { Container } from "react-bootstrap";
import InputComponent from "./InputComponent";

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

export default Form;