import Axios from 'axios';

const client = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts"
});


const getService = (url: string) => {
  client.get(url).then((response) => {
    return response;
  }).catch(error => {
    return error;
  });
}

const postService = (url: string, data: any) => {
  client.post(url, data).then((response) => {
    return response;
  }).catch(error => {
    return error;
  });
}

export {getService}