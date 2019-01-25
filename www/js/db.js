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

/* This file is not allowed to rely on any external data */
/* Nor is it meant to call any js api outside this file. */
/* this is purely for setter apis */
/* it is allowed to do some calculations */

function Game(id, name) {
    /* inheriting the signature elements */
    this.id = id;
    this.timestamp = moment();
    this.isDeleted = false;
    
    /* own class elements */
    this.name = name;    
    this.start = null;
    this.end = null;
    this.playtime = null;
}

function Category(id, name) {
    /* inheriting the signature elements */
    this.id = id;
    this.timestamp = moment();
    this.isDeleted = false;
    
    /* own class elements */
    this.name = name;
    this.arrGame = new Array();
}

function Data() {
    /* add default categories */
    this.arrCategory = new Array();
    this.arrCategory.push( new Category(0, "Completed") );
    this.arrCategory.push( new Category(1, "In Progress") );
    this.arrCategory.push( new Category(2, "In Queue") );
    this.arrCategory.push( new Category(3, "Wishlist") );
}

function Config() {
}

function DB() {
    this.root = new Object();
    this.load();
    
    if(this.root.data == undefined || this.root.data == null || this.root.data === "") {
        /* default fields */
        this.root.data = new Data();
        this.root.config = new Config();
        this.save();
    }
}

/* load the database from local storage */
/* do not reorder this function */
DB.prototype.load = function () {
    var d = localStorage.getItem("db" + APP_NAME);
    if (d != null && d != undefined) {
        this.root = JSON.parse(d);
    }
}

/* save the database to local storage */
/* do not reorder this function */
DB.prototype.save = function () {
    localStorage.setItem("db" + APP_NAME, JSON.stringify(this.root));
}

DB.prototype.addGame = function (idCategory, name) {
    /* find an unique game id */
    var idGame = 0;
    while( ! this.root.data.arrCategory[idCategory].arrGame.every( function(game) {
        return (game.id != idGame);
    } ) ) {
        idGame++;
    }
    
    /* create a game object and append to the game array */
    var game = new Game(idGame, name);
    this.root.data.arrCategory[idCategory].arrGame.push(game);
    
    this.save();    
}

DB.prototype.endGame = function (idCategory, idGame, time) {
    this.root.data.arrCategory[idCategory].arrGame[idGame].end = moment(time);
    this.save();
}

DB.prototype.playtimeGame = function (idCategory, idGame, time) {
    this.root.data.arrCategory[idCategory].arrGame[idGame].playtime = time;
    this.save();
}

DB.prototype.startGame = function (idCategory, idGame, time) {
    this.root.data.arrCategory[idCategory].arrGame[idGame].start = moment(time);
    this.save();
}