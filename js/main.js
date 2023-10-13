(function () {
  function logElementEvent(eventName, element) {
    console.log(Date.now(), eventName, element.getAttribute("data-src"));
  }

  var callback_enter = function (element) {
    // logElementEvent("🔑 ENTERED", element);
  };
  var callback_exit = function (element) {
    // logElementEvent("🚪 EXITED", element);
  };
  var callback_loading = function (element) {
    // logElementEvent("⌚ LOADING", element);
  };
  var callback_loaded = function (element) {
    // logElementEvent("👍 LOADED", element);
  };
  var callback_error = function (element) {
    // logElementEvent("💀 ERROR", element);
  };
  var callback_finish = function () {
    // logElementEvent("✔️ FINISHED", document.documentElement);
  };
  var callback_cancel = function (element) {
    // logElementEvent("🔥 CANCEL", element);
  };

  var ll = new LazyLoad({
    unobserve_entered: true, // <- Avoid executing the function multiple times
    class_applied: "lz-applied",
    class_loading: "lz-loading",
    class_loaded: "lz-loaded",
    class_error: "lz-error",
    class_entered: "lz-entered",
    class_exited: "lz-exited",
    // Assign the callbacks defined above
    callback_enter: callback_enter,
    callback_exit: callback_exit,
    callback_cancel: callback_cancel,
    callback_loading: callback_loading,
    callback_loaded: callback_loaded,
    callback_error: callback_error,
    callback_finish: callback_finish,
  });
})();

$(".hamburger").click(function () {
  $(".header").toggleClass("active");
  // $(".header").addClass("show");

  return false;
});

// переход по клику на объектах go_to
$(document).on("click", ".go_to", function () {
  var scroll_el = $(this).attr("data-go");
  var header_heigth = $(".header").outerHeight();
  // $(".header").removeClass("show");

  if ($(scroll_el).length != 0) {
    $("html, body").animate(
      { scrollTop: $(scroll_el).offset().top - header_heigth },
      500
    );
  }

  // setTimeout(() => $(".header").addClass("show"), 550);
  // setTimeout(() => $(".header").addClass("show"), 650);

  return false;
});

// переход по клику на объектах menu_go_to
$(document).on("click", ".menu_go_to", function () {
  var scroll_el = $(this).attr("data-go");
  var header_heigth = 82;

  $(".header").toggleClass("active");
  // $(".header").removeClass("show");

  if ($(scroll_el).length != 0) {
    $("html, body").animate(
      { scrollTop: $(scroll_el).offset().top - header_heigth },
      500
    );
  }

  // setTimeout(() => $(".header").addClass("show"), 550);
  // setTimeout(() => $(".header").addClass("show"), 650);

  return false;
});

// открытие ссылок
function go_to_link(url) {
  window.open("https://" + url);
}

// переключение контента с описанием частей курса
$(document).on("click", ".media-selector", function () {
  var index = $(this).attr("select-index");
  var chapter_item = $(this).closest(".chapters-left-side");
  var objects = $(chapter_item).find(".media-content");

  for (var i = 0; i < objects.length; i++) {
    if (i == index - 1) {
      objects[i].classList.add("active");
      $(objects[i]).parent().css("height", objects[i].scrollHeight);
    } else {
      objects[i].classList.remove("active");
    }
  }
});
// окончание проигрывания любого видео
$("video").on("ended", function () {
  this.currentTime = 0;
  this.src = this.src;
});
// Изменение статуса выделения пункта в аккордеоне
function set_active_item(index) {
  var objects = document.getElementsByClassName("faq_item");
  var objects_2 = document.getElementsByClassName("faq_item_body_text");

  for (var i = 0; i < objects.length; i++) {
    if (i == index && !objects[i].classList.contains("faq_item_active")) {
      objects[i].classList.add("faq_item_active");
      objects[i].style.paddingBottom = `56px`;
      objects_2[i].style.maxHeight = `${objects_2[i].scrollHeight}px`;

      if (matchMedia("screen and (max-width: 1023px)").matches) {
        objects[i].style.paddingBottom = `48px`;
      }

      if (matchMedia("screen and (max-width: 767px)").matches) {
        objects[i].style.paddingBottom = `32px`;
      }
    } else {
      objects[i].classList.remove("faq_item_active");
      objects[i].style.paddingBottom = `40px`;
      objects_2[i].style.maxHeight = `0px`;

      if (matchMedia("screen and (max-width: 767px)").matches) {
        objects[i].style.paddingBottom = `24px`;
      }
    }
  }
}

