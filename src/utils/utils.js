
function noop () {}

function genId (prefix = '') {
    const ms = Date.now();
    return `${prefix + ms}`;
}

function formatTime (ms) {
    const d = new Date(ms);
    const hour = d.getUTCHours();
    const min = d.getUTCMinutes();
    return `${hour}:${min}`;
}

export {
    noop,
    genId,
    formatTime,
};
