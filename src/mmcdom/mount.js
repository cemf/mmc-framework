const RESERVED_KEYS = {
  className: "class",
};

function replaceReservedKeys(word) {
  return RESERVED_KEYS[word] || word;
}

function mount(vNode) {
  if (typeof vNode === "string" || typeof input === "number") {
    return document.createTextNode(vNode);
  }

  const el = document.createElement(vNode.type);

  for (const [k, v] of Object.entries(vNode.props)) {
    if (k === "children") {
      continue;
    }
    if(typeof v !== 'function') {
      el.setAttribute(replaceReservedKeys(k), v);
    } else {
      const event = k.replace('on', '').toLowerCase();

      el.addEventListener(event, v);
    }
  }

  for (const child of vNode.props.children) {
    el.appendChild(mount(child));
  }

  return el;
}

export default mount;
