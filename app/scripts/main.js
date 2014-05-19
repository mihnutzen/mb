/* global Leap */
(function($){
    'use strict';

    $('.main-title').lettering();
    $('.job-title strong').lettering();

    function initTheme() {
        var themes = ['piano-colors', 'fog-letters', 'panel-letters', 'rotating-circles', 'circle-axis'],
            randomNr = Math.floor(Math.random() * themes.length),
            randomTheme = themes[randomNr];

        console.log('randomTheme', randomTheme, randomNr);


        // randomTheme = 'rotating-circles';

        $('body').addClass(randomTheme);

        if (randomTheme === 'piano-colors') {
            initPianoSounds($('.job-title span'));
        }

        if (randomTheme === 'panel-letters') {
            initPanels();
        }

        if (randomTheme === 'piramid') {
            initPiramid();
        }

        if (randomTheme === 'rotating-circles') {
            initCircles();
        }

        initLeap();
    }

    function initCircles() {
        $('.hero-unit').append('<div class="rotating-circles-holder"><div class="circle lvl1"><div class="circle lvl2"><div class="circle lvl3"><div class="circle lvl4"><div class="circle lvl5"><div class="circle lvl6"><div class="circle lvl7"><div class="circle lvl8"><div class="circle lvl9"><div class="circle lvl10"><div class="circle lvl11"><div class="circle lvl12"><div class="circle lvl13"><div class="circle lvl14"><div class="circle lvl15"><div class="circle lvl16"><div class="circle lvl17"><div class="circle lvl18"><div class="circle lvl19"><div class="circle lvl20"></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>');
    }

    function initPiramid() {
        console.log('piramid init! ');
        var piramidHolder = $('<div class="piramid-holder">'),
            piramid = $('<span class="piramid">');

        for (var i = 0; i < 4; i++) {
            piramid.append('<span class="side-'+i+'"></span>');
        }

        piramidHolder.append(piramid);

        // $('.hero-unit').append(piramidHolder);
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
                center = centerPointCoords(offSetLeft, offSetTop, width, height);
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

    function centerPointCoords(posLeft, posTop, itemWidth,  itemHeight) {
        return { 'left' : posLeft + itemWidth/2, 'top' : posTop + itemHeight/2 };
    }



    function initLeap() {
        function moveFinger(Finger, posX, posY, posZ, dirX, dirY, dirZ) {
            Finger.style.webkitTransform =
            Finger.style.mozTransform =
            Finger.style.transform = 'translateX('+posX+'px)'+
                                    'translateY('+posY+'px)'+
                                    'translateZ('+posZ+'px)'+
                                    'rotateX('+dirX+'deg)'+
                                    'rotateY('+dirY+'deg)'+
                                    'rotateZ('+dirZ+'deg)'+
                                    'rotate(90deg) ';
            Finger.style.display = 'block';
        }

        function movePalm(Palm, posX, posY, posZ, rotX, rotY, rotZ) {
            Palm.style.webkitTransform =
            Palm.style.mozTransform =
            Palm.style.transform = 'translateX('+posX+'px)'+
                                    'translateY('+posY+'px)'+
                                    'translateZ('+posZ+'px)'+
                                    'rotateX('+rotX+'deg)'+
                                    'rotateY('+rotY+'deg)'+
                                    'rotateZ('+rotZ+'deg)'+
                                    'rotateY(90deg) rotate(45deg) translateX(50px)';
            Palm.style.display = 'block';
        }

        var fingers = {},
            palms = {};

        var animTriggerCounter = 0;
        Leap.loop(function(frame) {
            var fingerIds = {},
                handIds = {},
                handsLength;

            if (frame.hands === undefined ) {
                handsLength = 0;
            } else {
                handsLength = frame.hands.length;
            }

            for (var handId = 0, handCount = handsLength; handId !== handCount; handId++) {
                var hand = frame.hands[handId];
                var posX = (hand.palmPosition[0]*3);
                var posY = (hand.palmPosition[2]*3)-200;
                var posZ = (hand.palmPosition[1]*3)-400;
                var rotX = (hand._rotation[2]*90);
                var rotY = (hand._rotation[1]*90);
                var rotZ = (hand._rotation[0]*90);
                var palm = palms[hand.id];

                console.log(posZ);

                if (posZ < 150) {
                    animTriggerCounter++;

                    if (animTriggerCounter === 30) {
                        $('.rotatable-holder').addClass('step1');
                    }

                    if (animTriggerCounter === 60) {
                        $('.rotatable-holder').addClass('step2');
                    }

                    if (animTriggerCounter === 100) {
                        $('.spin-x').addClass('step3');
                    }

                }

                var palmDiv;

                if (!palm) {
                    palmDiv = document.getElementById('palm').cloneNode(true);
                    palmDiv.setAttribute('id',hand.id);
                    // palmDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
                    document.getElementById('scene').appendChild(palmDiv);
                    palms[hand.id] = hand.id;

                } else {
                    palmDiv =  document.getElementById(hand.id);

                    if (typeof(palmDiv) !== 'undefined' && palmDiv !== null) {
                        movePalm(palmDiv, posX, posY, posZ, rotX, rotY, rotZ);
                    }
                }

                handIds[hand.id] = true;
            }

            for (handId in palms) {
                if (!handIds[handId]) {
                    var palmsDiv =  document.getElementById(palms[handId]);

                    palmsDiv.parentNode.removeChild(palmsDiv);

                    delete palms[handId];
                }
            }

            for (var pointableId = 0, pointableCount = frame.pointables.length; pointableId !== pointableCount; pointableId++) {
                var pointable = frame.pointables[pointableId];
                var pointablePosX = (pointable.tipPosition[0]*3);
                var pointablePosY = (pointable.tipPosition[2]*3)-200;
                var pointablePosZ = (pointable.tipPosition[1]*3)-400;
                var pointableDirX = -(pointable.direction[1]*90);
                var pointableDirY = -(pointable.direction[2]*90);
                var pointableDirZ = (pointable.direction[0]*90);
                var finger = fingers[pointable.id];

                var fingerDiv;
                if (!finger) {
                    fingerDiv = document.getElementById('finger').cloneNode(true);
                    fingerDiv.setAttribute('id',pointable.id);

                    // fingerDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);

                    document.getElementById('scene').appendChild(fingerDiv);
                    fingers[pointable.id] = pointable.id;
                } else {
                    fingerDiv =  document.getElementById(pointable.id);

                    if (typeof(fingerDiv) !== 'undefined' && fingerDiv !== null) {
                        moveFinger(fingerDiv, pointablePosX, pointablePosY, pointablePosZ, pointableDirX, pointableDirY, pointableDirZ);
                    }
                }

                fingerIds[pointable.id] = true;
            }

            for (var fingerId in fingers) {
                if (!fingerIds[fingerId]) {
                    var fingersDiv =  document.getElementById(fingers[fingerId]);
                    fingersDiv.parentNode.removeChild(fingersDiv);
                    delete fingers[fingerId];
                }
            }

        });

    }

    initTheme();
})(jQuery);
