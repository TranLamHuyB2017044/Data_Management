import Swal from 'sweetalert2';
class MyAlert {
    Alert(icon, title) {
        Swal.fire({
            position: 'top',
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    Confirm(title, icon, text, confirmButtonText) {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
        }).then((result) => {
            return result.isConfirmed;
        });
    }
}
export default new MyAlert();
