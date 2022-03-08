
function Like({uids, likes, id}) {
    let uid = JSON.parse(localStorage.getItem('user')).uid;

    let [uidsCpn, setUidsCpn] = useState(uids);
    let [likeCLI, setLikeCLI] = useState(likes);
    let [isLiked, setIsLiked] = useState(uidsCpn.includes(uid));
    function addLike(likes, uids) {
        likes += 1;
        uids.push(uid);

        let likesObject = {likes, uids};

        fetch(`${baseURL}/api/post/Likes.php?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likesObject),
        })
        .then(res => {
            res.text().then(text => {
                setLikeCLI(likesObject.likes)
                setIsLiked(likesObject.uids.includes(uid))
            })
        })
    }

    function minusLike(likes, uids) {
        likes -= 1;
        uids = uids.filter((value, index) => {
            return value != uid;
        });

        let likesObject = {likes, uids};

        fetch(`${baseURL}/api/post/Likes.php?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likesObject),
        })
        .then(res => {
            res.text().then(text => {
                setLikeCLI(likesObject.likes)
                setIsLiked(likesObject.uids.includes(uid))
            })
        })
    }

    function handleClick() {
        
        fetch(`${baseURL}/api/post/GetLikeObject.php?id=${id}`)
        .then(res => {
            res.text().then(text => {
                let likes = JSON.parse(text).likes;
                let uids = JSON.parse(text).uids;
                
                if(uids.includes(uid)) {
                    //UnLike
                    minusLike(likes, uids)
                } else {
                    //Like
                    addLike(likes, uids)
                }
            })
        })

        
    }
    return (
        <div onClick={handleClick} className="d-flex justify-content-center align-items-center button-hover" style={{width: '50%', cursor: 'pointer', padding: '5px'}}>
            <i style={{fontSize: '22px', color: isLiked ? '#2078f4' : '#65676B'}} class={`fa ${isLiked ? 'fa-thumbs-up likedAni' : 'fa-thumbs-o-up'}`} aria-hidden="true"></i>
            <span style={{paddingLeft: '5px', color: isLiked ? '#2078f4' : '#65676B', fontWeight: '600'}}>{likeCLI || 'Thích'}</span>
        </div>
    )
}