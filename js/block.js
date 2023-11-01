/// I-modal - скидочное модальное окно
$(document).ready(function() {
  sessionStorage.setItem('openedSaleModal', '0')
});



/*
 * Блокирование окна с сохранением позиции скролбара
 */

let documentWidthWithScroll = 0;
let documentWidthWithoutScroll = 0;
let scrollWidth = 0;

const $html = $('html');
const $header = $('.header');

function lockPage() {
  if (!$html.hasClass('scroll-lock')) {
    documentWidthWithScroll = $(window).width();
    $html.addClass('scroll-lock');
    documentWidthWithoutScroll = $(window).width();
    $html.css('padding-right', (documentWidthWithoutScroll - documentWidthWithScroll) + 'px');
    $header.css('right', (documentWidthWithoutScroll - documentWidthWithScroll) + 'px');
  }
}

function unlockPage() {
  if ($html.hasClass('scroll-lock')) {
    $html.css('padding-right', '');
    $header.css('right', '');
    $html.removeClass('scroll-lock');
  }
}


////I-modal - модальные окна
$('body').on( "click",".i-modal-btn", function() {
  open_imodal(this);
});

$('.i-modal').on( "click", function(e) {
  if(e.target==this||$(e.target).hasClass('close-i-modal-btn-wrapper')||$(e.target).hasClass('return-btn')){
    e.stopPropagation();
    close_imodal();
}});

function open_imodal(item){
  lockPage();
  let popupId = $(item).attr('data-popup-id');
  $(`#${popupId}`).fadeIn(250);

  // Раньше здесь был небольшой delay. Зачем? Если не разобрались зачем, то удаляем.
  // $(`#${popupId}`).delay(50).fadeIn(200);
};

function close_imodal(){
  $('.i-modal').fadeOut(250);
  setTimeout(() => {
      unlockPage();
      $('.i-modal').scrollTop(0);
  }, 250);
};

//Отслеживаем клик по блоку на главной странице
$('.new-item-chapters-wrapper').on( "click",".new-item-chapter", function() {

  let blockNumber = $(this).attr('data-block');
    let inCart = false;

    //Узнаем добавлен ли блок в корзину
    if($(`.pp_ls_block[data-block="${blockNumber}"]`).hasClass('checked_block')){
        inCart = true;
    }

    //Получаем json
    $.getJSON(`../data/blocks/${blockNumber}-block.json`,function(data){
        setInfo(data, inCart, blockNumber);
    });

});

