/** 
 * @fileOverview キュー操作クラス
 */
"use strict";
var assert = require('assert');
var Class = require(__dirname+'/../util').Class;
var LinkedList = require(__dirname+'/linkedlist');

var Queue = module.exports = Class({
    // コンストラクタ
    initialize : function(){
        this.q_ = new LinkedList.Manager();
    },
    // 後始末
    finalize : function(){
        this.clear();
        this.q_ = null;
    },
    // キューに積む
    enqueue : function(o){
        var n = new LinkedList.Node();
        n.data = o;
        this.q_.pushTail(n);
    },
    // キューから取り出す
    dequeue : function(){
        var data = null;
        if(this.q_.size() > 0){
            var n = this.q_.popHead();
            data = n.data;
            n.data = null;
        }
        return data;
    },
    // キューをクリアする
    clear : function(){
        this.q_.finalize();
    },
    // キューの長さを取得する
    size : function(){
        return this.q_.size();
    },
    // キューをスキャンする
    scan : function(callback){
        var i = 0;
        this.q_.scanHead(function(node){
            if(!callback(i++,node.data)){
                return false;
            }
            return true;
        });
        return true;
    },
});
