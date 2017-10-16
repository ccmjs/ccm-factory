( function() {

  var component = {
    name: 'factory',

    ccm: 'resources/ccm-10.0.0.min.js',

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
              "id": "componentURL",
              "value": "http://localhost:5000/resources/test_components/ccm.navmenu.js"
            },
            {
              "tag": "button",
              "inner": "Komponente laden",
              "onclick": "%loadComponentClick%"
            },
            {
              "tag": "br"
            },
            {
              "tag": "textarea",
              "id": "configEditor",
              "rows": 20,
              "cols": 50,
              "inner": "Config"
            },
            {
              "tag": "br"
            },
            {
              "inner": "Name der neuen Komponente: "
            },
            {
              "tag": "input",
              "id": "nameOfNewComponent"
            },
            {
              "tag": "button",
              "inner": "Neue Komponente generieren",
              "onclick": "%generateClick%"
            },
            {
              "tag": "br"
            },
            {
              "tag": "textarea",
              "id": "newComponentDisplay",
              "rows": 20,
              "cols": 50,
              "inner": "Neue Komponente"
            }
          ]
        }
      }
    },

    Instance: function() {
      var self = this;

      this.start = function() {

        var mainElement = this.ccm.helper.html(this.html.main, {
          loadComponentClick: loadComponent,
          generateClick: generateNewComponent
        });

        this.element.appendChild(mainElement);

        // In here the newly generated component gets stored
        var newComponent;

        /**
         * Downloads the component
         */
        function loadComponent() {
          var urlToComponent = mainElement.querySelector('#componentURL').value;

          self.ccm.load({url: urlToComponent}, function (loadedComponent) {
            newComponent = loadedComponent;

            displayConfig();
            displayName();
          });

        }

        /**
         * Displays the config of the loaded component
         */
        function displayConfig() {
          mainElement.querySelector('#configEditor').value = JSON.stringify(newComponent.config, null, 2);
        }

        /**
         * Displays the name of the new Component
         */
        function displayName() {
          mainElement.querySelector('#nameOfNewComponent').value = newComponent.name + '-new';
        }

        /**
         * Uses the modified config to generate a new component
         */
        function generateNewComponent() {
          newComponent.name = mainElement.querySelector('#nameOfNewComponent').value;
          newComponent.config = JSON.parse(mainElement.querySelector('#configEditor').value);
          displayNewComponent();
        }

        /**
         * The new component is displayed in a textarea
         */
        function displayNewComponent() {
          /**
           * 1.replace: Newlines will be visible in the textarea
           * 2. and 3.replace: Removes quotation marks from functions
           */
          var innerPartOfCompoment = JSONfn.stringify(newComponent).replace(/\\n/g, '\r\n').replace(/"function/g, 'function').replace(/}"/g, '}');
          var componentBeginning = '( function () {\n' +
            '\n' +
            '  var component = ';
          var componentEnding = ';\n' +
            '\n' +
            '  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}\n' +
            '}() );';

          mainElement.querySelector('#newComponentDisplay').value = componentBeginning + innerPartOfCompoment + componentEnding;
        }

      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}

}());
