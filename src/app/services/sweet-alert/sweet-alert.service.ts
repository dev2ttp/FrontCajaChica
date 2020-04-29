import { Injectable, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  @Output() confirmation: EventEmitter<any> = new EventEmitter();
  constructor() { }

  swalInfo(message: string): void {
    Swal.fire(message);
  }
  swalSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  swalWarning(message: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Ups...',
      text:message,
      showConfirmButton: false,
    });
  }
  swalErrorM(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: message,
      confirmButtonColor: '#36ABAC',
    });
  }
  swalError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: '¡Algo salió mal!',
      confirmButtonColor: '#36ABAC',
    });
  }
  swalConfirmDialog(data): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#36ABAC',
      cancelButtonColor: '#E06162',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.value) {
        this.confirmation.emit(data);
      }
    });
  }
  cargando(data): void {
    Swal.fire({
      title: 'Iniciando proceso de pago',
      text: '¡Se esta iniciando el proceso \nPor favor espere !',
      icon: 'warning',
    }).then((result) => {
      if (result.value) {
        this.confirmation.emit(data);
      }
    });
  }
  swalPrint(text: string): void {
    Swal.fire({
      imageUrl: 'assets/img/print.gif',
      imageAlt: 'Imprimiendo',
      imageHeight: 249,
      imageWidth: 224,
      title: text,
      width: '100%',
      position: 'center',
      showConfirmButton: false,
      customClass: {
        popup: 'border-blue',
        title: 'flex-direction',
      }
    });
  }
  swalLoading(text: string): void {
    const html =
      '<div class="d-flex justify-content-center pt-3">' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '</div>';
    Swal.fire({
      html,
      footer: '<span class="sweet-alert-title"> ' + text + '</span>',
      width: '50%',
      position: 'center',
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        title: 'flex-direction',
        footer: 'border border-0 mt-0 pt-0',
      }
    });
  }

  CalcularOperacion(text: string): void {
    const html =
      '<div class="d-flex justify-content-center pt-3"> ' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '<div class="spinner-grow text-primary"></div>' +
      '<div class="spinner-grow text-info"></div>' +
      '</div>';
    Swal.fire({
      html,
      footer: '<span class="sweet-alert-title"> ' + text + '</span>',
      width: '70%',
      position: 'center',
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        title: 'flex-direction',
        footer: 'border border-0 mt-0 pt-0',
      }
    });
  }
  swalErrorPromise(message: string): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: '¡Algo salió mal!',
      text: message,
      confirmButtonColor: '#36ABAC',
    });
  }
  swalTimeOutPago(): void {
    let timerInterval
    Swal.fire({
      icon: 'warning',
      title: 'Desea continuar!',
      html: 'La operacion se cancelara en <b></b> milisegundos.',
      timer: 5000,
      showCancelButton: false,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#E06162',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, continuar',
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
        //Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('b').textContent = Swal.getTimerLeft().toString();
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.value) {
        this.confirmation.emit("continuar");
      }
      if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.timer
      ) {
        this.confirmation.emit("cancelar");
      }
    })
  }
  swalClose(): void {
    Swal.close();
  }
}
