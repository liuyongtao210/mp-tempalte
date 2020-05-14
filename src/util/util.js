var utils = {
  stroageSave: function (objectData) {
    localStorage.setItem(objectData.Name, JSON.stringify(objectData));
  },
  stroageLoad: function (objectName) {
    if (localStorage.getItem(objectName)) {
      return JSON.parse(localStorage.getItem(objectName))
    } else {
      return false
    }
  },
  stroageRemove: function (objectName) {
    localStorage.removeItem(objectName);
  },
  getWeeks: function () {
    let arr = []
    let now = new Date()
    arr[0] = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
    arr[1] = now
    return arr
  },
  getYears: function () {
    let arr = []
    let now = new Date()
    arr[0] = new Date(now.getTime() - 365 * 24 * 3600 * 1000)
    arr[1] = now
    return arr
  },
  formatDate: function (value) {

    if (value == null || value == '') {
      return ''
    } else {
      var date = new Date(value);
      var year = date.getFullYear();
      var month = this.padDate(date.getMonth() + 1);
      var day = this.padDate(date.getDate());
      var hours = this.padDate(date.getHours());
      var minutes = this.padDate(date.getMinutes());
      var seconds = this.padDate(date.getSeconds());
      return year + '-' + month + '-' + day;
    }

  },
  padDate: function (value) {
    return value < 10 ? '0' + value : value;
  },
  checkNullObj (obj) {
    return Object.keys(obj).length === 0
  },

  getTreeDateByParam(list, param, fun) {
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
};

export default utils
