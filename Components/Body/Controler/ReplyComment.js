function ReplyComment() {
    return (
        <div style={{ marginBottom: '10px' }} className="d-flex reply-cmt">
            <div><img style={{ width: '35px', height: 'auto', borderRadius: '50%', marginRight: '10px', marginLeft: '10px' }} src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-1/163406466_119833270126118_2475129359950640704_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-5&_nc_sid=c6021c&_nc_ohc=xcqE8gmQR00AX9gBlO6&_nc_oc=AQkpt-rjn-xj01zjfTQYf_0jpP3VLFLiuUQhYHnPTS-IXYoWrm8_xU3wNRTffsq-G8jQaE4mg1173-gdT4XJxFqo&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT9wTZfBC8tx1_AJt1HGWNK0P0XlZ-WqEErXkGX5hwfLVA&oe=623E3A91" alt="" /></div>
            <div>
                <div className="d-flex flex-column" style={{ color: '#05050', backgroundColor: '#f0f2f5', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>Lê Vũ PHi</span>
                    <span style={{ marginTop: '5px', lineHeight: '1.5' }}>Ai Mà Biết Đâu À Ai Mà Biết Đâu Biết À Ai Mà Biết Đâu  Ai Mà Biết Đâu Ai Mà Biết Đâu À Ai Mà Biết Đâu  Ai Mà Biết Đâu  </span>
                </div>
                <span className="reply-span" style={{ color: '#1c1e21 ' }}>Phản Hồi</span>
            </div>
        </div>
    )
}