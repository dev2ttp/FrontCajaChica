import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagoServiceService } from '../../services/service/pago-service.service';
import { interval, Subscription, from } from 'rxjs';
import { Pago } from '../../models/pago/pago';
import { Vuelto } from '../../models/pago/vuelto';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert/sweet-alert.service';
import { NgxToastrService } from '../../services/ngx-toastr/ngx-toastr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-efectivo',
  templateUrl: './pago-efectivo.component.html',
  styleUrls: ['./pago-efectivo.component.css']
})

export class PagoEfectivoComponent implements OnInit, OnDestroy {

  dineroIngresado: number;
  dinerFaltarte: number;
  montoAPagar: number;
  subCancelacion: Subscription;
  subOutPago: Subscription;
  flagOutPago: boolean = false;
  subAlertCtn: Subscription;
  subDetenerVuelto: Subscription;
  flagVuelto: boolean = false;
  flagPago: boolean = true;
  flagEstPago: boolean = false;
  flagEstVuelto: boolean = false;
  flagModalProcesandodatos: boolean = false;
  flagModalProcesandoVueltos: boolean = false;
  flagConsultaEST: boolean = false;
  flagDetenerVuelto: boolean = false;
  flagPagocan: boolean = false;

  pago: Pago = {
    montoAPagar: 0,
    dineroIngresado: 0,
    dineroFaltante: 0
  };

  vuelto: Vuelto = {
    VueltoTotal: 0,
    DineroFaltante: 0,
    DineroRegresado: 0,
    VueltoFinalizado: false
  };

