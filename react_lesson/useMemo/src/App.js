import {useState, useCallback, useEffect, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


// В нашем слайдере может быть логика по вычеслению какого либо значения
// Выберем общее количество слайдов которое мы не знаем (например сложные расчеты координат, перебор большого количества данных с выбором нужного значения и т.д.)
// Ф-ию сountTotal мы будем использовать перед рендером верстки

const countTotal = (num) => { // будет получать в себя какую то цыфру или число
    console.log('loading calculation...'); // Данным действием мы посмотрим, когда у нас будет срабатываеть эта ф-ия
    return num + 10;
}

const Slider = () => { // 8:22
    
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // С помощью useCallback мы закешировали ф-ию
    // Здесь была мемоизирована ф-ия которая могла быть создана и перевызвана только тогда, когда нам это было нужно

    const getSomeImages = useCallback(() => { 
        console.log('fetching images');
        return [
            "https://www.planetware.com/photos-large/F/eiffel-tower.jpg",
            "https://www.planetware.com/photos-large/F/eiffel-tower.jpg"
        ]
    }, [slide])

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }
    
    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay); 
    }

    // В useCallback мы мемоизировали ф-ию (которая могла быть пересоздана и перевызвана, когда нам это нужно), а в useMemo мы мемоизируем только ... 
    // ...значение (которая расчитывается на основании какой-то ф-ии), а не ф-ию
    // Ф-ию сountTotal мы будем использовать перед рендером верстки
    // С помощью useMemo мы закэшировали значение
    // В useMemo нельзя закэшировать побочные эффекты (тоесть запрос на сервер или подписок), так как этот hook запускается во время рэндеринга и может привести к багам
    // Нам бы хотелось запомнить это значение, потому что наш рендер постоянно ее вызывает (просто вместо простого возврата будет что-то тяжелое и это займет много оперативной памяти)
    // Или вызывать его только в тот момент когда это нужно - вот для этого и нужен hook useMemo
    // В этой ф-ии мы хотим мемоизировать значение, которое расчитывается на основании какой то ф-ии и если вдруг что то поменалось, то мы перезапишем это значение
    // const total = countTotal(slide); // В total запишем общее количество слайдов

    const total = useMemo(() => { // Во внутрь useMemo мы передаем callback func, которая вернет нам количество слайдов
        return countTotal(slide)
    }, [slide])

    // Запишем зависимости. Эта ф-ия будет зависеть от slide (тоесть, если к-ство изменится, то перезапускаем ф-ию)
    // Мемоизированное (кэширование) - это когда компонент запоминает значения 
    // Если в зависимостях оставить [], то никакие изменения state или props не влияют на total (тоесть 1 раз мы его посчитали и все)

    
    // const style = {
    //     color: slide > 4 ? 'red' : 'black'
    // }

    // С помощью useMemo мы можем закэшировать объект

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    // При помощи useEffect мы можем следить за стилями

    useEffect(() => {
        console.log('styles total');
    }, [style])

    // Когда у нас будет измения стилей (мы вызываем console.log), мы будем вызывать callback function
    // В style мы передаем лишь ссылку от объекта (и получается так, что при каждом рендере объект style не является похожим на тот объект, который был до этого)
    // В javascript если объекты имеют одинаковые внутрености это не значит что они равны по ссылке и друг к другу
    // React думает что объект у нас поменялся и поэтому будет запускать callback ф-ию при каждом рендере
    // !!! Поэтому нам бы хотелось чтобы наш объект style был закэшированым. И в этом нам поможет useMemo (React при таких условия будет думать что объект не изменился)
    
    return (
        <Container> 
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active Slide {slide} <br/> {autoplay ? 'auto' : null} </div>
                <div style={style} className='text-center mt-5'>Total slides: {total} </div>
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

const Slide = ({getSomeImages}) => { 
    const [images, setImages] = useState([]); 

    useEffect(() => { 
        setImages(getSomeImages())
    }, [getSomeImages]) 

    return (
        <>
            {images.map((url, i) => <img key={i} src={url} alt="slide" class="d-black w-100" />)} 
        </>
    )
}
                
function App() {
    const [slider, setSlider] = useState(true);
    
    return (
        <> 
            <button onClick={() => setSlider(() => !slider)}>Click Me</button> 
            {slider ? <Slider/> : null}
        </>
    )
}

export default App;
