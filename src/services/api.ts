import axios from "axios";

axios.defaults.baseURL = 'https://api.giphy.com';

const qiphyApiKey = 'W81CQiUgoFKaYXV3dsKawyirqTQdwHNw';

const giphyApiUrl = (query: string, limit: number, offset: number, api_key: string = qiphyApiKey) => {
    return `/v1/gifs/search?q=${query}&limit=${limit}&offset=${offset}&api_key=${api_key}`;
}

export default giphyApiUrl;