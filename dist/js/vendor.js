(self["webpackChunkgulp_scss_starter"] = self["webpackChunkgulp_scss_starter"] || []).push([["vendor"],{

/***/ "./node_modules/Splitting/dist/splitting.js":
/*!**************************************************!*\
  !*** ./node_modules/Splitting/dist/splitting.js ***!
  \**************************************************/
/***/ (function(module) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

var root = document;
var createText = root.createTextNode.bind(root);

/**
 * # setProperty
 * Apply a CSS var
 * @param el{HTMLElement} 
 * @param varName {string} 
 * @param value {string|number}  
 */
function setProperty(el, varName, value) {
    el.style.setProperty(varName, value);
} 

/**
 * 
 * @param {Node} el 
 * @param {Node} child 
 */
function appendChild(el, child) {
  return el.appendChild(child);
}

function createElement(parent, key, text, whitespace) {
  var el = root.createElement('span');
  key && (el.className = key); 
  if (text) { 
      !whitespace && el.setAttribute("data-" + key, text);
      el.textContent = text; 
  }
  return (parent && appendChild(parent, el)) || el;
}

function getData(el, key) {
  return el.getAttribute("data-" + key)
}

/**
 * 
 * @param e {import('../types').Target} 
 * @param parent {HTMLElement}
 * @returns {HTMLElement[]}
 */
function $(e, parent) {
    return !e || e.length == 0
        ? // null or empty string returns empty array
          []
        : e.nodeName
            ? // a single element is wrapped in an array
              [e]
            : // selector and NodeList are converted to Element[]
              [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
}

/**
 * Creates and fills an array with the value provided
 * @template {T}
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 */
function Array2D(len) {
    var a = [];
    for (; len--; ) {
        a[len] = [];
    }
    return a;
}

function each(items, fn) {
    items && items.some(fn);
}

function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
function index(element, key, items) {
    var prefix = '--' + key;
    var cssVar = prefix + "-index";

    each(items, function (items, i) {
        if (Array.isArray(items)) {
            each(items, function(item) {
                setProperty(item, cssVar, i);
            });
        } else {
            setProperty(items, cssVar, i);
        }
    });

    setProperty(element, prefix + "-total", items.length);
}

/**
 * @type {Record<string, import('./types').ISplittingPlugin>}
 */
var plugins = {};

/**
 * @param by {string}
 * @param parent {string}
 * @param deps {string[]}
 * @return {string[]}
 */
function resolvePlugins(by, parent, deps) {
    // skip if already visited this dependency
    var index = deps.indexOf(by);
    if (index == -1) {
        // if new to dependency array, add to the beginning
        deps.unshift(by);

        // recursively call this function for all dependencies
        each(plugins[by].depends, function(p) {
            resolvePlugins(p, by, deps);
        });
    } else {
        // if this dependency was added already move to the left of
        // the parent dependency so it gets loaded in order
        var indexOfParent = deps.indexOf(parent);
        deps.splice(index, 1);
        deps.splice(indexOfParent, 0, by);
    }
    return deps;
}

/**
 * Internal utility for creating plugins... essentially to reduce
 * the size of the library
 * @param {string} by 
 * @param {string} key 
 * @param {string[]} depends 
 * @param {Function} split 
 * @returns {import('./types').ISplittingPlugin}
 */
function createPlugin(by, depends, key, split) {
    return {
        by: by,
        depends: depends,
        key: key,
        split: split
    }
}

/**
 *
 * @param by {string}
 * @returns {import('./types').ISplittingPlugin[]}
 */
function resolve(by) {
    return resolvePlugins(by, 0, []).map(selectFrom(plugins));
}

/**
 * Adds a new plugin to splitting
 * @param opts {import('./types').ISplittingPlugin}
 */
function add(opts) {
    plugins[opts.by] = opts;
}

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param splitOn {string}
 * @param includeSpace {boolean}
 * @returns {HTMLElement[]}
 */
function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();

    if (includePrevious) {
        elements.push(el.previousSibling);
    }

    var allElements = [];
    $(el.childNodes).some(function(next) {
        if (next.tagName && !next.hasChildNodes()) {
            // keep elements without child nodes (no text and no children)
            allElements.push(next);
            return;
        }
        // Recursively run through child nodes
        if (next.childNodes && next.childNodes.length) {
            allElements.push(next);
            elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
            return;
        }

        // Get the text to split, trimming out the whitespace
        /** @type {string} */
        var wholeText = next.wholeText || '';
        var contents = wholeText.trim();

        // If there's no text left after trimming whitespace, continue the loop
        if (contents.length) {
            // insert leading space if there was one
            if (wholeText[0] === ' ') {
                allElements.push(createText(' '));
            }
            // Concatenate the split text children back into the full array
            each(contents.split(splitOn), function(splitText, i) {
                if (i && preserveWhitespace) {
                    allElements.push(createElement(F, "whitespace", " ", preserveWhitespace));
                }
                var splitEl = createElement(F, key, splitText);
                elements.push(splitEl);
                allElements.push(splitEl);
            }); 
            // insert trailing space if there was one
            if (wholeText[wholeText.length - 1] === ' ') {
                allElements.push(createText(' '));
            }
        }
    });

    each(allElements, function(el) {
        appendChild(F, el);
    });

    // Clear out the existing element
    el.innerHTML = "";
    appendChild(el, F);
    return elements;
}

/** an empty value */
var _ = 0;

function copy(dest, src) {
    for (var k in src) {
        dest[k] = src[k];
    }
    return dest;
}

var WORDS = 'words';

var wordPlugin = createPlugin(
    /*by: */ WORDS,
    /*depends: */ _,
    /*key: */ 'word', 
    /*split: */ function(el) {
        return splitText(el, 'word', /\s+/, 0, 1)
    }
);

var CHARS = "chars";

var charPlugin = createPlugin(
    /*by: */ CHARS,
    /*depends: */ [WORDS],
    /*key: */ "char", 
    /*split: */ function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = el['🍌'];  
    if (!opts.force && ctx) {
      return ctx;
    }

    ctx = el['🍌'] = { el: el };
    var items = resolve(opts.by || getData(el, 'splitting') || CHARS);
    var opts2 = copy({}, opts);
    each(items, function(plugin) {
      if (plugin.split) {
        var pluginBy = plugin.by;
        var key2 = (key ? '-' + key : '') + plugin.key;
        var results = plugin.split(el, opts2, ctx);
        key2 && index(el, key2, results);
        ctx[pluginBy] = results;
        el.classList.add(pluginBy);
      } 
    });

    el.classList.add('splitting');
    return ctx;
  })
}

/**
 * # Splitting.html
 * 
 * @param opts {import('./types').ISplittingOptions}
 */
function html(opts) {
  opts = opts || {};
  var parent = opts.target =  createElement();
  parent.innerHTML = opts.content;
  Splitting(opts);
  return parent.outerHTML
}

Splitting.html = html;
Splitting.add = add;

function detectGrid(el, options, side) {
    var items = $(options.matching || el.children, el);
    var c = {};

    each(items, function(w) {
        var val = Math.round(w[side]);
        (c[val] || (c[val] = [])).push(w);
    });

    return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
}

function byNumber(a, b) {
    return a - b;
}

var linePlugin = createPlugin(
    /*by: */ 'lines',
    /*depends: */ [WORDS],
    /*key: */ 'line',
    /*split: */ function(el, options, ctx) {
      return detectGrid(el, { matching: ctx[WORDS] }, 'offsetTop')
    }
);

var itemPlugin = createPlugin(
    /*by: */ 'items',
    /*depends: */ _,
    /*key: */ 'item', 
    /*split: */ function(el, options) {
        return $(options.matching || el.children, el)
    }
);

var rowPlugin = createPlugin(
    /*by: */ 'rows',
    /*depends: */ _,
    /*key: */ 'row', 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetTop");
    }
);

var columnPlugin = createPlugin(
    /*by: */ 'cols',
    /*depends: */ _,
    /*key: */ "col", 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetLeft");
    }
);

