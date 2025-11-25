/* =====================================================================
 * EHTML — Core Runtime Architecture
 * =====================================================================
 *
 * This file wires together the foundational mechanics of EHTML:
 *
 *   1.  Custom Element Definitions
 *   2.  The Activation Pipeline (activateNode)
 *   3.  The Global Mutation Observer
 *
 * These three systems form the “runtime loop” that enables EHTML to
 * transform plain HTML into an active, reactive application layer
 * without a framework, without a build step, and without a virtual DOM.
 *
 * ---------------------------------------------------------------------
 * 1. Custom Element Definitions
 * ---------------------------------------------------------------------
 * `defineEhtmlElements()` registers all built-in EHTML components:
 *   - <e-json>
 *   - <e-html>
 *   - <e-svg>
 *   - <template is="e-if">
 *   - <template is="e-for-each">
 *   - <template is="e-wrapper">
 *   - <template is="e-reusable">
 *   - and others...
 *
 * These elements do not run anything upon registration. They become
 * active only when the activation pipeline dispatches the
 * `ehtml:activated` lifecycle event onto them.
 *
 *
 * ---------------------------------------------------------------------
 * 2. The Activation Pipeline (activateNode)
 * ---------------------------------------------------------------------
 * Every node entering the DOM—whether from server-rendered HTML,
 * templates inserted via AJAX, `e-for-each` loops, wrapper injections,
 * or manual DOM operations—must pass through `activateNode(node)`.
 *
 * Activation performs three duties:
 *
 *   (A) Attribute Evaluation
 *       ---------------------------------------------------------------
 *       EHTML processes only attributes containing `${...}` template
 *       expressions. The evaluation is *scope-aware*: each node has a
 *       state map (WeakMap-based) that carries:
 *         - loop variables
 *         - object mappings from <e-json>
 *         - template parameters
 *       Attributes are resolved immediately and one time per insertion.
 *
 *   (B) Custom Element Lifecycle
 *       ---------------------------------------------------------------
 *       Custom elements do not automatically “run” when they appear.
 *       Instead, activation dispatches:
 *
 *           node.dispatchEvent(new CustomEvent("ehtml:activated"))
 *
 *       This isolates side-effects to the correct moment and avoids the
 *       unpredictability of native connectedCallback timing.
 *
 *   (C) Template Trigger Wiring
 *       ---------------------------------------------------------------
 *       Native <template> elements (without `is="..."`) receive an
 *       event listener for `ehtml:template-triggered`. This is how
 *       mapToTemplate() communicates with templates. The template
 *       becomes a one-shot renderer unless it's <template is="e-reusable">.
 *
 * Only after all three steps complete does activation proceed recursively
 * to child nodes. This ensures top-down scoping and deterministic order.
 *
 *
 * ---------------------------------------------------------------------
 * 3. The Mutation Observer
 * ---------------------------------------------------------------------
 * EHTML does not patch the DOM or run a diffing algorithm. Instead, the
 * browser’s own DOM mutation notifications are used to pick up new
 * content.
 *
 * The observer listens **only** for:
 *
 *     - addedNodes in mutation.type === "childList"
 *
 * Attribute mutations are intentionally ignored:
 *
 *   • All attribute-based expression evaluation is handled inside
 *     `processAttributes()` during activation.
 *
 *   • Built-in custom elements handle their own attribute reactions.
 *
 * This keeps the observer minimal, predictable, and focused solely on
 * structural changes—exactly the subset of DOM mutations that represent
 * new dynamic content entering the document.
 *
 *
 * ---------------------------------------------------------------------
 * 4. Initial Activation
 * ---------------------------------------------------------------------
 * On page load:
 *
 *     activateNode(document.body)
 *     turnEhtmlObserverOn()
 *
 * The first call activates the static HTML delivered by the server.
 * From that point forward, all dynamic DOM insertions are captured by
 * the observer and funneled through the same activation pipeline.
 *
 *
 * ---------------------------------------------------------------------
 * Summary
 * ---------------------------------------------------------------------
 * EHTML operates on four principles:
 *
 *   - HTML is the source of truth. The DOM *is* the component model.
 *   - Attribute expressions are evaluated once, deterministically.
 *   - Custom elements activate late, through an explicit event, not
 *     through native timing.
 *   - All new DOM content passes through one, unified activation flow.
 *
 * This architecture avoids reactivity frameworks, avoids virtual DOM
 * diffing, and avoids build steps. The browser does the rendering;
 * EHTML handles only the wiring, scoping, and execution semantics.
 *
 * =====================================================================
 */

