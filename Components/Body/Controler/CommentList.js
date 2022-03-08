function ReplyComment({SetUidAuthorForReplies, uidAuthor, uidAuthorReply, content, createdday, authorNameCommentHint, setAuthorNameCommentHint, isShowReplyInput, setIsShowReplyInput }) {

    let [authorReplyObj, setAuthorReplyObj] = useState();
    let [authorObj, setAuthorObj] = useState();

    useLayoutEffect(() => {
        if(!authorReplyObj || !authorObj) {
            fetch(`${baseURL}/api/client/GetInforUser.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uidAuthorReply),
            })
                .then(res => {
                    res.text().then(text => {
                        setAuthorReplyObj(JSON.parse(text));
                    })
                })

                if(!authorObj) {
                    fetch(`${baseURL}/api/client/GetInforUser.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(uidAuthor),
                    })
                        .then(res => {
                            res.text().then(text => {
                                setAuthorObj(JSON.parse(text));
                            })
                        })       
        }
    }
    }, [])

    function handleClick(nameAuthor) {
        SetUidAuthorForReplies(uidAuthorReply);
        if (nameAuthor != authorNameCommentHint && authorNameCommentHint != '') {
            setIsShowReplyInput(isShowReplyInput);
            setAuthorNameCommentHint(nameAuthor);
        } else {
            setIsShowReplyInput(!isShowReplyInput);
            setAuthorNameCommentHint(nameAuthor);
        }
    }

    function handleClickOnAvt() {
        if(authorReplyObj.facebookLink) {
            document.location.href = authorReplyObj.facebookLink;
        }
    }

    return (
        <div style={{ marginBottom: '10px' }} className="d-flex reply-cmt">
            <div>
                <div
                    title={`Đi đến trang cá nhân facebook của ${authorReplyObj?.nickname}`}
                    onClick={handleClickOnAvt}
                    className="d-flex justify-content-center align-items-center"
                    style={{cursor: 'pointer', border: '1px solid #ccc', fontWeight: '600', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: "#f0f2f5", marginRight: '10px', marginLeft: '10px' }}>
                    {authorReplyObj ? authorReplyObj.nickname[0] : ''}
                </div>
            </div>
            <div>
                <div className="d-flex flex-column" style={{ color: '#05050', backgroundColor: '#f0f2f5', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>{authorReplyObj ? authorReplyObj.nickname : ''}</span>
                    <span style={{ marginTop: '5px', lineHeight: '1.5' }}><span style={{ fontWeight: '600', marginRight: '5px' }}>{`@${authorObj ? authorObj.nickname : ''}`}</span>{StringVerify.clearObsceneWords(content)}</span>
                </div>
                <span onClick={() => handleClick(authorReplyObj?.nickname)} className="reply-span" style={{ color: '#1c1e21 ' }}>Phản Hồi</span>
                <span style={{ fontSize: '11px', fontWeight: '400', color: '#65676b' }}>{Timer.calcTimeWithMilis(+createdday)}</span>
            </div>
        </div>
    )
}

function MainComment({ comments, setComment, maincomment, idMainComment, id }) {

    let [isShowReplyInput, setIsShowReplyInput] = useState(false);
    let [authorNameCommentHint, setAuthorNameCommentHint] = useState('');
    let [isShowReplyComment, setIsShowComment] = useState(false);
    let [uidAuthorForReplies, SetUidAuthorForReplies] = useState('');
    let [userObj, setUserObj] = useState('');

    useLayoutEffect(() => {
        if(!userObj) {
            fetch(`${baseURL}/api/client/GetInforUser.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(maincomment.uidAuthor),
            })
                .then(res => {
                    res.text().then(text => {
                        setUserObj(JSON.parse(text));
                    })
                })
        }
    }, [])

    function handleClick(nameAuthor) {
        SetUidAuthorForReplies(maincomment.uidAuthor);
        if (nameAuthor != authorNameCommentHint && authorNameCommentHint != '') {
            setIsShowReplyInput(isShowReplyInput);
            setAuthorNameCommentHint(nameAuthor);
        } else {
            setIsShowReplyInput(!isShowReplyInput);
            setAuthorNameCommentHint(nameAuthor);
        }
    }

    function handleClickViewReply() {
        setIsShowComment(true)
    }

    function handleClickOnAvt() {
        if(userObj.facebookLink) {
            document.location.href = userObj.facebookLink;
        }
    }

    return (
        <div style={{ marginBottom: '10px' }} className="d-flex main-cmt">
            <div>
                <div
                      title={`Đi đến trang cá nhân facebook của ${userObj?.nickname}`}
                    onClick={handleClickOnAvt}
                    className="d-flex justify-content-center align-items-center"
                    style={{ cursor: 'pointer',border: '1px solid #ccc', fontWeight: '600', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: "#f0f2f5", marginRight: '10px', marginLeft: '10px' }}>
                    {userObj.nickname ? userObj.nickname[0] : '!!!'}
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <div className="d-flex flex-column" style={{ width: 'fit-content', color: '#05050', backgroundColor: '#f0f2f5', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>{userObj.nickname || 'Không biết'}</span>
                    <span style={{ marginTop: '5px', lineHeight: '1.5' }}>{StringVerify.clearObsceneWords(maincomment.content)}</span>
                </div>
                <span onClick={() => handleClick(userObj.nickname)} className="reply-span" style={{ color: '#1c1e21 ' }}>Phản Hồi</span>
                <span style={{ fontSize: '11px', fontWeight: '400', color: '#65676b' }}>{Timer.calcTimeWithMilis(+maincomment.createdday)}</span>
                {isShowReplyComment ? maincomment.replies.map(replyComment => {
                    return (
                        <>
                            <ReplyComment SetUidAuthorForReplies={SetUidAuthorForReplies} uidAuthorReply={replyComment.uidAuthorReply} uidAuthor={replyComment.uidAuthor} setAuthorNameCommentHint={setAuthorNameCommentHint} authorNameCommentHint={authorNameCommentHint} isShowReplyInput={isShowReplyInput} setIsShowReplyInput={setIsShowReplyInput} createdday={replyComment.createdday} content={replyComment.content}/>
                        </>
                    )
                }) : (maincomment.replies.length > 0 ? <span onClick={() => handleClickViewReply()} className="span-view-reply">Xem phản hồi</span> : '')}
                {isShowReplyInput && <InputComment uidAuthorForReplies={uidAuthorForReplies} id={id} maincomment={maincomment} comments={comments} setComment={setComment} idMainComment={idMainComment} Author={authorNameCommentHint} />}
            </div>
        </div>
    )
}

function InputCommentWithNoPrefix({ id, maincomment, setComment }) {
    let [inputCommentValue, setInputCommentValue] = useState('');

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            //SubmitComment
            let userName = JSON.parse(localStorage.getItem('user')).nickname;
            let uid = JSON.parse(localStorage.getItem('user')).uid;
            let facebookLink = JSON.parse(localStorage.getItem('user')).facebookLink;

            fetch(`${baseURL}/api/post/getcomment.php?id=${id}`)
                .then(respone => {
                    respone.text().then(text => {
                        let textJson = JSON.parse(text);
                        let commentFromServer = JSON.parse(textJson[0].comments);

                        let newDataPush = [...commentFromServer, {
                            idMainComment: 'young' + new Date().getTime(),
                            content: inputCommentValue,
                            uidAuthor: uid,
                            createdday: '' + new Date().getTime(),
                            replies: []
                        }];

                        setComment([...SortCommentByTime.Newest(newDataPush)]);

                        addComment(newDataPush);

                        setInputCommentValue('');

                    })
                })
        }
    }

    function addComment(commentsNew) {
        var jsonText = JSON.stringify(commentsNew);
        fetch(`${baseURL}/api/post/addcomment.php?isreply=false&id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonText,
        })
            .then(res => {
                res.text().then(text => {
                    console.log(text)
                })
            })
    }

    return (
        <div className="d-flex align-items-center" style={{ marginTop: '8px', marginBottom: '8px' }}>
            <div>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ border: '1px solid #ccc', fontWeight: '600', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: "#f0f2f5", marginRight: '10px', marginLeft: '10px' }}>
                    {JSON.parse(localStorage.getItem('user')).nickname[0]}
                </div>
            </div>
            <input className="input-comment" onKeyDown={handleKeyDown} onChange={(e) => setInputCommentValue(e.target.value)} value={inputCommentValue} placeHolder="Viết bình luận..." />
        </div>
    )

}

