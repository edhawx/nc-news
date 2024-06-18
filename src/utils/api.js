import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://be-nc-news-ed.onrender.com/api",
});

export const getTopics = ()=>{
    return newsApi.get("/topics").then((res)=>{
        return res.data;
    })
}

export const getArticles = (sortBy = 'created_at', topic = '', page = 1, order = 'ASC') => {
    const params = { sort_by: sortBy, p: page, limit: 10, order: order.toUpperCase() }; 
    if (topic) params.topic = topic;
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

export const getCommentsByArticleId = (article_id)=>{
    return newsApi.get(`/articles/${article_id}/comments`)
    .then((res)=> res.data)
    .catch((err)=>{
        if(err.response && err.response.status === 404){
            return {comments: [] };
        } else {
            throw err;
        }
    })
};

export const postComment = (article_id, comment) => {
    return newsApi.post(`/articles/${article_id}/comments`, comment)
      .then((res) => res.data.comment)
      .catch((err) => {
        console.error('API error:', err);
        throw err;
      });
  };

export const deleteComment = (comment_id) =>{
    return newsApi.delete(`/comments/${comment_id}`)
    .then((res) => res.data)
    .catch((err)=>{
        console.error('API error: ', err);
        throw err;
    });
};

export const voteOnArticle = (article_id, increment) => {
    return newsApi.patch(`/articles/${article_id}`, { inc_votes: increment }).then((res) => res.data);
  };

