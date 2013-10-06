/*
 * jQuery Matrix Digital Rain
 * Copyright (c) 2013 Koroshiya
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Based on Digital Rain jQuery plugin by James Seibel in 2010.
 * This version removes unnecessary overhead and dramatically improves performance.
 * Usage examples and the like can be found in the source code of the original plugin.
 *
 */

(function( $ ){

    $.fn.digiRain = function(width, height, rainheight, freq, speed, fontcolor, fontsize, bgcolor) {

        if (!$(this).is('div')) {return;}

        var time = new Date().getTime();

        $(this).css('visibility', 'hidden');
        $(this).css('cursor', 'default');
        $(this).css('color', fontcolor);
        $(this).css('background-color', bgcolor);
        $(this).css('font', 'normal normal normal ' + fontsize + 'px "Courier New"');

        // characters used in rain
        //var rain = ['Â','µ','Â','¬','Â','¿','Ã','ƒ','Æ','˜','#','$','&','%','Ç','È','º','Ê','„','Ï','´','Ð','ч','а','щ','а','х','ю','г','а','ж','и','л','б','ы','ц','и','т','р','у','с','Д','а','н','о','ф','а','л','ь','ш','и','в','ы','й','э','к','з','е','м','п','л','я','р'];

        var appendText = '<table>';
        for (i = 0; i < height; i++) {

            appendText += '<tr>';

            var rand;
            for (j = 0; j < width; j++) {
                rand = String.fromCharCode(12448 + Math.random() * 96);
                appendText += ('<td id="digiRain' + time + '-' + i +'-' + j + '" style="visibility: hidden">' + rand + '</td>');
            }

            appendText += ('</tr>');
        }
        appendText += '</table>';
        $(this).append(appendText);

        $(this).css('visibility', 'visible');

        var rainDrops = [];

        this.makeItRain = function() {

            var rand = Math.random();
            if (rand < freq) {
                var c = Math.floor(rand * width);
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
function digiRainDroplet(row, col, rh, windowheight, time) {
    
    var rainheight = Math.floor(Math.random() * rh) + 3;
    var dead = false;

    // animation of falling
    this.fall = function() {
        row += 1;
        if (row < windowheight){
            $('#digiRain' + time + '-' + (row) + '-' + col).css('visibility', 'visible');
        }
        if ((row - rainheight) >= 0) {
            if ((row - rainheight) > windowheight) {
                dead = true;
            }else {
                $('#digiRain' + time + '-' + (row - rainheight) + '-' + col).css('visibility', 'hidden');
            }
        }
        return dead;
    };
}

$(document).ready(function() {
    var fontSize = 12;
    var fontSizeScale = fontSize + 2;
    var width = $(document).width() / fontSizeScale * 2;
    var height = $(document).height() / fontSizeScale;
    $('#DigiRain').digiRain(width, height, 10, 0.5, 100, '#20F54A', fontSize, '#000000');

});
