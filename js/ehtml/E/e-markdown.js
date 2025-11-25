import getNodeScopedState from '#ehtml/getNodeScopedState.js'
import responseFromAjaxRequest from '#ehtml/responseFromAjaxRequest.js'
import unwrappedChildrenOfParent from '#ehtml/unwrappedChildrenOfParent.js'
import evaluatedStringWithParamsFromState from '#ehtml/evaluatedStringWithParamsFromState.js'
import evaluateStringWithActionsOnProgress from '#ehtml/evaluateStringWithActionsOnProgress.js'
import scrollToHash from '#ehtml/actions/scrollToHash.js'
import * as showdown from '#ehtml/third-party/showdown.min.js?v=8e1f0558'
import showdownHighlight from '#ehtml/third-party/showdown-highlight.js?v=8c2f2982'
import showdownKatex from '#ehtml/third-party/showdown-katex/showdown-katex.js?v=088647e7'

export default class EMarkdown extends HTMLElement {

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

    // --- Progress start ---
    if (this.hasAttribute('data-actions-on-progress-start')) {
      evaluateStringWithActionsOnProgress(
        this.getAttribute('data-actions-on-progress-start'),
        this
      )
    }

    if (!this.hasAttribute('data-src')) {
      throw new Error('e-markdown must have "data-src" attribute')
    }

    // --- Resolve showdown extensions (global registry) ---
    const extensions = window.__ehtmlShowdownExtensions__ || []

    // Code highlighting extension
    if (this.hasAttribute('data-apply-code-highlighting') && showdownHighlight) {
      extensions.push(
        showdownHighlight({
          pre: true,
          auto_detection: true
        })
      )
    }

    // LaTeX / KaTeX extension
    if (this.hasAttribute('data-apply-latex') && showdownKatex) {
      extensions.push(
        showdownKatex({
          displayMode: true,
          throwOnError: false,
          errorColor: '#ff0000',
          delimiters: [
            { left: '$$', right: '$$', display: false },
            { left: '~', right: '~', display: false, asciimath: true }
          ]
        })
      )
    }

    // --- AJAX request ---
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

        const markdown = resObj.body

        // --- Render markdown ---
        if (showdown) {
          showdown.setFlavor('github')
          const converter = new showdown.Converter({
            tables: true,
            tasklists: true,
            simpleLineBreaks: true,
            emoji: true,
            moreStyling: true,
            github: true,
            extensions: extensions
          })
          this.innerHTML = converter.makeHtml(markdown)
        } else {
          this.innerHTML = markdown
        }

        // Remove <e-markdown> wrapper
        unwrappedChildrenOfParent(this)

        // --- Progress end ---
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

customElements.define('e-markdown', EMarkdown)