import activateNode from '#ehtml/activateNode.js?v=483faacf'

/* --------------------------------------------------------------------
 * WeakMap storing scoped state for specific DOM nodes.
 *
 * Each node may define its own scope (e.g. data passed into templates,
 * loop variables inside <template is="e-for-each">, JSON returned from
 * <e-json>, etc). getNodeScopedState(node) climbs the DOM upward until
 * it finds the closest ancestor with a stored scope.
 *
 * Complexity:
 *   - WeakMap lookup: O(1)
 *   - DOM tree climb: O(h) (h = depth)
 *
 * Benefits:
 *   - Automatic garbage collection when nodes are removed.
 *   - No global memory growth.
 *   - Nested scopes behave like lexical scopes in templating languages.
 * -------------------------------------------------------------------- */
window.__ehtmlScopedState__ = new WeakMap()

/* --------------------------------------------------------------------
 * Global registry of open WebSocket instances used by <e-json data-socket>.
 *
 * EHTML never hides WebSocket objects in opaque framework internals —
 * everything is accessible to user code. This array simply indexes
 * sockets by name so <e-json> can reuse existing live connections.
 * -------------------------------------------------------------------- */
window.__ehtmlWebSockets__ = window.__ehtmlWebSockets__ || []

/* --------------------------------------------------------------------
 * Registry of Showdown (Markdown) extensions.
 *
 * <e-markdown> loads extensions from here. Storing them globally allows
 * the developer to register extensions once and reuse them across all
 * markdown rendering operations in the page.
 * -------------------------------------------------------------------- */
window.__ehtmlShowdownExtensions__ = window.__ehtmlShowdownExtensions__ || []

/* ════════════════════════════════════════════════════════════════════════
 *                             EHTML ELEMENTS
 * ════════════════════════════════════════════════════════════════════════
 *
 * This module imports and exposes all **core EHTML custom elements**.
 * These are HTML-native building blocks that extend browser behavior
 * without any frameworks, bundlers, or virtual DOM.
 *
 * Examples include:
 *   • <e-html>                  – dynamic HTML loader
 *   • <e-wrapper>               – wrapper template with placement rules
 *   • <e-page-with-url>         – URL-aware page template
 *   • <e-json>, <e-json-view>   – JSON fetchers and renderers
 *   • <e-if>, <e-for-each>      – declarative conditionals and loops
 *   • <e-form>, <e-form-array>, <e-form-object> – reactive form helpers
 *   • <e-local-storage-value>, <e-session-storage-value>
 *   • <e-reusable>              – reusable template instances
 *   • <e-markdown>              – markdown → HTML renderer
 *   • <e-select>, <e-svg>, <e-ws> – UI and data streaming helpers
 *
 * When these elements appear in the DOM, the EHTML runtime activates them
 * via the MutationObserver and the internal `ehtml:activated` event.  
 * Each element implements its own behavior (loading, binding, mapping,
 * templating, rendering, form handling, etc.), entirely declaratively.
 *
 * Exporting them together allows the EHTML engine to register and manage
 * all built-in elements in one place.
 * ════════════════════════════════════════════════════════════════════════ */
import '#ehtml/E/exports.js?v=499f5b08'

