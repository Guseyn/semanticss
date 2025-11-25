export default function getNodeScopedState(node) {
  let current = node

  while (current) {
    const state = window.__ehtmlScopedState__.get(current)
    if (state) {
      return state
    }
    current = current.parentNode
  }

  return {}
}