function InputComment({ uidAuthorForReplies, id, comments, maincomment, setComment, Author, idMainComment }) {
    let [prefixHint, setPrefixHint] = useState(Author ? '@' + Author : '');
    let [inputCommentValue, setInputCommentValue] = useState('');

    let userName = JSON.parse(localStorage.getItem('user')).nickname;
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    let facebookLink = JSON.parse(localStorage.getItem('user')).facebookLink;

    useEffect(() => {
        setPrefixHint(Author ? '@' + Author : '');
    })


    function handleKeyDown(e) {
        if (e.key === "Enter") {
            //SubmitComment

            fetch(`${baseURL}/api/post/getcomment.php?id=${id}`)
                .then(respone => {
                    respone.text().then(text => {
                        let textJson = JSON.parse(text);
                        let commentFromServer = JSON.parse(textJson[0].comments);

                        let replyComment = {
                            content: inputCommentValue,
                            createdday: new Date().getTime(),
                            uidAuthorReply: uid,
                            uidAuthor: uidAuthorForReplies
                        }

                        for (let key in commentFromServer) {
                            if (commentFromServer[key].idMainComment == idMainComment) {
                                commentFromServer[key].replies.push(replyComment);
                                break;
                            }
                        }

                        setComment([...commentFromServer]);

                        addComment(commentFromServer);

                        setInputCommentValue('');

                    })
                })
        }
    }

    function handleOnChange(e) {
        if ((e.target.value).indexOf(prefixHint) >= 0) {
            let textWithoutPrefix = (e.target.value).replace(prefixHint, '').slice(1);
            console.log(textWithoutPrefix);
            setInputCommentValue(textWithoutPrefix);
        } else {
            //Error
            setInputCommentValue('');
        }
    }

    function addComment(commentsNew) {
        var jsonText = JSON.stringify(commentsNew);
        var jsonTextUrl = encodeURIComponent(jsonText).replace('%20', '+');
        fetch(`${baseURL}/api/post/addcomment.php?isreply=true&id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonText,
        })
            .then(res => {
                res.text().then(text => {
                    console.log(text)
                })
            })
    }

    return (
        <div className="d-flex align-items-center" style={{ marginTop: '8px', marginBottom: '8px' }}>
            <div>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ border: '1px solid #ccc', fontWeight: '600', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: "#f0f2f5", marginRight: '10px', marginLeft: '10px' }}>
                    {JSON.parse(localStorage.getItem('user')).nickname[0]}
                </div>
            </div>
            <input className="input-comment" onKeyDown={handleKeyDown} onChange={handleOnChange} value={`${prefixHint} ${inputCommentValue}`} placeHolder="Viết bình luận..." />
        </div>
    )
}

function NameUser() {

    let userName = JSON.parse(localStorage.getItem('user')).nickname;

    return (
        <div className="d-flex justify-content-center my-4 p-2" style={{ marginLeft: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <span style={{ color: '#1c1e21', fontSize: '16px', fontWeight: '400' }}></span>
            <span style={{ color: '#1c1e21', fontSize: '15px', fontWeight: '600' }}> {userName}</span>
        </div>
    )
}


function CommentList({ comments, id, isShowComment }) {

    let [comment, setComment] = useState(SortCommentByTime.Newest(comments));

    return (
        <>
            <div className="w-100" style={{ display: isShowComment ? 'block' : 'none' }}>

                <NameUser />

                <InputCommentWithNoPrefix setComment={setComment} maincomment={comment} id={id} />


                {comment.map((value, index) => {
                    return (
                        <>
                            <MainComment id={id} setComment={setComment} comments={comment} idMainComment={value.idMainComment} maincomment={value} />
                        </>
                    )
                })}
            </div>
        </>
    )
}