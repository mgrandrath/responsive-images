(function(win, doc) {

  var screenType;

  function setCookie() {
    screenType = win.screen.width > 600 ? 'large' : 'small';
    doc.cookie = 'screenType=' + screenType + '; path=/';
  }

  function insertImages() {
    var srcAttr,
        placeholders,
        item,
        parent,
        image;

    switch (screenType) {
    case 'large':
      srcAttr = 'data-large';
      break;

    default:
      srcAttr = 'data-src';
    }

    placeholders = doc.getElementsByTagName('noscript');
    placeholders = Array.prototype.slice.call(placeholders);

    while (placeholders.length > 0) {
      item = placeholders.pop();
      parent = item.parentNode;
      image = new Image();
      image.src = item.getAttribute(srcAttr);
      image.alt = item.getAttribute('data-alt');
      parent.insertBefore(image, item);
      parent.removeChild(item);
    }
  }

  function onLoad() {
    setCookie();
    insertImages();
  }

  win.addEventListener('load', onLoad);

})(window, document);
