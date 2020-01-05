<template>
  <div class="vue-easymde">
    <textarea
      class="vue-easymde-textarea"
      :name="name"
      :value="modelVal"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import EasyMDE from 'easymde'
// eslint-disable-next-line import/extensions
import marked from 'marked'

import 'easymde/dist/easymde.min.css'

export default {
  name: 'vue-easymde',
  props: {
    value: {
      type: String,
      default: ''
    },
    autoinit: {
      type: Boolean,
      default() {
        return true
      }
    },
    configs: {
      type: Object,
      default() {
        return {}
      }
    },
    highlight: {
      type: Boolean,
      default() {
        return false
      }
    },
    name: {
      type: String,
      default: ''
    },
    previewClass: {
      type: String,
      default: ''
    },
    previewRender: {
      type: Function,
      default: null
    },
    sanitize: {
      type: Boolean,
      default() {
        return false
      }
    },
    toolbar: {
      type: Array,
      default: null
    },
    toolbarAdditionalButtons: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    modelVal: ''
  }),
  watch: {
    value(val) {
      if (this.isValueUpdateFromInner) {
        this.isValueUpdateFromInner = false
        return
      }

      this.easymde.value(val)
      this.modelVal = val
    }
  },
  deactivated() {
    const editor = this.easymde
    if (!editor)
      return

    const isFullScreen = editor.codemirror.getOption("fullScreen")
    if (isFullScreen)
      editor.toggleFullScreen()
  },
  destroyed() {
    this.easymde = null
  },
  mounted() {
    if (this.autoinit)
      this.initialize()
  },
  methods: {
    addPreviewClass(className) {
      const wrapper = this.easymde.codemirror.getWrapperElement()
      const preview = document.createElement('div')
      wrapper.nextSibling.className += ` ${className}`
      preview.className = `editor-preview ${className}`
      wrapper.appendChild(preview)
    },
    bindingEvents() {
      this.easymde.codemirror.on('change', () => {
        const val = this.easymde.value()
        this.handleInput(val)
      })
    },
    handleInput(val) {
      this.isValueUpdateFromInner = true
      this.$emit('input', val)
    },
    initialize() {
      const configs = Object.assign(
        {
          autoDownloadFontAwesome: true,
          element: this.$el.firstElementChild,
          initialValue: this.value,
          previewRender: this.previewRender,
          renderingConfig: {}
        },
        this.configs
      )

      if (configs.initialValue)
        this.$emit('input', configs.initialValue)

      if (this.highlight)
        configs.renderingConfig.codeSyntaxHighlighting = true

      configs.toolbar = this.toolbar
      configs.toolbarAdditionalButtons = this.toolbarAdditionalButtons

      marked.setOptions({ sanitize: this.sanitize })

      this.easymde = new EasyMDE(configs)

      const className = this.previewClass || ''
      this.addPreviewClass(className)
      this.bindingEvents()
    }
  }
}
</script>

<style>
.vue-easymde .markdown-body {
  padding: 0.5em;
}
.vue-easymde .editor-preview-active,
.vue-easymde .editor-preview-active-side {
  display: block;
}

.editor-toolbar {
  color: black;
}
</style>
