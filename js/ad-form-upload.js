'use strict';

/* Модуль ad-form-upload.js */
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatar = window.generalElements.adForm.querySelector('.ad-form-header__preview').firstElementChild;
  var avatarInput = window.generalElements.adForm.elements.avatar;
  var housingPhotoDiv = window.generalElements.adForm.querySelector('.ad-form__photo');
  var housingPhotoInput = window.generalElements.adForm.elements.images;


  var isImage = function (fileName) {
    fileName = fileName.toLocaleLowerCase();
    return FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });
  };

  var loadFile = function (input, onFileLoad) {
    var file = input.files[0];
    if (isImage(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onFileLoad(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var onAvatarFileLoad = function (readerResult) {
    avatar.src = readerResult;
  };

  var onPhotoFileLoad = function (readerResult) {
    housingPhotoDiv.style.backgroundImage = 'url(' + readerResult + ')';
    housingPhotoDiv.style.backgroundSize = 'contain';
    housingPhotoDiv.style.backgroundRepeat = 'no-repeat';
    housingPhotoDiv.style.backgroundPosition = 'center center';
  };

  avatarInput.addEventListener('change', function () {
    loadFile(avatarInput, onAvatarFileLoad);
  });

  housingPhotoInput.addEventListener('change', function () {
    loadFile(housingPhotoInput, onPhotoFileLoad);
  });
})();