//Устанавливаем основную инфу блока в modal
async function setInfo(info, inCart, blockNumber){
    let item = $('#block-modal');
    let cover = ''; //переменная с html содержимым обложки

    if(info['type-cover'] == 'video'){
      cover = `
        <div class="cover">
          <video autoplay playsinline muted loop>
            <source src="${info['cover-img']}${pixelDensity}.webm" type="video/webm">
            <source src="${info['cover-img']}${pixelDensity}.mp4" type="video/mp4">
          </video>
          </div>  
        </div>
      `;
    }else{
      cover = `
        <div class="cover">
            <picture>
            
                <source srcset="${info['cover-img']}-large@3x.avif 3x, ${info['cover-img']}-large@2x.avif 2x, ${info['cover-img']}-large@1x.avif 1x" type="image/avif" width="1010" height="478" media="(min-width: 768px)">
                <source srcset="${info['cover-img']}-large@3x.jpg 3x, ${info['cover-img']}-large@2x.jpg 2x, ${info['cover-img']}-large@1x.jpg 1x" type="image/jpeg" width="1010" height="478" media="(min-width: 768px)">
                
                <source srcset="${info['cover-img']}-small@3x.avif 3x, ${info['cover-img']}-small@2x.avif 2x, ${info['cover-img']}-small@1x.avif 1x" type="image/avif" width="634" height="300" media="(max-width: 767px)">
                <source srcset="${info['cover-img']}-small@3x.jpg 3x, ${info['cover-img']}-small@2x.jpg 2x, ${info['cover-img']}-small@1x.jpg 1x" type="image/jpeg" width="634" height="300" media="(max-width: 767px)">
                
                <img src="${info['cover-img']}-large@1x.jpg" 
                  width="1010"
                  height="478"
                  alt="${info['title']}"
                >
              </picture>
        </div>
        `
    }

    item.find('.cover').remove();
    item.find('.course-cover').append(cover);

    item.find('.course-short-info').find('.number-lessons').children('.title').text(info['lessons']);
    item.find('.course-short-info').find('.time').children('.title').text(info['time']);
    item.find('.course-short-info').find('.level').children('.title').text(info['level']);

    item.find('.course-description').children('.title').html(info['title']);
    item.find('.course-description').children('.description').html(info['description']);


    //Добавляем иконки
    item.find('.icons-wrapper').html('')
    info['icons'].forEach(function (e) {
        let i = `<div class="icon ${e}-icon"></div>`;
        item.find('.icons-wrapper').append(i);
    })

    //Добавляем преподавателей
    item.find('.teachers-wrapper').html('')

    info['teachers'].forEach(function (e) {
        let i = `
        <div class="teacher-item">
            <img srcset="${e.avatar}@3x.jpg 3x, ${e.avatar}@2x.jpg 2x, ${e.avatar}@1x.jpg 1x"
                src="${e['avatar']}@1x.jpg" 
                width="40"
                height="40"
                alt=""
            >
            <div class="teacher-info">
                <div class="title">${e['name']}</div>
                <div class="description">${e['prof']}</div>
            </div>
        </div>
        `;
        item.find('.teachers-wrapper').append(i);
    })


    //Добавляем этапы обучений
    item.find('.course-inside-info').html('')

    info['timeline'].forEach(function (e) {
        //Получаем тэги
        let tags = ``;
        e['tags'].forEach(function (e) {
            tags+=`<div class="tag">${e}</div>`
        });
        //Вставляем инфу
        let i = `<div class="inside-item">
                <div class="inside-item-content">
                    <div class="title">
                        ${e['title']}
                    </div>
                    <div class="description">
                        ${e['description']}
                    </div>
                    <div class="tags-wrapper">
                        ${tags}
                    </div>
                </div>
                <div class="inside-item-img">
                    <video preload="auto" playsinline autoplay muted loop>
                        <source src="${e['img']}${pixelDensity}.webm" type="video/webm">
                        <source src="${e['img']}${pixelDensity}.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        `;
        //Добавляем в html
        item.find('.course-inside-info').append(i);
    })
    //Добавляем кнопку
    $('.buy-btn').attr(`data-block`,blockNumber);
    if(inCart == true){
        $('.buy-btn').addClass('active');
    }else{
        $('.buy-btn').removeClass('active');
    }

}

///// Работа кнопки
$(".buy-btn").click(function(e) {
    e.preventDefault();
    let blockNumber = $(this).attr('data-block');
    $(this).toggleClass('active');
    $(`.pp_ls_block[data-block="${blockNumber}"]`).click();
});

//Создание карточек на главной странице
$(document).ready(function() {

  let itemsCount = 11; // Тут нужно подумать как тянуть число json файлов
  for (let i = 1; i <= itemsCount; i++) {
    $.getJSON(`../data/blocks/${i}-block.json`,function(data){
      if(data['type-preview'] == "video"){
        setItemTypeVideo(data, i)
      }else{
        setItemTypeImg(data, i);
      }

      // Установить и скачать всё содержимое модалок при открытии:
      // setInfo(data, inCart = false, i);
    });
  }

});

