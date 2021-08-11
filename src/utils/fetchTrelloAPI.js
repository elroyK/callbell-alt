const fetchTrelloAPI = (
    endpoint,
    method,
    params = {},
    onSuccess = res => console.log(res),
    onError = error => console.log(error),
) => {
    let url = process.env.REACT_APP_TRELLO_API_BASEURL;
    url += endpoint;
    url += `?key=${process.env.REACT_APP_TRELLO_KEY}`;
    url += `&token=${process.env.REACT_APP_TRELLO_TOKEN}`;

    Object.keys(params).forEach(param => {
        url += `&${param}=${params[param]}`
    });

    fetch(url, {
        method,
    })
    .then(onSuccess)
    .catch(onError);
};

export default fetchTrelloAPI;
