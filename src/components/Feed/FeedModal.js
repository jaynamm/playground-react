import React, { useState } from 'react'
import '../../styles/Feed/Modal.css';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const FeedModal= () => {

    const [feedArticle,setFeedArticle] = useState("");

    const createFeed = () => {
        console.log(feedArticle)

        axios ({
            method : "post",
            url : "/api/feed/write",
            data : {
                "id" : "userid",
                "article" : feedArticle
            }
        }) .then((res)=>{
            console.log(res.data)

            window.location.replace('/home');
        }) .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>

            <div className="card">
                <div className="card-body">
                    <button 
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    className="form-control">
                    무슨 생각을 하고 계신가요?
                    </button>
                </div>
            </div>


            <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">게시물 만들기</h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setFeedArticle(e.target.value)}></textarea>
                            
                        </div>    
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-primary" onClick={createFeed}>게시</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedModal;