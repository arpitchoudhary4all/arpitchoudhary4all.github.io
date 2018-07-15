/*global $, console, ProgressBar*/

$(function () {

    "use strict";

    var scrollBox = $(".full-page > .overlay-container"),
        niceScrollOptions = {
            // cursorwidth: "5px",
            cursorcolor: "#1894ff",
            cursorwidth: "7px",
            cursorborder: 0,
            cursorborderradius: "0",
            cursoropacitymin: "1"
        },
        demo2Check = $(".sakura-demo2").length,
        soft_progress_check = false,
        technical_progress_check = false,
        factsCheck = false,
        testimonials_slider = $('.testimonials-slider'),
        resumeSection = $('.resume'),
        scrollToTop = $(".scrollToTop"),
        navBar = $(".appsLand-navbar"),
        softSkills = $('.soft-skills'),
        technicalSkills = $(".technical-skills"),

        allProgress = [];

    if (demo2Check) {
        scrollBox = $(".sakura-demo2");
    }
    
    /** Smooth Scrolling
     **====================== **/
    $(".arpit-links a,.scrollLink").on('click', function (e) {
        e.preventDefault();
        var hash = this.hash,
            scrollTopOffset = $(hash).offset().top;
        $('html, body').removeClass('mobile-menu-active').animate({
            scrollTop: scrollTopOffset
        }, 500, function () {
            window.location.hash = hash;
        });
    });
    /** => End Smooth Scrolling */

    /** Scroll To Top
     **====================== **/
    scrollToTop.on('click', function (e) {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    $(document).on("scroll", function () {
        // show scroll to top btn
        if ($(window).scrollTop() > 1000) {
            scrollToTop.addClass("active");
        } else {
            scrollToTop.removeClass("active");
        }
    });
    /** => Scroll To Top */
    
    /** Make NiceScroll
     **====================== **/
    
    scrollBox.niceScroll(niceScrollOptions);
    function fixNiceScroll() {
        scrollBox.getNiceScroll().resize();
    }
    scrollBox.on('resize', function () {
        // fix position for the niceScroll
        fixNiceScroll();
    });
    
    /** => End NiceScroll */

    /**  Start Typed
     **====================== **/
    $(".arpit-work").typed({
        strings: ["fULL STACK DEVELOPER.", "WEB DESIGNER.","FRONT END DEVELOPER","BACK END DEVELOPER"],
        cursorChar: "",
        typeSpeed: 150,
        loop: true,
        backSpeed: 50
    });
    /** => End Typed */

    /** navBar animation on scroll
     **=========================== **/
    function activeNavBar() {
        if ($(window).scrollTop() > 0) {
            navBar.addClass("active-navbar");
        } else {
            navBar.removeClass("active-navbar");
        }
    }
    activeNavBar();
    $(document).on("scroll",function () {
        activeNavBar();
    });
    /** => End navBar animation on scroll */

    /**  Start Progress Script And CountTo  Script
     **=========================================== **/

    function getOffsetTop($parent, $child) {
        return $child.position().top - $parent.position().top;
    }

    function readyProgress($pro) {
        var element = "#" + $pro.attr('id'),
            circle = new ProgressBar.Circle(element, {
                easing: 'easeInOut',
                color: $pro.data("color"),
                duration: 3000,
                strokeWidth: 5,
                trailWidth: 5,
                trailColor: '#3a4a5d',
                text: {
                    value: '0',
                    style: {
                        color: '#FFF',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        padding: 0,
                        margin: 0,
                        transform: {
                            prefix: true,
                            value: 'translate(-50%, -50%)'
                        }
                    }
                },
                svgStyle: {
                    display: 'inline-block',
                    width: 'auto'
                }
            });
        return circle;
    }
    
    $('.progressName').each(function () {
        allProgress.push({
            'circle': readyProgress($(this)),
            'proElement': $(this)
        });
    });
    function getStep(state, circle) {
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value);
        }
    }
    function startProgress() {
        var i;
        for (i = 0; i < allProgress.length; i += 1) {
            allProgress[i].circle.animate(allProgress[i].proElement.data("value"), {
                duration: 1500,
                step: getStep
            });
        }
    }

    /** START Soft Skills Progress */
    
    resumeSection.on('scroll', function () {
        var offsetTop = getOffsetTop($(this), softSkills);
        if (!soft_progress_check && offsetTop < $(this).parent().height()) {
            startProgress();
            soft_progress_check = true;
        }
    });
    // on mobile size
    $(document,window).on('scroll', function () {
        if (demo2Check || window.matchMedia('(max-width: 767px)').matches) {
            var bodyScrollTop = $(document,window).scrollTop(),
                softSkillsoffsetTop = softSkills.offset().top - ($(window).height() / 2);
            if (!soft_progress_check && bodyScrollTop >= softSkillsoffsetTop) {
                startProgress();
                soft_progress_check = true;
            }
        }
    });
    /** END Soft Skills Progress */

    /** START Technical Skills Progress */
    function skillsProgress() {
        $('.timer').countTo();
        $('.progress-bar-container').each(function () {
            var thisElement = $(this),
                timer = thisElement.find('.timer'),
                dataTo = timer.data("to");
            thisElement.find('.progress-bar').css({ "width": dataTo + "%" });
            timer.css({ "left": "calc(" + dataTo + "% - 19px)" });
        });
    }

    resumeSection.on('scroll', function () {
        var offsetTop = getOffsetTop($(this), technicalSkills);
        if (!technical_progress_check && offsetTop < $(this).parent().height()) {
            skillsProgress();
            technical_progress_check = true;
        }
    });

    // on mobile size
    $(document,window).on('scroll', function () {
        if (demo2Check || window.matchMedia('(max-width: 767px)').matches) {
            var bodyScrollTop = $(document,window).scrollTop(),
                techoffsetTop = technicalSkills.offset().top - ($(window).height() / 2);
            if (!technical_progress_check && bodyScrollTop >= techoffsetTop) {
                skillsProgress();
                technical_progress_check = true;
            }
        }
    });
    /** END Technical Skills Progress */

    /** START facts about me counter */
    
    $('.aboutMe').on('scroll', function () {
        var offsetTop = getOffsetTop($(this), $('.arpit-facts-about-me .arpit-info-list'));
        if (!factsCheck && offsetTop < $(this).parent().height()) {
            $('.facts-numbers').countTo();
            factsCheck = true;
        }
    });
    // on mobile size
    $(document,window).on('scroll', function () {
        if (demo2Check || window.matchMedia('(max-width: 767px)').matches) {
            var bodyScrollTop = $(document,window).scrollTop(),
                listoffsetTop = $('.arpit-facts-about-me .arpit-info-list').offset().top - ($(window).height() / 2);
            if (!factsCheck && bodyScrollTop >= listoffsetTop) {
                $('.facts-numbers').countTo();
                factsCheck = true;
            }
        }
    });
    /** END facts about me counter */

    /** => End Progress Script And CountTo  Script */

    /**  Start Loading
     **====================== **/
    $(window).on('load', function () {
        $(".loading").animate({
            "top": "-100%"
        }, 700, function () {
            $(this).remove();
        });
    });
    /** => End Loading */

    /**  Mobile Menu
     **====================== **/
    $(".menu-toggle").on("click", function () {
        $("body").toggleClass('mobile-menu-active');
    });
    $(".sakura-demo2-menu-toggle").on("click", function () {
        $(".sakura-navbar").toggleClass('sakura-demo2-mobile-menu-active');
    });
    /** => End Mobile Menu */

    /**  Testimonials Slider
     **====================== **/
    testimonials_slider.on('init', function (slick, slider) {
        var totalSlides = slider.$slides.length,
            nextSlideImg = $(slider.$slides[1]).find('img').attr('src'),
            prevSlideImg = $(slider.$slides[totalSlides - 1]).find('img').attr('src');
        $("#testimonial-nextArrow .testimonials-client-page").css('background-image', 'url(' + nextSlideImg + ')');
        $("#testimonial-prevArrow .testimonials-client-page").css('background-image', 'url(' + prevSlideImg + ')');
    });
    testimonials_slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var totalSlides = slick.$slides.length,
            nextSlideNum = (nextSlide + 1 === totalSlides) ? 0 : nextSlide + 1,
            prevSlideNum = (nextSlide === 0) ? totalSlides - 1 : nextSlide - 1,
            nextSlideImg = $(slick.$slides[nextSlideNum]).find('img').attr('src'),
            prevSlideImg = $(slick.$slides[prevSlideNum]).find('img').attr('src');
        $("#testimonial-nextArrow .testimonials-client-page").css('background-image', 'url(' + nextSlideImg + ')');
        $("#testimonial-prevArrow .testimonials-client-page").css('background-image', 'url(' + prevSlideImg + ')');
    });
    testimonials_slider.slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        arrows: true,
        nextArrow: $('#testimonial-nextArrow'),
        prevArrow: $('#testimonial-prevArrow'),
        appendDots: "#testimonial-paging",
        customPaging: function (slider, i) {
            var thumb = $(slider.$slides[i]).find('img').attr('src'),
                name = $(slider.$slides[i]).find('.testi-user-info h3').text();
            return '<i class="dot"><img src="' + thumb + '" class="img-responsive" data-toggle="tooltip" data-placement="top" title="' + name + '"></i>';
        },
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 993,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1,
                    dots: false
                }
            }
        ]
    });
    /** => End Testimonials Slider */
    $('.clients-slider').slick({
        slidesToShow: 5,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.sakura-demo2-clients-slider').slick({
        slidesToShow: 6,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    /** Bootstrap Tooltip
     **====================== **/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    /** => End Bootstrap Tooltip */

    /** Portfolio Filter
     **====================== **/
    $(window).on('load', function () {
        $('.grid').isotope({
            // options
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });
        $('.posts-grid').isotope({
            // options
            itemSelector: '.post-grid-item',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '.post-grid-item'
            }
        });
    });
    $('.portfolio-sorting li').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').addClass('active').siblings().removeClass('active');
        var seclector = $(this).attr('data-filter');
        $('.grid').isotope({
            filter: seclector
        });
        // fix position for the niceScroll
        fixNiceScroll();
        return false;
    });
    /** => End Portfolio Filter */

    /** Fix The Box position after resize
     **====================== **/
    $(window).on('resize', function () {
        if (!demo2Check && !window.matchMedia('(max-width: 767px)').matches) {
            var hash = window.location.hash,
                scrollTopOffset;
            if (hash) {
                scrollTopOffset = $(hash).offset().top;
                $('html, body').animate({
                    scrollTop: scrollTopOffset
                }, 0, function () {
                    window.location.hash = hash;
                });
            }
        }
        // fix position for the niceScroll
        fixNiceScroll();
    });

    /** Change The URL Hash Value On scroll
     **================================= **/
    $(window).on('activate.bs.scrollspy', function (e) {
        history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
    });

});