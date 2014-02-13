var create = function (params) {
  params = params || {};
 
  var tagName = params.tagName || 'div';
  var elem = document.createElement(tagName);
  var attrs = params['attr'];
 
  params = params || {};
 
  if (params['id']) {
    elem.id = params['id'];
  }
 
  if (params['className']) {
    elem.className = params['className'];
  }
 
  if (params['hidden']) {
    elem.className = elem.className + ' hidden';
  }
 
  if (params['html']) {
    elem.innerHTML = params['html'];
  }
 
  if (params['text']) {
    elem.appendChild(document.createTextNode(params['text']));
  }
 
  if (attrs) {
    for (var attrName in attrs) {
      elem[attrName] = attrs[attrName];
    }
  }
 
  if (params['data']) {
    for (var key in params['data']) {
      elem.setAttribute('data-' + key, params.data[key]);
    }
  }
 
  if (params['css']) {
    for (var key in params['css']) {
      elem.style[key] = params['css'][key];
    }
  }
 
  if (params['elements']) {
    params.elements.forEach(function (element) {
      elem.appendChild(create(element));
    }, this);
  }
 
  return elem;
}

