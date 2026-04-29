(function () {
  'use strict';

  var galleries = [].slice.call(document.querySelectorAll('.assetGrid--strip'));
  if (!galleries.length) return;

  var supportsResizeObserver = 'ResizeObserver' in window;
  var resizeObserver = supportsResizeObserver ? new ResizeObserver(function (entries) {
    entries.forEach(function (entry) {
      layout(entry.target);
    });
  }) : null;

  function parseRatio(value, img) {
    if (value) {
      var match = String(value).trim().match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
      if (match) {
        var w = Number(match[1]);
        var h = Number(match[2]);
        if (w > 0 && h > 0) return w / h;
      }
    }

    if (img) {
      var width = Number(img.getAttribute('width') || img.naturalWidth || 0);
      var height = Number(img.getAttribute('height') || img.naturalHeight || 0);
      if (width > 0 && height > 0) return width / height;
    }

    return 1;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getGap(gallery) {
    var styles = window.getComputedStyle(gallery);
    return parseFloat(styles.columnGap || styles.gap) || 0;
  }

  function getTargetHeight(gallery) {
    var width = gallery.clientWidth || window.innerWidth;
    var preferred = width * 0.34;
    return clamp(preferred, 260, 860);
  }

  function setAssetSize(asset, width, height) {
    asset.style.setProperty('--asset-gallery-width', width.toFixed(2) + 'px');
    asset.style.setProperty('--asset-gallery-height', height.toFixed(2) + 'px');
  }

  function layout(gallery) {
    var assets = [].slice.call(gallery.querySelectorAll(':scope > .asset'));
    var galleryWidth = gallery.clientWidth;

    if (!assets.length || galleryWidth <= 0) return;

    gallery.classList.add('assetGrid--justified');

    if (galleryWidth < 700) {
      assets.forEach(function (asset) {
        asset.style.removeProperty('--asset-gallery-width');
        asset.style.removeProperty('--asset-gallery-height');
      });
      return;
    }

    var gap = getGap(gallery);
    var targetHeight = getTargetHeight(gallery);
    var row = [];
    var ratioSum = 0;

    function flush() {
      if (!row.length) return;

      var gaps = gap * Math.max(row.length - 1, 0);
      var rowHeight = (galleryWidth - gaps) / ratioSum;

      rowHeight = clamp(rowHeight, 220, 860);

      row.forEach(function (item) {
        setAssetSize(item.asset, item.ratio * rowHeight, rowHeight);
      });

      row = [];
      ratioSum = 0;
    }

    assets.forEach(function (asset) {
      var img = asset.querySelector('img');
      var ratio = parseRatio(asset.dataset.ratio, img);
      row.push({ asset: asset, ratio: ratio });
      ratioSum += ratio;

      var projectedWidth = (ratioSum * targetHeight) + (gap * Math.max(row.length - 1, 0));
      if (projectedWidth >= galleryWidth) {
        flush();
      }
    });

    flush();
  }

  galleries.forEach(function (gallery) {
    layout(gallery);
    if (resizeObserver) resizeObserver.observe(gallery);
  });

  if (!supportsResizeObserver) {
    var ticking = false;
    window.addEventListener('resize', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        galleries.forEach(layout);
      });
    }, { passive: true });
  }

  window.addEventListener('load', function () {
    galleries.forEach(layout);
  });
})();