/* Player */

function video_modal(hash) {
  $("#yt_player").append(
    '<iframe class="video_yt_player" width="100%" height="100%" src="https://www.youtube.com/embed/' +
      hash +
      '?enablejsapi=1&amp;autoplay=1&amp;start=0&amp;autohide=1&amp;wmode=opaque&amp;showinfo=0&amp;origin=https://easymetry.com&amp;rel=0&amp;iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media"></iframe>'
  );
  open_modal("#modal_video");
}

/* Player */

// Анимация хедера
$(document).ready(function () {
  // Запоминаем стартовое положение странички
  let prevScrollpos = window.pageYOffset;

  // Запрещаем прятать хедер
  // var canHide = false;

  // Показываем хедер
  // setTimeout(() => $(".header").addClass("show"), 250);
  // setTimeout(() => $(".header").addClass("show"), 500);
  // setTimeout(() => $(".header").addClass("show"), 750);
  // setTimeout(() => $(".header").addClass("show"), 1000);

  $(window).scroll(function (event) {
    /* !!! появление/исчезновение при скролле !!! */

    // Положение странички при скролле
    lastScrollpos = window.pageYOffset;
    // Положение второго блока
    //minScrollPos = $('.trailer').offset().top - 82;
    minScrollPos = 100;

    // Если не дошли до второго блока, постоянно показываем хедер
    if (lastScrollpos < minScrollPos) {
      canHide = false;
    } else {
      canHide = true;
    }

    // Добавляем границу после первого блока
    const addBorder = 600;
    if (lastScrollpos < addBorder) {
      $(".header").removeClass("border");
    } else {
      $(".header").addClass("border");
    }

    // Действие при прокрутке вниз
    if (lastScrollpos > prevScrollpos && canHide) {
      // Прячем хедер
      // $(".header").removeClass("show");
      // Действие при прокрутке вверх
    } else {
      // Показываем хедер
      // $(".header").addClass("show");
    }

    // Запоминаем текущее положение странички после скролла
    // С задержкой в 0.5с для исключения микроскроллов
    setTimeout(() => (prevScrollpos = lastScrollpos), 500);

    /* !!! подсветка активного пункта !!! */

    // определяем позиции разделов
    var about = $(".information").offset().top;
    var training_programm = $(".new-chapters").offset().top; // to_do изменить на раздел с блоками
    var students = $(".examples-header").offset().top;
    var testimonials = $(".testimonials").offset().top;
    var payment = $(".pp_base").offset().top;
    var faq = $(".faq_base").offset().top;

    // определяем высоту области просмотра
    var viewport_heigth = document.documentElement.clientHeight;
    // определяем текущую позицию скролла без учёта высоты хедера
    var header_heigth = 82;
    var currentScrollPos =
      window.pageYOffset + header_heigth + 1 + viewport_heigth / 2;

    // определяем в каком разделе находимся и подсвечиваем нужный элемент

    if (currentScrollPos < about) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (about < currentScrollPos && currentScrollPos < training_programm) {
      $(".m-about").addClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (training_programm < currentScrollPos && currentScrollPos < students) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").addClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (students < currentScrollPos && currentScrollPos < testimonials) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").addClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (testimonials < currentScrollPos && currentScrollPos < payment) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").addClass("active");
      $(".m-faq").removeClass("active");
    }

    if (payment < currentScrollPos && currentScrollPos < faq) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (faq < currentScrollPos) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").addClass("active");
    }
  });
});

