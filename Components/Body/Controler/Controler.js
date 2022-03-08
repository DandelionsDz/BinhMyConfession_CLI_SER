
function Controler({val, comments}) {
    const [isShowComment, setIsShowComment] = useState(false);


    return (
        <>
            <div className="d-flex flex-row w-100 px-5 py-1" style={{borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'}}>
                <Like uids={JSON.parse(val.likes).uids} likes={JSON.parse(val.likes).likes} id={val.id} />
                <Comment id={val.id} isShowComment={isShowComment} setIsShowComment={setIsShowComment}/>
            </div>

            <div className="w-100">
                <CommentList comments={comments} isShowComment={isShowComment} id={val.id}/>
            </div>
        </>
    )
}

    