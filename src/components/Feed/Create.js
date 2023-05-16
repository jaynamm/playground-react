import React from 'react'

export default function Create(boardData) {

    
        axios({
            method: 'GET',
            url: "/api/feed/write",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "id" : "홍길동",
                "article" : boardData.article
            }
        })
            .then((res) => {
                console.log(res.data);

                let feedData = res.data.feeds;

                setFeeds(feedData);
            })
            .catch((err) => {
                console.log(err);
            })
    

    return (
        <div>Create</div>
    )
}

// 게시 버튼 크리에이트 테스트 //
