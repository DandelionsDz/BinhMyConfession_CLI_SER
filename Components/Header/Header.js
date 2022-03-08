function Header({ isPreparingPosting, setIsPreparingPosting }) {


    let btnState = (isPreparingPosting ? 'btn-outline-danger' : 'btn-outline-primary');
    let userName = JSON.parse(localStorage.getItem('user')).nickname;
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    let facebookLink = JSON.parse(localStorage.getItem('user')).facebookLink;

    let [isEditInfor, setIsEditInfor] = useState(false);
    let [facebookLinkText, setfacebookLinkTex] = useState(facebookLink || '');
    let [userNameText, setUserNameText] = useState(userName || '');
    let [isInEditName, setIsInEditName] = useState(false);

    useEffect(() => {
        Swal.mixin({
            toast: true,
        }).bindClickHandler('data-swal-toast-templatess');
    }, [])


    function handleClickPreparePosting() {
        setIsPreparingPosting(!isPreparingPosting)
    }

    function handleConfim() {

        var user = {
            nickname: userNameText,
            facebookLink: facebookLinkText,
            uid: uid
        }

        localStorage.setItem('user', JSON.stringify(user));

        let textObj = encodeURIComponent(JSON.stringify(user)).replace('%20', '+');

        fetch(`${baseURL}/api/client/UpdateUser.php?userObj=${textObj}`)
            .then(res => {
                res.text().then(text => {
                    console.log(text)
                    setIsEditInfor(false);
                })
            })
    }
    return (
        <>
            <div className="introduce-header">
                <div className="thumb-nail"></div>
                <div className="d-flex flex-column align-items-center" style={{ width: '100%', position: 'relative' }}>
                    <img className="avatar-web" src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-1/163406466_119833270126118_2475129359950640704_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-5&_nc_sid=c6021c&_nc_ohc=xcqE8gmQR00AX9gBlO6&_nc_oc=AQkpt-rjn-xj01zjfTQYf_0jpP3VLFLiuUQhYHnPTS-IXYoWrm8_xU3wNRTffsq-G8jQaE4mg1173-gdT4XJxFqo&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT9wTZfBC8tx1_AJt1HGWNK0P0XlZ-WqEErXkGX5hwfLVA&oe=623E3A91" alt="" />

                    <div className="my-3 d-flex flex-column justify-content-center align-items-center">
                        <span className="text-header">Bình Mỹ Confession</span>
                        <span className="text-descri"> <i class="fa fa-home"></i> Email: abcaac@gmail.com  • Online</span>
                        <div className="show-infor-header-div">
                        <span style={{cursor: 'pointer', color:'#1780cb'}} onClick={() => setIsEditInfor(true)} className="edit-infor-btn p-1" > <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chỉnh Sửa Thông Tin</span>
                        </div>
                        <div>
                            {!isPreparingPosting ? <button style={{ marginTop: '10px' }} onClick={handleClickPreparePosting} className={`btn ${btnState}`}> <i style={{ color: isPreparingPosting ? 'red' : 'blue' }} class="fa fa-location-arrow" aria-hidden="true"></i>{isPreparingPosting ? ' Hủy đăng bài' : ' Đăng bài'}</button> : <button data-swal-toast-templatess="#my-template-warning" style={{ marginTop: '10px' }} onClick={handleClickPreparePosting} className={`btn ${btnState}`}> <i style={{ color: isPreparingPosting ? 'red' : 'blue' }} class="fa fa-location-arrow" aria-hidden="true"></i>{isPreparingPosting ? ' Hủy đăng bài' : ' Đăng bài'}</button>}
                        </div>

                        <div className="mt-2">

                            <div style={{ display: isEditInfor ? 'flex' : 'none' }} className="modal-infor">
                                <div className="d-flex infor-box">
                                    <div style={{ marginRight: '10px' }} className="d-flex justify-content-center align-items-center">
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ border: '1px solid #ccc', fontWeight: '600', width: '75px', height: '75px', borderRadius: '50%', backgroundColor: "#f0f2f5", marginRight: '10px', marginLeft: '10px' }}>
                                            {userNameText[0]}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div>
                                            {isInEditName ? <input className="input-edit-username" onChange={(e) => setUserNameText(e.target.value)} value={userNameText} /> : <span className="my-1" style={{ fontWeight: '600', display: 'inline-block' }} >{userNameText}</span>}
                                            <i onClick={() => setIsInEditName(!isInEditName)} style={{ marginLeft: '5px', cursor: 'pointer', fontSize: '1.1rem' }} class="fa fa-pencil" aria-hidden="true"></i>
                                        </div>
                                        <span style={{ fontSize: '1.2rem', display: 'inline-block' }} className="my-1"><span style={{ fontWeight: '600' }} >ID : </span> <i>{uid}</i></span>
                                        <div className="d-flex flex-column my-1">
                                            <span style={{ fontSize: '1.2rem', color: '#0066ff' }}><i style={{ color: '#0066ff' }} class="fa fa-facebook-square" aria-hidden="true"></i> Liên kết đến Facebook</span>
                                            <input onChange={(e) => setfacebookLinkTex(e.target.value)} value={facebookLinkText} className="my-2 input-facebook-link " style={{ color: '#0066ff', fontSize: '1.1rem', padding: '2px 10px', borderColor: facebookLinkText ? '#0066ff' : '#ccc' }} />
                                        </div>
                                        <button onClick={handleConfim} className="btn btn-outline-success">OK</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}