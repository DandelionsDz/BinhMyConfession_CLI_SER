
function PreparePosting({ isPreparingPosting, setIsPreparingPosting }) {

    const [text, setText] = useState('');

    useEffect(() => {
        Swal.mixin({
            toast: true,
        }).bindClickHandler('data-swal-toast-template');
    }, [])

    function handleOnChange(e) {

        setText(getTextValue(e))
    }

    function handleSubmitPosting() {
        fetch(`${baseURL}/api/post/addpost.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(text),
        })
            .then(res => {
                res.text().then(text => {
                    console.log(text);
                    setIsPreparingPosting(false);
                })
            })
    }

    return (
        <div className="prepare-posting-wrapper">
            <div className="mb-3" >
                <span style={{ color: '#65676B', fontWeight: '600', paddingLeft: '5px' }}>Tạo bài viết</span>
            </div>

            <div className="d-flex align-items-end flex-column prepare-posting-table">
                <textarea placeholder="Nhập nội dung confession ở đây" value={text} onChange={handleOnChange} className="w-100 form-control" rows="4" cols="50">
                </textarea>
                <button data-swal-toast-template="#my-template" onClick={handleSubmitPosting} style={{ width: '30%' }} className={`my-2 btn btn-primary ${text ? '' : 'disabled'}`}>Đăng bài</button>
            </div>
        </div>
    )
}