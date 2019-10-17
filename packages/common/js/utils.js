export function getProfileByInstance(instance) {
  if (!instance) return null;
  return instance.$options._profile_ || null;
}

export function parseQueryString(url) {
  let arr;
  const res = {};
  url = url.split('#')[0];
  arr = url.split('?');
  arr.shift();
  const queryStr = arr.join('?');
  if (queryStr.trim().length === 0) {
    return res;
  }
  arr = queryStr.split('&');
  for (let i = 0; i < arr.length; i++) {
    const itemArr = arr[i].split('=');
    const name = itemArr.shift();
    const value = itemArr.join('=');
    res[name] = value;
  }
  return res;
}

export function traversal(root, callback) {
  if (!Array.isArray(root)) return;
  function walk(node) {
    callback(node);
    node.children && node.children.forEach(walk);
  }
  root.forEach(walk);
}
