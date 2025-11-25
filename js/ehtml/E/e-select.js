export default class ESelect extends HTMLSelectElement {
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

  // ─────────────────────────────────────────────
  //  Apply "value" attribute to select options
  // ─────────────────────────────────────────────
  run() {
    const value = this.getAttribute('value')

    if (value === null) {
      return
    }

    for (let i = 0; i < this.options.length; i++) {
      const opt = this.options.item(i)
      if (opt.value === value) {
        opt.selected = true
        break
      }
    }
  }
}

customElements.define('e-select', ESelect, { extends: 'select' })
