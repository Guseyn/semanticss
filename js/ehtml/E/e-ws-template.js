import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import evaluateStringWithActionsOnOpenConnection from '#ehtml/evaluateStringWithActionsOnOpenConnection.js?v=4f2d2e81'
import evaluateStringWithActionsOnCloseConnection from '#ehtml/evaluateStringWithActionsOnCloseConnection.js?v=85da1111'

export default class EWs extends HTMLTemplateElement {

  constructor() {
    super()
    this.activated = false
  }

  connectedCallback() {
    this.addEventListener(
      'ehtml:activated',
      this.onActivated
    )
  }

  disconnectedCallback() {
    this.removeEventListener(
      'ehtml:activated',
      this.onActivated
    )
  }

  onActivated() {
    if (this.activated) {
      return
    }
    this.activated = true
    this.run()
  }

  run() {
    const state = getNodeScopedState(this)

    if (!this.hasAttribute('data-src')) {
      throw new Error('e-ws must have "data-src" attribute')
    }

    const socketUrl = evaluatedStringWithParamsFromState(
      this.getAttribute('data-src'),
      state,
      this
    )

    const socketName = evaluatedStringWithParamsFromState(
      this.getAttribute('data-socket-name'),
      state,
      this
    )

    if (!socketName) {
      throw new Error('e-ws must have "data-socket-name" attribute')
    }

    const connectionIconSelector = this.getAttribute('data-connection-icon')
    const connectionIcon = connectionIconSelector
      ? document.querySelector(connectionIconSelector)
      : null

    if (connectionIcon) {
      connectionIcon.style.display = ''
    }

    const socket = new WebSocket(socketUrl)

    // global EHTML storage
    window.__ehtmlWebSockets__ =
      window.__ehtmlWebSockets__ || {}

    window.__ehtmlWebSockets__[socketName] = socket

    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this
      )
    }

    socket.addEventListener('open', event => {
      if (connectionIcon) {
        connectionIcon.style.display = 'none'
      }

      if (this.hasAttribute('data-actions-on-open-connection')) {
        evaluateStringWithActionsOnOpenConnection(
          this.getAttribute('data-actions-on-open-connection'),
          event,
          this
        )
      }

      // Replace <template is="e-ws"> with its content
      this.parentNode.replaceChild(
        this.content.cloneNode(true),
        this
      )

      if (this.hasAttribute('data-actions-on-progress-end')) {
        evaluateStringWithActionsOnProgress(
          this.getAttribute('data-actions-on-progress-end'),
          this
        )
      }
    })

    socket.addEventListener('close', event => {
      if (this.hasAttribute('data-actions-on-close-connection')) {
        evaluateStringWithActionsOnCloseConnection(
          this.getAttribute('data-actions-on-close-connection'),
          event,
          this
        )
      }
    })
  }
}

customElements.define('e-ws', EWs, { extends: 'template' })