///// Скидка
$('#checkbox-sale-all').click(function() {
  if($('.pp_body').attr('data-state') == 'true'){
    unselectAllBlock();
  }else{
    selectAllBlock()
  }
});

function checkSaleStatus(){
  //var uncheckedBlocks = $('.pp_ls_blocks_list').find('.unchecked_block:not(.presale_block)');
  var uncheckedBlocks = $('.pp_ls_blocks_list').find('.unchecked_block');
  if(uncheckedBlocks.length == 0){
    $('.pp_body').addClass('sale-active')
    $('.pp_body').attr( "data-state", "true" );
    return true
  }else{
    $('.pp_body').removeClass('sale-active')
    $('.pp_body').attr( "data-state", "false" );
    return false
  }
}

function selectAllBlock(){
  // $(".pp_ls_blocks_list").find('.pp_ls_block:not(.presale_block)').addClass("checked_block")
  // $(".pp_ls_blocks_list").find('.pp_ls_block:not(.presale_block)').removeClass("unchecked_block")
  $(".pp_ls_blocks_list").find('.pp_ls_block').addClass("checked_block")
  $(".pp_ls_blocks_list").find('.pp_ls_block').removeClass("unchecked_block")
  calc_totals();
};
function unselectAllBlock(){
  // $(".pp_ls_blocks_list").find('.pp_ls_block:not(.presale_block)').addClass("unchecked_block")
  // $(".pp_ls_blocks_list").find('.pp_ls_block:not(.presale_block)').removeClass("checked_block")
  $(".pp_ls_blocks_list").find('.pp_ls_block').addClass("unchecked_block")
  $(".pp_ls_blocks_list").find('.pp_ls_block').removeClass("checked_block")
  calc_totals();
}

/* Константы для блока оплаты */

//const BBC_parts_count = document.querySelectorAll(".part-bbc:not(.presale_block)").length
const BBC_parts_count = document.querySelectorAll(".part-bbc").length

let BBC_Full_price = [];
let BBC_Inst_price = [];

BBC_Full_price[1] = 15900;
BBC_Full_price[2] = 15900;
BBC_Full_price[3] = 15900;
BBC_Full_price[4] = 15900;
BBC_Full_price[5] = 19900;
BBC_Full_price[6] = 23900;
BBC_Full_price[7] = 37900;
BBC_Full_price[8] = 19900;
BBC_Full_price[9] = 59900;
BBC_Full_price[10] = 15900;
BBC_Full_price[11] = 39900;

BBC_Inst_price[1] = 15900;
BBC_Inst_price[2] = 15900;
BBC_Inst_price[3] = 15900;
BBC_Inst_price[4] = 15900;
BBC_Inst_price[5] = 19900;
BBC_Inst_price[6] = 23900;
BBC_Inst_price[7] = 37900;
BBC_Inst_price[8] = 19900;
BBC_Inst_price[9] = 59900;
BBC_Inst_price[10] = 15900;
BBC_Inst_price[11] = 39900;

const BBC_Inst_special_price = 168000;


const MC_parts_count = 0;

let MC_Full_price = [];
let MC_Inst_price = [];

// MC_Full_price[1] = 19800;
// MC_Full_price[2] = 9900;

// MC_Inst_price[1] = 11900;
// MC_Inst_price[2] = 11900;

// Изменение статуса выделения блока оплаты
function blockchange(course, part) {
  var clickedEl = document.getElementById("bl_" + course + "_" + part);

  clickedEl.classList.toggle("unchecked_block");
  clickedEl.classList.toggle("checked_block");
  calc_totals();
}

