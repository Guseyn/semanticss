import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js?v=e2d7e253'

export default class EFormDynamicValue extends HTMLElement {
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
    this.style.display = 'none'
    this.name = this.getAttribute('name')
    const state = getNodeScopedState(this)
    this.value = () => {
      return evaluatedStringWithParamsFromState(
        this.getAttribute('data-bound-to'),
        state,
        this
      )
    }
  }
}

customElements.define('e-form-dynamic-value', EFormDynamicValue)
