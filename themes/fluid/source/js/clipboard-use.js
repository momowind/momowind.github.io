!function (e, t, a) {
  var initCopyCode = function () {
    var copyHtml = '';
    copyHtml += '<button class="copy-btn" data-clipboard-snippet="">';
    copyHtml += '<i class="far fa-copy"></i><span>Copy</span>';
    copyHtml += '</button>';
    var pre = $('pre.prettyprint');
    pre.addClass('code-block');
    pre.prepend(copyHtml);
    var clipboard = new ClipboardJS('.copy-btn', {
      target: function (trigger) {
        return trigger.nextElementSibling;
      },
    });
    clipboard.on('success', function (e) {
      e.clearSelection();
      e.trigger.innerHTML = 'Success';
      setTimeout(function () {
        e.trigger.outerHTML = copyHtml;
      }, 2000);
    });
  };
  var oldLoadCb = window.onload;
  window.onload = function () {
    oldLoadCb && oldLoadCb();

    initCopyCode();
  };
}(window, document);
