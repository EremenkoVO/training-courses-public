<template>
  <label :class="classInput">
    <input
      placeholder=" "
      :type="type"
      :required="isRequired"
      v-model="localModel"
      @input="handleInput"
    />
    <span class="label">{{ title }} <span v-show="isRequired">*</span></span>
    <div class="helper" v-show="helper">
      <em>{{ helper }}</em>
    </div>
    <div class="error" v-show="isError">{{ error }}</div>
  </label>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      required: true,
    },

    isError: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: '',
    },

    classInput: {
      type: String,
      default: 'has-float-label',
    },

    helper: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    localModel: '',
  }),
  methods: {
    handleInput() {
      this.$emit('update:modelValue', this.localModel);
    },
  },
};
</script>

<style scoped>
.has-float-label {
  display: block;
  position: relative;
  margin-bottom: 16px;
}

.has-float-label input:hover:not(:disabled):not(:focus) {
  border-bottom: 2px solid #1e1e1e !important;
}
.has-float-label input[value=''] {
  border-top: 2px solid #1e1e1e !important;
}

.has-float-label input:hover:invalid:not(:placeholder-shown):not(:focus) {
  border-bottom: 2px solid #ff1744 !important;
}

.has-float-label input:focus {
  border-bottom: 2px solid #2979ff;
  transition: all 0.2s;
}

.has-float-label input:invalid:not(:focus) {
  border-bottom: 2px solid #ff1744;
}

.has-float-label input:placeholder-shown:not(:focus) {
  border-bottom: 2px solid #8a8a8a;
}

/*.has-float-label input:-moz-ui-invalid {
	border-bottom:2px solid red !important;
}
.has-float-label input:-moz-ui-invalid:not(:placeholder-shown) ~ .label {
	color:red !important;
}*/

.has-float-label input:disabled {
  border-bottom: 2px dotted #8a8a8a !important;
  pointer-events: none;
  background-color: inherit;
}

.has-float-label input {
  font-size: inherit;
  padding: 16px 0 8px 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background-color: initial;
  color: #2c2c2c;
  caret-color: #2979ff;
  border-bottom: 2px solid #8a8a8a;
}

input {
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.15;
  margin: 0;
  outline: none;
  width: 100%;
}

.has-float-label input:placeholder-shown:not(:focus) + .label {
  font-size: 16px;
  top: 20px;
  /* bottom:-8px; */
  color: #838383;
}

.has-float-label label,
.has-float-label > .label {
  position: absolute;
  left: 0;
  top: 0;
  cursor: text;
  font-size: 12px;
  color: #6d6d6d;
  transition: all 0.2s;
  pointer-events: none;
}

.has-float-label input:invalid ~ .label {
  color: #ff1744;
}

.has-float-label input:focus ~ .label {
  color: #2979ff;
}

.has-float-label input:invalid:not(:focus):not(:placeholder-shown) ~ .error {
  display: block;
}
.error {
  color: #ff1744;
  display: none;
}

.has-float-label input:invalid:not(:focus):not(:placeholder-shown) ~ .helper {
  display: none;
}
.helper {
  display: block;
  color: #6d6d6d;
}

.helper,
.error {
  font-size: 12px;
  padding-top: 8px;
  line-height: 1;
}

a {
  text-decoration: none;
}

a:visited input:invalid:not(:focus) {
  border-bottom: 2px solid red !important;
}

a:visited .helper {
  color: #eee;
}
/*a {
  background-color: white;
  border: 1px solid white;
}

a:visited {
  background-color: yellow;
  border-color: hotpink;
  color: hotpink;
}*/
</style>
