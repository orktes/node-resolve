var path = require('path');


module.exports = function (start, opts) {
    var modules = opts.moduleDirectory || ['node_modules', 'bower_components'];

    if (!Array.isArray(modules)) {
      modules = [modules];
    }

    var prefix = '/';
    if (/^([A-Za-z]:)/.test(start)) {
        prefix = '';
    } else if (/^\\\\/.test(start)) {
        prefix = '\\\\';
    }
    var splitRe = process.platform === 'win32' ? /[\/\\]/ : /\/+/;
    var parts = start.split(splitRe);

    var dirs = [];

    for (var x = 0; x < modules.length; x++) {
      for (var i = parts.length - 1; i >= 0; i--) {
          if (parts[i] === modules) continue;
          var dir = path.join(
              path.join.apply(path, parts.slice(0, i + 1)),
              modules[x]
          );
          dirs.push(prefix + dir);
      }
    }

    if(process.platform === 'win32'){
        dirs[dirs.length-1] = dirs[dirs.length-1].replace(":", ":\\");
    }
    return dirs.concat(opts.paths);
}
