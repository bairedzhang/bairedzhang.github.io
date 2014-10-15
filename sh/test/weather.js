//定义全局变量  height 当前document的高度, width当前document 的宽度,degree 当前的旋转了多少度,unit 获取温度设置, w_unit 当前 
var height, width, degree, active, unit, w_unit, theme, isActive = false,
    timeout,
    color,
    played=false;
var bgColors = []
$('#layer .slide').each(function(i){

});
var animateQueue = new Array(13);
animateQueue[0] = [
    function(elem) {
        elem.find("img:gt(0):lt(4)").addClass("rotateZ");
        elem.find(".car1").addClass("run");
    },
    function(elem) {
        elem.find("img:gt(0):lt(4)").removeClass("rotateZ");
        elem.find(".car1").removeClass("run");
    }
];

animateQueue[2] = [
    function(elem) {
        elem.find("img:gt(0)").not('.playMusic').css("-webkit-animation", "myscale 0.8s");
    },
    function(elem) {
        elem.find("img:gt(0)").not('.playMusic').css("-webkit-animation", "");
    }
];


animateQueue[4] = [
    function(elem) {
        elem.removeClass("anmi");
    },
    function(elem) {
        elem.addClass("anmi");
    }
];

animateQueue[5] = [
    function(elem) {
        elem.find("img:eq(1)")
            .css("-webkit-transform", "translate(-30%, -20%)")
            .css("opacity", "0");
        elem.find("img:eq(2)")
            .css("-webkit-transform", "translate(-30%, 20%)")
            .css("opacity", "0");
        elem.find("img:eq(3)")
            .css("-webkit-transform", "translate(30%, -20%)")
            .css("opacity", "0");
        setTimeout(function() {
            elem.find("img:gt(0)")
                .css("-webkit-transition", "all 1s")
                .css("opacity", "1")
                .css("-webkit-transform", "translate(0%, 0%)");
        }, 15);

    },
    function(elem) {
        elem.find("img:eq(1)")
            .css("opacity", "1")
            .css("-webkit-transform", "translate(-30%, -20%)");
        elem.find("img:eq(2)")
            .css("opacity", "1")
            .css("-webkit-transform", "translate(-30%, 20%)");
        elem.find("img:eq(3)")
            .css("opacity", "1")
            .css("-webkit-transform", "translate(30%, -20%)");
    }
];

/*animateQueue[7] = [
    function(elem) {
        var leftPoint = [12.2, 6.2, 7.8];
        elem.find("img:gt(0):lt(3)").each(function(index, item) {
            item.style.webkitTransition = "left 1.5s " + (0.5 * index) + "s"
            item.style.left = leftPoint[index] + "%";
        });

        elem.find("img:last-child").addClass("rotateY");
    },
    function(elem) {
        elem.find("img:gt(0):lt(3)").each(function(index, item) {
            item.style.webkitTransition = ""; 
            item.style.left = "";
        });
        elem.find("img:last-child").removeClass("rotateY");
    }
];*/

animateQueue[9] = [
    function(elem) {
        elem.find("img:eq(1)")
            .css("-webkit-transform", "rotateZ(0deg)");
            
        elem.find("img:eq(2)")
            .css("-webkit-transform", "rotateZ(360deg)");
            
        setTimeout(function() {
            elem.find("img:eq(1)")
                .css("-webkit-transition", "all 1s")
                .css("-webkit-transform", "rotateZ(360deg)");

            elem.find("img:eq(2)")
                .css("-webkit-transition", "all 1s")
                .css("-webkit-transform", "rotateZ(0deg)");
        }, 15);

    },
    function(elem) {
        elem.find("img:eq(1)")
            .css("-webkit-transform", "rotateZ(0deg)");
        elem.find("img:eq(2)")
            .css("-webkit-transform", "rotateZ(360deg)");
    }
];

/**
-webkit-transform: rotateX(90deg);
-webkit-transform-origin: 50% 77.2%;
*/
animateQueue[8] = [
    function(elem) {
        elem.find("img:eq(1)")
            .css("-webkit-transform", "rotateX(90deg)")
        setTimeout(function() {
            elem.find("img:eq(1)")
                .css("-webkit-transition", "all 2s")
                .css("-webkit-transform", "rotateX(0deg)");
        }, 15);

    },
    function(elem) {
        elem.find("img:eq(1)")
            .css("-webkit-transform", "rotateX(90deg)");
    }
];

