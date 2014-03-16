(function($){
    'use strict';

    $('.main-title').lettering();
    $('.job-title strong').lettering();

    function initTheme() {
        var themes = ['piano-colors', 'fog-letters', 'panel-letters'],
            randomNr = Math.floor(Math.random() * themes.length),
            randomTheme = themes[randomNr];

        console.log('randomTheme', randomTheme, randomNr);

        // $('body').addClass(randomTheme);

        if (randomTheme === 'piano-colors') {
            initPianoSounds($('.job-title span'));
        }

        // if (randomTheme === 'panel-letters') {
        //     initPanels();
        // }

        $('body').addClass('panel-letters');
        initPanels();
    }

    function initPianoSounds(pianoKey) {
        var sounds = [ 'sounds/a-3.mp3',
                        'sounds/d-5.mp3',
                        'sounds/d3.mp3',
                        'sounds/f-3.mp3',
                        'sounds/f-4.mp3',
                        'sounds/f-5.mp3',
                        'sounds/f5.mp3',
                        'sounds/g-3.mp3',
                        'sounds/g-4.mp3',
                        'sounds/g-5.mp3',
                        'sounds/g3.mp3',
                        'sounds/g4.mp3',
                        'sounds/g5.mp3'
        ];

        var items = pianoKey,
            soundItems = [];

        items.each(function(i) {
            var audio = new Audio();
            audio.src = sounds[i];

            soundItems.push(audio);
        });

        items.click(function() {
            var indx = $(this).index();

            soundItems[indx].play();
        });
    }

    function initPanels() {
        $('.job-title strong span').each(function() {
            var $this = $(this);

            $this.wrap('<span class="letter-holder"><span class="letter"></span></div>')
                 .after('<span class="top-face"></span><span class="bottom-face"></span></span><span class="left-face"></span><span class="right-face"></span>');
        });

        $('.letter-holder').mousemove(function(e) {
            var $this = $(this),
                offSetLeft = $this.offset().left,
                offSetTop = $this.offset().top,
                width = $this.width(),
                height = $this.height(),
                center = centerPointCoors(offSetLeft, offSetTop, width, height);
                // leftTop = { 'left' :  offSetLeft, 'top' : offSetTop},
                // leftBottom = { 'left' :  offSetLeft, 'top' : offSetTop + height},
                // rightTop = { 'left' :  offSetLeft + width, 'top' : offSetTop},
                // rightBottom = { 'left' :  offSetLeft + width, 'top' : offSetTop + height};

            var position = { 'x' : center.left - e.pageX  , 'y' : center.top - e.pageY};

            $this.children('.letter').css({ 'transform' : 'rotateY('+position.x+'deg) rotateX('+(-position.y)+'deg)' });
        });

        $('.letter-holder').hover(function() {
            var $letter = $(this).children('.letter');
            $letter.css({'transition' : 'none'});
        }, function() {
            var $letter = $(this).children('.letter');
            $letter.css({
                'transition' : 'all 1s linear',
                'transform' : 'rotateY(45deg) rotateX(45deg)'
            });
        });
    }

    function centerPointCoors(posLeft, posTop, itemWidth,  itemHeight) {
        return { 'left' : posLeft + itemWidth/2, 'top' : posTop + itemHeight/2 };
    }

    initTheme();
})(jQuery);
