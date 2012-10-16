
/*jshint laxcomma:true */
/*global $:false, document: false, FormData:false */

$(function() {

  "use strict";

  var dropImage = $('.drop-image')
    , mainCanvas = $('.main-canvas');

  mainCanvas[0].addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var file = e.dataTransfer.files[0]
      , data = new FormData();
    
    data.append('file', file);

    $.ajax({
      url: 'upload',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data) {
        var url = 'images/' + data;
        var imgDiv = $('<div>').addClass('phone span2 offset5');
        $('<img>').attr('src', url).appendTo(imgDiv);
        imgDiv.appendTo(dropImage.parent());
        dropImage.remove();
      }
    });

  }, false);
});
