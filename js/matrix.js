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

    function digiRain(width, height, rainheight, freq, speed, fontcolor, fontsize, bgcolor) {

        var time = new Date().getTime();
        var digirain = document.getElementById("DigiRain");
        var style = 'cursor:default;' +
                    'color:' + fontcolor + ';' +
                    'background-color:' + bgcolor + ';' +
                    'font:normal normal normal ' + fontsize + 'px "Courier New";'

        digirain.setAttribute('style', 'visibility:hidden;' + style);

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

        digirain.insertAdjacentHTML('beforeend', appendText);
        digirain.setAttribute('style', 'visibility:visible;' + style);

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

// Raindrop class
function digiRainDroplet(row, col, rh, windowheight, time) {
    
    var rainheight = Math.floor(Math.random() * rh) + 3;
    var dead = false;

    // animation of falling
    this.fall = function() {
        row += 1;
        if (row < windowheight){
            document.getElementById("digiRain" + time + '-' + (row) + '-' + col).setAttribute('style', 'visibility:visible;');
        }
        if ((row - rainheight) >= 0) {
            if ((row - rainheight) > windowheight) {
                dead = true;
            }else {
                document.getElementById("digiRain" + time + '-' + (row - rainheight) + '-' + col).setAttribute('style', 'visibility:hidden;');
            }
        }
        return dead;
    };
}


    var fontSize = 12;
    var fontSizeScale = fontSize + 2;
    var width = window.screen.width / fontSizeScale * 2;
    var height = window.screen.height / fontSizeScale;
    digiRain(width, height, 10, 0.5, 100, '#20F54A', fontSize, '#000000');


