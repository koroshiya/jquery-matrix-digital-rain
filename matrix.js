/*
 * Digital Rain jQuery plugin
 * Copyright (c) 2010 James Seibel
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Capabilities:
 *      -Randomly generated
 *      -Customizable number of rows, columns, font color,
 *      font size, background color, height of each 'rain droplet',
 *      frequency of raindrops, and their falling speed
 *      -Can be placed in multiple div tags on the same page
 *
 * Usage:
 *      Default values:
 *      $('#div-name').digiRain(width, height, rainheight);
 *
 *      All values:
 *      $('#div-name').digiRain(width, height, rainheight, freq, speed,
 *                              fontcolor, fontsize, bgcolor);
 *
 *      Some values:
 *      $('#div-name').digiRain(width, height, rainheight, null, null,
 *                              null, null, null);
 *      NOTE: You must leave all values you don't want to change to null.
 *      Any optional value can be set to null, and still have the correct
 *      display.
 *
 *      (String) '#div-name': ID of an empty div tag the rain will fall in
 *      (Integer) width: number columns wide the rain window will be
 *      (Integer) height: number of rows high the rain window will be
 *      (Integer) rainheight: the maximum size each rain droplet will be
 *      (Float)(Optional) freq: between 0 and 1, frequency determines how
 *                              much rain falls, experiment to find good
 *                              value. Default: 0.2
 *      (Integer)(Optional) speed: 0 or greater, determines how fast the rain
 *                                 falls, experiment to find good value.
 *                                 Default: 80
 *      (String)(Optional) fontcolor: The hexadecimal value for the font color
 *                                    of the falling rain. Default: '#20F54A',
 *                                    a bright green
 *      (Integer)(Optional) fontsize: The size of the font in pixels of the
 *                                    falling rain. Default: 20
 *      (String)(Optional) bgcolor: The hexadecimal value for the background
 *                                  color. Default: '#000000' (black)
 *
 * Note: Various browsers have different performance, and some (Internet
 *       Explorer) process the technique slower than others. It all depends
 *       on the speed of the computer and the browser used. I recommend
 *       decreasing width/height and increasing pixel size until you find a
 *       good visual effect that performs well on various browsers.
 *       Width=100, height=100 will cause Firefox to slow down and basically
 *       destroy IE.
 *
 */

(function( $ ){

    $.fn.digiRain = function(width, height, rainheight, freq, speed, fontcolor, fontsize, bgcolor) {

        // return if digiRain used on a non-div tag
        if (!$(this).is('div')) {
            return;
        }

        // to ensure each digiRain div only references itself
        var time = new Date().getTime();

        // hide the div tag until properly set up
        $(this).css('visibility', 'hidden');
        $(this).css('cursor', 'default');
        $(this).css('color', fontcolor);
        $(this).css('background-color', bgcolor);
        $(this).css('font', 'normal normal normal ' + fontsize + 'px "Courier New"');

        // create array of rain characters
        var rain = ['Â','µ','Â','¬','Â','¿','Ã','ƒ','Æ','˜','#','$','&','%','Ç','È','º','Ê','„','Ï','´','Ð','ч','а','щ','а','х','ю','г','а','ж','и','л','б','ы','ц','и','т','р','у','с','Д','а','н','о','ф','а','л','ь','ш','и','в','ы','й','э','к','з','е','м','п','л','я','р'];

        var appendText = '<table>';
        for (i = 0; i < height; i++) {

            appendText += '<tr>';

            var rand;
            for (j = 0; j < width; j++) {
                rand = Math.floor(Math.random() * rain.length);
                // name space the ID's
                appendText += ('<td id="digiRain' + time + '-' + i +'-' + j + '" style="visibility: hidden">' + rain[rand] + '</td>');
            }

            appendText += ('</tr>');
        }
        appendText += '</table>';
        $(this).append(appendText);

        // Show the element
        $(this).css('visibility', 'visible');

        // Begin animation
        var rainDrops = [];

        this.makeItRain = function() {

            var rand = Math.random();
            if (rand < freq) {

                var c = Math.floor(Math.random() * width);

                var droplet = new digiRainDroplet(0, c, rainheight, height, time);

                rainDrops.push(droplet);
            }
            var rainTemp = [];
            var drop;
            for (i = 0; i < rainDrops.length; i++) {
                drop = rainDrops[i];
                if(!drop.fall()){rainTemp.push(drop);}
            }
            rainDrops = rainTemp;

        };

        setInterval(this.makeItRain, speed);

    };
})( jQuery );

// Raindrop class
function digiRainDroplet(r, c, rh, wh, t) {
    var row = r;
    var col = c;
    var rainheight = Math.floor(Math.random() * rh) + 1;
    var windowheight = wh;
    var dead = false;
    var time = t;

    // animation of falling
    this.fall = function() {
        row += 1;
        if (row < windowheight){
            $('#digiRain' + time + '-' + (row) + '-' + col).css('visibility', 'visible');
        }
        if ((row - rainheight) >= 0) {
            if ((row - rainheight) > windowheight) {
                dead = true;
            }
            else {
                $('#digiRain' + time + '-' + (row - rainheight) + '-' + col).css('visibility', 'hidden');
            }
        }
        return dead;
    };
}

$(document).ready(function() {

    $('#DigiRain').digiRain(100, 100, 10, 0.5, 100, '#20F54A', 24, '#000000');

});