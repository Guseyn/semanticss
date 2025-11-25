import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'

export default class EIfTemplate extends HTMLTemplateElement {
  constructor() {
    super()
    this.activated = false
  }

  connectedCallback() {
    this.addEventListener('ehtml:activated', this.onActivated, { once: true })
  }

  onActivated() {
    if (this.activated) {
      return
    }
    this.activated = true

    this.run()
  }

  run() {
    const expr = this.getAttribute('data-condition-to-display')
    if (!expr) {
      throw new Error(`<template is="e-if"> must have data-condition-to-display`)
    }

    // 1. Get inherited lexical state at this <template>
    const state = getNodeScopedState(this)

    // 2. Evaluate the list expression (JSON string)
    const evaluated = evaluatedStringWithParamsFromState(
      expr.replace(/\n/g, ' '),
      state,
      this
    )

    const show = evaluated === 'true'

    if (show) {
      this.insertContent()
    } else {
      this.remove()
    }
  }

  insertContent() {
    // Clone the <template> content
    const fragment = this.content.cloneNode(true)
    const parent = this.parentNode
    parent.insertBefore(fragment, this)
    parent.replaceChild(fragment, this)
  }
}

customElements.define('e-if', EIfTemplate, { extends: 'template' })
