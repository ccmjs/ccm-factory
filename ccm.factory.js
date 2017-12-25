/**
 * @overview ccm component for factory
 * @author Leon Eck <leon.eck@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (0.1.0)
 */


{

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'factory',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'resources/ccm-12.4.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "main": {
          "id": "main",
          "inner": [
            {
              "inner": "URL der Komponente:<br>http://localhost:5000/resources/test_components/ccm.navmenu.js<br>http://localhost:5000/resources/test_components/ccm.kanban_card.js<br>http://localhost:5000/resources/test_components/ccm.game_chooser.js<br>http://localhost:5000/resources/test_components/ccm.form.js<br>http://localhost:5000/resources/test_components/ccm.teambuild_builder.js<br>http://localhost:5000/resources/test_components/ccm.radar_chart.js<br>http://localhost:5000/resources/test_components/ccm.solutions_view.js<br>"
            },
            {
              "tag": "input",
              "id": "componentURL",
              "size": "70",
              "value": "http://localhost:5000/resources/test_components/ccm.kanban_card.js"
            },
            {
              "inner": "URL der Config Datei (leer lassen, wenn nicht vorhanden):<br>http://localhost:5000/resources/test_components/configs.js"
            },
            {
              "tag": "input",
              "id": "componentConfigURL",
              "size": "70",
              "value": ""
            },
            {
              "inner": "Schlüssel aus der Config Datei (leer lassen, wenn keine Config Datei angegeben wurde):<br>Demo"
            },
            {
              "tag": "input",
              "id": "componentConfigKeyURL",
              "size": "70",
              "value": ""
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
              "tag": "div",
              "id": "chooseEditingStyle",
              "style": "display: none;",
              "inner": [
                {
                  "tag": "button",
                  "inner": "Config Editor",
                  "onclick": "%configEditorChosenClick%"
                },{
                  "tag": "button",
                  "inner": "Geführter Modus",
                  "onclick": "%guidedEditingChosenClick%"
                }
              ]
            },
            {
              "tag": "div",
              "id": "areaForConfigEditing",
              "style": "display: none;",
              "inner": [
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
                  "tag": "div",
                  "id": "nameOfNewComponentInput",
                  "inner": [
                    {
                      "tag": "button",
                      "inner": "Neue Komponente generieren",
                      "onclick": "%generateFromEditorClick%"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "id": "areaForGuidedEditing",
              "style": "display: none;",
              "inner": [
                {
                  "tag": "h2",
                  "inner": "Geführter Modus zum Editieren der Konfiguration"
                },
                {
                  "id": "ccmDefaulConfigArea",
                  "style": "display: none;",
                  "inner": [
                    {
                      "tag": "h4",
                      "inner": "CCM Konfiguration"
                    },
                    {
                      "inner": [
                        {
                          "inner": "Name der neuen Komponente: "
                        },
                        {
                          "tag": "input",
                          "id": "guided_nameOfNewComponent"
                        }
                      ]
                    },
                    {
                      "inner": [
                        {
                          "inner": "URL von CCM: "
                        },
                        {
                          "tag": "input",
                          "size": "50",
                          "id": "guided_ccmURL"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "guided_componentSpecificConfiguration",
                  "inner": [
                    {
                      "tag": "h4",
                      "inner": "Komponenten spezifische Konfiguration"
                    },
                    {
                      "tag": "div",
                      "id": "htmlEditorCaption",
                      "inner": "HTML:",
                      "style": "display: none;"
                    },
                    {
                      "tag": "div",
                      "id": "htmlEditor"
                    }
                  ]
                },
                {
                  "tag": "button",
                  "inner": "Neue Komponente generieren",
                  "onclick": "%generateFromGuidedClick%"
                }
              ]
            },
            {
              "tag": "br"
            },
            {
              "id": "newComponentDisplayLabel",
              "inner": "Vollständiger Komponentencode:",
              "style": "display: none;"
            },
            {
              "tag": "textarea",
              "id": "newComponentDisplay",
              "style": "display: none;",
              "rows": 20,
              "cols": 50,
              "inner": "Neue Komponente"
            },
            {
              "id": "newComponentConfigDisplayLabel",
              "inner": "Neue Konfiguration:",
              "style": "display: none;"
            },
            {
              "tag": "textarea",
              "id": "newComponentConfigDisplay",
              "style": "display: none;",
              "rows": 20,
              "cols": 50,
              "inner": "Neue Konfiguration"
            },
            {
              "tag": "br"
            },
            {
              "tag": "div",
              "id": "demoArea"
            }
          ]
        }
      },
      JSONfn:  [ 'ccm.load', 'jsonfn.js' ],
      quilleditor: [ 'ccm.load', 'resources/darcula.min.css', 'resources/highlight.min.js', 'resources/quill.min.js', 'resources/quill.snow.css' ],
      preview: true, // If set to true a preview of the modified component is displayed
      show_ccm_fields: true, // If set to false the default ccm fields like 'name' are not modifiable
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function() {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * In here the newly generated component gets stored
       * @type {object}
       */
      let newComponent;

      /**
       * Holds references to the Quill editors used
       * @type {{htmlEditor: Quill}}
       */
      let quillEditors = {
        htmlEditor: null
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        const quillSettings = {
          modules: {
            syntax: true,
            toolbar: false
          },
          placeholder: '',
          theme: 'snow'
        };

        // !ANMERKUNG!: Die Funktionszuweisungen müssen in der richtigen Reihenfolge, entsprechend dem Vorkommen im Json auftauchen
        let mainElement = this.ccm.helper.html(this.html.main, {
          loadComponentClick: loadComponent,
          configEditorChosenClick: configEditorChosen,
          guidedEditingChosenClick: guidedEditingChosen,
          generateFromEditorClick: generateNewComponentFromEditor,
          generateFromGuidedClick: generateNewComponentFromGuided
        });

        this.element.appendChild(mainElement);

        /**
         * Downloads the component
         */
        function loadComponent() {
          let urlToComponent = mainElement.querySelector('#componentURL').value;

          self.ccm.load({url: urlToComponent}, function (loadedComponent) {
            newComponent = loadedComponent;

            const urlToComponentConfig = mainElement.querySelector('#componentConfigURL').value;
            const componentConfigKey = mainElement.querySelector('#componentConfigKeyURL').value;
            if (urlToComponentConfig !== '' && componentConfigKey !== '') {
              self.ccm.load({url: urlToComponentConfig}, function (data) {

                Object.keys(data[componentConfigKey.toLowerCase()]).forEach((key) => {
                  newComponent.config[key] = data[componentConfigKey.toLowerCase()][key];
                });

                displayEditingOptions();
              });
            } else {
              displayEditingOptions();
            }

          });

        }

        /**
         * Shows the options available for editing the config
         */
        function displayEditingOptions() {
          mainElement.querySelector('#chooseEditingStyle').style.display = 'block';
        }

        /**
         * The config is going to be edited with an editor
         */
        function configEditorChosen() {
          mainElement.querySelector('#chooseEditingStyle').style.display = 'none';
          displayConfigInEditor();
        }

        /**
         * Displays the config editor and the config of the loaded component in it
         */
        function displayConfigInEditor() {
          mainElement.querySelector('#areaForConfigEditing').style.display = 'block';
          mainElement.querySelector('#configEditor').value = JSON.stringify(newComponent.config, null, 2);
        }

        /**
         * Uses the modified config from the editor to generate a new component
         */
        function generateNewComponentFromEditor() {
          newComponent.config = JSON.parse(mainElement.querySelector('#configEditor').value);
          displayNewComponent();

          if (self.preview) {
            demoNewComponent();
          }
        }

        /**
         * Config is edited through a guided process
         */
        function guidedEditingChosen() {
          mainElement.querySelector('#chooseEditingStyle').style.display = 'none';
          mainElement.querySelector('#areaForGuidedEditing').style.display = 'block';
          if (self.show_ccm_fields) {
            mainElement.querySelector('#ccmDefaulConfigArea').style.display = 'block';
            fillInCCMGuidedFields();
          }
          generateComponentSpecificFields('');
        }

        /**
         * Fills in the standard ccm fields in the guided editing
         */
        function fillInCCMGuidedFields() {
          // component name
          mainElement.querySelector('#guided_nameOfNewComponent').value = newComponent.name + '-new';
          // ccm url
          mainElement.querySelector('#guided_ccmURL').value = newComponent.ccm;
        }

        /**
         * Analyses the config of a given component and generates fields to edit it
         * @param currentKey  Current key as string when called recursively
         */
        function generateComponentSpecificFields(currentKey) {
          let currentConfigPoint;
          if (currentKey === '') {
            currentConfigPoint = newComponent.config;
          } else {
            currentConfigPoint = objectByString(newComponent.config, currentKey);
          }

          for (let key in currentConfigPoint) {
            let displayBufferForKey;
            if (currentKey === '') {
              displayBufferForKey = '';
            } else {
              displayBufferForKey = currentKey + '.';
            }
            switch (typeof(currentConfigPoint[key])) {
              case 'string':
                generateNewStringField(displayBufferForKey + key, currentConfigPoint[key]);
                break;
              case 'number':
                generateNewNumberField(displayBufferForKey + key, currentConfigPoint[key]);
                break;
              case 'boolean':
                generateNewBooleanField(displayBufferForKey + key, currentConfigPoint[key]);
                break;
              case 'object':
                // Check if the object is an array
                if (Array.isArray(currentConfigPoint[key])) {
                  // check if the array is a ccm specific instruction, because those will be handled separately
                  if (String(currentConfigPoint[key][0]).startsWith('ccm.')) {
                    console.log(String(currentConfigPoint[key][0]) + ' detected !Parsing not implemented! ' + key + ' -> ' + currentConfigPoint[key] + ' (' + typeof(currentConfigPoint[key])+ ')');
                  } else {
                    generateArrayEditor(displayBufferForKey + key, currentConfigPoint[key]);
                  }
                } else if (currentConfigPoint[key] === null) {
                  console.log(String(currentConfigPoint[key][0]) + ' detected !Parsing not implemented! ' + key + ' -> ' + currentConfigPoint[key] + ' (null)');
                } else if (key === 'html') { // Check if the object is the html template
                  generateHTMLEditor();
                } else {
                  generateComponentSpecificFields(displayBufferForKey + key);
                }
                break;
              default:
                console.log('!Parsing not implemented! ' + key + ' -> ' + currentConfigPoint[key] + ' (' + typeof(newComponent.config[key])+ ')');
                break;
            }
          }
        }

        /**
         * Generates an area in which the html template can be edited
         */
        function generateHTMLEditor() {
          mainElement.querySelector('#htmlEditorCaption').style.display = 'block';
          quillEditors.htmlEditor = generateQuillEditor('htmlEditor', JSON.stringify(newComponent.config.html, null, 2), 500, 300);
        }

        /**
         * Generates an input to modify a boolean
         * @param key
         * @param value
         */
        function generateNewBooleanField(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'boolean');
          let select = document.createElement('select');
          select.id = 'guidedConfParameterBoolean_' + key;
          let optionT = document.createElement('option');
          optionT.text = 'true';
          optionT.value = 'true';
          if (value) optionT.selected = 'selected';
          select.appendChild(optionT);
          let optionF = document.createElement('option');
          optionF.text = 'false';
          optionF.value = 'false';
          if (!value) optionF.selected = 'selected';
          select.appendChild(optionF);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(select);
        }

        /**
         * Generates an input to modify a string
         * @param key
         * @param value
         */
        function generateNewStringField(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'string');
          let input = document.createElement('input');
          input.value = value;
          input.id = 'guidedConfParameterString_' + key;
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(input);
        }

        /**
         * Generates an input to modify a number
         * @param key
         * @param value
         */
        function generateNewNumberField(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'number');
          let input = document.createElement('input');
          input.value = value;
          input.id = 'guidedConfParameterNumber_' + key;
          input.type = 'number';
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(input);
        }

        /**
         * Generates an editor for arrays
         * @param key
         * @param value
         */
        function generateArrayEditor(key, value) {
          let typeInArray = checkTypeOfArray(value);
          switch (typeInArray) {
            case 'string':
              generateArrayEditorStrings(key, value);
              break;
            case 'object':
              for (let i = 0; i < value.length; i++) {
                generateComponentSpecificFields(key + `[${i}]`);
              }
              break;
            default:
              console.log('Array editor for ' + typeInArray + ' not yet implemented.');
              break;
          }
        }

        /**
         * Return the type that all elements of the array have in common
         * @param array
         * @returns {string} Type
         */
        function checkTypeOfArray (array) {
          let numberOfElements = array.length;
          let returnType = 'undefined';
          let typesInArray = {
            "string": 0,
            "number": 0,
            "boolean": 0,
            "object": 0
          };
          array.forEach(function (element) {
            switch (typeof(element)) {
              case 'string':
                typesInArray.string++;
                break;
              case 'number':
                typesInArray.number++;
                break;
              case 'boolean':
                typesInArray.boolean++;
                break;
              case 'object':
                typesInArray.object++;
                break;
              default:
                break;
            }
          });

          if (typesInArray.string === numberOfElements) {
            returnType = 'string';
          } else if (typesInArray.number === numberOfElements) {
            returnType = 'number';
          } else if (typesInArray.boolean === numberOfElements) {
            returnType = 'boolean';
          } else if (typesInArray.object === numberOfElements) {
            returnType = 'object';
          }

          return returnType;
        }

        /**
         * Generates an editor for arrays containing strings
         * @param key
         * @param array
         */
        function generateArrayEditorStrings(key, array) {
          generateCaptionForComponentSpecificField(key, array, 'Array<string>');
          let stringArrayInputs = document.createElement('div');
          stringArrayInputs.id = 'GuidedArrayStringList_' + key;
          array.forEach(function (element) {
            let input = document.createElement('input');
            input.value = element;
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };
            let htmlBreak = document.createElement('br');
            stringArrayInputs.appendChild(input);
            stringArrayInputs.appendChild(deleteButton);
            stringArrayInputs.appendChild(htmlBreak);
          });
          let addButton = document.createElement('button');
          addButton.innerHTML = '+';
          addButton.onclick = function () {
            let input = document.createElement('input');
            input.value = '';
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };
            let htmlBreak = document.createElement('br');
            this.previousElementSibling.appendChild(input);
            this.previousElementSibling.appendChild(deleteButton);
            this.previousElementSibling.appendChild(htmlBreak);
          };
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(stringArrayInputs);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(addButton);
        }

        /**
         * Generates a caption for component specific fields
         * @param key
         * @param value
         * @param type  String of the datatype (eg. 'string')
         */
        function generateCaptionForComponentSpecificField(key, value, type) {
          const caption = document.createElement('div');
          caption.innerHTML = key + ':';

          const helpButton = document.createElement('button');
          helpButton.innerHTML = '?';
          helpButton.onclick = function () {
            if (this.nextElementSibling) return; // Only one help text should be displayed
            const helpText = document.createElement('div');
            helpText.style.width = '500px';
            helpText.style.borderStyle = 'groove';
            helpText.style.borderWidth = '2px';
            helpText.innerHTML = generateDocumentationForConfigField(key, value, type);
            caption.append(helpText);
          };

          caption.append(helpButton);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(caption);
        }

        /**
         * Generates a documentation to help the user modify a field
         * @param key
         * @param value
         * @param type  String of the datatype (eg. 'string')
         * @returns {string}
         */
        function generateDocumentationForConfigField(key, value, type) {
          let helpText = '';

          // TODO: Erstmal noch schauen, ob für den key eine Doku existiert, dann erst über das switch den type auslesen
          // Das Auslesen der Doku kann ich wieder mit der Hilfsfunktion "objectByString" erledigen. Ich brauche aber erstmal eine Komponente mit Doku um das zu testen

          switch (type) {
            case 'string':
              helpText = `
                !Die Komponente hat dieses Feld nicht dokumentiert. Die folgenden Hinweise sind allgemein und beziehen sich nur auf den aktuellen Datentyp des Feldes. Orientieren Sie sich bei der Modifikation an dem aktuellen Wert!<br>
                <b><u>Datentyp:</u></b> String<br>
                <b><u>Beschreibung:</u></b> In diesem Feld kann ein beliebiger Text eingegeben werden.
              `;
              break;
            case 'number':
              helpText = `
                !Die Komponente hat dieses Feld nicht dokumentiert. Die folgenden Hinweise sind allgemein und beziehen sich nur auf den aktuellen Datentyp des Feldes. Orientieren Sie sich bei der Modifikation an dem aktuellen Wert!<br>
                <b><u>Datentyp:</u></b> Number<br>
                <b><u>Beschreibung:</u></b> In diesem Feld kann eine beliebige Zahl eingegeben werden.
              `;
              break;
            case 'boolean':
              helpText = `
                !Die Komponente hat dieses Feld nicht dokumentiert. Die folgenden Hinweise sind allgemein und beziehen sich nur auf den aktuellen Datentyp des Feldes. Orientieren Sie sich bei der Modifikation an dem aktuellen Wert!<br>
                <b><u>Datentyp:</u></b> Boolean<br>
                <b><u>Beschreibung:</u></b> Über das Drop-Down Menü können die Werte <em>true</em> und <em>false</em> eingestellt werden.
              `;
              break;
            default:
              helpText = "Keine Hilfe verfügbar."
          }
          return helpText;
        }

        /**
         * Generates a new component from the guided process
         */
        function generateNewComponentFromGuided() {
          if (self.show_ccm_fields) {
            // name
            newComponent.name = mainElement.querySelector('#guided_nameOfNewComponent').value;
            // ccm url
            newComponent.ccm = mainElement.querySelector('#guided_ccmURL').value;
          }
          // html template
          newComponent.config.html = JSON.parse(quillEditors.htmlEditor.getText());
          // custom fields can be inputs
          let customFields = mainElement.querySelectorAll('input');
          for (let i = 0; i < customFields.length; i++) {
            // set string parameters
            if (customFields[i].id.startsWith('guidedConfParameterString_')) {
              let keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, customFields[i].value);
            }
            // set number parameters
            if (customFields[i].id.startsWith('guidedConfParameterNumber_')) {
              let keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, parseInt(customFields[i].value));
            }
          }
          // custom fields can be selects
          let customFieldsSelect = mainElement.querySelectorAll('select');
          for (let i = 0; i < customFieldsSelect.length; i++) {
            // set boolean parameters
            if (customFieldsSelect[i].id.startsWith('guidedConfParameterBoolean_')) {
              let keyToChange = customFieldsSelect[i].id.slice(27);
              setNewConfigValue(keyToChange, (customFieldsSelect[i].value === 'true'));
            }
          }
          // search for custom arrays in divs
          let potentialCustomArrays = mainElement.querySelectorAll('div');
          for (let i = 0; i < potentialCustomArrays.length; i ++) {
            // Set new string array in config
            if (potentialCustomArrays[i].id.startsWith('GuidedArrayStringList_')) {
              let keyToChange = potentialCustomArrays[i].id.slice(22);
              let newConfigArray = [];
              let children = potentialCustomArrays[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'INPUT') {
                  newConfigArray.push(children[j].value);
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            }
          }

          displayNewComponent();

          if (self.preview) {
            demoNewComponent();
          }
        }

        /**
         * The new component is displayed in a textarea
         */
        function displayNewComponent() {
          mainElement.querySelector('#newComponentDisplayLabel').style.display = 'block';
          mainElement.querySelector('#newComponentDisplay').style.display = 'block';
          mainElement.querySelector('#newComponentConfigDisplayLabel').style.display = 'block';
          mainElement.querySelector('#newComponentConfigDisplay').style.display = 'block';

          mainElement.querySelector('#newComponentDisplay').value = generateNewComponentCode(newComponent);

          // TODO: Diese Ausgabe könnte mit z.B. Funktionen probleme machen (Lösung: Auch hier JSONfn mit Regulären Ausdrücken verwenden)
          mainElement.querySelector('#newComponentConfigDisplay').value = JSON.stringify(newComponent.config, null, 2);
        }

        /**
         * Returns the new code of the modified component
         * @param newComponentObject The Object to generate the code from
         * @returns {string}
         */
        function generateNewComponentCode(newComponentObject) {
          /**
           * 1.replace: Newlines will be visible in the textarea
           * 2.replace: Removes quotation marks from functions
           * 3.replace: Fixes broken regular expressions
           * 4.replace: Fixes broken strings (\" to ")
           */
          let innerPartOfCompoment = JSONfn.stringify(newComponentObject).replace(/\\n/g, '\r\n').replace(/"function([^]*)}"/g, 'function$1}').replace(/\\\\\//g, '\\/').replace(/\\"/g, '"');

          const componentBeginning = '{\n' +
            '\n' +
            '  const component = ';
          const componentEnding = ';\n' +
            '\n' +
            '  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}\n' +
            '}';

          return componentBeginning + innerPartOfCompoment + componentEnding;
        }

        /**
         * Creates a demo of the new component
         */
        function demoNewComponent() {
          // delete current demo
          const oldDemoComponent = document.querySelector('[data-demotype="isDemoComponent"]');
          if (oldDemoComponent) oldDemoComponent.outerHTML = '';

          // Cloning the new component to give it a different name for the demo
          const demoNewComponent = JSONfn.parse(JSONfn.stringify(newComponent));
          const newComponentName = Math.random().toString(36).substr(2, 5);
          demoNewComponent.name = newComponentName;

          const demoHtmlTag = document.createElement('ccm-' + newComponentName);
          demoHtmlTag.setAttribute('data-demotype', 'isDemoComponent');
          document.body.appendChild(demoHtmlTag);

          eval(generateNewComponentCode(demoNewComponent));
        }

        /**
         * Generates a Quill Editor for code
         * @param divID   Id of the div, where the editor should be placed
         * @param content String of content to place inside the editor
         * @param width   Width of the editor
         * @param height  Height of the editor
         * @returns {Quill} Returns a reference to the editor
         */
        function generateQuillEditor(divID, content, width, height) {
          mainElement.querySelector('#' + divID).style.width = width + "px";
          mainElement.querySelector('#' + divID).style.height = height + "px";

          const quillEditor = new Quill(mainElement.querySelector('#' + divID), quillSettings);

          quillEditor.setText(content);
          quillEditor.formatText(0, content.length + 1, 'code-block', true);

          return quillEditor;
        }

        // https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
        function objectByString(o, s) {
          s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
          s = s.replace(/^\./, '');           // strip a leading dot
          let a = s.split('.');
          for (let i = 0, n = a.length; i < n; ++i) {
            let k = a[i];
            if (k in o) {
              o = o[k];
            } else {
              return;
            }
          }
          return o;
        }

        // https://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
        function setNewConfigValue(path, value) {
          let schema = newComponent.config;
          let pList = path.split('.');
          let len = pList.length;
          for(let i = 0; i < len-1; i++) {
            let elem = pList[i];
            schema = objectByString(schema, elem);
          }

          schema[pList[len-1]] = value;
        }

        if ( callback ) callback();
      };

      /**
       * Returns the new configuration for the component
       * @returns {object} configuration for component
       */
      this.getValue = () => {
        return newComponent.config;
      }
    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}

}
