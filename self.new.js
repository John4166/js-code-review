/**
 * Created by Administrator on 2017/3/21.
 */

(function(global,$,_,doc){
    //console.log(global,$,_,doc)

    'use strict';

    var reportCustomApplication=function(options){
        options=options||{};
        this.posObj={};
        this.mmToPx=options.mmToPx||3;
        this.xx=0;
        this.yy=0;
        this.initializeElements();  //调用dom元素赋值为this属性的函数
        this.eventMap={
            "dbclick .title":"titledbclick",
            "dbclick .input input":"inputdblclick",
            "click .input span":"changeFontSize"

        }
        this.initialization();//eventMap执行函数
    }
    /**
     * 公用的操作方法提取出来
     * @type {{getCssParseInt: Function, setCenter: Function}}
     */
    var utils={
        getCssParseInt:function(ele,attr){
            return parseInt($(ele).css(attr),10)
        },
        setCenter:function(box,width,left){
                box.css({
                    width:width,
                    left:left-Math.floor(width/2)
                })
        }
        ,has:function(arr,name){
            return arr.indexOf(name)>-1
        }
        ,eachStr:function(len,func){
            var str='';
            for(var i=0;i<len;i++){
                str+=func(i)
            }
            return str;
        }
        , hide:function(ele){
            $(ele).addClass('hidden');
        },
        show:function(ele){
            $(ele).removeClass('hidden');
        },
        toggle:function(ele){
            return $(ele).toggleClass('hidden');
        }


    }
    //汇总操作dom的元素，在initializeElements中设置dom元素为this的属性，并且在构造函数中调用

    reportCustomApplication.Els={
        body: 'body',
        widgetDiv: ".left-widget div",
        inputResize: '.input-resize',
        pap: '.paper',
        centerY: '.center-y',
        centerBox: '.center-box',
        lineX: '.line-x',
        lineY: '.line-y',
        lineXY: '.line-x .line-y',
        widgetUl: '.left-widget ul',
        hr: '.hr',
        txt: '.input-group-btn button',
        cus: '#paper-type-cus',
        paperCusw: '#paper-cus-width',
        paperCush: '#paper-cus-height',
        hid: '#hidden',
        showHtmlCls: '.showHtml',
        showHtmlId: '#showHtml',
        mainCon: '#mainCon',
        rulerX: '.ruler-x',
        numX: '.num-x',
        rulerY: '.ruler-y',
        numY: '.num-y'
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
            var bindE=isOn?this._delegate:this._undelegate;
            for(var keys in maps){
                if(maps.hasOwnProperty(keys)){
                    var matches=keys.match(delegateEventSplitter);
                    bindE(matches[1],matches[2],this[maps[keys]].bind(this))
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
        _dragStart:function(e,ui){
            var centerY=this.centerY;
            if(e.target.id==".titleDrag"||e.target.id==".subtitleDrag"){
                //replace by " ['.titleDrage','.subtitleDrag'].indexOf(e.target.id)>-1 " 多判断转换为数组判断，如果有多个条件，这种方法见优
                $(".center-box").removeClass('hidden').css({
                    width:ui.helper.width(),
                    left:parseInt(centerY.css('left'))-Math.floor(ui.helper.width()/2)
                })
                //以上可以将$(".center-box")用initializeElements转为this的属性调用，就跟this.centerY一样
                //removeClass('hidden')可以在封装为一个函数--在外部util中--设为show函数，具体看self.excellent.js
                //width属性值有重复，可以先提出出来，设置好变量var width=ui.helper.width();在设置css属性的时候可以重复使用
                //css()这方法这么写也不好看，如果重复设置过多属性，可以在封装一下
            }else{
                $(".center-box").addClass("hidden")
            }
        },
        _dragStop:function(e,ui){
            var pap=this.pap,
                mmToPx = this.mmToPx,
                posObj = this.posObj,
                target=e.target;
            if(this.paperRange(ui.offset.top, ui.offset.left)){
            }
        },
        _dragging:function(){

        },
        changePaper:function(){

        }
        ,calLi: function() {
            var pap = this.pap;
            var mmToPx = this.mmToPx;
            //var width = parseInt(pap.css('width'));
            //var height = parseInt(pap.css('height'));
            var width = utils.getCssParseInt(pap,'width');
            var height = utils.getCssParseInt(pap,'height')
            // 以5mm为一个刻度格
            var i = Math.round(width / mmToPx / 5) + 1;
            var hi = Math.round(height / mmToPx / 5) + 1;

            //var li = '',
            //    nli = '',
            //    hli = '',
            //    nhli = '';
            //for (var j = 0; j < i; j++) {
            //    li = '<li></li>' + li;
            //}
            //for (var k = 0; k < Math.round(i / 2) + 1; k++) {
            //    nli = nli + '<li>' + k * 10 + '</li>';
            //}
            //for (var m = 0; m < hi; m++) {
            //    hli = '<li></li>' + hli;
            //}
            //for (var n = 0; n < Math.round(hi / 2) + 1; n++) {
            //    nhli = nhli + '<li>' + n * 10 + '</li>';
            //}

            //上面四个循环改成下面一个
            var li=utils.eachStr(i,addliEmpty);
            var nli=utils.eachStr(Math.round(i / 2) + 1,addli);
            var hli=utils.eachStr(hi,addliEmpty)
            var nhli = utils.eachStr(Math.round(hi / 2) + 1,addli)

            this.rulerX.html(li);
            this.numX.html(nli);
            this.rulerY.html(hli);
            this.numY.html(nhli);
            this.centerY.css('left', width / 2 + 260 + 'px');

            function addliEmpty(){
                return '<li></li>'
            }
            function addli(k){
                return '<li>'+k*10+'</li>'
            }
        },
        titledbclick: function(e) {
            var target = e.target;
            utils.toggle(utils.toggle(target).next('.input'));
        }
        ,inputdblclick: function(e) {
            var target = e.target;
            var input = $(target).parent('.input');
            var prev = input.prev();
            prev.html($(target).val());
            prev.css('font-size', $(target).css('font-size'));
            utils.toggle(input);
            utils.toggle(prev);
        },
        // 点击增加和减小按钮时，控制字体变化
        changeFontSize: function(e) {
            var target = e.target;
            var input = $(target).parent('.input').find('input');
            var afontSize = utils.getCssParseInt(input, 'font-size');
            afontSize = target.className === 'glyphicon glyphicon-plus-sign' ? afontSize + 1 : afontSize - 1;
            input.css('font-size', afontSize + 'px');
        }


    }
    $(function(){
        new reportCustomApplication({
            mmToPx:3
        }) ; //入口函数，新建类实例，在类中自定义调用内部（原型链）函数
    })

})(this,this.jQuery,this._,this.jQuery(document));
//1.this指代window
//2.在引入