(function($){
    'use strict';

    $('.main-title').lettering();
    $('.job-title strong').lettering();

    function initTheme() {
        var themes = ['piano-colors', 'fog-letters'],
            randomTheme = themes[Math.floor(Math.random() * 2)];

        // console.log('nr: ', ());
        $('body').addClass(randomTheme);

        if (randomTheme === 'piano-colors') {
            initPianoSounds($('.job-title span'));
        }
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

    // initTheme();
})(jQuery);