animateQueue[10] = [
    function(elem) {
        var scaleEleme;
        elem.find(".chart2").css({
            "-webkit-transition": "all 2s"
        });
        setTimeout(function() {
            elem.find(".chart2").css({
                "clip": "rect(0, 100px, 100px, 0)"
            });
        }, 15);
        elem.on("touchend.s10animate", ".scale", function(e) {
            if (scaleEleme) {
                scaleEleme.style.webkitTransform = "";
                scaleEleme = null;
            } else {
                scaleEleme = this;
                this.style.webkitTransform = "scale(2)";
            }
            e.stopPropagation();
        });
        elem.on("touchend.s10animate", function(e) {
            if (scaleEleme) {
                scaleEleme.style.webkitTransform = "";
                scaleEleme = null;
                e.stopPropagation();
            }
        });
    },
    function(elem) {
        elem.off(".s10animate");
        elem.find(".chart2").css({
            "clip": "rect(0, 0, 100px, 0)",
            "-webkit-transition": ""
        });
    }
];

animateQueue[12] = [
    function(elem) {
        elem.find("img:eq(1)").css("-webkit-animation", "round 5s 0.5s ease");       
        elem.find("img:eq(2)").css("opacity", "1");
    },
    function(elem) {
        elem.find("img:eq(1)").css("-webkit-animation", "");       
        elem.find("img:eq(2)").css("opacity", "0");
    }
];

animateQueue[13] = [
    function(elem) {
               
        setTimeout(function() {
            elem.find("img:gt(2)").each(function(index, elem) {
                $(elem).css({
                    "-webkit-transition-delay": index * 0.2 + "s",
                    "opacity": "1"
                });
            });
        }, 15);
    },
    function(elem) {   
        elem.find("img:gt(2)").css({
            "-webkit-transition-delay": "",
            "opacity": "0"
        });       
    }
];

animateQueue[14] = [
    function(elem) {
        elem.find("img:eq(1)").css("-webkit-transition", "all 8s");       
        elem.find("img:eq(2)").css("-webkit-transition", "all 5s");       
        setTimeout(function() {
            elem.find("img:eq(1)").css({
                "-webkit-transform": "rotateZ(720deg)",
                "top": "80%"
            });
             elem.find("img:eq(2)").css({
                "-webkit-transform": "rotateZ(360deg)",
                "top": "85%"
            });
        }, 15);
    },
    function(elem) {
          elem.find("img:gt(0)").css({
            "-webkit-transition": "",
            "-webkit-transform": "",
            "top": ""
        });
    }
];

function transform() {
    width = $(document).width();
    height = $(document).height();
    current();
    $('#layer').css('-webkit-transform', 'translate3d(0px, 0px, -' + width / 2 + 'px) rotate3d(0, 1, 0, ' + degree + 'deg)');
    $('#layer .slide').each(function(i) {
        var d = i * 90;
        $(this).css('-webkit-transform', 'rotate3d(0, 1, 0, ' + d + 'deg) translate3d(0px, 0px, ' + width / 2 + 'px)');
    });
}

//获取当前旋转了多少度
function current() {
    switch (active) {
        case 1:
            degree = 0;
            break;
        case 2:
            degree = -90;
            break;
        case 3:
            degree = -180;
            break;
        case 4:
            degree = -270;
            break;
        case 5:
            degree = -360;
            break;
        default:
            // Do nothing, yet?
    }
    return degree;
}
//通过Jquery 的自定义事件来实现tap 事件
jQuery.event.special.tap = {
    setup: function(a, b) {
        var c = this,
            d = jQuery(c);
        if (window.Touch) {
            d.on("touchstart", jQuery.event.special.tap.onTouchStart);
            d.on("touchmove", jQuery.event.special.tap.onTouchMove);
            d.on("touchend", jQuery.event.special.tap.onTouchEnd)
        } else {
            d.on("click", jQuery.event.special.tap.click)
        }
    },
    click: function(a) {
        a.type = "tap";
        jQuery.event.handle.apply(this, arguments)
    },
    teardown: function(a) {
        $elem = $(this);
        if (window.Touch) {
            $elem.off("touchstart", jQuery.event.special.tap.onTouchStart);
            $elem.off("touchmove", jQuery.event.special.tap.onTouchMove);
            $elem.off("touchend", jQuery.event.special.tap.onTouchEnd)
        } else {
            $elem.off("click", jQuery.event.special.tap.click)
        }
    },
    onTouchStart: function(a) {
        this.moved = false
    },
    onTouchMove: function(a) {
        this.moved = true
    },
    onTouchEnd: function(a) {
        if (!this.moved) {
            a.type = "tap";
            jQuery.event.handle.apply(this, arguments)
        }
    }
};
var ScrollFix = function(elem) {
    // Variables to track inputs
    var startY, startTopScroll;

    elem = elem || document.querySelector(elem);

    // If there is no element, then do nothing	
    if (!elem) return;

    // Handle the start of interactions
    elem.addEventListener('touchstart',
        function(event) {
            startY = event.touches[0].pageY;
            startTopScroll = elem.scrollTop;

            if (startTopScroll <= 0) elem.scrollTop = 1;

            if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
        },
        false);
};