function setItemTypeImg(data, i){
  let progress = '';
  if (data['in_progress'] == 'in_progress') {
    progress = 'in-progress';
  } else if (data['in_progress'] == 'presale') {
    progress = 'presale';
  } else if (data['in_progress'] == 'no_timeline') {
    progress = 'no-timeline';
  }

  var strInstPrice = "";
  if ((isNaN(BBC_Inst_price[i])) || (progress.length > 0)) {
    strInstPrice = data['price-title']
  } else {
    strInstPrice = 'от ' + (Math.ceil(BBC_Inst_price[i] / 12 / 10) * 10).toLocaleString() + ' ₽ в месяц';
  }

  var strFullPrice = "";
  if ((isNaN(BBC_Full_price[i])) || (progress.length > 0)) {
    strFullPrice = data['price-description']
  } else {
    strFullPrice = 'или сразу ' + (BBC_Full_price[i]).toLocaleString() + ' ₽';
  }

  let item = `
  <div class="new-item-chapter ${progress} i-modal-btn text-${data['text-color']}" style="order:${i}" data-popup-id="block-modal" data-block="${i}" data-category="${data['category'].join(', ')}">
    <div class="chapter-cover">
      <picture>
        <source srcset="${data['preview-img']}@3x.avif 3x, ${data['preview-img']}@2x.avif 2x, ${data['preview-img']}@1x.avif 1x" type="image/avif">
        <img srcset="${data['preview-img']}@3x.jpg 3x, ${data['preview-img']}@2x.jpg 2x, ${data['preview-img']}@1x.jpg 1x" 
          src="${data['preview-img']}@1x.jpg" 
          width="328"
          height="328"
          alt="${data['title']}"
        >
      </picture>
    </div>
    
    <div class="item-content bl-${i}">

      <div class="item-chapter-header">
        <div class="info-wrapper">
            <div class="presale-title">предпродажа</div> 
            <div class="pretitle">Блок ${i}</div>
            <div class="lessons-icon"><span class="icon-text">${data['lessons']}</span></div>
            <div class="time-icon"><span class="icon-text">${data['time']}</span></div>

        </div>
        <div class="title">${data['title']}</div>
      </div>
      
      <div class="price-wrapper">
        <div class="title">
        ${strInstPrice}
        </div>
        <div class="post-title">
        ${strFullPrice}
        </div>
      </div>

    </div>

  </div>
  `;

  $('.new-item-chapters-wrapper').append(item);

};

function setItemTypeVideo(data, i){
  let progress = '';
  if (data['in_progress'] == 'in_progress') {
    progress = 'in-progress';
  } else if (data['in_progress'] == 'presale') {
    progress = 'presale';
  } else if (data['in_progress'] == 'no_timeline') {
    progress = 'no-timeline';
  }

  var strInstPrice = "";
  if ((isNaN(BBC_Inst_price[i])) || (progress.length > 0)) {
    strInstPrice = data['price-title']
  } else {
    strInstPrice = 'от ' + (Math.ceil(BBC_Inst_price[i] / 12 / 10) * 10).toLocaleString() + ' ₽ в месяц';
  }

  var strFullPrice = "";
  if ((isNaN(BBC_Full_price[i])) || (progress.length > 0)) {
    strFullPrice = data['price-description']
  } else {
    strFullPrice = 'или сразу ' + (BBC_Full_price[i]).toLocaleString() + ' ₽';
  }

  let item = `
  <div class="new-item-chapter ${progress} i-modal-btn text-${data['text-color']}" style="order:${i}" data-popup-id="block-modal" data-block="${i}" data-category="${data['category'].join(', ')}">
    <div class="chapter-cover">
      <video autoplay playsinline muted loop preload="auto">
        <source src="${data['preview-img']}${pixelDensity}.webm" type="video/webm">
        <source src="${data['preview-img']}${pixelDensity}.mp4" type="video/mp4">
      </video>
    </div>  

    <div class="item-content bl-${i}">
      <div class="item-chapter-header">
        <div class="info-wrapper">
            <div class="presale-title">предпродажа</div> 
            <div class="pretitle">Блок ${i}</div>
            <div class="lessons-icon"> <span class="icon-text">${data['lessons']}<span class="icon-text"></div>
            <div class="time-icon"><span class="icon-text">${data['time']}</span></div>
        </div>
        <div class="title">${data['title']}</div>
      </div>
      
      <div class="price-wrapper">
        <div class="title">
          ${strInstPrice}
        </div>
        <div class="post-title">
          ${strFullPrice}
        </div>
      </div>

    </div>

  </div>
  `;

  $('.new-item-chapters-wrapper').append(item);

};



/* Фильтры */