var gridPlugin = createPlugin(
    /*by: */ 'grid',
    /*depends: */ ['rows', 'cols']
);

var LAYOUT = "layout";

var layoutPlugin = createPlugin(
    /*by: */ LAYOUT,
    /*depends: */ _,
    /*key: */ _,
    /*split: */ function(el, opts) {
        // detect and set options
        var rows =  opts.rows = +(opts.rows || getData(el, 'rows') || 1);
        var columns = opts.columns = +(opts.columns || getData(el, 'columns') || 1);

        // Seek out the first <img> if the value is true 
        opts.image = opts.image || getData(el, 'image') || el.currentSrc || el.src;
        if (opts.image) {
            var img = $("img", el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }

        // add optional image to background
        if (opts.image) {
            setProperty(el, "background-image", "url(" + opts.image + ")");
        }

        var totalCells = rows * columns;
        var elements = [];

        var container = createElement(_, "cell-grid");
        while (totalCells--) {
            // Create a span
            var cell = createElement(container, "cell");
            createElement(cell, "cell-inner");
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container);

        return elements;
    }
);

var cellRowPlugin = createPlugin(
    /*by: */ "cellRows",
    /*depends: */ [LAYOUT],
    /*key: */ "row",
    /*split: */ function(el, opts, ctx) {
        var rowCount = opts.rows;
        var result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
);

var cellColumnPlugin = createPlugin(
    /*by: */ "cellColumns",
    /*depends: */ [LAYOUT],
    /*key: */ "col",
    /*split: */ function(el, opts, ctx) {
        var columnCount = opts.columns;
        var result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });

        return result;
    }
);

