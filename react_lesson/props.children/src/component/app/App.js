import React from 'react';
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
            {/* Во внутрь props.childer мы будем передавать структуру через компонент DynamicGreating */}
            {/* Во внутрь компонента DynamicGreating мы можем передавать все что угодно (какую то структуру, компоненты, элементы) */}
            
            {/* Нам нужно модифицировать jsx элементы (объекты) и для того чтобы у нас все правильно работало, нужно соблюдать принципы иммутабельности
                React.cloneElement применяется чтобы в child записать новое свойство без прямого мутирования элемента. Помогает клонировать и возвращать новый react-элемент
                В props.childeren передается только один элемент либо если передается несколько, тогда элементы попадают в массив
                Применяем когда нужно передать какое-то свойство, например стили
                В React.cloneElement - мы можем передать 3 аргумета (1. elem, [config] - новые свойства, [...children] - это дети которые будут передаваться внутрь компонента) */}
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
                })
            }
        </div>
    )
}

function App() {
  return (
    <Wrapper>
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
