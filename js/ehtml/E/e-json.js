import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import evaluateStringWithActionsOnResponse from '#ehtml/evaluateStringWithActionsOnResponse.js?v=1ff0631a'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'

export default class EJson extends HTMLElement {

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
    const socketName = this.getAttribute('data-socket')
    if (socketName) {
      return this.runSocketMode()
    }

    const cacheAttr = this.getAttribute('data-cache-from')
    if (cacheAttr) {
      const cached = this.tryCache()
      if (cached) {
        return
      }
    }

    return this.runAjax()
  }

  runSocketMode() {
    const ajaxIcon = this.resolveIcon()
    if (ajaxIcon) {
      ajaxIcon.style.display = ''
    }

    const socketName = this.getAttribute('data-socket')

    const sockets = window.__ehtmlWebSockets__
    if (!sockets || !sockets[socketName]) {
      throw new Error(`socket "${socketName}" is not defined or not opened yet`)
    }

    const socket = sockets[socketName]

    socket.addEventListener('message', event => {
      const response = JSON.parse(event.data)
      evaluateStringWithActionsOnResponse(
        this.getAttribute('data-actions-on-response'),
        this.getAttribute('data-response-name'),
        response,
        this
      )
    })

    unwrappedChildrenOfParent(this)
  }

  tryCache() {
    const state = getNodeScopedState(this)
    const cacheAttr = this.getAttribute('data-cache-from')

    const evaluated = evaluatedStringWithParamsFromState(
      cacheAttr,
      state,
      this
    )

    if (evaluated === 'undefined' || evaluated === 'null') {
      return false
    }

    let obj = null
    try {
      obj = JSON.parse(evaluated)
    } catch {
      return false
    }

    if (!obj) {
      return false
    }

    evaluateStringWithActionsOnResponse(
      this.getAttribute('data-actions-on-response'),
      this.getAttribute('data-response-name'),
      obj,
      this
    )

    unwrappedChildrenOfParent(this)
    scrollToHash()

    return true
  }

  runAjax() {
    const state = getNodeScopedState(this)

    const src = this.getAttribute('data-src')
    if (!src) {
      throw new Error('<e-json> must have data-src or data-socket')
    }

    const ajaxIcon = this.resolveIcon()
    if (ajaxIcon) {
      ajaxIcon.style.display = ''
    }

    const progressBar = this.resolveProgressBar()
    if (progressBar) {
      progressBar.max = 100
      progressBar.value = 0
      progressBar.style.display = 'none'
    }

    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this
      )
    }

    const url = encodeURI(
      evaluatedStringWithParamsFromState(src, state, this)
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
        url: url,
        method: 'GET',
        headers: headers,
        progressEvent: event => {
          if (!progressBar || !event.lengthComputable) {
            return
          }
          progressBar.style.display = ''
          const percent = Math.floor((event.loaded / event.total) * 100)
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

        const responsePayload = {
          body: obj,
          statusCode: resObj.statusCode,
          headers: resObj.headers
        }

        evaluateStringWithActionsOnResponse(
          this.getAttribute('data-actions-on-response'),
          this.getAttribute('data-response-name'),
          responsePayload,
          this
        )

        unwrappedChildrenOfParent(this)

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

  resolveProgressBar() {
    const sel = this.getAttribute('data-progress-bar')
    if (!sel) {
      return null
    }
    return document.querySelector(sel)
  }

  resolveIcon() {
    const sel = this.getAttribute('data-ajax-icon')
    if (!sel) {
      return null
    }
    return document.querySelector(sel)
  }
}

customElements.define('e-json', EJson)
