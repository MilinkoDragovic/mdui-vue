import { defineComponent, openBlock, createBlock } from 'vue';

var script = defineComponent({
  name: "MdInputText",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInputChange(event) {
      const target = event.target;
      this.$emit("update:modelValue", target.value);
    }

  },
  computed: {
    isInputFilled() {
      return this.modelValue !== null && this.modelValue.toString().length > 0;
    }

  }
});

function render(_ctx, _cache) {
  return openBlock(), createBlock("input", {
    type: "text",
    class: ['md-input-text md-component', {
      'md-filled': _ctx.isInputFilled
    }],
    value: _ctx.modelValue,
    onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInputChange && _ctx.onInputChange(...args))
  }, null, 42, ["value"]);
}

function styleInject(css, ref) {
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
}

var css_248z = ".md-input-text {\n  margin: 0;\n  padding: 0.5rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 1rem;\n  color: #495057;\n  background: #ffffff;\n  border: 1px solid #ced4da;\n  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;\n  appearance: none;\n}\n.md-input-text:focus {\n  outline: 0 none;\n  outline-offset: 0;\n  box-shadow: 0 0 0 0.2rem #a6d5fa;\n  border-color: #2196F3;\n}\n.md-fluid .md-input-text {\n  width: 100%;\n}\n\n/* InputGroup */\n.md-input-group {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.md-input-group-addon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.md-input-group .md-float-label {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.md-input-group .md-input-text,\n.md-fluid .md-input-group .md-input-text,\n.md-input-group .md-inputwrapper,\n.md-fluid .md-input-group .md-input {\n  flex: 1 1 auto;\n  width: 1%;\n}\n\n/* Floating Label */\n.md-float-label {\n  display: block;\n  position: relative;\n}\n.md-float-label label {\n  position: absolute;\n  pointer-events: none;\n  top: 50%;\n  margin-top: -0.5rem;\n  transition-property: all;\n  transition-timing-function: ease;\n  line-height: 1;\n}\n.md-float-label textarea ~ label {\n  top: 1rem;\n}\n.md-float-label input:focus ~ label,\n.md-float-label input.md-filled ~ label,\n.md-float-label textarea:focus ~ label,\n.md-float-label textarea.md-filled ~ label,\n.md-float-label .md-inputwrapper-focus ~ label,\n.md-float-label .md-inputwrapper-filled ~ label {\n  top: -0.75rem;\n  font-size: 12px;\n}\n.md-float-label .input:-webkit-autofill ~ label {\n  top: -20px;\n  font-size: 12px;\n}\n.md-input-icon-left,\n.md-input-icon-right {\n  position: relative;\n  display: inline-block;\n}\n.md-input-icon-left > i,\n.md-input-icon-right > i {\n  position: absolute;\n  top: 50%;\n  margin-top: -0.5rem;\n}\n.md-fluid .md-input-icon-left,\n.md-fluid .md-input-icon-right {\n  display: block;\n  width: 100%;\n}\n.md-float-label > label {\n  left: 0.5rem;\n  color: #6c757d;\n  transition-duration: 0.2s;\n}";
styleInject(css_248z);

script.render = render;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MdInputText: script
});

// Import vue components

const install = function installMdui(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { script as MdInputText };
