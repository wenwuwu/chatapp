
function noop () {}

function genId (prefix) {
    const ms = Date.now();
    return `${prefix + ms}`;
}

export {
    noop,
    genId,
};
