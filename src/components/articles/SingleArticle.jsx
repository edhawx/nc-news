import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../../utils/api";
import CommentList from "../comments/CommentList";
import './articles.css'

const SingleArticle = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        Promise.all([getArticleById(article_id), getCommentsByArticleId(article_id)])
        .then(([articleData, commentsData])=>{
            setArticle(articleData.article);
            setComments(commentsData.comments);
            setLoading(false);
        })
        .catch(err => {
            setError('Error fetching article/comments', err);
            setLoading(false);
        })
    }, [article_id])

    if(loading) return <p>Loading article...</p>
    if(error) return <p>{error}</p>

    return (
        <div className="article-card">
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <p>Author: {article.author}</p>
            <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
            <CommentList comments={comments}/>
        </div>
    );
};

export default SingleArticle;