$(document).ready(function () {

    /* Выбор фильтра по клику на него */
    $('.filter__item').on('click', function () {
        $('.filter__item').not( $(this) ).removeClass('filter__item--selected');
        $(this).toggleClass('filter__item--selected');
        runFilter();
    });

    /* Сброс фильтра по клику на "Сбросить" */
    $('.filter__reset').on('click', function () {
        $('.filter__item--selected').removeClass('filter__item--selected');
        runFilter();
    });

    /* Динамика скрытия/показа плиток в зависимости от выбранного фильтра */
    function runFilter() {

        /* Сначала исключительный случай -- если фильтр не выбран. В таком случае показываем все плитки. */
        if( ! $('.filter__item--selected').length ) {
            $('.new-item-chapter').show();
            $('.filter__reset').attr('disabled', true);
            return;
        }

        /* Активный фильтр */
        const currentFilters = $('.filter__item--selected').data('filter');

        /* Проверяем, каждый элемент на то, чтобы он включал в себя все выбранные категории */
        $('.new-item-chapter').each(function () {
            if ( $(this).data('category').includes(currentFilters) ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        /* Разблокируем "Сбросить */
        $('.filter__reset').attr('disabled', false);

    }

});


// function setItemTypeImg(data, i){
//   let progress = '';
//   if(data['in_progress'] == 'true'){
//     progress = 'in_progress';
//   }
//   let item = `
//   <div class="new-item-chapter ${progress} i-modal-btn text-${data['text-color']}" style="order:${i}" data-popup-id="block-modal" data-block="${i}">
//     <div class="chapter-cover">
// 						<img class="lazy" src="${data['preview-img']}" alt="${data['title']}">
//     </div>

//     <div class="item-content">

//       <div class="item-chapter-header">
//         <div class="info-wrapper">

//             <div class="pretitle">Блок ${i}</div>
//             <div class="lessons-icon"><span class="icon-text">${data['lessons']}</span></div>
//             <div class="time-icon"><span class="icon-text">${data['time']}</span></div>

//         </div>
//         <div class="title">${data['title']}</div>
//       </div>

//       <div class="price-wrapper">
//         <div class="title">
//           ${data['price-title']}
//         </div>
//         <div class="post-title">
//           ${data['price-description']}
//         </div>
//       </div>

//     </div>

//   </div>
//   `;

//   $('.new-item-chapters-wrapper').append(item);

// };
// function setItemTypeVideo(data, i){
//   let progress = '';
//   if(data['in_progress'] == 'true'){
//     progress = 'in-progress';
//   }
//   let item = `
//   <div class="new-item-chapter ${progress} i-modal-btn text-${data['text-color']}" style="order:${i}" data-popup-id="block-modal" data-block="${i}">
//     <div class="chapter-cover">
//       <video preload="auto" muted="muted" loop autoplay playsinline>
//         <source src="${data['preview-img']}" alt="Видео загружается...">
//       </video>
//     </div>

//     <div class="item-content">
//       <div class="item-chapter-header">
//         <div class="info-wrapper">
//             <div class="pretitle">Блок ${i}</div>
//             <div class="lessons-icon"> <span class="icon-text">${data['lessons']}<span class="icon-text"></div>
//             <div class="time-icon"><span class="icon-text">${data['time']}</span></div>
//         </div>
//         <div class="title">${data['title']}</div>
//       </div>

//       <div class="price-wrapper">
//         <div class="title">
//           ${data['price-title']}
//         </div>
//         <div class="post-title">
//           ${data['price-description']}
//         </div>
//       </div>

//     </div>

//   </div>
//   `;

//   $('.new-item-chapters-wrapper').append(item);

// };


/////////////////
//Massonry-grid// этот скрипт для 1 варианта верстки блоков
/////////////////
// function get_minHeight_massonry(){
//     let minHeight_massonry = [];
//     $('.new-item-chapter').each(function() {
//       minHeight_massonry.push( $(this).height());
//     });
//     return Math.min.apply(null,minHeight_massonry);
//   }

//   $('.new-item-chapter').each(function() {
//     // let gridRow = Math.round($(this).height() / 20);
//     // console.log(gridRow);
//     // $(this).css('grid-row',`span ${gridRow}`);
//     if($( this ).height() > get_minHeight_massonry()){
//       $(this).addClass('grid-control');
//     }
//   });

//   $(window).bind('resize', function(){
//     $('.new-item-chapter').each(function() {
//       if($( this ).height() > get_minHeight_massonry()){
//         $(this).addClass('grid-control');
//       }else{
//         $(this).removeClass('grid-control');
//       }
//     })
//   });
