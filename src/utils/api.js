import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://be-nc-news-ed.onrender.com/api",
});

export const getTopics = ()=>{
    return newsApi.get("/topics").then((res)=>{
        return res.data;
    })
}

export const getArticles = (sortBy = 'created_at', topic = '', page = 1) => {
    const params = { sort_by: sortBy, p: page, limit: 10 }; 
    if (topic) params.topic = topic;
    if(sortBy === 'title' || sortBy === 'author') params.order = 'ASC';
    return newsApi.get('/articles', { params }).then((res) => res.data);
  };

export const getArticleById = (article_id)=>{
    return newsApi.get(`/articles/${article_id}`).then((res) => res.data);
}

export const getLinks = ()=>{
    return newsApi.get("/topics").then((res)=>{
        return res.data;
    })
}


