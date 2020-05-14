/*
* 数据根据条件分组
*/
let getTreeDateByParam = (list, param, fun) => {
    var data = {};
    if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (param) {
                var res = list[i][param];
            } else if (fun) {
                var res = fun(list[i]);
            }
            if (data[res]) {
                data[res].push(list[i]);
            } else {
                data[res] = [list[i]];
            }
        }
    }
    return data;
}


/*
* 数组去重
*/
let uniq = (array) => {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}


/*
* 数组根据指定项排序
*/

let sortFn = (arr, item) => {
    arr.sort(function (a, b) {
        if (a[item] < b[item]) {
            return -1;
        } else if (a[item] == b[item]) {
            return 0;
        } else {
            return 1;
        }
    })
    return arr
}


/*
 * 时间格式化
 */
let toDate = (date, fmt) => {
    if(typeof(date) === 'undefined' || date === null)
        return '';
    date = new Date(date)

    if (/(y+)/.test(fmt)) {

        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}


/*
 * 本地存储
 */
let stroageSave = (objectData) => {
    localStorage.setItem(objectData.Name, JSON.stringify(objectData));
}

let stroageLoad = (objectName) => {
    if (localStorage.getItem(objectName)) {
        return JSON.parse(localStorage.getItem(objectName))
    } else {
        return false
    }
}
let stroageRemove = (objectName) => {
    localStorage.removeItem(objectName);
}

/*
 * 获取url参数
 */

let getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return decodeURI(r[2])
    } else {
        return null
    }
}


/*
 * 根据parentID转换树形结构
 */
let toTree = (data) => {
    data.forEach(function (item) {
        delete item.children
    })
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item
    })

    var val = []
    data.forEach(function (item) {
        var parent = map[item.parentId]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            val.push(item)
        }
    });
    return val
}


/*
* 根据地名转换经纬度
*/
let toLocation = (addres) => {
    let map = new BMap.Map();
    let localSearch = new BMap.LocalSearch(map)
    let arr = []
    localSearch.search(addres)
    localSearch.setSearchCompleteCallback((searchResult) => {
        var poi = searchResult.getPoi(0);
        //alert(addres+"   "+poi.point.lng+"   "+poi.point.lat)
        arr = [poi.point.lng, poi.point.lat]
    })
}


/*
* 取最近一个月
*/
let getLastMonth = () => {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    return [start, end]
}

/*
* 取指定日期
*/
let getDate = (day) => {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

let doHandleMonth = (month) => {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}

export default {
    toDate,
    stroageSave,
    stroageLoad,
    stroageRemove,
    getUrlParam,
    toTree,
    toLocation,
    getLastMonth,
    getDate,
    getTreeDateByParam,
    sortFn,
    uniq
}
