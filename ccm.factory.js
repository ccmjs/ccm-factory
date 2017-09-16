( function () {

  var component = {
    name: 'factory',

    ccm: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',

    config: {
      html: {
        "main": {
          "id": "main",
          "inner": [
            {
              "inner": "URL der Komponente:"
            },
            {
              "tag": "input",
              "id": "componentURL"
            },
            {
              "tag": "button",
              "inner": "Start",
              "onclick": "%%"
            }
          ]
        }
      }
    },

    Instance: function () {
      var self = this;

      this.start = function () {

        var mainElement = this.ccm.helper.html(this.html.main, onClick);

        this.element.appendChild(mainElement);

        function onClick () {
          var inputValue = mainElement.querySelector('#componentURL').value;

          self.ccm.load(inputValue, function (returnData) {
            console.log(returnData);
          });
        }
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}

}());
