import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import mapToTemplate from '#ehtml/actions/mapToTemplate.js?v=e290e08b'
import templateTriggerEventListener from '#ehtml/templateTriggerEventListener.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'

export default class EJsonMapTemplate extends HTMLTemplateElement {
  constructor() {
    super()
    this.activated = false
  }

  connectedCallback() {
    this.addEventListener('ehtml:activated', this.onActivated, { once: true })
    this.addEventListener('ehtml:template-triggered', this.onTrigger)
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

    const ajaxIconSelector = this.getAttribute('data-ajax-icon')
    const ajaxIcon = ajaxIconSelector ? document.querySelector(ajaxIconSelector) : null
    if (ajaxIcon) {
      ajaxIcon.style.display = ''
    }

    const progressBarSelector = this.getAttribute('data-progress-bar')
    const progressBar = progressBarSelector ? document.querySelector(progressBarSelector) : null
    if (progressBar) {
      progressBar.max = 100
      progressBar.value = 0
      progressBar.style.display = 'none'
    }

    // ---------------------------------------------------------
    // SOCKET MODE
    // ---------------------------------------------------------
    const socketName = this.getAttribute('data-socket')
    if (socketName) {
      const sockets = window.__ehtmlWebSockets__
      if (!sockets || !sockets[socketName]) {
        throw new Error(`socket with name "${socketName}" is not defined or not opened yet`)
      }

      const socket = sockets[socketName]

      socket.addEventListener('message', event => {
        const response = JSON.parse(event.data)
        mapToTemplate(this, response)
      })

      return
    }

    // ---------------------------------------------------------
    // PROGRESS START
    // ---------------------------------------------------------
    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this
      )
    }

    // ---------------------------------------------------------
    // AJAX MODE
    // ---------------------------------------------------------
    if (!this.hasAttribute('data-src')) {
      throw new Error('e-json-map-template must have "data-src" attribute if no socket is used')
    }

    const src = evaluatedStringWithParamsFromState(
      this.getAttribute('data-src'),
      state,
      this
    )

    const headers = JSON.parse(
      evaluatedStringWithParamsFromState(
        this.getAttribute('data-request-headers') || '{}',
        state,
        this
      )
    )

    responseFromAjaxRequest(
      {
        url: encodeURI(src),
        method: 'GET',
        headers: headers,
        progressEvent: event => {
          if (!progressBar || !event.lengthComputable) {
            return
          }
          progressBar.style.display = ''
          const percent = parseInt((event.loaded / event.total) * 100)
          progressBar.value = percent
          if (percent === 100) {
            progressBar.style.display = 'none'
          }
        }
      },
      undefined,
      (err, resObj) => {
        if (err) {
          throw err
        }

        if (ajaxIcon) {
          ajaxIcon.style.display = 'none'
        }

        const buffer = resObj.body
        const text = buffer.toString('utf-8', 0, buffer.length)
        const obj = JSON.parse(text)

        mapToTemplate(this, {
          body: obj,
          headers: resObj.headers,
          statusCode: resObj.statusCode
        })

        if (this.hasAttribute('data-actions-on-progress-end')) {
          evaluateStringWithActionsOnProgress(
            this.getAttribute('data-actions-on-progress-end'),
            this
          )
        }

        scrollToHash()
      }
    )
  }

  onTrigger(event) {
    const template = event?.target ?? this
    const state = event?.detail?.state ?? getNodeScopedState(this)

    templateTriggerEventListener(template, state)
    if (event.target.parentNode) {
      event.target.parentNode.removeChild(event.target)
    }
  }
}

customElements.define('e-json-map', EJsonMapTemplate, { extends: 'template' })
