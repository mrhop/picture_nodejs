/**
 * Created by Donghui Huo on 2015/6/30.
 */
$(document).ready(function () {
    var $picture = new $.Picture();
    $(window).scroll(function () {
        var scrollValue = $(window).scrollTop();
        scrollValue > 60 ? $(".bottom-tool .top").fadeIn() : $(".bottom-tool .top").fadeOut();
        if (scrollValue == $(document).height() - $(window).height()) {
            if ($picture.loaded == true) {
                $picture.loadImage();
            }
        }
    });
    $(".bottom-tool .top").click(function () {
        $("html,body").animate({scrollTop: 0}, 300);
        return false;
    });
    $("#addModal").on('show.bs.modal', function (event) {
        var modal = $(this);
        var dialog = modal.find('.modal-dialog');
        dialog.css("margin-top", (modal.height() - 362) / 2 + "px");
    });
    $(".bottom .more-pic").click(function(){
        if ($picture.loaded == true) {
            $picture.loadImage();
        }
        return false;
    })

    $(".pic-container-a").colorbox({rel:'pic-container-a',photoRegex:/(\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg))?((#|\?).*)?$/i,current:'{current}/{total} '});

});

(function ($, window, undefined) {
    'use strict';
    $.Picture = function () {
        var $grid = $('#fall').masonry({
            itemSelector: '.pic-container'
        });
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });
    };
    $.Picture.prototype = {
        loaded: true,
        getItems: function () {
            var items = '';
            for (var i = 0; i < 4; i++) {
                items += this.getImageItem();
            }
            return items;
        },
        getImageItem: function () {
            var item = '<div class="pic-container hide">';
            var size = Math.random() * 3 + 1;
            var width = Math.random() * 110 + 100;
            width = Math.round(width * size);
            var height = Math.round(140 * size);
            var rando = Math.ceil(Math.random() * 1000);
            // 10% chance of broken image src
            // random parameter to prevent cached images
            var src = rando < 100 ? 'images/broken.png' :
                // use lorempixel for great random images
            'http://lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
            item += '<a href="' + src + '" title="test123" class="pic-container-a"><img src="' + src + '" /></a></div>';
            return item;
        }
        ,
        loadImage: function () {
            $(".bottom .more-pic h4").text("加载中......")
            var $items = $(this.getItems());
            console.log($items);
            var $grid = $('#fall').masonry({
                itemSelector: '.pic-container'
            });
            $grid.append($items).imagesLoaded(function(){
                $items.removeClass("hide");
                $grid.masonry('appended', $items);
                this.loaded = true;
                $(".bottom .more-pic h4").text("加载更多......");
                $(".pic-container-a").colorbox({rel:'pic-container-a',photoRegex:/(\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg))?((#|\?).*)?$/i,current:'{current}/{total}'});
            });
        }
    };
})(jQuery, window);