// Пересчет общих сумм
function calc_totals() {
  var El_Full_price = document.getElementById("bl_full_price_text_li");
  var El_Inst_price = document.getElementById("bl_installment_price_text_li");
  var El_Inst_info = document.getElementById("bl_installment_info_text_li");
  var Full_total_price = 0;
  var Inst_total_price = 0;
  var str = "";

  for (var i = 1; i < BBC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_BBC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      Full_total_price = Full_total_price + BBC_Full_price[i];
      Inst_total_price = Inst_total_price + BBC_Inst_price[i];
    }
  }

  for (var i = 1; i < MC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_MC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      Full_total_price = Full_total_price + MC_Full_price[i];
      Inst_total_price = Inst_total_price + MC_Inst_price[i];
    }
  }
  // Пересчитываем цену с учетом того есть скидка или нет
  if(checkSaleStatus()){
    Full_total_price = Full_total_price /2;
    Inst_total_price = Inst_total_price /2;
    Inst_special_price = BBC_Inst_special_price;
  } else {
    Inst_special_price = Inst_total_price;
  };

  str = Full_total_price.toLocaleString() + ` ₽`;
  El_Full_price.innerHTML = str.replace(/ /g, "&nbsp") + `<div class="full-price">${(Full_total_price*2).toLocaleString() + ' ₽'}</div>`;

  str = (Math.ceil(Inst_special_price / 12 / 10) * 10).toLocaleString() + ` ₽`;
  El_Inst_price.innerHTML = str.replace(/ /g, "&nbsp");

  str = Inst_special_price.toLocaleString() + ` ₽`;
  El_Inst_info.innerHTML = str + `<div class="full-price">${(Inst_total_price*2).toLocaleString() + ' ₽'}</div>`;
}
// Изменение типа оплаты