//初始化-webkit-transform
$(function() {
    var music = $('#backMusic')[0],
        inited = false;

    $(".slide").each(function(index, elem) {
        elem.style.webkitTransform = "rotate3d(0, 1, 0, " + index * 180 + "deg) translate3d(0px, 0px, 284px)";
    });
    $(window).on('orientationchange', transform);
    $('body').on('touchend.init',function(){
        if(!inited){
            inited= true;
            music.play();
            $('.playMusic').addClass('rotateZ');
            played =true;
        }
    })
    
    $('.playMusic').on('touchend',function(e){
        e.stopPropagation();
        if(played){
            music.pause();
            played= false;
            $('.playMusic').removeClass('rotateZ')
        }else{
            music.play();
            $('.playMusic').addClass('rotateZ');
            played= true;
        }
    });
});

$(function() {
    var xPos, xOrg, xCor;
    var doc = $(this);
    active = 1;

    var scrollable = document.getElementById("settings"); // WebKit in iOS 5 is fantastic, except for this weird behavior that bounces the entire view.
    new ScrollFix(scrollable); // And totally fixed now.  还不知该函数作用

    transform();

    // doc.on('orientationchange', transform);

    var slide, isSettings = false,
        pinchOut = false;
    $('body').on('touchstart', '.slide',
        function(e) {
            e.preventDefault();
            var touch = event.touches[0];
            xOrg = touch.pageX;

            if ($('body').hasClass('settings')) {
                isSettings = true;
            } else {
                isSettings = false;
            }
        }
    ).on('touchmove', '.slide',
        function(e) {
            e.preventDefault();

            // Swiping
            if (isActive != true && event.touches.length == 1 && isSettings == false && pinchOut == false) {
                var touch = event.touches[0];
                xPos = touch.pageX;
                xCor = (xOrg - xPos) / 4;
                current();
                $('#layer').css('-webkit-transform', 'translate3d(0px, 0px, -' + width / 2 + 'px) rotate3d(0, 1, 0, ' + (degree - xCor) + 'deg)');
                e.preventDefault();
            }
        }
    ).on('touchend', '.slide',
        function(e) {
            if (isActive == false) {
                var lastSlideNum;
                if (xCor > 10) {
                    if (active == 15) {
                        active = 1;
                    } else {
                        active++;
                    }
                    lastSlideNum = active - 2;
                } else if (xCor < -10) {
                    if (active == 1) {
                        active = 15;
                    } else {
                        active--;
                    }
                    lastSlideNum = active;

                } else {
                    if (active == 15) {
                        active = 1;
                    } else {
                        active++;
                    }
                    lastSlideNum = active - 2;
                }
                if (lastSlideNum < 0) {
                    lastSlideNum += 15;
                }
                if (lastSlideNum === 15) {
                    lastSlideNum = 0;
                }

                $('#layer .slide').each(function(i) {
                    if (i > active || i < active - 2) {
                        $(this).hide();
                    } else {
                        $(this).show().css('display','table');
                    }
                });
                degree = -90 * (active - 1);
                $('#layer').css('-webkit-transform', 'translate3d(0px, 0px, -' + width / 2 + 'px) rotate3d(0, 1, 0, ' + degree + 'deg)');
                xCor = 0;
                isActive = true;
                var currentSlideNum = active - 1,
                    currentSlide = $("#s" + lastSlideNum);

                if (animateQueue[lastSlideNum] && animateQueue[lastSlideNum][1]) {
                    animateQueue[lastSlideNum][1].call(currentSlide, currentSlide);
                }

                currentSlide = $("#s" + currentSlideNum);

                if (animateQueue[currentSlideNum] && animateQueue[currentSlideNum][0]) {
                    animateQueue[currentSlideNum][0].call(currentSlide, currentSlide);
                }

                doc.delay(551).queue(function() {
                    isActive = false;
                    $(this).dequeue()
                });
            }
        });
});
