const baseUrl = process.env.REACT_APP_NODE;

const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {

        return fetch(url);

    } else {

        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    }

}

const fetchConToken = (endpoint, data, method = 'GET', formData = false) => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {

        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });

    } else {

        return fetch(url, {
            method,
            headers: !formData
                ? {
                    'Content-type': 'application/json',
                    'x-token': token
                }
                : {
                    'x-token': token
                },
            body: !formData ? JSON.stringify(data) : data
        });

    }

}


export {
    fetchSinToken,
    fetchConToken
}