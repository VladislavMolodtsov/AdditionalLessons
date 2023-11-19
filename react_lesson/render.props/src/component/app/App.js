import React, {Component} from 'react';
import styled from 'styled-components';
import BootstrapTest from '../bootstrapTest/BootstrapTest';

import './App.css';

const Wrapper = styled.div`
    width: 600px;
    margin: 80px auto 0 auto;
`;

const DynamicGreating = (props) => {
    return (
        <div className={'mb-3 p-3 border border-' + props.color}>
            {/* {props.children} */}
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
                })
            }
        </div>
    )
}

const Message = (props) => {
    return (
        <h2>The counter is {props.counter}</h2>
    )
}

class Counter extends Component {
    state = {
        counter: 0
    }

    changeCounter = () => {
        this.setState(({counter}) => ({
            counter: counter + 1
        }))
    }

    render() {
        return (
            <>
                <button
                    className={'btn btn-primary'}
                    onClick={this.changeCounter}>
                        Click Me
                </button>
                {this.props.render(this.state.counter)}
                {this.props.render(this.state.counter)}
                {/* Вот здесь мы вызвали ф-ию render и передали в него аргумент состояния компонента Counter*/}
                {/* Можно спокойно делать несколько вызовов таких ф-ий и при этом передавать несколько таких props */}
            </>
        )
    }
}

function App() {
  return (
    <Wrapper>
        <DynamicGreating color={'primary'}>
            {/*
                // Взяли компонент Counter передали в него prop render, который внутри себя содержал callback function
                // эта ф-ия принемает в себя какой то аргумент и возвращает другой компонент
                // В компоненте Counter в нужном нам месте вызвали эту ф-ию через запись prop.render(this.state.counter)
                // Таким образом мы гибко привязываем один компонент к другому не вписывая его напрямую 
            */}
            <Counter render={counter => (
                <Message counter={counter}/>
            )} />
        </DynamicGreating>
        
        <BootstrapTest
            left = {
                <DynamicGreating color={'primary'}>
                    <h2>This weel was hard</h2>
                    <h2>Hello world!</h2>
                </DynamicGreating>
            }
            right = {
                <DynamicGreating color={'primary'}>
                    <h2>RIGHT!</h2>
                </DynamicGreating>
            }
        />
    </Wrapper>
  );
}

export default App;