var cellPlugin = createPlugin(
    /*by: */ "cells",
    /*depends: */ ['cellRows', 'cellColumns'],
    /*key: */ "cell", 
    /*split: */ function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx[LAYOUT];
    }
);

// install plugins
// word/char plugins
add(wordPlugin);
add(charPlugin);
add(linePlugin);
// grid plugins
add(itemPlugin);
add(rowPlugin);
add(columnPlugin);
add(gridPlugin);
// cell-layout plugins
add(layoutPlugin);
add(cellRowPlugin);
add(cellColumnPlugin);
add(cellPlugin);

return Splitting;

})));


/***/ }),

/***/ "./node_modules/scroll-out/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/scroll-out/lib/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


function clamp(v, min, max) {
    return min > v ? min : max < v ? max : v;
}
function sign(x) {
    return (+(x > 0) - +(x < 0));
}
function round(n) {
    return Math.round(n * 10000) / 10000;
}

var cache = {};
function replacer(match) {
    return '-' + match[0].toLowerCase();
}
function hyphenate(value) {
    return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
}

/** find elements */
function $(e, parent) {
    return !e || e.length === 0
        ? // null or empty string returns empty array
            []
        : e.nodeName
            ? // a single element is wrapped in an array
                [e]
            : // selector and NodeList are converted to Element[]
                [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
}
function setAttrs(el, attrs) {
    // tslint:disable-next-line:forin
    for (var key in attrs) {
        if (key.indexOf('_')) {
            el.setAttribute('data-' + hyphenate(key), attrs[key]);
        }
    }
}
function setProps(cssProps) {
    return function (el, props) {
        for (var key in props) {
            if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
                el.style.setProperty('--' + hyphenate(key), round(props[key]));
            }
        }
    };
}

var clearTask;
var subscribers = [];
function loop() {
    clearTask = 0;
    subscribers.slice().forEach(function (s2) { return s2(); });
    enqueue();
}
function enqueue() {
    if (!clearTask && subscribers.length) {
        clearTask = requestAnimationFrame(loop);
    }
}
function subscribe(fn) {
    subscribers.push(fn);
    enqueue();
    return function () {
        subscribers = subscribers.filter(function (s) { return s !== fn; });
        if (!subscribers.length && clearTask) {
            cancelAnimationFrame(clearTask);
            clearTask = 0;
        }
    };
}

function unwrap(value, el, ctx, doc) {
    return typeof value === 'function' ? value(el, ctx, doc) : value;
}
function noop() { }

/**
 * Creates a new instance of ScrollOut that marks elements in the viewport with
 * an "in" class and marks elements outside of the viewport with an "out"
 */
