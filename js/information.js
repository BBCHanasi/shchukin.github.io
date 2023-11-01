$.getJSON(`../data/information.json`,function(data){
    setInformation(data);
});
function setInformation(data){
    data.informationItems.forEach((e,index) => {
        setItem(e)
    });
    completeInformation();
}
function setItem(info){
    let exampleItem = `<div class="information-wrapper information-carousel-cell">
    <div class="information-item">
        <div class="information-head">
            <video autoplay playsinline muted loop preload="auto">
                <source src="${info.video}${pixelDensity}.webm" type="video/webm">
                <source src="${info.video}${pixelDensity}.mp4" type="video/mp4">
            </video>
        </div>
        <div class="information-body">
            <div class="title">${info.title}</div>
            <div class="description">${info.description}</div>
        </div>
    </div>
</div>`
$('.information-carousel').append(exampleItem);
}


function completeInformation(){
    if (window.innerWidth >= 768) {
        $(".information-carousel").flickity({
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
            groupCells: 1,
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
    } else {
        $(".information-carousel").flickity({
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
