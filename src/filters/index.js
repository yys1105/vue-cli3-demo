// 时间格式化
export function dateFormate(d, pattern) {
    if (!d || d == "") return "";
    if (typeof (d) != 'object') {
        d = new Date(d);
    }
    pattern = pattern || "yyyy-mm-dd HH:MM";
    let str = "";
    str = pattern.replace("yyyy", d.getFullYear());
    str = str.replace("mm", d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1);
    str = str.replace("dd", d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    str = str.replace("HH", d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
    str = str.replace("MM", d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    str = str.replace("ss", d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
    return str;
}
// 图片缩略图
export function imgSize(val, width = '200', height = '200') {
    if (val.indexOf('base64') == -1) {
        var pathArr = val.split('//')
        var srcArr = pathArr[1].split('/')
        srcArr.splice(1, 0, 'thumb-with-size')
        return pathArr[0] + '//' + srcArr.join('/') + '_' + width + 'x' + height
    } else {
        return val
    }
}
//数字转金钱
export function num2money(num) {
    var numStr = (num * 0.01).toFixed(2) * 100 + ''
    var reg = numStr.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
    return numStr.replace(reg, '$1,')
}
//金钱转数字
export function money2num(val) {
    var num = val.replace(/^\s+|\s+$/gm, '');
    var mon = num.toString();
    if (mon.length == 0) return 0;
    return Number(mon.replace(/,/g, ""));
}