// tslint:disable-next-line:no-default-export
function main (opts) {
    // Apply default options.
    opts = opts || {};
    // Debounce onChange/onHidden/onShown.
    var onChange = opts.onChange || noop;
    var onHidden = opts.onHidden || noop;
    var onShown = opts.onShown || noop;
    var onScroll = opts.onScroll || noop;
    var props = opts.cssProps ? setProps(opts.cssProps) : noop;
    var se = opts.scrollingElement;
    var container = se ? $(se)[0] : window;
    var doc = se ? $(se)[0] : document.documentElement;
    var rootChanged = false;
    var scrollingElementContext = {};
    var elementContextList = [];
    var clientOffsetX, clientOffsety;
    var sub;
    function index() {
        elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) { return ({ element: el }); });
    }
    function update() {
        // Calculate position, direction and ratio.
        var clientWidth = doc.clientWidth;
        var clientHeight = doc.clientHeight;
        var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
        var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
        var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
        var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1);
        // Detect if the root context has changed.
        rootChanged =
            rootChanged ||
                scrollingElementContext.scrollDirX !== scrollDirX ||
                scrollingElementContext.scrollDirY !== scrollDirY ||
                scrollingElementContext.scrollPercentX !== scrollPercentX ||
                scrollingElementContext.scrollPercentY !== scrollPercentY;
        scrollingElementContext.scrollDirX = scrollDirX;
        scrollingElementContext.scrollDirY = scrollDirY;
        scrollingElementContext.scrollPercentX = scrollPercentX;
        scrollingElementContext.scrollPercentY = scrollPercentY;
        var childChanged = false;
        for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
            var ctx = elementContextList[index_1];
            var element = ctx.element;
            // find the distance from the element to the scrolling container
            var target = element;
            var offsetX = 0;
            var offsetY = 0;
            do {
                offsetX += target.offsetLeft;
                offsetY += target.offsetTop;
                target = target.offsetParent;
            } while (target && target !== container);
            // Get element dimensions.
            var elementHeight = element.clientHeight || element.offsetHeight || 0;
            var elementWidth = element.clientWidth || element.offsetWidth || 0;
            // Find visible ratios for each element.
            var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) -
                clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) /
                elementWidth;
            var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) -
                clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) /
                elementHeight;
            var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
            var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
            var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
            var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
            var visible = void 0;
            if (opts.offset) {
                visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
            }
            else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
                visible = 1;
            }
            else {
                visible = 0;
            }
            var changedVisible = ctx.visible !== visible;
            var changed = ctx._changed ||
                changedVisible ||
                ctx.visibleX !== visibleX ||
                ctx.visibleY !== visibleY ||
                ctx.index !== index_1 ||
                ctx.elementHeight !== elementHeight ||
                ctx.elementWidth !== elementWidth ||
                ctx.offsetX !== offsetX ||
                ctx.offsetY !== offsetY ||
                ctx.intersectX !== ctx.intersectX ||
                ctx.intersectY !== ctx.intersectY ||
                ctx.viewportX !== viewportX ||
                ctx.viewportY !== viewportY;
            if (changed) {
                childChanged = true;
                ctx._changed = true;
                ctx._visibleChanged = changedVisible;
                ctx.visible = visible;
                ctx.elementHeight = elementHeight;
                ctx.elementWidth = elementWidth;
                ctx.index = index_1;
                ctx.offsetX = offsetX;
                ctx.offsetY = offsetY;
                ctx.visibleX = visibleX;
                ctx.visibleY = visibleY;
                ctx.intersectX = intersectX;
                ctx.intersectY = intersectY;
                ctx.viewportX = viewportX;
                ctx.viewportY = viewportY;
                ctx.visible = visible;
            }
        }
        if (!sub && (rootChanged || childChanged)) {
            sub = subscribe(render);
        }
    }
    function render() {
        maybeUnsubscribe();
        // Update root attributes if they have changed.
        if (rootChanged) {
            rootChanged = false;
            setAttrs(doc, {
                scrollDirX: scrollingElementContext.scrollDirX,
                scrollDirY: scrollingElementContext.scrollDirY
            });
            props(doc, scrollingElementContext);
            onScroll(doc, scrollingElementContext, elementContextList);
        }
        var len = elementContextList.length;
        for (var x = len - 1; x > -1; x--) {
            var ctx = elementContextList[x];
            var el = ctx.element;
            var visible = ctx.visible;
            var justOnce = el.hasAttribute('scrollout-once') || false; // Once
            if (ctx._changed) {
                ctx._changed = false;
                props(el, ctx);
            }
            if (ctx._visibleChanged) {
                setAttrs(el, { scroll: visible ? 'in' : 'out' });
                onChange(el, ctx, doc);
                (visible ? onShown : onHidden)(el, ctx, doc);
            }
            // if this is shown multiple times, keep it in the list
            if (visible && (opts.once || justOnce)) { // or if this element just display it once
                elementContextList.splice(x, 1);
            }
        }
    }
    function maybeUnsubscribe() {
        if (sub) {
            sub();
            sub = undefined;
        }
    }
    // Run initialize index.
    index();
    update();
    render();
    // Collapses sequential updates into a single update.
    var updateTaskId = 0;
    var onUpdate = function () {
        updateTaskId = updateTaskId || setTimeout(function () {
            updateTaskId = 0;
            update();
        }, 0);
    };
    // Hook up document listeners to automatically detect changes.
    window.addEventListener('resize', onUpdate);
    container.addEventListener('scroll', onUpdate);
    return {
        index: index,
        update: update,
        teardown: function () {
            maybeUnsubscribe();
            window.removeEventListener('resize', onUpdate);
            container.removeEventListener('scroll', onUpdate);
        }
    };
}

module.exports = main;


/***/ })

}]);
//# sourceMappingURL=vendor.js.map