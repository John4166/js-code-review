/**
 * Created by Administrator on 2017/3/21.
 */
import $ from 'jQuery';
//设置暴露公用常用的方法
var utils = {
    getCssParseInt: function(ele, attr) {
        return parseInt($(ele).css(attr), 10);
    },
    setCenter: function(box, width, left) {
        box.css({
            width: width,
            left: left - Math.floor(width / 2)
        });
    },
    has: function(arr, name) {
        return arr.indexOf(name) > -1;
    }

};
export default utils;