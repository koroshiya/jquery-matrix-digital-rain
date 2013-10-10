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

     function buildInit(time){ //moved out for proper garbage collection
        var digirain = document.getElementById("DigiRain");

        digirain.style.color = '#20F54A';
        digirain.style.visibility = 'hidden';

        // characters used in rain
        //var rain = ['Â','µ','Â','¬','Â','¿','Ã','ƒ','Æ','˜','#','$','&','%','Ç','È','º','Ê','„','Ï','´','Ð','ч','а','щ','а','х','ю','г','а','ж','и','л','б','ы','ц','и','т','р','у','с','Д','а','н','о','ф','а','л','ь','ш','и','в','ы','й','э','к','з','е','м','п','л','я','р'];

        var appendText = '<div>';
        var i = -1;
        var j;
        var cox;
        var coy;
        while (++i < height) {
            cox = i*14;

            var rand;
            j = -1;

            while (++j < width) {
                coy = j*16;
                rand = String.fromCharCode(12448 + Math.random() * 96);

                appendText += ('<div id="digiRain' + time + '-' + i +'-' + j + 
                    '" style="visibility:hidden;left:'+coy+'px;top:'+cox+'px;width:14px;position:absolute;">' + rand + '</div>');
            }
        }
        appendText += '</div>';

        digirain.insertAdjacentHTML('beforeend', appendText);
        digirain.style.visibility = 'visible';
    }

    function digiRain(width, height, freq, speed, fontcolor, fontsize, bgcolor) {

        var time = new Date().getTime();
        buildInit(time);

        var rainDrops = [];

        this.makeItRain = function() {

            var rand = Math.random();
            if (rand < freq) {
                var c = Math.floor(rand * width);
                var droplet = new digiRainDroplet(0, c, height, time);
                rainDrops.push(droplet);
            }
            var rainTemp = [];
            var drop;
            var i = -1;
            while(++i < rainDrops.length){
                drop = rainDrops[i];
                if(!drop.fall()){rainTemp.push(drop);}
            }
            rainDrops = rainTemp;

        };

        setInterval(this.makeItRain, speed);

    };

// Raindrop class
function digiRainDroplet(row, col, windowheight, time) {
    
    var rainheight = 15;
    var dead = false;
    var sp = 0.4 + Math.random();
    var cur = 0;
    var DROPLET_SPEED = 0.8;
	
    // animation of falling
    this.fall = function() {
        cur += sp;
        if (cur > DROPLET_SPEED){
            cur -= DROPLET_SPEED;
            row++;
            if (row < windowheight){
                document.getElementById("digiRain" + time + '-' + (row) + '-' + col).style.visibility = 'visible';
                var i = 0;
                while(++i < rainheight && row >= i){
                    document.getElementById("digiRain" + time + '-' + (row-i) + '-' + col).style.opacity = (1 - i/rainheight);
                    //IE: .style.filter = "alpha(opacity="+(1 - i/rainheight)+")";
                }
            }
            if ((row - rainheight) >= 0) {
                if ((row - rainheight) > windowheight) {
                    dead = true;
                }else {
                    document.getElementById("digiRain" + time + '-' + (row - rainheight) + '-' + col).style.visibility = 'hidden';
                }
            }
        }
        return dead;
    };
}


    var fontSize = 12;
    var fontSizeScale = fontSize + 2;
    var width = window.screen.width / fontSizeScale * 2;
    var height = window.screen.height / fontSizeScale;
    digiRain(width, height, 0.5, 100, '#20F54A', fontSize, '#000000');
