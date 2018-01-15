const fs = require('fs');
const minify = require('babel-minify');

fs.readFile('ccm.factory.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  
  const result = data.replace(/js\/jsonfn.js/g, 'https://leoneck.github.io/ccm-factory/js/jsonfn.js').replace(/\/js\/webcomponents-lite.js/g, 'https://leoneck.github.io/ccm-factory/js/webcomponents-lite.js').replace(/js\/juicy-ace-editor.html/g, 'https://leoneck.github.io/ccm-factory/js/juicy-ace-editor.html');

  const {code, map} = minify(result);

  fs.writeFile('dist/ccm.factory.min.js', code, 'utf8', function (err) {
    if (err) return console.log(err);
  });

});