function paychange(type) {
  var El_BBC_1_price = document.getElementById("bl_BBC_Part_1_price");
  var El_BBC_2_price = document.getElementById("bl_BBC_Part_2_price");
  var El_BBC_3_price = document.getElementById("bl_BBC_Part_3_price");
  var El_BBC_4_price = document.getElementById("bl_BBC_Part_4_price");
  var El_BBC_5_price = document.getElementById("bl_BBC_Part_5_price");
  var El_BBC_6_price = document.getElementById("bl_BBC_Part_6_price");
  var El_BBC_7_price = document.getElementById("bl_BBC_Part_7_price");
  var El_BBC_8_price = document.getElementById("bl_BBC_Part_8_price");
  var El_BBC_9_price = document.getElementById("bl_BBC_Part_9_price");
  var El_BBC_10_price = document.getElementById("bl_BBC_Part_10_price");
  var El_BBC_11_price = document.getElementById("bl_BBC_Part_11_price");

  // var El_MC_1_price = document.getElementById("bl_MC_Part_1_price");
  // var El_MC_2_price = document.getElementById("bl_MC_Part_2_price");

  var El_Choicer_Full = document.getElementById("ch_Full");
  var El_Choicer_Inst = document.getElementById("ch_Inst");
  var El_Hidden_Installment_info = document.getElementById(
    "bl_installment_info_text"
  );
  var El_Hidden_Input_city = document.getElementById("ib_city");
  var El_Payment_text = document.getElementById("bl_payment_text");
  var El_Agreement_text = document.getElementById("bl_agreement_text");
  var El_Button_text = document.getElementById("Submit_btn");

  if (type == "Full") {
    El_Hidden_Installment_info.classList.add("hidden");
    El_Hidden_Input_city.classList.add("hidden");
    El_Choicer_Full.classList.add("active_choicer");
    El_Choicer_Inst.classList.remove("active_choicer");

    El_BBC_1_price.innerHTML = BBC_Full_price[1].toLocaleString() + `&nbsp₽`;
    El_BBC_2_price.innerHTML = BBC_Full_price[2].toLocaleString() + `&nbsp₽`;
    El_BBC_3_price.innerHTML = BBC_Full_price[3].toLocaleString() + `&nbsp₽`;
    El_BBC_4_price.innerHTML = BBC_Full_price[4].toLocaleString() + `&nbsp₽`;
    El_BBC_5_price.innerHTML = BBC_Full_price[5].toLocaleString() + `&nbsp₽`;
    El_BBC_6_price.innerHTML = BBC_Full_price[6].toLocaleString() + `&nbsp₽`;
    El_BBC_7_price.innerHTML = BBC_Full_price[7].toLocaleString() + `&nbsp₽`;
    El_BBC_8_price.innerHTML = BBC_Full_price[8].toLocaleString() + `&nbsp₽`;
    El_BBC_9_price.innerHTML = BBC_Full_price[9].toLocaleString() + `&nbsp₽`;
    El_BBC_10_price.innerHTML = BBC_Full_price[10].toLocaleString() + `&nbsp₽`;
    El_BBC_11_price.innerHTML = BBC_Full_price[11].toLocaleString() + `&nbsp₽`;

    // El_MC_1_price.innerHTML = MC_Full_price[1].toLocaleString() + `&nbsp₽`;
    // El_MC_2_price.innerHTML = MC_Full_price[2].toLocaleString() + `&nbsp₽`;

    El_Payment_text.innerHTML =
      "Прежде чем перейти к&nbsp;оплате, подтвердите ознакомление с&nbsp;документами:";
    El_Agreement_text.innerHTML =
      "Нажимая на&nbspкнопку «Оформить заказ», вы&nbsp;подтверждаете что&nbsp;вам есть 18&nbsp;лет";
    El_Button_text.innerHTML = "Оформить заказ";
  } else if (type == "Installment") {
    El_Hidden_Installment_info.classList.remove("hidden");
    El_Hidden_Input_city.classList.remove("hidden");
    El_Choicer_Full.classList.remove("active_choicer");
    El_Choicer_Inst.classList.add("active_choicer");

    El_BBC_1_price.innerHTML = BBC_Inst_price[1].toLocaleString() + `&nbsp₽`;
    El_BBC_2_price.innerHTML = BBC_Inst_price[2].toLocaleString() + `&nbsp₽`;
    El_BBC_3_price.innerHTML = BBC_Inst_price[3].toLocaleString() + `&nbsp₽`;
    El_BBC_4_price.innerHTML = BBC_Inst_price[4].toLocaleString() + `&nbsp₽`;
    El_BBC_5_price.innerHTML = BBC_Inst_price[5].toLocaleString() + `&nbsp₽`;
    El_BBC_6_price.innerHTML = BBC_Inst_price[6].toLocaleString() + `&nbsp₽`;
    El_BBC_7_price.innerHTML = BBC_Inst_price[7].toLocaleString() + `&nbsp₽`;
    El_BBC_8_price.innerHTML = BBC_Inst_price[8].toLocaleString() + `&nbsp₽`;
    El_BBC_9_price.innerHTML = BBC_Inst_price[9].toLocaleString() + `&nbsp₽`;
    El_BBC_10_price.innerHTML = BBC_Inst_price[10].toLocaleString() + `&nbsp₽`;
    El_BBC_11_price.innerHTML = BBC_Inst_price[11].toLocaleString() + `&nbsp₽`;

    // El_MC_1_price.innerHTML = MC_Inst_price[1].toLocaleString() + `&nbsp₽`;
    // El_MC_2_price.innerHTML = MC_Inst_price[2].toLocaleString() + `&nbsp₽`;

    El_Payment_text.innerHTML =
      "Прежде чем оформить заказ, подтвердите ознакомление с&nbsp;документами:";
    El_Agreement_text.innerHTML =
      "Нажимая на&nbspкнопку «Оформить заказ», вы&nbsp;подтверждаете что&nbsp;вам есть 18&nbsp;лет";
    El_Button_text.innerHTML = "Оформить заказ";
  }
}

// Изменение чекбоксов в соглашениях
$(document).on("click", ".pp_rs_pay_additional_info_text", function () {
  $(this).toggleClass("active");

  var acc_pers_data = $("#Acc_Pers_Data");
  var acc_offerta = $("#Acc_Offerta");

  if (acc_pers_data.hasClass("active") && acc_offerta.hasClass("active")) {
    $("#Submit_btn").removeClass("disabled");
  } else {
    $("#Submit_btn").addClass("disabled");
  }
});

// обнуление всех чекбоксов
function cb_refresh() {
  // var El_Checkboxes = document.querySelectorAll(".pp_ls_block:not(.presale_block, .indev_block)");
  var El_Checkboxes = document.querySelectorAll(".pp_ls_block:not(.indev_block)");

  for (var i = 0; i < El_Checkboxes.length; i++) {
    El_Checkboxes[i].classList.remove("checked_block");
    El_Checkboxes[i].classList.add("unchecked_block");
  }

  calc_totals();
}

