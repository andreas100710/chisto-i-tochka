// ================== НАСТРОЙКИ — меняйте только этот блок ==================
// Номер телефона и цены также впишите текстом в index.html (ищите [ТЕЛЕФОН] и [ЦЕНА]) —
// поисковики и ИИ читают именно текст страницы.
var CONFIG = {
  phoneText: '[ТЕЛЕФОН]',        // как показывать номер: '+7 (999) 123-45-67'
  phone: '+70000000000',         // номер для звонка: +7 и 10 цифр
  whatsapp: '70000000000',       // номер WhatsApp без + и пробелов
  telegram: 'https://t.me/Abros1987',
  telegramChannel: 'https://t.me/chistoitchk',
  avito: 'https://www.avito.ru/brands/i41000652'
};
// ===========================================================================

var waBase = 'https://wa.me/' + CONFIG.whatsapp;
function wa(text) { return waBase + '?text=' + encodeURIComponent(text); }

function setLinks(selector, href, text) {
  document.querySelectorAll(selector).forEach(function (a) {
    a.href = href;
    if (text && a.textContent.trim() === '[ТЕЛЕФОН]') a.textContent = text;
  });
}

setLinks('.js-phone', 'tel:' + CONFIG.phone, CONFIG.phoneText);
setLinks('.js-wa', wa('Здравствуйте! Хочу узнать стоимость химчистки мебели.'));
setLinks('.js-tg', CONFIG.telegram);
setLinks('.js-tg-channel', CONFIG.telegramChannel);
setLinks('.js-avito', CONFIG.avito);

// Карточки услуг → WhatsApp с названием услуги
document.querySelectorAll('.js-wa-svc').forEach(function (a) {
  a.href = wa('Здравствуйте! Хочу узнать стоимость: ' + a.dataset.svc + '.');
});

// Стрелки у шагов
var steps = document.getElementById('steps');
document.querySelectorAll('[data-scroll]').forEach(function (b) {
  b.addEventListener('click', function () {
    steps.scrollBy({ left: Number(b.dataset.scroll) * (steps.clientWidth * 0.6), behavior: 'smooth' });
  });
});

// Заявка → WhatsApp с готовым текстом
document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('f-name').value.trim();
  var what = document.getElementById('f-what').value.trim();
  var text = 'Здравствуйте!' + (name ? ' Меня зовут ' + name + '.' : '') +
    ' Хочу узнать стоимость химчистки' + (what ? ': ' + what : '') + '. Фото пришлю.';
  window.open(wa(text), '_blank', 'noopener');
});
