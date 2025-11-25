export default class EFormArray extends HTMLElement {
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
    const name = this.getAttribute('name')
    if (name) {
      this.name = name
    }
  }
}

customElements.define('e-form-array', EFormArray)