// отправка данных пользователя в геткурс

function submit() {
  if (document.getElementById("Submit_btn").classList.contains("disabled")) {
    return;
  }

  var user = {
    name: "",
    phone: "",
    mail: "",
    city: "",
  };
  var payment_type = "";
  var BBC_products = 0;
  var BBC_complete = "";
  var MC_products = 0;
  var MC_complete = "";
  var regexp = / /;
  var utm_data = "";
  var link = "";
  user.name = document.getElementById("inp_name").value;
  user.phone = document.getElementById("inp_phone").value;
  user.mail = document.getElementById("inp_mail").value;
  user.city = document.getElementById("inp_city").value;

  if (document.getElementById("ch_Full").classList.contains("active_choicer")) {
    payment_type = "Full";
  } else if (
    document.getElementById("ch_Inst").classList.contains("active_choicer")
  ) {
    payment_type = "Inst";
  } else {
    payment_type = "";
  }

  for (var i = 1; i < BBC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_BBC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      BBC_products = BBC_products + Math.pow(2, i - 1);
    }
  }

  for (var i = 1; i < MC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_MC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      MC_products = MC_products + Math.pow(2, i - 1);
    }
  }

  if (BBC_parts_count == document.querySelectorAll(".part-bbc.checked_block").length) {
    BBC_complete = "yes"
  }

  // if (MC_parts_count = document.getElementById("bl_MC_Part_" + i).classList.contains("checked_block")) {
  //   MC_complete = "yes"
  // }

  regexp = /^[A-Za-zА-Яа-яЁё .,_~*{}()[\]+-]+$/;
  user.name = regexp.exec(user.name);
  regexp = /^\(?\+?[0-9 ()+-]*[0-9]$/;
  user.phone = regexp.exec(user.phone);
  regexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  user.mail = regexp.exec(user.mail);

  if (
    user.name == undefined ||
    user.phone == undefined ||
    user.mail == undefined
  ) {
    alert("Проверьте правильность заполнения полей");
    return;
  }

  if (payment_type == "Inst") {
    regexp = /^[A-Za-zА-Яа-яЁё .,_~*{}()[\]+-]+$/;
    user.city = regexp.exec(user.city);

    if (user.city == undefined) {
      alert("Проверьте правильность заполнения полей");
      return;
    }
  }

  if ((BBC_products || MC_products) == 0) {
    alert("Выберите блоки для покупки");
    return;
  }

  if (window.location.search.length > 0) {
    utm_data = window.location.search.replace(/^[?]/, "");
  }

  link =
    "http://service.bestblendercourse.com/paymentblock.php?payment_type=" +
    payment_type +
    "&BBC_products=" +
    BBC_products +
    "&MC_products=" +
    MC_products +
    "&BBC_complete=" +
    BBC_complete +
    "&MC_complete=" +
    MC_complete +
    "&name=" +
    user.name +
    "&phone=" +
    user.phone +
    "&mail=" +
    user.mail;

  if (payment_type == "Inst") {
    link = link + "&city=" + user.city;
  }

  if (utm_data.length > 0) {
    link = link + "&" + utm_data;
  }

  location.href = link;
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// изменяет или добавляет новые куки
// с указанным name и значением value
// в options указываются доп. параметры
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // значения по умолчанию (можно добавить)
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет куки с параметром name
function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

// нажатие на подтверждение согласия на размещение куки
function cookie_accept() {
  setCookie("cookie_acc", "ok", { "max-age": 31536000 });
  $(".popup-cookie-info").addClass("popup-hidden");
  $(".popup-cookie-info").removeClass("popup-visible");
}

// открытие попапов с селектором ind
function popup_open(ind) {
  $(ind).removeClass("popup-hidden");
  $('html').addClass("scroll-lock");
}

// закрытие попапов с селектором ind
function popup_close(ind) {
  $(ind).addClass("popup-hidden");
  $('html').removeClass("scroll-lock");
}

document.addEventListener("DOMContentLoaded", function (e) {
  // инициализация стартового набора блоков для покупки
  paychange("Full");
  cb_refresh();

  // отображение уведомления о cookie
  var acc = getCookie("cookie_acc");

  if (acc !== "ok") {
    $(".popup-cookie-info").removeClass("popup-hidden");
    $(".popup-cookie-info").addClass("popup-visible");
  }
  
  // Попап при старте
  //setTimeout(() => open_imodal("#sale-modal"), 5000);
  //setTimeout(() => $("#small_preview_salebot").css('zIndex',900), 5000);
  //setTimeout(() => $("#parent_frame").css('zIndex',900), 5000);
});

// window.addEventListener('load', (event) => {

//   $("#small_preview_salebot").css('zIndex',900);
//   $("#parent_frame").css('zIndex',900);
// });

// блок с преподавателями
$(".teachers-carousel").flickity({
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
  pageDots: false,
  resize: true,
  rightToLeft: false,
  setGallerySize: true,
  watchCSS: false,
  wrapAround: false,
});
// подключение скроллера flickity

// блок с информацией о курсе
if(window.innerWidth > 767){


$(".information-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: true,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});
}else{
  $(".information-carousel").flickity({
    // options, defaults listed
  
    accessibility: true,
    // enable keyboard navigation, pressing left & right keys
  
    adaptiveHeight: false,
    // set carousel height to the selected slide
  
    autoPlay: false,
    // advances to the next cell
    // if true, default is 3 seconds
    // or set time between advances in milliseconds
    // i.e. `autoPlay: 1000` will advance every 1 second
  
    cellAlign: "left",
    // alignment of cells, 'center', 'left', or 'right'
    // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)
  
    cellSelector: undefined,
    // specify selector for cell elements
  
    contain: true,
    // will contain cells to container
    // so no excess scroll at beginning or end
    // has no effect if wrapAround is enabled
  
    draggable: ">1",
    // enables dragging & flicking
    // if at least 2 cells
  
    dragThreshold: 10,
    // number of pixels a user must scroll horizontally to start dragging
    // increase to allow more room for vertical scroll for touch devices
  
    freeScroll: false,
    // enables content to be freely scrolled and flicked
    // without aligning cells
  
    friction: 0.5,
    // smaller number = easier to flick farther
  
    groupCells: false,
    // group cells together in slides
  
    initialIndex: 0,
    // zero-based index of the initial selected cell
  
    lazyLoad: true,
    // enable lazy-loading images
    // set img data-flickity-lazyload="src.jpg"
    // set to number to load images adjacent cells
  
    percentPosition: true,
    // sets positioning in percent values, rather than pixels
    // Enable if items have percent widths
    // Disable if items have pixel widths, like images
  
    prevNextButtons: true,
    // creates and enables buttons to click to previous & next cells
  
    pageDots: true,
    // create and enable page dots
  
    resize: true,
    // listens to window resize events to adjust size & positions
  
    rightToLeft: false,
    // enables right-to-left layout
  
    setGallerySize: true,
    // sets the height of gallery
    // disable if gallery already has height set with CSS
  
    watchCSS: false,
    // watches the content of :after of the element
    // activates if #element:after { content: 'flickity' }
  
    wrapAround: false,
    // at end of cells, wraps-around to first for infinite scrolling
  });
}
// блоки в описании частей
$(".chapters-mobile-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: false,
  // creates and enables buttons to click to previous & next cells

  pageDots: false,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// $(".examples-carousel").flickity({
//   // options, defaults listed

//   accessibility: true,
//   // enable keyboard navigation, pressing left & right keys

//   adaptiveHeight: false,
//   // set carousel height to the selected slide

//   autoPlay: false,
//   // advances to the next cell
//   // if true, default is 3 seconds
//   // or set time between advances in milliseconds
//   // i.e. `autoPlay: 1000` will advance every 1 second

//   cellAlign: "left",
//   // alignment of cells, 'center', 'left', or 'right'
//   // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

//   cellSelector: undefined,
//   // specify selector for cell elements

//   contain: true,
//   // will contain cells to container
//   // so no excess scroll at beginning or end
//   // has no effect if wrapAround is enabled

//   draggable: ">1",
//   // enables dragging & flicking
//   // if at least 2 cells

//   dragThreshold: 10,
//   // number of pixels a user must scroll horizontally to start dragging
//   // increase to allow more room for vertical scroll for touch devices

//   freeScroll: false,
//   // enables content to be freely scrolled and flicked
//   // without aligning cells

//   friction: 0.5,
//   // smaller number = easier to flick farther

//   groupCells: false,
//   // group cells together in slides

//   initialIndex: 1,
//   // zero-based index of the initial selected cell

//   lazyLoad: true,
//   // enable lazy-loading images
//   // set img data-flickity-lazyload="src.jpg"
//   // set to number to load images adjacent cells

//   percentPosition: true,
//   // sets positioning in percent values, rather than pixels
//   // Enable if items have percent widths
//   // Disable if items have pixel widths, like images

//   prevNextButtons: true,
//   // creates and enables buttons to click to previous & next cells

//   pageDots: true,
//   // create and enable page dots

//   resize: true,
//   // listens to window resize events to adjust size & positions

//   rightToLeft: false,
//   // enables right-to-left layout

//   setGallerySize: true,
//   // sets the height of gallery
//   // disable if gallery already has height set with CSS

//   watchCSS: false,
//   // watches the content of :after of the element
//   // activates if #element:after { content: 'flickity' }

//   wrapAround: false,
//   // at end of cells, wraps-around to first for infinite scrolling
// });

// блок отзывов
if(window.innerWidth > 767){
$(".testimonials-carousel").flickity({
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
  $(".testimonials-carousel").flickity({
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
// блок логотипов компаний
if(window.innerWidth > 767){
$(".student-work-carousel").flickity({
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
  initialIndex: 2,
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
  $(".student-work-carousel").flickity({
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
// Зкакрытие открытого меню на мобилке при скролле

$(document).ready(function () {
  let prevScrollpos = window.pageYOffset;
  $(window).scroll(function (event) {
    lastScrollpos = window.pageYOffset;
    if (
      lastScrollpos > prevScrollpos + 30 ||
      lastScrollpos < prevScrollpos - 30
    );
    {
      $(".header").removeClass("active");
      prevScrollpos = window.pageYOffset;
    }
  });
});

// Валидация формы оплаты - чекбоксы
// $(".pp_rs_ui_submit_button").prop("disabled", true);

/*
$(".input_checkbox").click(function () {
  if (
    $("#check3").is(":checked") == true &&
    $("#check4").is(":checked") == true
  ) {
    $(".pp_rs_ui_submit_button").removeClass("button--disabled");
    // $(".pp_rs_ui_submit_button").prop("disabled", false);
  }
});
*/

// Фиксированная кнопка на мобилке
if (matchMedia("screen and (max-width: 1023px)").matches) {
  $(window).scroll(function () {
    var offset = $("#student-offset").offset();
    var welcomeArea = $(".information").offset();

    if (
      $(this).scrollTop() > offset.top ||
      $(this).scrollTop() <= welcomeArea.top
    ) {
      // console.log("hidden");
      $(".button_fixed").css({
        visibility: "hidden",
        opacity: "0",
      });
    } else {
      // console.log("visible");
      $(".button_fixed").css({
        visibility: "visible",
        opacity: "1",
      });
    }
  });
}


//http://service.bestblendercourse.com/pb.php?payment_type=Full&BBC_products=3&MC_products=0&BBC_complete=&MC_complete=&name=username&phone=89372456789&mail=test@yandex.ru&city=usercity
//https://service.bestblendercourse.com/paymentblock.php?payment_type=Full&BBC_products=3&MC_products=0&BBC_complete=&MC_complete=&name=username&phone=89372456789&mail=test@yandex.ru&city=usercity