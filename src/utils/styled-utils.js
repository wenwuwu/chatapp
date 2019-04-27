// import { css } from 'styled-components';

const getStyleProps = function (props = {}, allowedProps = []) {
    if (!Array.isArray(allowedProps)) {
        throw "IllegalArgumentException: allowedProps must be an Array.";
    }
    if (typeof props !== 'object') {
        throw "IllegalArgumentException: props must be a plain Object.";
    }

    const obj = {};

    allowedProps.forEach((name) => {
        if (props[name]) {
            obj[name] = true;
        }
    });

    return obj;
}

const ellipsisWithWidth = function (width, isMax = false) {
    if (typeof isMax !== 'boolean') {
        throw "IllegalArgumentException: isMax must be a Boolean.";
    }

    const key = isMax ? 'max-width' : 'width';

    return `
        ${key}: ${width};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;
};

export {
    ellipsisWithWidth,
    getStyleProps,
};
