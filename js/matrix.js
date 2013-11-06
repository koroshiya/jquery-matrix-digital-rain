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
 * Contrary to the name, this script no longer requires jQuery.
 * The removal of jQuery was one of many aforementioned performance/overhead improvements.
 *
 */

    var width = Math.round(window.innerWidth / 16);
    var height = Math.round(window.innerHeight / 7);

    var shadow = true; //set to true to enable fade effect for rain. May cause slowdown.
    var gleam = true; //set to true for gleam effect on first drop in rain stream.
    var GLOBAL_DIV_ARRAY = new Array(width);

    function buildInit(){ //moved out for proper garbage collection
        var digirain = document.getElementById("DigiRain");

        digirain.style.color = '#20F54A';
        digirain.style.visibility = 'hidden';

        var appendText = '<div>';
        var i = -1;
        var j = -1;
        while (++j <= width) {
            GLOBAL_DIV_ARRAY[j] = new Array(height);
        }
        while (++i <= height) {

            var rand;
            j = -1;

            while (++j <= width) {
                rand = String.fromCharCode(12448 + Math.random() * 96);

                appendText += ('<div id="digiRain' + i +'-' + j + 
                    '" class="hidden" style="left:'+(j*16)+'px;top:'+(i*14)+'px;width:14px;position:absolute;">' + rand + '</div>');
            }
        }
        appendText += '</div><style type="text/css" media="screen">'+
        '.hidden{visibility: hidden;}'+
        '.visible{visibility: visible;}'+
        '.head{visibility: visible; color:#DAFFDA;}'+
        '.nhead{color:#0F0;}'+
        '.opa1{opacity:0.1;}'+
        '.opa2{opacity:0.2;}'+
        '.opa3{opacity:0.3;}'+
        '.opa4{opacity:0.4;}'+
        '.opa5{color:#0F0; opacity:0.5;}'+
        '.opa6{color:#0F0; opacity:0.6;}'+
        '.opa7{color:#0F0; opacity:0.7;}'+
        '.opa8{color:#0F0; opacity:0.8;}'+
        '.opa9{color:#0F0; opacity:0.9;}'+
    '</style>';

        digirain.insertAdjacentHTML('beforeend', appendText);
        j = -1;
        while(++j <= width){
            i = -1;
            var glob_row = GLOBAL_DIV_ARRAY[j];
            while(++i <= height){
                glob_row[i] = document.getElementById("digiRain" + i + '-' + j);
            }
        }
        digirain.style.visibility = 'visible';
    }

    function digiRain(width, height, rainheight, freq, speed) {

        buildInit();

        var rainDrops = [];

        this.makeItRain = function() {

            if (Math.random() < freq) {
                var c = Math.floor(Math.random() * width);
                var droplet = new digiRainDroplet(c, rainheight, height);
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
function digiRainDroplet(col, rh, windowheight) {
    
    var rainheight = Math.floor(Math.random() * rh) + 10;
    var rhdiv = 10 / rainheight;
    var dead = false;
    var sp = 0.6 + Math.random();
    var cur = 0;
    var DROPLET_SPEED = 0.8;
    var glob_row = GLOBAL_DIV_ARRAY[col];
    var row = -1;

    // animation of falling
    this.fall = function() {
        cur += sp;
        if (cur > DROPLET_SPEED){
            cur -= DROPLET_SPEED;
            row++;
            if (row < windowheight){
                if (gleam){
                    glob_row[row].className = 'head';
                }else{
                    glob_row[row].className = 'visible';
                }
                if (!shadow){
                    glob_row[row-1].className = 'nhead';
                }
                var i = 0;
                if (shadow){
                    while(++i < rainheight && row >= i){
                        glob_row[row-i].className = 'opa'+(10 - Math.round(i*rhdiv));
                    }
                }
            }
            if ((row - rainheight) >= 0) {
                if ((row - rainheight) > windowheight) {
                    dead = true;
                }else {
                    glob_row[row - rainheight].className = 'hidden';
                }
            }
        }
        return dead;
    };
}

digiRain(width, height, 10, 0.5, 80);
