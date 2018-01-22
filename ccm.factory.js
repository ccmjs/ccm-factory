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
    ccm: 'js/ccm-13.1.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "main": {
          "id": "main",
          "class": "container",
          "inner": [
            {
              "id": "alertMessage",
              "class": "alert alert-danger",
              "style": "display: none;",
            },
            {
              "id": "componentSelector",
              "style": "display: none;",
              "inner": [
                {
                  "inner": "URL of the component:<br>%currentUrl%resources/test_components/ccm.navmenu.js<br>%currentUrl%resources/test_components/ccm.kanban_card.js<br>%currentUrl%resources/test_components/ccm.game_chooser.js<br>%currentUrl%resources/test_components/ccm.form.js<br>%currentUrl%resources/test_components/ccm.teambuild_builder.js<br>%currentUrl%resources/test_components/ccm.radar_chart.js<br>%currentUrl%resources/test_components/ccm.radar_chart_documented.js<br>%currentUrl%resources/test_components/ccm.solutions_view.js<br>"
                },
                {
                  "tag": "input",
                  "class": "form-control",
                  "id": "componentURL",
                  "size": "70",
                  "value": "%currentUrl%resources/test_components/ccm.kanban_card.js"
                },
                {
                  "inner": "URL of an external config file (optional):<br>%currentUrl%resources/test_components/configs.js"
                },
                {
                  "tag": "input",
                  "class": "form-control",
                  "id": "componentConfigURL",
                  "size": "70",
                  "value": ""
                },
                {
                  "inner": "Key inside the external config file (leave blank when no config file is used):<br>Demo"
                },
                {
                  "tag": "input",
                  "class": "form-control",
                  "id": "componentConfigKeyURL",
                  "size": "70",
                  "value": ""
                },
                {
                  "tag": "button",
                  "class": "btn btn-default",
                  "inner": "Load component",
                  "onclick": "%loadComponentClick%"
                },
                {
                  "tag": "br"
                }
              ]
            },
            {
              "id": "loadSpinner",
              "class": "spinner",
              "style": "display: none;",
              "inner": [
                {
                  "class": "bounce1"
                },
                {
                  "class": "bounce2"
                },
                {
                  "class": "bounce3"
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
                  "class": "btn btn-default",
                  "inner": "Config editor",
                  "onclick": "%configEditorChosenClick%"
                },{
                  "tag": "button",
                  "class": "btn btn-default",
                  "inner": "Guided editing mode",
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
                  "inner": [
                    {
                      "tag": "button",
                      "class": "btn btn-default",
                      "inner": "Generate new component",
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
                  "inner": "Guided editing mode for modifying the component"
                },
                {
                  "id": "ccmDefaulConfigArea",
                  "style": "display: none;",
                  "inner": [
                    {
                      "tag": "h4",
                      "inner": "CCM configuration"
                    },
                    {
                      "inner": [
                        {
                          "inner": "Name of the new component: "
                        },
                        {
                          "tag": "input",
                          "class": "form-control",
                          "id": "guided_nameOfNewComponent"
                        }
                      ]
                    },
                    {
                      "inner": [
                        {
                          "id": "ccmUrlEditor",
                          "inner": [
                            "URL of CCM: ",
                            {
                              "tag": "button",
                              "class": "btn btn-default btn-circle",
                              "inner": "?",
                              "onclick": "%showHelpForCCMURL%"
                            },
                          ]
                        },
                        {
                          "tag": "input",
                          "class": "form-control",
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
                      "inner": "Component specific configuration"
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
                  "tag": "br"
                },
                {
                  "tag": "button",
                  "class": "btn btn-default",
                  "inner": "Generate new component",
                  "onclick": "%generateFromGuidedClick%"
                }
              ]
            },
            {
              "tag": "br"
            },
            {
              "id": "newComponentDisplayLabel",
              "inner": "Code of the component:",
              "style": "display: none;"
            },
            {
              "tag": "textarea",
              "class": "form-control",
              "id": "newComponentDisplay",
              "style": "display: none;",
              "rows": 20,
              "cols": 50,
              "inner": "New component"
            },
            {
              "id": "newComponentConfigDisplayLabel",
              "inner": "New configuration:",
              "style": "display: none;"
            },
            {
              "tag": "textarea",
              "class": "form-control",
              "id": "newComponentConfigDisplay",
              "style": "display: none;",
              "rows": 20,
              "cols": 50,
              "inner": "New configuration"
            },
            {
              "tag": "br"
            },
            {
              "tag": "button",
              "class": "btn btn-default",
              "id": "downloadNewComponentButton",
              "style": "display: none;",
              "inner": "Download new component",
              "onclick": "%downloadNewComponentClick%"
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
      css: [ 'ccm.load', 'css/bootstrap.min.css', 'css/default.css' ],
      JSONfn:  [ 'ccm.load', 'js/jsonfn.js' ],
      preview: true, // If set to true a preview of the modified component is displayed
      show_ccm_fields: true, // If set to false the default ccm fields like 'name' are not modifiable
      use_ace_for_editing: true, // If set to false, textareas are used for editing
      url_to_modify: '', // Specify a url to a component that should be modified
      external_config: '', // Specify an external config file for the component that should be modified
      key_in_external_config: '', // Specify the key in the external configuration that should be modified
      display_final_component_and_config: true, // If set to false, nothing will be displayed after generating the new component
      no_bootstrap_container: false // Set to true if embedded on a site that already has a bootstrap container div
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
      const codeEditors = {
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
            const e = document.createElement('script');
            e.src = '/js/webcomponents-lite.js';
            document.body.appendChild(e);
          }
        }

        /**
         * Import ace editor as custom element
         */
        if (self.use_ace_for_editing) {
          const aceImportLink = document.createElement('link');
          aceImportLink.rel = 'import';
          aceImportLink.href = 'js/juicy-ace-editor.html';
          document.head.appendChild(aceImportLink);
        }

        /**
         * Remove the bootstrap container class if config value no_bootstrap_container is true
         */
        if (self.no_bootstrap_container) {
          this.html.main.class = '';
        }

        const mainElement = this.ccm.helper.html(this.html.main, {
          currentUrl: window.location.href,
          loadComponentClick: loadComponent,
          configEditorChosenClick: configEditorChosen,
          guidedEditingChosenClick: guidedEditingChosen,
          generateFromEditorClick: generateNewComponentFromEditor,
          showHelpForCCMURL: showHelpForCCMURL,
          generateFromGuidedClick: generateNewComponentFromGuided,
          downloadNewComponentClick: downloadNewComponent
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
          mainElement.querySelector('#alertMessage').style.display = 'none';

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

          const xhrToLoadComponent = new XMLHttpRequest();
          xhrToLoadComponent.open('GET', urlToComponent);
          xhrToLoadComponent.onreadystatechange = function() {
            if(xhrToLoadComponent.readyState === XMLHttpRequest.DONE && xhrToLoadComponent.status === 200) {
              /**
               * Store the loaded component at a different location than normal to prevent collisions
               * @type {string}
               */
              const modifiedComponentCode = xhrToLoadComponent.responseText
                .replace('window.ccm&&null===window.ccm.files[f])window.ccm.files[f]', 'true)window.loadedForFactory') // minified
                .replace('window.ccm && window.ccm.files[ f ] === null', 'true') // not minified
                .replace('window.ccm.files[ f ] = component;', 'window.loadedForFactory = component;'); // not minified

              eval(modifiedComponentCode);

              newComponent = self.ccm.helper.clone(window.loadedForFactory);
              if (typeof(newComponent) !== 'object') {
                // No ccm component was detected
                mainElement.querySelector('#alertMessage').innerHTML = 'The loaded file does not contain a valid ccm component';
                mainElement.querySelector('#alertMessage').style.display = 'block';
                return;
              }
              if (!newComponent.config) newComponent.config = {};
              delete newComponent.config.ccm; //Removes ccm references from the configuration


              if (urlToComponentConfig !== '' && componentConfigKey !== '') {
                self.ccm.load({url: urlToComponentConfig}, function (data) {

                  Object.keys(data[componentConfigKey.toLowerCase()]).forEach((key) => {
                    newComponent.config[key] = data[componentConfigKey.toLowerCase()][key];
                  });

                  if (self.use_ace_for_editing) {
                    // Delay start to give ace time to load
                    mainElement.querySelector('#loadSpinner').style.display = 'block';
                    setTimeout(displayEditingOptions, 1000);
                  }
                });
              } else {
                if (self.use_ace_for_editing) {
                  // Delay start to give ace time to load
                  mainElement.querySelector('#loadSpinner').style.display = 'block';
                  setTimeout(displayEditingOptions, 1000);
                }
              }
            }
          };
          xhrToLoadComponent.send();

        }

        /**
         * Shows the options available for editing the config
         */
        function displayEditingOptions() {
          mainElement.querySelector('#loadSpinner').style.display = 'none';
          mainElement.querySelector('#componentSelector').style.display = 'none';
          mainElement.querySelector('#chooseEditingStyle').style.display = 'block';
          if (document.createElement('juicy-ace-editor').constructor === HTMLElement) {
            // Ace was not loaded. Use fallback
            self.use_ace_for_editing = false;
          }
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

          // Tell outside, that the config has changed
          if (self.onchange) self.onchange(self);

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
          if (typeof(newComponent.ccm) === 'object') {
            mainElement.querySelector('#guided_ccmURL').value = newComponent.ccm.url;
          } else {
            mainElement.querySelector('#guided_ccmURL').value = newComponent.ccm;
          }
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
                } else if (key === 'html' || key === 'templates') { // Check if the object is the html template
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
          if (newComponent.config.html) {
            codeEditors.htmlEditor = generateCodeEditor('htmlEditor', JSON.stringify(newComponent.config.html, null, 2), 500, 300, 'json');
          } else if (newComponent.config.templates) {
            codeEditors.htmlEditor = generateCodeEditor('htmlEditor', JSON.stringify(newComponent.config.templates, null, 2), 500, 300, 'json');
          } else {
            console.log('Unsupported HTML template');
          }
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
              if (value.length === 2 && typeof(value[0]) === 'string' && typeof(value[1]) === 'string') { // The ccm load editor only supports editing of one load element
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
          input.className = 'form-control form-control-inline';
          input.id = 'guidedConfParameterCCMTypeLoad_' + key;
          input.value = value[1];
          const advancedButton = document.createElement('button');
          advancedButton.className = 'btn btn-default';
          advancedButton.innerHTML = 'Advanced editor';
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
          textAreaForEditing.className = 'form-control';
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
          const select = document.createElement('select');
          select.className = 'form-control';
          select.id = 'guidedConfParameterBoolean_' + key;
          const optionT = document.createElement('option');
          optionT.text = 'true';
          optionT.value = 'true';
          if (value) optionT.selected = 'selected';
          select.appendChild(optionT);
          const optionF = document.createElement('option');
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
          const input = document.createElement('input');
          input.className = 'form-control';
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
          input.className = 'form-control';
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
          const input = document.createElement('input');
          input.className = 'form-control';
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
          const typeInArray = checkTypeOfArray(value);
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
          const numberOfElements = array.length;
          let returnType = 'undefined';
          const typesInArray = {
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
            inputElement.className = 'form-control form-control-inline';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-default';
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.className = 'btn btn-default';
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
              inputElement.className = 'form-control form-control-inline';

              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-default';
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              const htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.className = 'btn btn-default';
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            const htmlBreak = document.createElement('br');
            arrayInputWrapper.appendChild(inputElement);
            arrayInputWrapper.appendChild(deleteButton);
            arrayInputWrapper.appendChild(addButtonInline);
            arrayInputWrapper.appendChild(htmlBreak);
          });
          const addButtonTop = document.createElement('button');
          addButtonTop.className = 'btn btn-default';
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
            inputElement.className = 'form-control form-control-inline';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-default';
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.className = 'btn btn-default';
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
              inputElement.className = 'form-control form-control-inline';

              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-default';
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              const htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.className = 'btn btn-default';
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            const htmlBreak = document.createElement('br');
            this.nextElementSibling.insertBefore(htmlBreak, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(addButtonInline, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(deleteButton, this.nextElementSibling.childNodes[0]);
            this.nextElementSibling.insertBefore(inputElement, this.nextElementSibling.childNodes[0]);
          };
          const addButtonBottom = document.createElement('button');
          addButtonBottom.className = 'btn btn-default';
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
            inputElement.className = 'form-control form-control-inline';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-default';
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function () {
              this.nextElementSibling.nextElementSibling.outerHTML = '';
              this.nextElementSibling.outerHTML = '';
              this.previousElementSibling.outerHTML = '';
              this.outerHTML = '';
            };

            const addButtonInline = document.createElement('button');
            addButtonInline.className = 'btn btn-default';
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
              inputElement.className = 'form-control form-control-inline';

              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-default';
              deleteButton.innerHTML = 'X';
              deleteButton.onclick = function () {
                this.nextElementSibling.nextElementSibling.outerHTML = '';
                this.nextElementSibling.outerHTML = '';
                this.previousElementSibling.outerHTML = '';
                this.outerHTML = '';
              };
              const htmlBreak = document.createElement('br');
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
              const newAddButtonInline = document.createElement('button');
              newAddButtonInline.className = 'btn btn-default';
              newAddButtonInline.innerHTML = '+';
              newAddButtonInline.onclick = addButtonInline.onclick;
              this.parentNode.insertBefore(newAddButtonInline, this.nextSibling);
              this.parentNode.insertBefore(deleteButton, this.nextSibling);
              this.parentNode.insertBefore(inputElement, this.nextSibling);
              this.parentNode.insertBefore(htmlBreak, this.nextSibling);
            };

            const htmlBreak = document.createElement('br');
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
          helpButton.className = 'btn btn-default btn-circle';
          helpButton.innerHTML = '?';
          helpButton.onclick = function () {
            if (this.nextElementSibling && this.nextSibling.nodeName !== 'BR') return; // Only one help text should be displayed
            const helpText = document.createElement('div');
            helpText.className = 'bs-callout bs-callout-primary';
            helpText.style.width = '500px';
            helpText.innerHTML = generateDocumentationForConfigField(key, value, type);
            caption.insertBefore(helpText, caption.children[1]);
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
          helpText.className = 'bs-callout bs-callout-primary';
          helpText.style.width = '500px';
          helpText.innerHTML = `<a href="https://github.com/akless/ccm/tree/master/version">Available ccm versions</a><br>
                                Files seen there can be accessed via the following URL-Schema:<br>
                                https://akless.github.io/ccm/version/&lt;Filename&gt;`;
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
              helpDescription = 'In this field any form of text can be typed in.';
              break;
            case 'number':
              helpDescription = 'In this field any number can be typed in.';
              break;
            case 'boolean':
              helpDescription = 'With the drop-down-menu either <em>true</em> or <em>false</em> can be selected.';
              break;
            case 'ccm.load':
              helpDescription = '<a href="https://github.com/akless/ccm/wiki/Loading-of-Resources">Wiki</a>';
              break;
            case 'Array<boolean>':
              helpDescription = 'With the X buttons elements can be deleted. With the + buttons new Elements can be added.<br>Inside the field either <em>true</em> or <em>false</em> can be selected with the drop-down-menus.';
              break;
            case 'Array<number>':
              helpDescription = 'With the X buttons elements can be deleted. With the + buttons new Elements can be added.<br>Inside the fields any number can be typed in.';
              break;
            case 'Array<string>':
              helpDescription = 'With the X buttons elements can be deleted. With the + buttons new Elements can be added.<br>Inside the fields any form of text can be typed in.';
              break;
            case 'Array':
              helpDescription = 'In this array multiple data types can be mixed.';
              break;
            case 'function':
              helpDescription = 'The code of the function can be edited.';
              break;
            case 'null':
              helpDescription = 'This value can not be changed.';
              break;
            default:
              helpText = 'No help available.';
              return helpText;
          }

          helpText = `
                !The component has not documented this field. The following are general indications for the current type of data in this field. Please orientate yourself by the current value of the field.!<br>
                <b><u>Data type:</u></b> <code>${type}</code><br>
                <b><u>Description:</u></b> ${helpDescription}`;

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
            <b><u>Data type(s):</u></b> <code>${escapeHTML(type.join(', '))}</code><br>
            <b><u>Description:</u></b> ${escapeHTML(desc)}<br>
            <b><u>Examples:</u></b><br>
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
            if (typeof(newComponent.ccm) === 'object') {
              newComponent.ccm.url = mainElement.querySelector('#guided_ccmURL').value;
              delete newComponent.ccm.integrity; // Integrity can't be guaranteed any more
            } else {
              newComponent.ccm = mainElement.querySelector('#guided_ccmURL').value;
            }
          }
          // html template
          if (newComponent.config.html) {
            newComponent.config.html = JSON.parse(codeEditors.htmlEditor.getValue());
          } else if (newComponent.config.templates) {
            newComponent.config.templates = JSON.parse(codeEditors.htmlEditor.getValue());
          }
          // custom fields can be inputs
          const customFields = mainElement.querySelectorAll('input');
          for (let i = 0; i < customFields.length; i++) {
            // set string parameters
            if (customFields[i].id.startsWith('guidedConfParameterString_')) {
              const keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, customFields[i].value);
            }
            // set null parameters
            if (customFields[i].id.startsWith('guidedConfParameterNull_')) {
              const keyToChange = customFields[i].id.slice(24);
              setNewConfigValue(keyToChange, null);
            }
            // set number parameters
            if (customFields[i].id.startsWith('guidedConfParameterNumber_')) {
              const keyToChange = customFields[i].id.slice(26);
              setNewConfigValue(keyToChange, parseFloat(customFields[i].value));
            }
            // set ccm datatypes from simple editor
            if (customFields[i].id.startsWith('guidedConfParameterCCMTypeLoad_')) {
              const keyToChange = customFields[i].id.slice(31);
              setNewConfigValue(keyToChange, ['ccm.load', customFields[i].value]);
            }
          }
          // custom fields can be selects
          const customFieldsSelect = mainElement.querySelectorAll('select');
          for (let i = 0; i < customFieldsSelect.length; i++) {
            // set boolean parameters
            if (customFieldsSelect[i].id.startsWith('guidedConfParameterBoolean_')) {
              const keyToChange = customFieldsSelect[i].id.slice(27);
              setNewConfigValue(keyToChange, (customFieldsSelect[i].value === 'true'));
            }
          }
          // custom fields can be textareas
          const customFieldsTextarea = mainElement.querySelectorAll('textarea');
          for (let i = 0; i < customFieldsTextarea.length; i++) {
            // set ccm datatype parameters
            if (customFieldsTextarea[i].id.startsWith('guidedConfParameterCCMTypeAdvanced_')) {
              const keyToChange = customFieldsTextarea[i].id.slice(35);
              setNewConfigValue(keyToChange, JSON.parse(customFieldsTextarea[i].value));
            }
          }
          // search for custom config editors in divs
          const potentialCustomConfig = mainElement.querySelectorAll('div');
          for (let i = 0; i < potentialCustomConfig.length; i ++) {
            // Set new string array in config
            if (potentialCustomConfig[i].id.startsWith('GuidedArrayStringList_')) {
              const keyToChange = potentialCustomConfig[i].id.slice(22);
              let newConfigArray = [];
              const children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'INPUT') {
                  newConfigArray.push(children[j].value);
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('GuidedArrayNumberList_')) {
              const keyToChange = potentialCustomConfig[i].id.slice(22);
              let newConfigArray = [];
              const children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'INPUT') {
                  newConfigArray.push(parseFloat(children[j].value));
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('GuidedArrayBooleanList_')) {
              const keyToChange = potentialCustomConfig[i].id.slice(23);
              let newConfigArray = [];
              const children = potentialCustomConfig[i].children;
              for (let j = 0; j < children.length; j++) {
                if (children[j].nodeName === 'SELECT') {
                  newConfigArray.push(children[j].value === 'true');
                }
              }
              setNewConfigValue(keyToChange, newConfigArray);
            } else if (potentialCustomConfig[i].id.startsWith('guidedConfParameterFunction_')) {
              const keyToChange = potentialCustomConfig[i].id.slice(28);
              const newFunction = codeEditors.functionEditors[potentialCustomConfig[i].id].getValue();
              setNewConfigValue(keyToChange, eval('(' + newFunction + ')'));
            } else if (potentialCustomConfig[i].id.startsWith('guidedConfParameterArrayMultipleTypes_')) {
              const keyToChange = potentialCustomConfig[i].id.slice(38);
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
          if (!self.display_final_component_and_config) return; // Do not display anything if disabled via config
          mainElement.querySelector('#newComponentDisplayLabel').style.display = 'block';
          mainElement.querySelector('#newComponentDisplay').style.display = 'block';
          mainElement.querySelector('#newComponentConfigDisplayLabel').style.display = 'block';
          mainElement.querySelector('#newComponentConfigDisplay').style.display = 'block';
          mainElement.querySelector('#downloadNewComponentButton').style.display = 'block';

          mainElement.querySelector('#newComponentDisplay').value = generateNewComponentCode(newComponent);

          mainElement.querySelector('#newComponentConfigDisplay').value = fixJSONOutput(JSONfn.stringify(newComponent.config));
        }

        /**
         * Returns the new code of the modified component
         * @param newComponentObject The Object to generate the code from
         * @returns {string}
         */
        function generateNewComponentCode(newComponentObject) {
          const innerPartOfCompoment = fixJSONOutput(JSONfn.stringify(newComponentObject));

          const componentBeginning = '{\n' +
            '\n' +
            '  var component = ';
          const componentEnding = ';\n' +
            '\n' +
            '  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}\n' +
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
            .replace(/(.*?)\\n/g, function (match, p1) { // Newlines will be visible in the textarea
              if (p1.endsWith('\\')) {
                return match;
              } else {
                return match.replace(/\\n/g, '\r\n');
              }
            })
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
         * Downloads the newly generated component
         */
        function downloadNewComponent() {
          const blob = new Blob( [ generateNewComponentCode(newComponent) ], { type: 'text/plain' } );
          const ankerElement = document.createElement('a');
          ankerElement.href = URL.createObjectURL(blob);
          ankerElement.download ='ccm.' + newComponent.name + '.js';

          ankerElement.style.display = 'none';
          document.body.appendChild(ankerElement);

          ankerElement.click();

          document.body.removeChild(ankerElement);
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
            editorElement.className = 'form-control';
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

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}

}
