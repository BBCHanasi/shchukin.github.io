$.getJSON(`../data/example.json`,function(data){
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
    completeExample();
}
function setItemVideo(info){
    let exampleItem = `<div class="examples-wrapper examples-carousel-cell">
    <div class="example-item">
        <div class="example-image">
            <video autoplay playsinline muted loop preload="auto">
                <source src="${info.example}${pixelDensity}.webm" type="video/webm">
                <source src="${info.example}${pixelDensity}.mp4" type="video/mp4">
            </video>
        </div>
        <div class="example-footer">
            <div class="example-footer-top">
                <img srcset="${info.avatar}@3x.jpg 2.2x, ${info.avatar}@2x.jpg 1.2x, ${info.avatar}@1x.jpg 1x"
                     src="${info.avatar}@1x.jpg" 
                     width="64"
                     height="64"
                     alt="Аватар студента ${info.author}"
                >
                <div class="example-footer-info">
                    <div class="info-title">${info.author}</div>
                    <div class="info-post-title">${info.description}</div>
                </div>
            </div>
            <div class="example-footer-bottom" onclick="go_to_link('${info.link}')">
                <div class="example-link">Спросить про обучение</div>
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
                <source srcset="${info.example}@3x.avif 2.2x, ${info.example}@2x.avif 1.2x, ${info.example}@1x.avif 1x" type="image/avif">
                <img srcset="${info.example}@3x.jpg 2.2x, ${info.example}@2x.jpg 1.2x, ${info.example}@1x.jpg 1x" 
                     src="${info.example}@1x.jpg" 
                     width="324"
                     height="354"
                     alt="${info.description}"
                >
            </picture>
        </div>
        <div class="example-footer">
            <div class="example-footer-top">
                <img srcset="${info.avatar}@3x.jpg 2.2x, ${info.avatar}@2x.jpg 1.2x, ${info.avatar}@1x.jpg 1x"
                     src="${info.avatar}@1x.jpg" 
                     width="64"
                     height="64"
                     alt="Аватар студента ${info.author}"
                >
                <div class="example-footer-info">
                    <div class="info-title">${info.author}</div>
                    <div class="info-post-title">${info.description}</div>
                </div>
            </div>
            <div class="example-footer-bottom" onclick="go_to_link('${info.link}')">
                <div class="example-link">Спросить про обучение</div>
            </div>
        </div>
    </div>
</div>`
$('.examples-carousel').append(exampleItem);
}

function completeExample(){
    if(window.innerWidth >= 768){
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
        groupCells: 3,
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
    }else if(window.innerWidth < 768){
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
