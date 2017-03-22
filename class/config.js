/**
 * Created by Administrator on 2017/3/21.
 */
class config{
    constructor(options){
        options=options||{};
        this.popObj={}
        this.mmToPx=options.mmToPx||3;
        this.eles={
            body:'body'
            widgetDiv: ".left-widget div",
            inputResize: '.input-resize',
            pap: '.paper',
            centerY: '.center-y',
            centerBox: '.center-box'
        }
        //设置事件地图
        this.eventMap={
            "dbclick .title:":"titledbclick",
            'dblclick .input input': 'inputdbclick',
        }
    }
}

export default config