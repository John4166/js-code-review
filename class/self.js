/**
 * Created by Administrator on 2017/3/21.
 */
import $ from 'jQuery';
import _ from 'underscore';

import config from './config';
import base from './base';

import utils from './utils';

class reportCustomApplication extends base(config){
    constructor(options){
        super(options);
        super.bindEvent(); //继承父类的方法
        this.calLi();
    }
    //在这里设置业务事件逻辑
    titledblclick(e) {

    }
    inputdblclick(e) {

    }
    calLi() {

    }
}
export default reportCustomApplication;