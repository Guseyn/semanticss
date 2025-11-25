export default class ESessionStorageValue extends HTMLElement {
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
    // exactly same behavior as before
    this.name = this.getAttribute('name')

    this.value = () => {
      return localStorage.getItem(
        this.getAttribute('data-key')
      )
    }
  }
}

customElements.define('e-session-storage-value', ESessionStorageValue)
