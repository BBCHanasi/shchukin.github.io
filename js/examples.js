$.getJSON(`/js/example.json`,function(data){
 setExample(data);
});
function setExample(data){
    data.exampleItems.forEach((e,index) => {
        if(e.type == "video"){
            setItemVideo(e);
        }else{
            setItemImg(e);
        }
    });
    complete();
}
function setItemVideo(info){
    let exampleItem = `<div class="examples-wrapper examples-carousel-cell">
    <div class="example-item">
        <div class="example-image">
            <video src="${info.example}" autoplay playsinline muted loop>
                <source src="${info.example}" type="video/mp4">
            </video>
    </div>
    <div class="example-footer">
        <div class="example-footer-top">
            <picture>
                <source srcset="${info.avatar}.png" type="image/png">
                <img class="lazy" src="${info.avatar}.webp" alt="аватар студента ${info.author}">
            </picture>
            <div class="example-footer-info">
                <div class="info-title">${info.author}</div>
                <div class="info-post-title">${info.description}</div>
            </div>
        </div>
        <div class="example-footer-bottom" onclick="go_to_link('${info.link}')">
            <div class="example-link">Спросить про обучение</div>
            <div class="example-tg-svg">
                <svg xmlns="http://www.w3.org/2000/svg" id="Livello_1" data-name="Livello 1" viewBox="0 0 132.25 109.7">
                    <g id="Artboard">
                        <path id="Path-3" class="example-tg-svg-colors" d="M10.05,47.59q52.5-22.8,70-30.2c33.3-13.9,40.3-16.3,44.8-16.4a8,8,0,0,1,4.7,1.4,5.29,5.29,0,0,1,1.7,3.3,17.28,17.28,0,0,1,.2,4.7c-1.8,19-9.6,65.1-13.6,86.3-1.7,9-5,12-8.2,12.3-7,.6-12.3-4.6-19-9-10.6-6.9-16.5-11.2-26.8-18-11.9-7.8-4.2-12.1,2.6-19.1,1.8-1.8,32.5-29.8,33.1-32.3a2.38,2.38,0,0,0-.6-2.1,2.75,2.75,0,0,0-2.5-.2c-1.1.2-17.9,11.4-50.6,33.5-4.8,3.3-9.1,4.9-13,4.8-4.3-.1-12.5-2.4-18.7-4.4-7.5-2.4-13.5-3.7-13-7.9C1.45,52.09,4.45,49.89,10.05,47.59Z" />
                    </g>
                </svg>
            </div>
        </div>
    </div>
</div>
</div>`
$('.examples-carousel').append(exampleItem);
}


function setItemImg(info){
    let exampleItem = `<div class="examples-wrapper examples-carousel-cell">
    <div class="example-item">
        <div class="example-image">
        <picture>
            <source srcset="${info.example}.png" type="image/png">
            <img src="${info.example}.webp" alt="3д сцена мальчик с монстром">
        </picture>
    </div>
    <div class="example-footer">
        <div class="example-footer-top">
            <picture>
                <source srcset="${info.avatar}.png" type="image/png">
                <img class="lazy" src="${info.avatar}.webp" alt="аватар студента ${info.author}">
            </picture>
            <div class="example-footer-info">
                <div class="info-title">${info.author}</div>
                <div class="info-post-title">${info.description}</div>
            </div>
        </div>
        <div class="example-footer-bottom" onclick="go_to_link('${info.link}')">
            <div class="example-link">Спросить про обучение</div>
            <div class="example-tg-svg">
                <svg xmlns="http://www.w3.org/2000/svg" id="Livello_1" data-name="Livello 1" viewBox="0 0 132.25 109.7">
                    <g id="Artboard">
                        <path id="Path-3" class="example-tg-svg-colors" d="M10.05,47.59q52.5-22.8,70-30.2c33.3-13.9,40.3-16.3,44.8-16.4a8,8,0,0,1,4.7,1.4,5.29,5.29,0,0,1,1.7,3.3,17.28,17.28,0,0,1,.2,4.7c-1.8,19-9.6,65.1-13.6,86.3-1.7,9-5,12-8.2,12.3-7,.6-12.3-4.6-19-9-10.6-6.9-16.5-11.2-26.8-18-11.9-7.8-4.2-12.1,2.6-19.1,1.8-1.8,32.5-29.8,33.1-32.3a2.38,2.38,0,0,0-.6-2.1,2.75,2.75,0,0,0-2.5-.2c-1.1.2-17.9,11.4-50.6,33.5-4.8,3.3-9.1,4.9-13,4.8-4.3-.1-12.5-2.4-18.7-4.4-7.5-2.4-13.5-3.7-13-7.9C1.45,52.09,4.45,49.89,10.05,47.59Z" />
                    </g>
                </svg>
            </div>
        </div>
    </div>
</div>
</div>`
$('.examples-carousel').append(exampleItem);
}

function complete(){
    if(window.innerWidth > 767){
    $(".examples-carousel").flickity({
        accessibility: true,
        adaptiveHeight: false,
        autoPlay: false,
        cellAlign: "left",
        cellSelector: undefined,
        contain: true,
        draggable: ">1",
        dragThreshold: 10,
        freeScroll: false,
        friction: 0.5,
        groupCells: false,
        initialIndex: 1,
        lazyLoad: true,
        percentPosition: true,
        prevNextButtons: true,
        pageDots: true,
        resize: true,
        rightToLeft: false,
        setGallerySize: true,
        watchCSS: false,
        wrapAround: false,
      });
    }else if(window.innerWidth <= 767){
        $(".examples-carousel").flickity({
            accessibility: true,
            adaptiveHeight: false,
            autoPlay: false,
            cellAlign: "left",
            cellSelector: undefined,
            contain: true,
            draggable: ">1",
            dragThreshold: 10,
            freeScroll: false,
            friction: 0.5,
            groupCells: false,
            initialIndex: 0,
            lazyLoad: true,
            percentPosition: true,
            prevNextButtons: true,
            pageDots: true,
            resize: true,
            rightToLeft: false,
            setGallerySize: true,
            watchCSS: false,
            wrapAround: false,
          }); 
    }
}