function getBackgroundCss(imageNo) {
  return 'url(assets/image-' + imageNo + '.jpg) no-repeat center center fixed';
}

function getScaleCss(scale) {
  return 'scale(' + scale + ')';
}

$(document).ready(function() {
  var body = $('body');
  var title = $('.title');
  var img1 = $('.img-1');
  var img2 = $('.img-2');
  var fullScreen = $('.full-screen');
  var backBtn = $('.back-btn');
  var frames = $('.frames');
  var frame = $('.frame');
  var stMin = 200;
  var stMax = 350;

  img1.css({
    'background': getBackgroundCss(1),
    'background-size': 'cover',
    'opacity': 1
  });

  img2.css({
    'background': getBackgroundCss(2),
    'background-size': 'cover',
    'opacity': 0
  });

  $(document).scrollTop(0);
  $(document).scroll(function() {
    var st = $(document).scrollTop();
    var isOnBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    var img1Css = {};
    var img2Css = {};
    var titleCss = {};

    if (st < stMax) {
      titleCss['transform'] = getScaleCss(1 + (st / 150));
      img1Css['transform'] = getScaleCss(1 + (st / 200));
    }

    if (st >= stMin) {
      img2Css['transform'] = getScaleCss(1 + ((st - stMin) / 200));
    }

    if (st < stMin) {
      titleCss['opacity'] = 1;
      img1Css['opacity'] = 1;
      img2Css['opacity'] = 0;
    }
  
    if ((st >= stMin) && (st < stMax)) {
      var stDelta = st - stMin;
      var stTotalDelta = stMax - stMin;

      titleCss['opacity'] = 1 - (stDelta / stTotalDelta);
      img1Css['opacity'] = 1 - (stDelta / stTotalDelta);
      img2Css['opacity'] = (stDelta / stTotalDelta);
    }
  
    if (st > stMax) {
      titleCss['opacity'] = 0;
      img1Css['opacity'] = 0;
      img2Css['opacity'] = 1;
    }

    title.css(titleCss);
    img1.css(img1Css);
    img2.css(img2Css);

    if (isOnBottom) {
      frames.fadeIn(800);
      img2.fadeOut(800);
      title.hide();
    }

    if (!isOnBottom) {
      frames.fadeOut(800);
      img2.fadeIn(800);
      title.show();
    }
  });

  frame.on('click', function() {
    var frameNo = $(this).data('frame');

    fullScreen.attr('src', 'assets/frames/large/' + frameNo + '.jpg');
    fullScreen.show();
    backBtn.show();

    body.css({
      'overflow': 'hidden'
    });
  });

  backBtn.on('click', function() {
    fullScreen.hide();
    backBtn.hide();

    body.css({
      'overflow': 'initial'
    });
  });
});