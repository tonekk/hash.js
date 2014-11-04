(function(window) {

  var specialCharRegex = /[=\[\]\&]/,
      arrayKeyRegex =  /(.*)\[\]=(.*)/,
      normalKeyRegex =  /(.*)=(.*)/;

  /* Compute initial locationHash object from url */
  var locationHash = (function() {

    var retVal = {},
        keyValuePairs = window.location.hash.slice(2).split('&');


    for (var i = 0; i < keyValuePairs.length; i++) {

      var matches = null,
          keyValuePair = keyValuePairs[i];

      if(keyValuePair === "") {
        continue;
      }

      if(matches = keyValuePair.match(arrayKeyRegex)) {
        if(retVal[matches[1]]) {
          retVal[matches[1]].push(matches[2]);
        } else {
          retVal[matches[1]] = [matches[2]];
        }
      } else if(matches = keyValuePair.match(normalKeyRegex)) {
        retVal[matches[1]] = matches[2];
      }
    }

    return retVal;

  })();

  /* Write locationHash object to url, when it changes */
  var updateLocationHash = function() {

    var newLocationHash = "#!";

    for(var key in locationHash) {
      if(locationHash[key] instanceof Array) {
        for(var i = 0; i < locationHash[key].length; i++) {
          newLocationHash += '&' + key + '[]=' + locationHash[key][i];
        }
      } else {
        newLocationHash += '&' + key + '=' + locationHash[key];
      }
    }

    window.location.hash = newLocationHash;
  };

  /* Main function to get / set location#hash */
  hash = function(key, val) {

    // '=', '[', ']' and '&' are special chars
    if(key.match(specialCharRegex)) {
      throw('Cannot use key \'' + key + '\', because it contains special characters.')
    }

    if(arguments.length == 2) {

      /* Passing undefined deletes key */
      if(val === undefined) {
        delete locationHash[key];
      } else {
        locationHash[key] = val;
      }

      updateLocationHash();

    } else {
      return locationHash[key];
    }
  };

})(window);
