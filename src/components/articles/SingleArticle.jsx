import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";

const SingleArticle = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        getArticleById(article_id)
        .then(data=>{
            setArticle(data.article);
            setLoading(false);
        })
        .catch(err => {
            setError('Error fetching article', err);
            setLoading(false);
        })
    }, [article_id])

    if(loading) return <p>Loading article...</p>
    if(error) return <p>{error}</p>

    return (
        <div>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <p>Author: {article.author}</p>
            <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
        </div>
    );
};

export default SingleArticle;