  constructor(private PagoService: PagoServiceService, private router: Router, private sweetAlertService: SweetAlertService, private ngxToastrService: NgxToastrService,private route: ActivatedRoute) {
  }
  ngOnInit() {
    //this.pago.montoAPagar = (Math.round(Math.floor(Math.random() * (2000 - 100)) + 100))*10;
    //this.pago.montoAPagar = 2000//(Math.round(Math.floor(Math.random() * (10 - 1)) + 1)) * 2000
    this.pago.montoAPagar = 1500
    this.estadoDinero()
  }
  async estadoDinero() {
    try {
      var response = await this.PagoService.detallesPago2(this.pago.montoAPagar)
      console.log("estadoDinero: " + JSON.stringify(response));
      //no timer
        if (response['status']) {
          if (response['bloqueoEfectivo'] && this.flagConsultaEST == false) {
            this.flagConsultaEST = true;
            this.cancelarOp();
            this.router.navigate(['/pago']);
            //this.subEstDinero.unsubscribe();
          }
          if (response['pagoStatus'] == false) {
            if (this.pago.dineroIngresado == response['data']['dineroIngresado']) {
              if (!this.flagOutPago) {
                this.flagOutPago = true;
                this.timerOutPago();
              }
            }
            else {
              this.flagOutPago = false;
              this.subOutPago.unsubscribe();
            }
            this.pago.dineroIngresado = response['data']['dineroIngresado'];
            this.pago.dineroFaltante = response['data']['dineroFaltante'];
            
            if (this.pago.dineroFaltante > 0 && this.flagPagocan == false) {              
              setTimeout(() => { this.estadoDinero();}, 2000);
            }            
            if (this.pago.dineroFaltante == 0 && this.flagModalProcesandodatos == false) {
              this.flagModalProcesandodatos = true;
              this.sweetAlertService.CalcularOperacion("Procesando datos Por favor espere");
            }
            if (this.pago.dineroFaltante < 0) {
              this.sweetAlertService.swalClose();
              this.flagVuelto = true;
              this.flagPago = false;
              this.ngxToastrService.warn("entregando vuelto");
              //this.subEstDinero.unsubscribe();
              this.vuelto.VueltoTotal = this.pago.dineroFaltante * -1;
              this.pago.dineroFaltante = 0;
              this.estadoVuelto();
            }
          }
          else if (!this.flagEstPago) {
            this.router.navigate(['/pago']);
            this.sweetAlertService.swalSuccess("Pago realizado, imprimiendo ticket")
            this.flagEstPago = true;
            //this.subEstDinero.unsubscribe();
            //float
            this.PagoService.floatByDenomination();
          }
        }
        else if (response['status'] == false && this.flagEstPago == false) {
          this.sweetAlertService.swalWarning("Ha ocurrido un problema, intentelo nuevamente");
          this.cancelarOp();
        }      
    } catch (error) {
      console.log(error);
    }
  }
  async estadoVuelto() {
    try {
      var response = await this.PagoService.detallesVuelto(this.vuelto.VueltoTotal)
      console.log("estadoVuelto: " + JSON.stringify(response));
      //no timer
        if (response['status']) {
          if (response['bloqueoEfectivo'] && this.flagConsultaEST == false) {
            this.flagConsultaEST = true;
            this.detenerVuelto();
            this.router.navigate(['/pago']);
            //this.subStdVuelto.unsubscribe();
          }
          if (response['pagoStatus'] == false) {
            if (this.vuelto.DineroFaltante == response['data']['dineroFaltante']) {
              if (!this.flagDetenerVuelto) {
                this.flagDetenerVuelto = true;
                this.timerDetenerVuelto();
              }
            }
            else {
              this.flagOutPago = false;
              this.subOutPago.unsubscribe();
              if (this.subDetenerVuelto) {
                this.subDetenerVuelto.unsubscribe();
              }
            }
            this.vuelto.VueltoFinalizado = response['data']['vueltoFinalizado'];
            this.vuelto.DineroFaltante = response['data']['dineroFaltante'];
            this.vuelto.DineroRegresado = response['data']['dineroRegresado'];
            var vueltoFinilazado = response['data']['vueltoFinalizado'];

            if (this.vuelto.DineroFaltante == 0 && this.flagModalProcesandoVueltos == false) {
              this.flagModalProcesandoVueltos = true;
              this.sweetAlertService.CalcularOperacion("Procesando datos Por favor espere");
            }         
          }
          else if (!this.flagEstVuelto || vueltoFinilazado == true) {
            this.router.navigate(['/pago']);
            this.sweetAlertService.swalSuccess("Pago realizado, imprimiendo ticket")
            //this.subStdVuelto.unsubscribe();
            this.flagEstVuelto = true;
            //float
            this.PagoService.floatByDenomination();
          }         
        }
        else {
          this.sweetAlertService.swalError();
          this.router.navigate(['/pago']);
          //this.subStdVuelto.unsubscribe();
        }
        if (vueltoFinilazado == false) {
          setTimeout(() => { this.estadoVuelto();}, 2000);
        }       
    } catch (error) {
      console.log(error);
    }
  }
  async cancelarOp() {
    try {
      this.flagPagocan = true;
      //this.subEstDinero.unsubscribe();
      this.sweetAlertService.swalLoading("Cancelando operacion");
      var response = await this.PagoService.cancelarOp();
      if (response['status']) {
        this.timerCancelacionPago();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async estadoCancelacionPago() {
    try {
      var response = await this.PagoService.estadoCancelacion();
      console.log("estadoCancelacionPago: " + JSON.stringify(response));
      if (response['cancelacionCompleta'] == true && response['entregandoVuelto'] == false) {
        this.router.navigate(['/pago']);
        Swal.close();
        this.subCancelacion.unsubscribe();
      }
      else if (response['cancelacionCompleta'] == false && response['entregandoVuelto'] == true) {
      }
    } catch (error) {
      console.log(error)
    }
  }
  async cancelaTimeOutPago() {
    if (this.subOutPago) this.subOutPago.unsubscribe();
    if (this.subCancelacion) this.subCancelacion.unsubscribe();
    if (this.subAlertCtn) this.subAlertCtn.unsubscribe();
    this.sweetAlertService.swalTimeOutPago();
    this.subAlertCtn = this.sweetAlertService.confirmation.subscribe(data => {
      if (data == "cancelar") {
        this.cancelarOp();
        this.subAlertCtn.unsubscribe();
      }
      else if (data == "continuar") {
        this.flagPagocan = false;
        this.flagOutPago = false;
        this.estadoDinero();
        this.subAlertCtn.unsubscribe();
      }
    });
  }
  async detenerVuelto() {
    var response = await this.PagoService.detenerVuelto();
  }
  timerCancelacionPago() {
    const source = interval(2000);
    this.subCancelacion = source.subscribe(val => this.estadoCancelacionPago());
  }
  timerOutPago() {
    const source = interval(120000);
    this.subOutPago = source.subscribe(val => this.cancelaTimeOutPago());
  }
  timerDetenerVuelto() {
    const source = interval(60000);
    this.subDetenerVuelto = source.subscribe(val => this.detenerVuelto());
  }
  ngOnDestroy() {
    if (this.subOutPago) this.subOutPago.unsubscribe();
    if (this.subCancelacion) this.subCancelacion.unsubscribe();
    if (this.subAlertCtn) this.subAlertCtn.unsubscribe();
    if (this.subDetenerVuelto) this.subDetenerVuelto.unsubscribe();
  }
}
