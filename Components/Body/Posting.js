function Posting() {
    let [postings, setPostings] = useState([]);
    let [offset, setOffset] = useState(0);
    let [isOver, setIsOver] = useState(false);

    useEffect(() => {

       if(postings.length <= 0) {
        fetch(`${baseURL}/api/post/GetPost.php?offset=${offset}`)
        .then(res => {
            res.text().then(arrayJson => {
                //parseJsonToJsType
                arrayJson = JSON.parse(arrayJson);
                for (var key in arrayJson) {
                    let currentDay = new Date();
                    let createdDay = new Date(arrayJson[key].createdday);
                    let timeText = Timer.calcTime(currentDay, createdDay);
                    arrayJson[key].createdday = timeText;
                    arrayJson[key].content = JSON.parse(arrayJson[key].content);
                }

                setPostings(arrayJson);
                setOffset(pre => pre+2);
            })
        });
       }

    }, [])

    function handleLoadMore() {
        fetch(`${baseURL}/api/post/GetPost.php?offset=${offset}`)
        .then(res => {
            res.text().then(arrayJson => {
                //parseJsonToJsType
                arrayJson = JSON.parse(arrayJson);
                if(arrayJson.length >=1 ) {
                    for (var key in arrayJson) {
                        let currentDay = new Date();
                        let createdDay = new Date(arrayJson[key].createdday);
                        let timeText = Timer.calcTime(currentDay, createdDay);
                        arrayJson[key].createdday = timeText;
                        arrayJson[key].content = JSON.parse(arrayJson[key].content);
                    }
    
                    setPostings((pre) => {
                        return [...pre, ...arrayJson];
                    });
                    setOffset(pre => pre+2);
                } else {
                    setIsOver(true);
                }
            })
        });   
    }

    return (
        <div className="posting-wrapper">

            <div className="mb-3" >
                <span style={{ color: '#65676B', fontWeight: '600', paddingLeft: '5px' }}>Bài viết</span>
            </div>

            {
                postings.map((val, index) => (
                    <div className="posting-table">

                        <div style={{ height: '50px' }} className="w-100 d-flex flex-row">
                            <div className="">
                                <img className="avatar-sm" src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-1/163406466_119833270126118_2475129359950640704_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-5&_nc_sid=c6021c&_nc_ohc=xcqE8gmQR00AX9gBlO6&_nc_oc=AQkpt-rjn-xj01zjfTQYf_0jpP3VLFLiuUQhYHnPTS-IXYoWrm8_xU3wNRTffsq-G8jQaE4mg1173-gdT4XJxFqo&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT9wTZfBC8tx1_AJt1HGWNK0P0XlZ-WqEErXkGX5hwfLVA&oe=623E3A91" alt="" />
                            </div>
                            <div style={{ marginLeft: '10px' }} className="d-flex flex-column">
                                <span className="d-flex justify-content-center align-items-center" style={{ height: '50%', fontSize: '16px', fontWeight: '600' }}>Bình Mỹ Confession</span>
                                <span style={{ height: '50%', fontSize: '13px', fontWeight: '600', color: '#666666' }}>{val.createdday}</span>
                            </div>
                        </div>

                        <div style={{ paddingLeft: '5px' }}>
                            <div style={{ width: '100%', height: '8px' }}></div>
                            <a href="#">{`#CFS_${val.id}`}</a>

                            {
                                val.content.map((value, index) => (
                                    <>
                                        <div style={{ width: '100%', height: '8px' }}><hr /></div>
                                        <span className="cfs-span">{`${index + 1}/ ${value}`}</span>  <br />
                                    </>
                                ))
                            }
                            <div className="d-flex justify-content-end" style={{ marginTop: '20px' }}><span style={{ borderTop: '1px solid #ccc', display: 'inline-block', padding: '10px 2px', textAlign: 'end', fontSize: '14px', color: 'rgb(101, 103, 107)', fontWeight: '400' }}>{`${CountComment.countWithReplies(JSON.parse(val.comments))} bình luận`}</span></div>
                            <Controler comments={JSON.parse(val.comments)} val={val} />
                        </div>
                    </div>
                ))}

            <div className="w-100 centerwithflex">
            {!isOver ? <span onClick={handleLoadMore} className="loadmore-span my-1" style={{display: 'inline-block',cursor: 'pointer', height: '50%', fontSize: '16px', fontWeight: '600', color: '#666666' }}>Hiển thị thêm...</span> : <span className="my-1" style={{display: 'inline-block', height: '50%', fontSize: '16px', fontWeight: '600', color: '#666666' }}>Đã Hết !</span>}
            </div>
        </div>
    )
}