/* ════════════════════════════════════════════════════════════════════════
 *                               EHTML ACTIONS
 * ════════════════════════════════════════════════════════════════════════
 *
 * This module registers all **built-in EHTML actions**—the imperative
 * operations that templates can trigger via attributes like:
 *
 *   data-actions-on-response="mapToTemplate(#foo, obj)"
 *
 * Each import below is a self-contained action function. Examples include:
 *
 *   • addHTMLInto / insertHTMLInto / addTextInto / insertTextInto
 *   • hideElms / showElms / toggleElms / removeElms
 *   • disableElms / enableElms / changeValueOf / updateAttributeOf
 *   • loadHTMLInto / loadTextInto / loadAndAddHTMLInto / loadAndAddTextInto
 *   • mapToTemplate / releaseTemplate
 *   • scrollIntoViewOf / scrollToHash
 *   • redirect / reload
 *
 * These actions are plain JavaScript functions used by the EHTML runtime
 * to manipulate the DOM and perform side effects in response to declarative
 * HTML attributes. They provide the “do something” layer for EHTML templates,
 * without requiring user-land JavaScript wiring.
 *
 * Importing and exporting them as a single object makes it easy for the
 * EHTML engine to look them up by name and invoke them at runtime.
 * ════════════════════════════════════════════════════════════════════════ */
import '#ehtml/actions/exports.js?v=650dbb8b'

/* ====================================================================
 *  MUTATION OBSERVER CALLBACK
 * ====================================================================
 *
 *  After the initial page load, EHTML does NOT walk or diff the entire
 *  DOM again. The only full-tree activation happens exactly once:
 *
 *        → activateNode(document.body)
 *
 *  This is the initial bootstrap to process the server-rendered/static
 *  HTML. After that moment, EHTML reacts ONLY to *newly added nodes*
 *  via the MutationObserver.
 *
 * --------------------------------------------------------------------
 *  WHAT THE OBSERVER WATCHES
 * --------------------------------------------------------------------
 *
 *  We observe:
 *
 *      { childList: true, subtree: true }
 *
 *  This means:
 *    • Only additions/removals of children are reported
 *    • No attribute changes
 *    • No text/characterData changes
 *    • No deep scans — the browser tells us exactly which nodes changed
 *
 *  For each added node:
 *
 *      1. evaluate attribute expressions on that node
 *      2. activate custom elements once
 *      3. attach template-trigger listeners for native templates
 *      4. recursively activate the node’s own children
 *
 * --------------------------------------------------------------------
 *  PERFORMANCE CHARACTERISTICS
 * --------------------------------------------------------------------
 *
 *  • **Initial Cost:**  
 *      The very first call `activateNode(document.body)` performs a
 *      depth-first walk of the entire static DOM. This is equivalent to
 *      your initial page load cost and happens exactly once.
 *
 *  • **Afterward:**  
 *      EHTML NEVER re-scans the whole document again. Everything is
 *      incremental and reactive to actual DOM insertions.
 *
 *  • **Recursion Scope:**  
 *      activateNode(node) only descends into *the subtree of that node*.
 *
 *      Cost per mutation is:
 *
 *            O(size_of_inserted_subtree)
 *
 *      This is the minimum possible work required to process the DOM
 *      you just inserted.
 *
 * --------------------------------------------------------------------
 *  TEMPLATE-DRIVEN PERFORMANCE ADVANTAGE
 * --------------------------------------------------------------------
 *
 *  EHTML apps rely heavily on `<template>` elements:
 *
 *      e-if, e-for-each, e-reusable, e-wrapper, e-page-with-url, …
 *
 *  Templates remain inert until “released”:
 *
 *      • They are not activated while sitting inside the DOM
 *      • They hold no event listeners
 *      • They run no logic
 *
 *  When released, a template inserts a fragment into the DOM, and the
 *  observer activates only that newly inserted fragment.
 *
 *  Benefits:
 *
 *      ✓ Lazy DOM activation  
 *      ✓ No overhead for unused UI branches  
 *      ✓ Large UI blocks can be released in constant-time operations  
 *      ✓ MutationObserver workload stays tightly bounded  
 *
 * --------------------------------------------------------------------
 *  WHY THIS MATTERS
 * --------------------------------------------------------------------
 *
 *  EHTML’s model avoids:
 *
 *      ✗ virtual DOM diffing  
 *      ✗ global invalidation  
 *      ✗ full-document rescans (after bootstrap)  
 *      ✗ heavy reactivity frameworks  
 *
 *  Instead, it uses:
 *
 *      ✓ deterministic one-time activation  
 *      ✓ subtree-only work  
 *      ✓ browser-native notifications  
 *      ✓ template-based lazy rendering  
 *
 *  This makes EHTML extremely predictable and efficient for real apps.
 *
 * ==================================================================== */
