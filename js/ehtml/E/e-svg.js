import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'

export default class ESvg extends HTMLElement {

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
      throw new Error('<e-svg> must have "data-src" attribute')
    }

    const url = encodeURI(
      evaluatedStringWithParamsFromState(
        this.getAttribute('data-src'),
        state,
        this
      )
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
        url: url,
        method: 'GET',
        headers: headers
      },
      undefined,
      (err, resObj) => {
        if (err) {
          throw err
        }

        const svgText = resObj.body
        this.innerHTML = svgText

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

customElements.define('e-svg', ESvg)
