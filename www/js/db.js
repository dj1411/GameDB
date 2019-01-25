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

function Data() {
}

function DB() {
    this.root = new Object();
    this.load();
    
    if(this.root.data == undefined || this.root.data == null || this.root.data === "") {
        this.root.data = new Data();
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

