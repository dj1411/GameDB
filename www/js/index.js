/*******************************************************************************
 * MIT License
 * 
 * Copyright (c) 2018 Jayanta Debnath
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *******************************************************************************/

/* global variables */
var db = new DB();
var idSelectedCategory = 1; // for the first version only "In Progress" category will be used

function main() {
    /* set some defaults */
    setStyle();
    
    /* removing dummy entries and display everything using js */
    document.getElementById("divBody").innerText = ""; 
    ssInit();

//    db.addGame(idSelectedCategory, "Skyrim");
    
    /* use cordova plugins on android */
    if(navigator.userAgent.indexOf("Android") >= 0) {
        /* button click sound */
        nativeclick.watch(["mybutton1"]);
        
        /* button click vibration */
        var arrButtons = document.getElementsByClassName("mybutton1");
        for( var i=0; i<arrButtons.length; i++) {
            arrButtons[i].addEventListener( "click", function() {
                navigator.vibrate(20);
            } );
        }
    }
}

function setStyle() {
    /* set the app name and version */
    document.title = APP_NAME;
    document.getElementById("titleWindow").innerText = APP_NAME;    

    /* set the z-index for all elements */
    /* benefit of puting here is you can have an overview of all the elements stack */
    document.getElementById("divHeader").style.zIndex = Z_INDEX_MED;
    
    /* move all contents below header bar */
    document.getElementById("divBody").style.top = document.getElementById("divHeader").clientHeight + 5 + "px";
}
