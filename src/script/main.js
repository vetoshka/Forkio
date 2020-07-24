$(document).ready(()=>{
   let button = $('.header__button_burger-menu'),
   dropMenu = $('.header__drop-menu');
   button.click(() =>{
       if (button.data('status') === ''){
           button.data('status', 'active');
           dropMenu.removeClass('header__drop-menu').addClass('header__drop-menu_active')
       } else {
           button.data('status', '');
           dropMenu.removeClass('header__drop-menu_active').addClass('header__drop-menu')
       }
   });
    $(window).resize(()=> {
        let width = $(window).width();
        if (width > 480 && dropMenu.hasClass('header__drop-menu_active')) {
            button.data('status', '');
            dropMenu.removeClass('header__drop-menu_active').addClass('header__drop-menu')
        }
    });
});