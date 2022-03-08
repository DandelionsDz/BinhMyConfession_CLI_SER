const useState = React.useState;
const useRef = React.useRef;
const useEffect = React.useEffect;
const useLayoutEffect = React.useLayoutEffect;
const useMemo = React.useMemo;
const useCallback = React.useCallback;
const useContext = React.useContext;
const baseURL = "http://localhost";

function getTextValue(e) {
    return e.target.value;
}

function HandleHavingCreatedUser(user) {
    let userClean = user.nickname;
    user.nickname = encodeURIComponent(user.nickname).replace('%20','+');
    user.uid = encodeURIComponent(user.uid).replace('%20','+');
    fetch(`${baseURL}/api/client/RegisterUser.php?nickname=${user.nickname}&uid=${user.uid}`)
        .then(res => {
            res.text().then(text => {
                console.log(text);
                if (text === "ok") {
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
                    ReactDOM.render(<App />, document.getElementById('root'));

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: `Xin chào ${userClean}, cảm ơn bạn đã tham gia`
                      })
                }
            })
        })
}

class Timer {
    static calcTime(currentTime, createdTime) {
        let minutes = Math.floor((currentTime.getTime() - createdTime.getTime()) / (60 * 1000));

        if (minutes < 60) {
            let text = (minutes + " phút trước");
            return text.indexOf('0') == 0 ? text.replace("0 phút trước", "Vừa xong") : text;
        }
        if (minutes > 60 && minutes < (24 * 60)) {
            return (Math.floor(minutes / 60) + " giờ " + minutes % 60 + " phút trước").replace("0 phút trước", " phút trước")
        }

        if (minutes > (24 * 60)) {
            return (Math.floor(minutes / (60 * 24)) + " ngày trước")
        }
    }

    static calcTimeWithMilis(createdTime, currentTime = new Date().getTime()) {
        let minutes = Math.floor((currentTime - createdTime) / (60 * 1000));

        if (minutes < 60) {
            let text = (minutes + " phút trước");
            return text.indexOf('0') == 0 ? text.replace("0 phút trước", "Vừa xong") : text;
        }
        if (minutes > 60 && minutes < (24 * 60)) {
            return (Math.floor(minutes / 60) + " giờ " + minutes % 60 + " phút trước").replace("0 phút trước", " phút trước")
        }

        if (minutes > (24 * 60)) {
            return (Math.floor(minutes / (60 * 24)) + " ngày trước")
        }
    }
}

class StringVerify {
    static clearObsceneWords(string) {
        //Bất đắc dĩ thôi nhe 
        let obsceneWordsList = ['đụ', 'địt', 'cặc', 'lồn', 'đĩ', 'bitch', 'đỉ'];
        let regex = new RegExp(obsceneWordsList.toString().replace(/,/g, '|'), 'gi');
        return string.replace(regex,'***');
    }
}

class SortCommentByTime {
    static Oldest(comments) {
        comments.sort((a,b) => (+a.createdday) - (+b.createdday));

        return comments;
    }

    static Newest(comments) {
        comments.sort((a,b) => (+b.createdday) - (+a.createdday));

        return comments;
    }
}

class CountComment {
    static countWithReplies(comments) {
        let count = 0;
        count+=comments?.length;

        comments.map(value => {

            count+=value.replies?.length;
        })
        return count;
    }
}