function mutationHandler(mutations) {
  for (const mut of mutations) {
    if (mut.type === "childList") {
      for (const node of mut.addedNodes) {
        activateNode(node)
      }
    }
  }
}

/* ====================================================================
 *  CREATE MUTATION OBSERVER INSTANCE
 * ====================================================================
 *
 * We observe:
 *   - childList: true   → detect inserted DOM nodes
 *   - subtree: true     → detect nodes inserted anywhere under body
 * ==================================================================== */
let observer = new MutationObserver(mutationHandler)

/* ====================================================================
 *  PUBLIC API — ENABLE OBSERVER
 * ====================================================================
 *
 *  turnEhtmlObserverOn()
 *
 *  Starts the global MutationObserver that powers incremental EHTML
 *  activation. Once enabled, every newly inserted DOM node is routed
 *  through `activateNode()`, triggering:
 *
 *       • expression evaluation (data-text, data-value, etc.)
 *       • custom element activation (e-json, e-if, e-for-each, …)
 *       • native <template> release handlers
 *       • scoped-state propagation for templates
 *
 *  IMPORTANT:
 *      - This does NOT rescan the whole document.
 *      - It only processes nodes that the browser reports as "added".
 *
 *  The observer is typically ON at all times after page load.
 * ==================================================================== */
export function turnEhtmlObserverOn() {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

/* ====================================================================
 *  PUBLIC API — DISABLE OBSERVER
 * ====================================================================
 *
 *  turnEhtmlObserverOff()
 *
 *  Completely detaches the MutationObserver. When the observer is OFF:
 *
 *      • New DOM nodes will NOT be auto-activated
 *      • Attribute expressions will NOT be evaluated
 *      • Templates inserted dynamically will NOT release
 *      • Custom elements must be manually activated (via activateNode)
 *
 *  This is useful when performing large or sensitive DOM operations
 *  where activation must be deferred until a final stable structure
 *  is ready. Example scenarios:
 *
 *      - bulk inserting thousands of nodes
 *      - building large template fragments before attaching them
 *      - executing batch DOM updates inside a shadow root
 *
 *  After completing such work, you may re-enable the observer or call:
 *
 *        activateNode(rootNode)
 *
 *  to manually run activation once.
 * ==================================================================== */
export function turnEhtmlObserverOff() {
  observer.disconnect()
}

/* ====================================================================
 *  GLOBAL EXPOSURE — ADVANCED CONTROL
 * ====================================================================
 *
 *  These globals allow applications, debugging tools, and testing
 *  environments to manipulate EHTML’s activation pipeline directly.
 *
 *      window.turnEhtmlObserverOn()   → resume automatic activation
 *      window.turnEhtmlObserverOff()  → pause automatic activation
 *      window.activateNode(node)      → manually activate a subtree
 *
 *  This makes EHTML highly predictable and debuggable:
 *      every activation step is deliberate and observable.
 * ==================================================================== */
window.turnEhtmlObserverOn = turnEhtmlObserverOn
window.turnEhtmlObserverOff = turnEhtmlObserverOff
window.activateNode = activateNode


/* ====================================================================
 *  INITIAL ACTIVATION — BOOTSTRAP PHASE
 * ====================================================================
 *
 *  On page load:
 *
 *        1. We run a full-tree activation on <body>.
 *           This is the *only* time EHTML walks the entire DOM.
 *
 *        2. Then the MutationObserver is turned ON.
 *
 *  After this bootstrap:
 *
 *      • All subsequent activations are incremental.
 *      • No rescans of the full document ever occur again.
 *      • Only newly added DOM nodes are inspected and activated.
 *
 *  This pattern is what enables EHTML to be both:
 *      - declarative and HTML-first
 *      - extremely performant during runtime
 *
 * ==================================================================== */
window.addEventListener('load', () => {
  activateNode(document.body)   // one-time full-tree activation
  turnEhtmlObserverOn()         // incremental activation from now on
})
