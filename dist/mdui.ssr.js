'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = vue.defineComponent({
  name: "MdInputText",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInputChange: function onInputChange(event) {
      var target = event.target;
      this.$emit("update:modelValue", target.value);
    }
  },
  computed: {
    isInputFilled: function isInputFilled() {
      return this.modelValue !== null && this.modelValue.toString().length > 0;
    }
  }
});function render(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock("input", {
    type: "text",
    class: ['md-input-text md-component', {
      'md-filled': _ctx.isInputFilled
    }],
    value: _ctx.modelValue,
    onInput: _cache[1] || (_cache[1] = function () {
      return _ctx.onInputChange && _ctx.onInputChange.apply(_ctx, arguments);
    })
  }, null, 42, ["value"]);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = ".md-input-text {\n  margin: 0;\n  padding: 0.5rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 1rem;\n  color: #495057;\n  background: #ffffff;\n  border: 1px solid #ced4da;\n  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;\n  appearance: none;\n}\n.md-input-text:focus {\n  outline: 0 none;\n  outline-offset: 0;\n  box-shadow: 0 0 0 0.2rem #a6d5fa;\n  border-color: #2196F3;\n}\n.md-fluid .md-input-text {\n  width: 100%;\n}\n\n/* InputGroup */\n.md-input-group {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.md-input-group-addon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.md-input-group .md-float-label {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.md-input-group .md-input-text,\n.md-fluid .md-input-group .md-input-text,\n.md-input-group .md-inputwrapper,\n.md-fluid .md-input-group .md-input {\n  flex: 1 1 auto;\n  width: 1%;\n}\n\n/* Floating Label */\n.md-float-label {\n  display: block;\n  position: relative;\n}\n.md-float-label label {\n  position: absolute;\n  pointer-events: none;\n  top: 50%;\n  margin-top: -0.5rem;\n  transition-property: all;\n  transition-timing-function: ease;\n  line-height: 1;\n}\n.md-float-label textarea ~ label {\n  top: 1rem;\n}\n.md-float-label input:focus ~ label,\n.md-float-label input.md-filled ~ label,\n.md-float-label textarea:focus ~ label,\n.md-float-label textarea.md-filled ~ label,\n.md-float-label .md-inputwrapper-focus ~ label,\n.md-float-label .md-inputwrapper-filled ~ label {\n  top: -0.75rem;\n  font-size: 12px;\n}\n.md-float-label .input:-webkit-autofill ~ label {\n  top: -20px;\n  font-size: 12px;\n}\n.md-input-icon-left,\n.md-input-icon-right {\n  position: relative;\n  display: inline-block;\n}\n.md-input-icon-left > i,\n.md-input-icon-right > i {\n  position: absolute;\n  top: 50%;\n  margin-top: -0.5rem;\n}\n.md-fluid .md-input-icon-left,\n.md-fluid .md-input-icon-right {\n  display: block;\n  width: 100%;\n}\n.md-float-label > label {\n  left: 0.5rem;\n  color: #6c757d;\n  transition-duration: 0.2s;\n}";
styleInject(css_248z);script.render = render;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,MdInputText: script});var install = function installMdui(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,MdInputText: script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    var key = componentName;
    var val = component;
    install[key] = val;
  }
});module.exports=install;