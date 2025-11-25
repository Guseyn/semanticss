import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import templateTriggerEventListener from '#ehtml/templateTriggerEventListener.js'

export default class EReusableTemplate extends HTMLTemplateElement {

  constructor() {
    super()
    this.activated = false
    this.onTrigger = this.onTrigger.bind(this)
  }

  connectedCallback() {
    this.addEventListener('ehtml:activated', this.onActivated, { once: true })
    this.addEventListener('ehtml:template-triggered', this.onTrigger)
  }

  disconnectedCallback() {
    this.removeEventListener('ehtml:template-triggered', this.onTrigger)
  }

  onActivated() {
    if (this.activated) {
      return
    }
    this.activated = true
    this.run()
  }

  run() {
    const releaseOnLoad = this.getAttribute('release-on-load') === 'true'
    if (!releaseOnLoad) {
      return
    }

    const state = getNodeScopedState(this)

    this.onTrigger({
      target: this,
      detail: { state: state }
    })
  }

  onTrigger(event) {
    const template = event?.target ?? this
    const state = event?.detail?.state ?? getNodeScopedState(this)

    templateTriggerEventListener(template, state)
  }
}

customElements.define('e-reusable', EReusableTemplate, { extends: 'template' })
