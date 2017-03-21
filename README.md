# js-code-review
js代码重构法

框架如下：

````
(function(global,$,_,doc){
    'use strict';
    //创建一个类
    var reportCustomApplication=function(options){
        options=options||{};
        this.initializeElements();  //调用dom元素赋值为this属性的函数
        this.eventMap={
            "dbclick .title":"titledbclick",
            "click .#cusGo":"cusGo"
            //...
        }
        this.initialization();//eventMap执行函数
    }

     //汇总操作dom的元素，在initializeElements中设置dom元素为this的属性，并且在构造函数中调用
        reportCustomApplication.Els={
            body: 'body',
            widgetDiv: ".left-widget div",
            inputResize: '.input-resize',
            //...
        }
    /**
     * 公用的操作方法提取出来
     * @type {{getCssParseInt: Function, setCenter: Function}}
     */
    var utils={
        getCssParseInt:function(ele,attr){
            return parseInt($(ele).css(attr),10)
        }
        //...
    }

    reportCustomApplication.prototype={
        constructor:reportCustomApplication,
        /**
         * initializeElements将jq元素的dom获取转化成了this的属性
         */
        initializeElements:function(){
            var eles=reportCustomApplication.Els;
            for(var name in eles){
                if(eles.hasOwnProperty(name)){
                    this[name]=$(eles[name]);
                }
            }
        },
        initialization:function(){
            this.bindEvent(this.eventMap);
        },
        bindEvent:function(maps){
            this.initializeOrdinaryEvents(maps)
        }
        ,unbindEvent:function(maps){
            this.uninitializeOrdinaryEvents(maps);
        }
        ,initializeOrdinaryEvents:function(maps){
            this._scanEventsMap(maps,true)
        },
        uninitializeOrdinaryEvents:function(maps){
            this._scanEventsMap(maps,false)
        },
        /**
         * 设置函数绑定与否
         * @param maps 函数事件集合对象
         * @param isOn 绑定还是解绑
         * @private
         */
        _scanEventsMap:function(maps,isOn){
            var delegateEventSplitter=/^(\S)\s*(.*)$/;
            var bind=isOn?this._delegate:this._undelegate;
            for(var keys in maps){
                if(maps.hasOwnProperty(keys)){
                    var matches=keys.match(delegateEventSplitter);
                    bind(matches[1],matches[2],this[maps[keys]].bind(this))
                }
            }
        }
        /**
         * 动态绑定元素事件，重新封装$().on()
         * @param name
         * @param selector
         * @param func
         * @private
         */
        ,_delegate:function(name,selector,func){
                doc.on(name,selector,func)
        }
        /**
         * 动态解绑元素事件，重新封装$().off()
         * @param name
         * @param selector
         * @param func
         * @private
         */
        ,_undelegate:function(name,selector,func){
            doc.off(name,selector,func)
        }
        ,destroy:function(){
            this.unbindEvent(this.eventMap)
        },

        //业务逻辑方法：
        _dragStart:function(e,ui){
        },
        _dragStop:function(e,ui){

        },
        _dragging:function(){
        },
        changePaper:function(){
        }
    }

    //jq闭包入口函数，新建类实例，在类中自定义调用内部（原型链）函数
    $(function(){
        new reportCustomApplication() ;
    })

})(this,this.jQuery,this._,this.jQuery(document));

````

