import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js?v=b4193065'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js?v=c7f83d7b'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js?v=4f27de2b'
import scrollToHash from '#ehtml/actions/scrollToHash.js?v=e7d61ab5'

export default class Ehtml extends HTMLElement {

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
    const state = getNodeScopedState(this)

    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this
      )
    }

    if (!this.hasAttribute('data-src')) {
      throw new Error('<e-html> must have "data-src" attribute')
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
        headers: headers
      },
      undefined,
      (err, resObj) => {
        if (err) {
          throw err
        }

        const buffer = resObj.body
        const text = buffer.toString('utf-8', 0, buffer.length)

        this.innerHTML = text
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
}

customElements.define('e-html', Ehtml)
