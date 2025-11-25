import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'
import prettyHtml from '#ehtml/third-party/json-pretty-html.js?v=acd8d719'

export default class EJsonView extends HTMLElement {

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
      throw new Error('e-json-view must have "data-src" attribute')
    }

    const src = evaluatedStringWithParamsFromState(
      this.getAttribute('data-src'),
      state,
      this
    )

    const headers = JSON.parse(
      evaluatedStringWithParamsFromState(
        this.getAttribute('data-headers') || '{}',
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
        const obj = JSON.parse(text)

        this.innerHTML = prettyHtml(obj)

        // unwrap <e-json-view> so only pretty HTML remains
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

customElements.define('e-json-view', EJsonView)
