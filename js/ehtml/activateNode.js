import isCustomElement from '#ehtml/isCustomElement.js?v=3f5468a5'
import processAttributes from '#ehtml/processAttributes.js?v=f81a1369'
import shouldSkipNode from '#ehtml/shouldSkipNode.js?v=edc4a483'
import isTemplate from '#ehtml/isTemplate.js?v=e3182ac2'
import templateTriggerEventListener from '#ehtml/templateTriggerEventListener.js?v=90842677'

export default function activateNode(node) {
  if (!(node instanceof Element)) {
    return
  }
  if (shouldSkipNode(node)) {
    return
  }

  // 1. Process attributes ONLY on this node
  processAttributes(node)

  // 2. Activate custom element—exactly once
  if (isCustomElement(node)) {
    if (!node.activated) {
      node.dispatchEvent(
        new CustomEvent("ehtml:activated", {
          bubbles: false,
          detail: { state: {} }
        })
      )
    }
  }  

  // 3. Native <template> (NO "is") — attach template-trigger listener once
  if (isTemplate(node) && !node.getAttribute('is')) {    
    if (!node.templateTriggerEventListenerAttached) {
      node.templateTriggerEventListenerAttached = true
      node.addEventListener(
        'ehtml:template-triggered',
        (event) => {
          templateTriggerEventListener(
            event.target,
            event.detail.state
          )
          // Remove template after triggering it,
          // since it's not e-reusable
          if (event.target.parentNode) {
            event.target.parentNode.removeChild(event.target)
          }
        },
        { once: true }
      )
    }
  }

  // native elements are just flagges as activated
  if (!isCustomElement(node)) {
    node.activated = true
  }

  // 4. Activate children (only one level deep)
  if (node.children) {
    for (const child of node.childNodes) {
      activateNode(child)
    }
  }
}
