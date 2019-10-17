/*
docker1://172.17.37.196:7203
docker2://172.17.37.208:7203
dcoker://pphoffice.lizhifm.cn
预发://pph5pre.lizhifm.cn
线上://pph5.lizhifm.cn
*/
const HTTP_BASE = 'http://192.168.27.234:6060';
import Toast from '../components/Toast/toast';
export default function http(opt) {
  opt = opt || {};

  var type = opt.type || 'GET';
  type = type.toUpperCase() || 'GET';
  var url = opt.url || '';
  url = HTTP_BASE + url;
  var async = opt.async || true;
  var data = opt.data || null;
  var success = opt.success || function() {};
  var failure = opt.failure || function() {};
  var xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  var params = [];
  for (var key in data) {
    var value = data[key];
    if (typeof value === 'object') value = JSON.stringify(value);
    params.push(key + '=' + value);
  }
  var dataStr = params.join('&');
  if (type === 'POST') {
    xmlHttp.open(type, url, async);
    xmlHttp.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8',
    );
    xmlHttp.send(dataStr);
  } else {
    xmlHttp.open(type, url + '?' + dataStr, async);
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = xmlHttp.responseText;
      if (typeof res === 'string') {
        try {
          res = JSON.parse(res);
        } catch (err) {}
      }
      if (res.code !== 0) Toast(res.msg);
      success(res);
      return;
    }
    if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
      // alert('request failure; code: ' + xmlHttp.status);
      Toast('网络异常，请检查网络环境。');
      failure();
      return;
    }
  };
}
