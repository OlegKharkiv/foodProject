function sliderCarusel({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
// Slider karusel

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prevSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          totalSlides = slides.length,
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let index = 1;
    let offSet = 0;

    if (totalSlides < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${index}`;
    } else {
        total.textContent = slides.length;
        current.textContent = index;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slider => {
        slider.style.width = width; 
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsAll = [];

    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsAll.push(dot);
    }

    function StringToNumber (str) {
        return +str.replace(/\D/g, '');
    }

    function plusZerro () {
        if (slides.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }
    }

    function dotOpacity () {
        dotsAll.forEach(dot => dot.style.opacity = '.5');
        dotsAll[index - 1].style.opacity = 1; 
    } 

    nextSlide.addEventListener('click', () => {
        if(offSet == StringToNumber(width) * (slides.length - 1)) {
        offSet = 0;
        } else {
        offSet += StringToNumber(width);
        }

    slidesField.style.transform = `translateX(-${offSet}px)`;

    if(index == slides.length) {
        index = 1;
    } else {
        index++;
    }

    plusZerro ();

    dotOpacity (); 
    });


    prevSlide.addEventListener('click', () => {
        if(offSet == 0) {
            offSet = StringToNumber(width) * (slides.length - 1);
        } else {
            offSet -= StringToNumber(width);
        } 

    slidesField.style.transform = `translateX(-${offSet}px)`;

        if(index == 1) {
            index = slides.length;
        } else {
            index--;
        }

        plusZerro ();

        dotOpacity (); 
    });

    dotsAll.forEach(dot => {
        dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        index = slideTo;
        offSet = StringToNumber(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offSet}px)`;

        plusZerro ();
        
        dotOpacity ();
        });
    });
}

export default sliderCarusel;