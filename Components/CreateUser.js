
function CreateUser() {
    function SaveUserIntoLocal(nickname) {
        var user = {
            nickname,
            facebookLink : '',
            uid: new Date().getTime() + ''
        }

        localStorage.setItem('user', JSON.stringify(user));

        HandleHavingCreatedUser(user);
    }
    function POPUP() {
        Swal.fire({
            title: 'Nhập Tên Hiển Thị',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: false,
            confirmButtonText: 'Tham Gia',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
               if(!login) {
                Swal.showValidationMessage(
                    `Không được để trống`
                  )
               } else {
                 SaveUserIntoLocal(login);
               }
            },
            allowOutsideClick: () => {
                Swal.showValidationMessage(
                    `Bạn cần nhập tên hiển thị !`
                  ) 
            }
          })}

          POPUP();


          return (
            <div style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center">
                
            </div>
        )
    }

