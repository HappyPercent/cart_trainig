$(document).ready(function(){
    // localStorage.clear();
    if(localStorage.length !== 0) {
        $('.cart-wrapper').append(localStorage['cart-wrapper']);
        $('.current-selection__card').each(function() {
            var label = $(this).attr('data-label');

            $('.cart__icon[data-label=' + label + ']').addClass('cart__icon--active');
        });
    }

    calculateCart();

    $('.cart__icon').click(function () {
        if($(this).hasClass('cart__icon--active')) {
            alert('Товар уже в корзине :)');
        } else {
            var image = $(this).parent().siblings('img').attr('src');
            var alt = $(this).parent().siblings('img').attr('alt');
            var category = $(this).parent().siblings('.card__category').text();
            var name = $(this).parent().siblings('.card__name').text();
            var price = $(this).siblings('.card__price').text();
            var label = $(this).attr('data-label');
            var newCard = '<div class="current-selection__card" data-label="' + label + '"><img class="current-selection__img" src="' + image + '" alt="' + alt + '"> <div class="current-selection__text"><a class="current-selection__category" href="#">' + category + '</a><h2  class="current-selection__name">' + name + '</h2></div><span class="current-selection__price">' + price + '</span><button class="current-selection__trash"></button></div>';

            $('.cart-wrapper').append(newCard);
            $(this).addClass('cart__icon--active');
            calculateCart();
            storageUpdate();
        }
    });
    
    $('html').on('click', '.current-selection__trash', function () {
        var label = $(this).parent().attr('data-label');
        var thisCard = $(this).parent();

        thisCard.animate({
            height: 0
        }, thisCard.remove());

        $('button[data-label = ' + label + ']').removeClass('cart__icon--active');

        calculateCart();
        storageUpdate(); 
    });

    function calculateCart() {
        var currentNumberInCart = $('.cart-total__number');
        var currentNumberInCartIcon = $('.my-cart__icon');
        var currentSumInCart = $('.cart-total__sum');
        var allSums = $('.current-selection__price');

        var sum = 0;
        var count = 0;
        $(allSums).each(function() {
            sum += parseInt($(this).text().replace(' ', ''));
            count++;
        });
        
        currentNumberInCart.text(count + declOfNum(count, [' товар', ' товара', ' товаров']) + ' на сумму');
        currentNumberInCartIcon.text(count);
        currentSumInCart.text(sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' р');

        if (count === 0) {
            $('.my-cart__wrapper').removeClass('my-cart__wrapper--active');
        } else {
            $('.my-cart__wrapper').addClass('my-cart__wrapper--active');
        }
    }

    function storageUpdate() { 
        localStorage.setItem('cart-wrapper', $('.cart-wrapper').html());
    }

    function declOfNum(number, titles) {  
        cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }
});