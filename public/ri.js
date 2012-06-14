(function(win, doc) {

  function insertImages() {
    var srcAttr,
        placeholders,
        item,
        image;

    switch (win.screenType) {
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
      image = new Image();
      image.src = item.getAttribute(srcAttr);
      image.alt = item.getAttribute('data-alt');
      item.parentNode.insertBefore(image, item);
      item.parentNode.removeChild(item);
    }
  }

  win.addEventListener('load', insertImages);

})(window, document);
