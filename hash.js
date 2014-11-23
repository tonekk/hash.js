(function(window) {

  var arrayKeyRegex =  /(.*)\[\]=(.*)/,
      specialCharRegex = /[=\[\]\&]/,
      normalKeyRegex =  /(.*)=(.*)/;
      helpers = {},
      locationHash;


  helpers.parseHash = function() {

    var newLocationHash = {},
        keyValuePairs = window.location.hash.slice(2).split('&');

    for (var i = 0; i < keyValuePairs.length; i++) {

      var matches = null,
          keyValuePair = keyValuePairs[i];

      if (keyValuePair === "") {
        continue;
      }

      if (matches = keyValuePair.match(arrayKeyRegex)) {
        if (newLocationHash[matches[1]]) {
          newLocationHash[matches[1]].push(matches[2]);
        } else {
          newLocationHash[matches[1]] = [matches[2]];
        }
      } else if (matches = keyValuePair.match(normalKeyRegex)) {
        newLocationHash[matches[1]] = matches[2];
      }
    }

    locationHash = newLocationHash;
  };

  /* Write locationHash object to url, when it changes */
  helpers.updateUrl = function() {

    var newLocationHash = "#!";

    for (var key in locationHash) {
      if (locationHash[key] instanceof Array) {
        for (var i = 0; i < locationHash[key].length; i++) {
          newLocationHash += '&' + key + '[]=' + locationHash[key][i];
        }
      } else {
        newLocationHash += '&' + key + '=' + locationHash[key];
      }
    }

    /* Temporarily deactivate event */
    window.onhashchange = null;
    window.location.hash = newLocationHash;
    window.onhashchange = helpers.parseHash;
  };

  /* Compute initial locationHash object from url */
  helpers.parseHash();

  /* Set onhashchange event to update locationHash */
  window.onhashchange = helpers.parseHash;

  /* Main function to get / set location#hash */
  hash = function(key, val) {

    /* Should return locationHash with arguments */
    if (!arguments.length) {
      return locationHash;
    }

    /* '=', '[', ']' and '&' are special chars */
    if (key.match(specialCharRegex)) {
      throw('Cannot use key \'' + key + '\', because it contains special characters.')
    }

    if (arguments.length == 2) {

      /* Passing undefined deletes key */
      if (val === undefined) {
        delete locationHash[key];
      } else {
        locationHash[key] = val;
      }

      helpers.updateUrl();

    } else {
      return locationHash[key];
    }
  };

})(window);
