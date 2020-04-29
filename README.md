# Boilerplate

Este proyecto se generó con [Angular CLI] (https://github.com/angular/angular-cli) versión 8.0.2, sirve de base para el inicio de otras aplicaciones. 

## Herramientas y modulos usados

### Bootstrap

- https://getbootstrap.com/

### Material Design

- https://material.angular.io

### Iconos - Fontawesome

- https://fontawesome.com/

### Jquery

- https://jquery.com/

### Moment - Manejo de fechas 

- https://momentjs.com/

### Ngx-toastr - Notificaciones animadas

- https://ngx-toastr.netlify.com/

### Animaciones

- https://daneden.github.io/animate.css/

### Ng2-rut - Manejar la validación, limpieza y formateo del RUT en Chile.

- https://github.com/platanus/ng2-rut

## Modals

### Sweetalert2 

- https://sweetalert2.github.io/

### Ngx-bootstrap

- https://valor-software.com/ngx-bootstrap/#/modals

## Teclados virtuales

### Ngx-material-keyboard

- https://ngx-material-keyboard.github.io/core/

Para personalizar el uso del teclado se cuenta con un archivo en la siguiente ruta: 'src\app\custom\keyboard.ts'

Es necesario incluir la personalización en los providers de app.module.ts.
```sh
providers: [{ provide: MAT_KEYBOARD_LAYOUTS, useValue: customMaterialKeyboard }]
```
