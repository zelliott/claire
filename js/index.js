function getBackgroundCss(imageNo) {
  return 'url(assets/image-' + imageNo + '.jpg) no-repeat center center fixed';
}

function getScaleCss(scale) {
  return 'scale(' + scale + ')';
}

$(document).ready(function() {
  var img1 = $('.img-1');
  var img2 = $('.img-2');
  var stPrev = 0;
  var stSwitch = 150;

  img1.css({
    'background': getBackgroundCss(1),
    'background-size': 'cover'
  });

  img2.css({
    'background': getBackgroundCss(2),
    'background-size': 'cover'
  });
  img2.hide();


  $(document).scroll(function() {
    var st = $(document).scrollTop();
    var shouldSwitch = (stPrev < stSwitch && st >= stSwitch) ||
      (stPrev >= stSwitch && st < stSwitch);

    if (st >= stSwitch) {
      img2.css({
        'transform': getScaleCss(1 + ((st - stSwitch) / 200))
      });
    } else {
      img1.css({
        'transform': getScaleCss(1 + (st / 200))
      });
    }

    if (shouldSwitch) {
      img1.fadeToggle(400);
      img2.fadeToggle(400);
    }

    stPrev = st;
  });
});