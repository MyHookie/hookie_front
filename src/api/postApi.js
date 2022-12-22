import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'https://mandarin.api.weniv.co.kr',
});

export const getMyPost = async () => {
  const { data } = await fetcher.get(
    `/post/${JSON.parse(localStorage.getItem('accountName'))}/userpost/`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-type': 'application/json',
      },
    }
  );
  return data;
};

export const getFollowPost = async () => {
  const { data } = await fetcher.get(`/post/feed/`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-type': 'application/json',
    },
  });
  return data;
};
