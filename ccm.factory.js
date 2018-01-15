/**
 * @overview ccm component for factory
 * @author Leon Eck <leon.eck@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (0.1.0)
 */


{

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'factory',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/version/ccm-13.1.0.js',

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
              "id": "componentSelector",
              "style": "display: none;",
              "inner": [
                {
                  "inner": "URL der Komponente:<br>%currentUrl%resources/test_components/ccm.navmenu.js<br>%currentUrl%resources/test_components/ccm.kanban_card.js<br>%currentUrl%resources/test_components/ccm.game_chooser.js<br>%currentUrl%resources/test_components/ccm.form.js<br>%currentUrl%resources/test_components/ccm.teambuild_builder.js<br>%currentUrl%resources/test_components/ccm.radar_chart.js<br>%currentUrl%resources/test_components/ccm.radar_chart_documented.js<br>%currentUrl%resources/test_components/ccm.solutions_view.js<br>"
                },
                {
                  "tag": "input",
                  "id": "componentURL",
                  "size": "70",
                  "value": "%currentUrl%resources/test_components/ccm.kanban_card.js"
                },
                {
                  "inner": "URL der Config Datei (leer lassen, wenn nicht vorhanden):<br>%currentUrl%resources/test_components/configs.js"
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
                }
              ]
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
                  "id": "innerConfigEditorArea",
                  "inner": [
                    {
                      "inner": "Config"
                    }
                  ]
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
                          "id": "ccmUrlEditor",
                          "inner": [
                            "URL von CCM: ",
                            {
                              "tag": "button",
                              "inner": "?",
                              "onclick": "%showHelpForCCMURL%"
                            },
                          ]
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
      JSONfn:  [ 'ccm.load', 'js/jsonfn.js' ],
      preview: true, // If set to true a preview of the modified component is displayed
      show_ccm_fields: true, // If set to false the default ccm fields like 'name' are not modifiable
      use_ace_for_editing: true, // If set to false, textareas are used for editing
      url_to_modify: '', // Specify a url to a component that should be modified
      external_config: '', // Specify an external config file for the component that should be modified
      key_in_external_config: '' // Specify the key in the external component that should be modified
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
       * In here the newly generated component gets stored.
       * This variable is initialized, so that the 'getValue' function returns a usable object
       * @type {object}
       */
      let newComponent = {
        config: {

        }
      };

      /**
       * Holds references to the code editors used
       */
      let codeEditors = {
        configEditor: null,
        htmlEditor: null,
        functionEditors: {

        },
        arrayMultipleTypesEditors: {

        }
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        /**
         * Detect if Firefox is used and switch of ace editor, due to a Bug, that the editor is not displayed in Firefox
         */
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
          self.use_ace_for_editing = false;
        }

        /**
         * Polyfills webcomponent support if necessary and only if they are used
         * Source: https://www.webcomponents.org/polyfills
         */
        if (self.use_ace_for_editing) {
          if ('registerElement' in document
            && 'import' in document.createElement('link')
            && 'content' in document.createElement('template')) {
            // platform is good!
          } else {
            // polyfill the platform!
            let e = document.createElement('script');
            e.src = '/js/webcomponents-lite.js';
            document.body.appendChild(e);
          }
        }

        /**
         * Import ace editor as custom element
         * @type {HTMLLinkElement}
         */
        if (self.use_ace_for_editing) {
          let aceImportLink = document.createElement('link');
          aceImportLink.rel = 'import';
          aceImportLink.href = 'js/juicy-ace-editor.html';
          document.head.appendChild(aceImportLink);
        }

        let mainElement = this.ccm.helper.html(this.html.main, {
          currentUrl: window.location.href,
          loadComponentClick: loadComponent,
          configEditorChosenClick: configEditorChosen,
          guidedEditingChosenClick: guidedEditingChosen,
          generateFromEditorClick: generateNewComponentFromEditor,
          showHelpForCCMURL: showHelpForCCMURL,
          generateFromGuidedClick: generateNewComponentFromGuided
        });

        this.element.appendChild(mainElement);

        /**
         * When a component is specified go directly to the load function otherwise show inputs to specify a component
         */
        if (self.url_to_modify !== '') {
          loadComponent();
        } else {
          mainElement.querySelector('#componentSelector').style.display = 'block';
        }

        /**
         * Downloads the component
         */
        function loadComponent() {
          let urlToComponent = '';
          let urlToComponentConfig = '';
          let componentConfigKey = '';
          if (self.url_to_modify) {
            urlToComponent = self.url_to_modify;
            urlToComponentConfig = self.external_config;
            componentConfigKey = self.key_in_external_config;
          } else {
            urlToComponent = mainElement.querySelector('#componentURL').value;
            urlToComponentConfig = mainElement.querySelector('#componentConfigURL').value;
            componentConfigKey = mainElement.querySelector('#componentConfigKeyURL').value;
          }

          self.ccm.load({url: urlToComponent}, function (loadedComponent) {
            newComponent = self.ccm.helper.clone(loadedComponent);
            if (!newComponent.config) newComponent.config = {};
            delete newComponent.config.ccm; //Removes ccm references from the configuration


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
          mainElement.querySelector('#componentSelector').style.display = 'none';
          mainElement.querySelector('#chooseEditingStyle').style.display = 'block';
        }

        /**
         * The config is going to be edited with an editor
         */
        function configEditorChosen() {
          // TODO: This is here to trigger a new height calculation in W2C. But this should not be necessary. W2C should automatically adjust the height. Also this doesn't work if new vertical space is dynamically added inside the factory e.g. when adding elements to arrays.
          if (self.onchange) self.onchange(self);

          mainElement.querySelector('#chooseEditingStyle').style.display = 'none';
          displayConfigInEditor();
        }

        /**
         * Displays the config editor and the config of the loaded component in it
         */
        function displayConfigInEditor() {
          mainElement.querySelector('#areaForConfigEditing').style.display = 'block';
          codeEditors.configEditor = generateCodeEditor('innerConfigEditorArea', JSON.stringify(newComponent.config, null, 2), 600, 350, 'json');
        }

        /**
         * Uses the modified config from the editor to generate a new component
         */
        function generateNewComponentFromEditor() {
          newComponent.config = JSON.parse(codeEditors.configEditor.getValue());
          displayNewComponent();

          if (self.preview) {
            demoNewComponent();
          }
        }

        /**
         * Config is edited through a guided process
         */
        function guidedEditingChosen() {
          // TODO: This is here to trigger a new height calculation in W2C. But this should not be necessary. W2C should automatically adjust the height. Also this doesn't work if new vertical space is dynamically added inside the factory e.g. when adding elements to arrays.
          if (self.onchange) self.onchange(self);

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
                    generateCCMTypeField(displayBufferForKey + key, currentConfigPoint[key]);
                  } else {
                    generateArrayEditor(displayBufferForKey + key, currentConfigPoint[key]);
                  }
                } else if (currentConfigPoint[key] === null) {
                  generateNullField(displayBufferForKey + key, currentConfigPoint[key]);
                } else if (key === 'html') { // Check if the object is the html template
                  generateHTMLEditor();
                } else {
                  generateComponentSpecificFields(displayBufferForKey + key);
                }
                break;
              case 'function':
                generateNewFunctionField(displayBufferForKey + key, currentConfigPoint[key]);
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
          codeEditors.htmlEditor = generateCodeEditor('htmlEditor', JSON.stringify(newComponent.config.html, null, 2), 500, 300, 'json');
        }

        /**
         * Generates an input to modify ccms own types
         * @param key
         * @param value
         */
        function generateCCMTypeField(key, value) {
          const ccmDataType = value[0];
          switch (ccmDataType) {
            case 'ccm.load':
              if (value.length === 2) { // The ccm load editor only supports editing of one load element
                generateCCMLoadEditor(key, value);
              } else {
                generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              }
              break;
            case 'ccm.module':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.component':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.instance':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.proxy':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.store':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.get':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.set':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            case 'ccm.del':
              generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType);
              break;
            default:
              console.log('Parsing of the ccm datatype ' + ccmDataType + ' not implemented!');
          }
        }

        /**
         * Generates an input to freely modify ccm datatypes
         * @param key
         * @param value
         * @param ccmDataType
         */
        function generateAdvancedEditorForCCMDataTypes(key, value, ccmDataType) {
          generateCaptionForComponentSpecificField(key, value, ccmDataType);
          const textAreaForEditing = createTextAreaForEditingAdvancedCCMTypes(key, value);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(textAreaForEditing);
        }

        /**
         * Generates an input for ccm load
         * @param key
         * @param value
         */
        function generateCCMLoadEditor(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'ccm.load');
          const caption = document.createElement('span');
          caption.innerHTML = 'Value: ';
          const input = document.createElement('input');
          input.id = 'guidedConfParameterCCMTypeLoad_' + key;
          input.value = value[1];
          const advancedButton = document.createElement('button');
          advancedButton.innerHTML = 'Advanced Editor';
          advancedButton.onclick = function () {
            caption.outerHTML = '';
            input.outerHTML = '';
            input.id = input.id.slice(5); // invalidates id

            const textAreaForEditing = createTextAreaForEditingAdvancedCCMTypes(key, value);
            advancedButton.previousElementSibling.appendChild(document.createElement('br'));
            advancedButton.previousElementSibling.appendChild(textAreaForEditing);
            advancedButton.outerHTML = '';
          };

          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(caption);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(input);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(advancedButton);
        }

        /**
         * Creates a text area to edit ccm datatypes
         * @param key
         * @param value
         * @returns {HTMLTextAreaElement}
         */
        function createTextAreaForEditingAdvancedCCMTypes(key, value) {
          const textAreaForEditing = document.createElement('textarea');
          textAreaForEditing.id = 'guidedConfParameterCCMTypeAdvanced_' + key;
          textAreaForEditing.rows = 5;
          textAreaForEditing.cols = 50;
          textAreaForEditing.value = JSON.stringify(value, null, 2);

          return textAreaForEditing;
        }

        /**
         * Generates an input to modify functions
         * @param key
         * @param value
         */
        function generateNewFunctionField(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'function');
          const newDiv = document.createElement('div');
          newDiv.id = 'guidedConfParameterFunction_' + key;
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(newDiv);
          const functionEditor = generateCodeEditor('guidedConfParameterFunction_' + key, value.toString(), 500, 300, 'javascript');
          codeEditors.functionEditors['guidedConfParameterFunction_' + key] = functionEditor;
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
         * Generates an input to display null values but not to modify them
         * @param key
         * @param value
         */
        function generateNullField(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'null');
          const input = document.createElement('input');
          input.value = 'null';
          input.disabled = true;
          input.id = 'guidedConfParameterNull_' + key;
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
              generateCaptionForComponentSpecificField(key, value, 'Array<string>');
              generateGeneralArrayEditor(key, value, 'string');
              break;
            case 'object':
              for (let i = 0; i < value.length; i++) {
                generateComponentSpecificFields(key + `[${i}]`);
              }
              break;
            case 'number':
              generateCaptionForComponentSpecificField(key, value, 'Array<number>');
              generateGeneralArrayEditor(key, value, 'number');
              break;
            case 'boolean':
              generateCaptionForComponentSpecificField(key, value, 'Array<boolean>');
              generateGeneralArrayEditor(key, value, 'boolean');
              break;
            case 'undefined':
              // Array probably consist of multiple types
              generateArrayEditorMultipleTypes(key, value);
              break;
            default:
              console.log('Array editor for ' + typeInArray + ' not yet implemented.');
              break;
          }
        }

        /**
         * Generates an editor for arrays with multiple types
         * @param key
         * @param value
         */
        function generateArrayEditorMultipleTypes(key, value) {
          generateCaptionForComponentSpecificField(key, value, 'Array');
          const wrapperDiv = document.createElement('div');
          wrapperDiv.id = 'guidedConfParameterArrayMultipleTypes_' + key;
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(wrapperDiv);
          codeEditors.arrayMultipleTypesEditors['guidedConfParameterArrayMultipleTypes_' + key] = generateCodeEditor('guidedConfParameterArrayMultipleTypes_' + key, JSON.stringify(value, null, 2), 500, 300, 'json');
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
         * Generates an array editor for the specified type
         * @param key
         * @param array
         * @param type  Options: ['string', 'number', 'boolean']
         */
        function generateGeneralArrayEditor(key, array, type) {
          const arrayInputWrapper = document.createElement('div');
          if (type === 'string') {
            arrayInputWrapper.id = 'GuidedArrayStringList_' + key;
          } else if (type === 'number') {
            arrayInputWrapper.id = 'GuidedArrayNumberList_' + key;
          } else if (type === 'boolean') {
            arrayInputWrapper.id = 'GuidedArrayBooleanList_' + key;
          }

          array.forEach(function (element) {
            let inputElement = null;
            if (type === 'string') {
              inputElement = document.createElement('input');
              inputElement.value = element;
            } else if (type === 'number') {
              inputElement = document.createElement('input');
              inputElement.value = element;
              inputElement.type = 'number';
            } else if (type === 'boolean') {
              inputElement = document.createElement('select');
              const optionT = document.createElement('option');
              optionT.text = 'true';
              optionT.value = 'true';
              if (element) optionT.selected = 'selected';
              inputElement.appendChild(optionT);
              const optionF = document.createElement('option');
              optionF.text = 'false';
              optionF.value = 'false';
              if (!element) optionF.selected = 'selected';
              inputElement.appendChild(optionF);
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.innerHTML = '+';
            addButtonInline.onclick = function () {
              let inputElement = null;

              if (type === 'string') {
                inputElement = document.createElement('input');
                inputElement.value = '';
              } else if (type === 'number') {
                inputElement = document.createElement('input');
                inputElement.value = '';
                inputElement.type = 'number';
              } else if (type === 'boolean') {
                inputElement = document.createElement('select');
                const optionT = document.createElement('option');
                optionT.text = 'true';
                optionT.value = 'true';
                inputElement.appendChild(optionT);
                const optionF = document.createElement('option');
                optionF.text = 'false';
                optionF.value = 'false';
                inputElement.appendChild(optionF);
              }

              const deleteButton = document.createElement('button');
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              let htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            let htmlBreak = document.createElement('br');
            arrayInputWrapper.appendChild(inputElement);
            arrayInputWrapper.appendChild(deleteButton);
            arrayInputWrapper.appendChild(addButtonInline);
            arrayInputWrapper.appendChild(htmlBreak);
          });
          const addButtonTop = document.createElement('button');
          addButtonTop.innerHTML = '+';
          addButtonTop.onclick = function () {
            let inputElement = null;

            if (type === 'string') {
              inputElement = document.createElement('input');
              inputElement.value = '';
            } else if (type === 'number') {
              inputElement = document.createElement('input');
              inputElement.value = '';
              inputElement.type = 'number';
            } else if (type === 'boolean') {
              inputElement = document.createElement('select');
              const optionT = document.createElement('option');
              optionT.text = 'true';
              optionT.value = 'true';
              inputElement.appendChild(optionT);
              const optionF = document.createElement('option');
              optionF.text = 'false';
              optionF.value = 'false';
              inputElement.appendChild(optionF);
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.innerHTML = '+';
            addButtonInline.onclick = function () {
              let inputElement = null;

              if (type === 'string') {
                inputElement = document.createElement('input');
                inputElement.value = '';
              } else if (type === 'number') {
                inputElement = document.createElement('input');
                inputElement.value = '';
                inputElement.type = 'number';
              } else if (type === 'boolean') {
                inputElement = document.createElement('select');
                const optionT = document.createElement('option');
                optionT.text = 'true';
                optionT.value = 'true';
                inputElement.appendChild(optionT);
                const optionF = document.createElement('option');
                optionF.text = 'false';
                optionF.value = 'false';
                inputElement.appendChild(optionF);
              }

              const deleteButton = document.createElement('button');
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              let htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            let htmlBreak = document.createElement('br');
            this.nextElementSibling.insertBefore(htmlBreak, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(addButtonInline, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(deleteButton, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(inputElement, this.nextElementSibling.childNodes[0]);
          };
          const addButtonBottom = document.createElement('button');
          addButtonBottom.innerHTML = '+';
          addButtonBottom.onclick = function () {
            let inputElement = null;

            if (type === 'string') {
              inputElement = document.createElement('input');
              inputElement.value = '';
            } else if (type === 'number') {
              inputElement = document.createElement('input');
              inputElement.value = '';
              inputElement.type = 'number';
            } else if (type === 'boolean') {
              inputElement = document.createElement('select');
              const optionT = document.createElement('option');
              optionT.text = 'true';
              optionT.value = 'true';
              inputElement.appendChild(optionT);
              const optionF = document.createElement('option');
              optionF.text = 'false';
              optionF.value = 'false';
              inputElement.appendChild(optionF);
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.innerHTML = '+';
            addButtonInline.onclick = function () {
              let inputElement = null;

              if (type === 'string') {
                inputElement = document.createElement('input');
                inputElement.value = '';
              } else if (type === 'number') {
                inputElement = document.createElement('input');
                inputElement.value = '';
                inputElement.type = 'number';
              } else if (type === 'boolean') {
                inputElement = document.createElement('select');
                const optionT = document.createElement('option');
                optionT.text = 'true';
                optionT.value = 'true';
                inputElement.appendChild(optionT);
                const optionF = document.createElement('option');
                optionF.text = 'false';
                optionF.value = 'false';
                inputElement.appendChild(optionF);
              }

              const deleteButton = document.createElement('button');
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              let htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            let htmlBreak = document.createElement('br');
            this.previousElementSibling.appendChild(inputElement);
            this.previousElementSibling.appendChild(deleteButton);
            this.previousElementSibling.appendChild(addButtonInline);
            this.previousElementSibling.appendChild(htmlBreak);
          };
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(addButtonTop);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(arrayInputWrapper);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(addButtonBottom);
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
            caption.appendChild(helpText);
          };

          caption.appendChild(helpButton);
          mainElement.querySelector('#guided_componentSpecificConfiguration').appendChild(caption);
        }

        /**
         * Generates help for the ccm url input
         */
        function showHelpForCCMURL() {
          if (this.nextElementSibling) return; // Only one help text should be displayed
          const helpText = document.createElement('div');
          helpText.style.width = '500px';
          helpText.style.borderStyle = 'groove';
          helpText.style.borderWidth = '2px';
          helpText.innerHTML = `<a href="https://github.com/akless/ccm/tree/master/version">Verfügbare CCM Versionen</a><br>
                                Die dort aufgeführten Dateien können über das folgende URL-Schema erreicht werden:<br>
                                https://akless.github.io/ccm/version/&lt;Dateiname&gt;`;
          mainElement.querySelector('#ccmUrlEditor').appendChild(helpText);
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

          if (newComponent.hasOwnProperty('meta') && newComponent.meta.hasOwnProperty('config')) {
            let helpObject = objectByString(newComponent.meta.config, key);
            if (helpObject) {
              helpText = constructHelpText(helpObject.ccm_doc_type, helpObject.ccm_doc_desc, helpObject.ccm_doc_examples);
              return helpText
            } else {
              // Try to find documentation that is available for an object higher up
              while (key.indexOf('.') > -1) {
                key = key.substr(0, key.lastIndexOf('.'));
                helpObject = objectByString(newComponent.meta.config, key);
                if (helpObject) {
                  helpText = constructHelpText(helpObject.ccm_doc_type, helpObject.ccm_doc_desc, helpObject.ccm_doc_examples);
                  return helpText;
                }
              }
            }
          }

          let helpDescription = '';


          switch (type) {
            case 'string':
              helpDescription = 'In diesem Feld kann ein beliebiger Text eingegeben werden.';
              break;
            case 'number':
              helpDescription = 'In diesem Feld kann eine beliebige Zahl eingegeben werden.';
              break;
            case 'boolean':
              helpDescription = 'Über das Drop-Down Menü können die Werte <em>true</em> und <em>false</em> eingestellt werden.';
              break;
            case 'ccm.load':
              helpDescription = '<a href="https://github.com/akless/ccm/wiki/Loading-of-Resources">Wiki</a>';
              break;
            case 'Array<boolean>':
              helpDescription = 'Über die X Buttons, können Elemente aus dem Array entfernt werden. Mit den + Buttons, können neue Elemente hinzugefügt werden.<br>Über die Drop-Down Menüs können die Werte <em>true</em> und <em>false</em> für jedes Element eingestellt werden.';
              break;
            case 'Array<number>':
              helpDescription = 'Über die X Buttons, können Elemente aus dem Array entfernt werden. Mit den + Buttons, können neue Elemente hinzugefügt werden.<br>In den Feldern kann eine beliebige Zahl eingegeben werden.';
              break;
            case 'Array<string>':
              helpDescription = 'Über die X Buttons, können Elemente aus dem Array entfernt werden. Mit den + Buttons, können neue Elemente hinzugefügt werden.<br>In den Feldern kann ein beliebiger Text eingegeben werden.';
              break;
            case 'Array':
              helpDescription = 'In diesem Array können verschiedene Datentypen gemischt werden.';
              break;
            case 'function':
              helpDescription = 'Der Code der Funktion kann bearbeitet werden.';
              break;
            case 'null':
              helpDescription = 'Dieser Wert kann nicht bearbeitet werden.';
              break;
            default:
              helpText = 'Keine Hilfe verfügbar.';
              return helpText;
          }

          helpText = `
                !Die Komponente hat dieses Feld nicht dokumentiert. Die folgenden Hinweise sind allgemein und beziehen sich nur auf den aktuellen Datentyp des Feldes. Orientieren Sie sich bei der Modifikation an dem aktuellen Wert!<br>
                <b><u>Datentyp:</u></b> ${type}<br>
                <b><u>Beschreibung:</u></b> ${helpDescription}`;

          return helpText;
        }

        /**
         * Construct a help text from the component documentation
         * @param type
         * @param desc
         * @param examples
         * @returns {string}
         */
        function constructHelpText(type, desc, examples) {
          let exampleText = '';

          if (examples) {
            examples.forEach(element => {
              Object.keys(element).forEach(key => {
                exampleText += `<i>${escapeHTML(key)}: </i> ${escapeHTML(element[key])} <br>`;
              });
            });
          }

          return `
            <b><u>Datentyp(en):</u></b> ${escapeHTML(type.join(', '))}<br>
            <b><u>Beschreibung:</u></b> ${escapeHTML(desc)}<br>
            <b><u>Beispiele:</u></b><br>
            ${exampleText}
          `;
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
          if (newComponent.config.html) {
            newComponent.config.html = JSON.parse(codeEditors.htmlEditor.getValue());
          }
          // custom fields can be inputs
          let customFields = mainElement.querySelectorAll('input');
          for (let i = 0; i < customFields.length; i++) {
            // set string parameters
            if (customFields[i].id.startsWith('guidedConfParameterString_')) {
              let keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, customFields[i].value);
            }
            // set null parameters
            if (customFields[i].id.startsWith('guidedConfParameterNull_')) {
              let keyToChange = customFields[i].id.slice(24);
              setNewConfigValue(keyToChange, null);
            }
            // set number parameters
            if (customFields[i].id.startsWith('guidedConfParameterNumber_')) {
              let keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, parseFloat(customFields[i].value));
            }
            // set ccm datatypes from simple editor
            if (customFields[i].id.startsWith('guidedConfParameterCCMTypeLoad_')) {
              let keyToChange = customFields[i].id.slice(31);
              setNewConfigValue(keyToChange, ['ccm.load', customFields[i].value]);
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
          // custom fields can be textareas
          let customFieldsTextarea = mainElement.querySelectorAll('textarea');
          for (let i = 0; i < customFieldsTextarea.length; i++) {
            // set ccm datatype parameters
            if (customFieldsTextarea[i].id.startsWith('guidedConfParameterCCMTypeAdvanced_')) {
              let keyToChange = customFieldsTextarea[i].id.slice(35);
              setNewConfigValue(keyToChange, JSON.parse(customFieldsTextarea[i].value));
            }
          }
          // search for custom config editors in divs
          let potentialCustomConfig = mainElement.querySelectorAll('div');
          for (let i = 0; i < potentialCustomConfig.length; i ++) {
            // Set new string array in config
            if (potentialCustomConfig[i].id.startsWith('GuidedArrayStringList_')) {
              let keyToChange = potentialCustomConfig[i].id.slice(22);
              let newConfigArray = [];
              let children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'INPUT') {
                  newConfigArray.push(children[j].value);
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('GuidedArrayNumberList_')) {
              let keyToChange = potentialCustomConfig[i].id.slice(22);
              let newConfigArray = [];
              let children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'INPUT') {
                  newConfigArray.push(parseFloat(children[j].value));
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('GuidedArrayBooleanList_')) {
              let keyToChange = potentialCustomConfig[i].id.slice(23);
              let newConfigArray = [];
              let children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'SELECT') {
                  newConfigArray.push(children[j].value === 'true');
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('guidedConfParameterFunction_')) {
              let keyToChange = potentialCustomConfig[i].id.slice(28);
              const newFunction = codeEditors.functionEditors[potentialCustomConfig[i].id].getValue();
              setNewConfigValue(keyToChange, eval('(' + newFunction + ')'));
            } else if (potentialCustomConfig[i].id.startsWith('guidedConfParameterArrayMultipleTypes_')) {
              let keyToChange = potentialCustomConfig[i].id.slice(38);
              const newArray = codeEditors.arrayMultipleTypesEditors[potentialCustomConfig[i].id].getValue();
              setNewConfigValue(keyToChange, JSON.parse(newArray));
            }
          }

          displayNewComponent();

          // Tell outside, that the config has changed
          if (self.onchange) self.onchange(self);

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

          mainElement.querySelector('#newComponentConfigDisplay').value = fixJSONOutput(JSONfn.stringify(newComponent.config));
        }

        /**
         * Returns the new code of the modified component
         * @param newComponentObject The Object to generate the code from
         * @returns {string}
         */
        function generateNewComponentCode(newComponentObject) {
          let innerPartOfCompoment = fixJSONOutput(JSONfn.stringify(newComponentObject));

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
         * Fixes uncompatible JSON Strings, that would not work in ccm components
         * @param brokenJSONString
         * @returns {string}
         */
        function fixJSONOutput(brokenJSONString) {
          return brokenJSONString
            .replace(/\\n/g, '\r\n') // Newlines will be visible in the textarea
            .replace(/function([^]*)}"/g, 'function$1}') // Removes quotation marks from functions
            .replace(/"function([^]*)}"/g, 'function$1}') // Removes quotation marks from functions
            .replace(/"function/g, 'function') // Removes quotation marks from functions
            .replace(/\\\\\//g, '\\/') // Fixes broken regular expressions
            .replace(/\\"/g, '"'); // Fixes broken strings (\" to ")
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
         * Generates an editor for code
         * @param divID   Id of the div, where the editor should be placed
         * @param content String of content to place inside the editor
         * @param width   Width of the editor
         * @param height  Height of the editor
         * @param type    Type of the content. Possibilities: {'javascript', 'json'}
         * @returns       Returns a reference to the editor
         */
        function generateCodeEditor(divID, content, width, height, type) {
          if (self.use_ace_for_editing) {
            const editorElement = document.createElement('juicy-ace-editor');
            editorElement.id = divID + 'attachedEditor';
            editorElement.style.width = width + 'px';
            editorElement.style.height = height + 'px';
            mainElement.querySelector('#' + divID).appendChild(editorElement);

            const editorReference = mainElement.querySelector('#' + divID + 'attachedEditor').editor;

            editorReference.setTheme('ace/theme/tomorrow');
            editorReference.getSession().setMode('ace/mode/' + type);
            editorReference.getSession().setTabSize(2);
            editorReference.getSession().setUseWrapMode(true);
            editorReference.$blockScrolling = Infinity;
            editorReference.setValue(content, 1);

            return editorReference;
          } else {
            // Fallback to textareas
            const editorElement = document.createElement('textarea');
            editorElement.id = divID + 'attachedEditor';
            editorElement.style.width = width + 'px';
            editorElement.style.height = height + 'px';
            editorElement.value = content;
            mainElement.querySelector('#' + divID).appendChild(editorElement);

            const editorReference = {
              getValue: function () {
                return editorElement.value;
              }
            };

            return editorReference;
          }
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

        // https://coderwall.com/p/ostduq/escape-html-with-javascript
        function escapeHTML(input) {
          return input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        }

        if ( callback ) callback();
      };

      /**
       * Returns the new configuration for the component
       * @returns {object} configuration for component
       */
      this.getValue = () => {
        return this.ccm.helper.clone(newComponent.config);
      }
    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}

}
