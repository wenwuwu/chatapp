
// import fetch from 'isomorphic-fetch';

export function save (state) {
    fetch('/cards/state', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state),
        credentials: 'same-origin'
    })
    .then( res => console.log(`${res.status} ${res.statusText}`),
           err => console.log(err.message) );
};
