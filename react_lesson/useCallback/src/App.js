import {useState, useCallback, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


// Наш Slider загружает для себя изображения посредством запроса на сервер, для этого была создана ф-ия getSomeImages
// Имитируем сервер, который возвращает массив картинок
// function getSomeImages() {
//     console.log('fetching');
//     return [
//         "https://www.planetware.com/photos-large/F/eiffel-tower.jpg",
//         "https://www.planetware.com/photos-large/F/eiffel-tower.jpg"
//     ]
// }

const Slider = () => { // 8:22
    
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // При данной записи с использованием useCallback у нас всеравно идет вызов getSomeImages
    // Если у нас вызов getSomeImages() в методе render и useCallback находятся в одном компоненте, то у нас не получится мемоизировать ф-ию (у нас каждый раз при обновлении или изменении ... 
    // ... компонента будет вызыватся getSomeImages в методе render)
    // Этот прием полезен при передаче дочернему компоненту, который не должен каждый раз меняться (Для этого мы создадим отдельный компонент Slide, который будет отвечать за несколько слайдов)

    const getSomeImages = useCallback(() => { // Имитируем сервер, который возвращает массив картинок
        console.log('fetching');
        return [
            "https://www.planetware.com/photos-large/F/eiffel-tower.jpg",
            "https://www.planetware.com/photos-large/F/eiffel-tower.jpg"
        ]
    }, [slide])
    // Первым аргументов идет ф-ия, а вторым массив зависимостей
    // следим за состоянием slide
    // Теперь это мемоизированная ф-ия. React запомнил ее внутри компонента Slider и теперь он ее не создает каждый раз, когда компонент обновляется useCallback(() => {}, []) очищаем массив  
    // ... зависимостей
    // Мы можем мемоизировать ф-ии в основном, когда мы передаем эту ф-ию во внутрь дочернего компонента
    // От себя использовать useCallback для запросов и useEffect для того чтобы вызывать и обновлять useCallback

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }
    
    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay); 
    }
    
    return (
        <Container> 
            <div className="slider w-50 m-auto">
                {/* Каждое обновление props or state вызывает метод render и поэтому метод getSomeImages также будет вызываться */}
                {/* Если мы будем изменять какой то state, то мы каждый раз будем вызывать запрос(getSomeImages). Это плохо так как сильно ударит по оптимизации */}
                {/* Исходя из этого нам нужно закэшировать ф-ию getSomeImages чтобы она вызвалась один раз исходя из надобности для этого и нужно useCallback, ... */}
                {/* ... который возвращает нам мемоизированую версию callbacka */}
                {/* Проблема состоит в том, что у нас идет каждый раз вызов ф-ии getSomeImages() при рендере. Решение состоит в том, чтобы передавать данную ф-ию дочернему компоненту  */}
                {/* {
                    getSomeImages().map((url, i) => {
                        return (
                            <img key={i} src={url} alt="slide" class="d-black w-100" />
                        )
                    })
                } */}

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active Slide {slide} <br/> {autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>
                        -1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>
                        +1
                    </button>
                    <button
                         className="btn btn-primary me-2"
                         onClick={toggleAutoplay}>
                         Toggle Autoplay
                    </button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => { // Отдельный компонент который отвечает за рендеринг // Мы передаем в него props ф-ию
    const [images, setImages] = useState([]); // Изначально у состояния пустой массив

    // Когда этот компонент будет создан и вдруг он начнет обновляться, то в таком случае мы будем менять количество изображений внутри моего слайдера
    useEffect(() => { // В useEffect помещается callback func, которая вызывается каждый раз при создании компонента или при его обновлении
        setImages(getSomeImages()) // Эта ф-ия которая устанавливает наше состояние в images // Установит массив с картинками в images
    }, [getSomeImages]) // Правильное поведение состоит в том, чтобы делать запрос (getSomeImages) внутри useEffect
    // Если getSomeImages изменится, только тогда useEffect будет вызван повторно
    // Ф-ия по получению изображения может измениться, например помеять url к которому обращается, параметры запроса
    // Это зависимость говорит, что только когда наша ф-ия измениться, только тогда мы вызовем эту ф-ию повторно

    return (
        <>
            {images.map((url, i) => <img key={i} src={url} alt="slide" class="d-black w-100" />)} 
            {/* Таким образом мы иметируем удаления обработчика событий на window, когда компонент slider был удален (описание выше) */}
        </>
    )
}
                
function App() {
    const [slider, setSlider] = useState(true);
    
    return (
        <> 
            <button onClick={setSlider(() => !slider)}>Click Me</button> 
            {slider ? <Slider/> : null}
        </>
    )
}

export default App;
