
function Comment({setIsShowComment ,isShowComment, id}) {

    return (
        <div onClick={() => setIsShowComment(!isShowComment)} className="d-flex justify-content-center align-items-center button-hover" style={{width: '50%', cursor: 'pointer',  padding: '5px'}}>
            <i style={{fontSize: '22px', color: '#65676B'}} class="fa fa-comments-o" aria-hidden="true"></i>
            <span style={{paddingLeft: '5px', color: '#65676B', fontWeight: '600'}}>{`Bình Luận`}</span>
        </div>
    )
}