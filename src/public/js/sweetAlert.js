//hacemos referencia al boton con ese id
//muestra alerta al eliminar un usuario
$('.btn-eUser').click((e)=>{
    //e.target.value elige el valor que esta dentro del arreglo de valores
    let link = e.target.value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas eliminar esto?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        background:'#3e3a49',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Elimínalo!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta delete/:id<-(e)
            window.location.href = '/usuarios/delete/'+link;
        } 
      })
})
  
$('.btn-eSoli').click((e)=>{
    //e.target.value elige el valor que esta dentro del arreglo de valores
    let link = e.target.value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas enviar una solicitud?',
        text: "Esta acción enviará tu perfil a la empresa!",
        icon: 'warning',
        background:'#3e3a49',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Enviar!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta delete/:id<-(e)
            window.location.href = '/empleo/sendSol/'+link;
        } 
      })
})

$('.btn-delSoli').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que deseas eliminar la solicitud?',
      text: "Esta acción eliminará la solicitud!",
      icon: 'warning',
      background:'#3e3a49',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminala!',
      cancelButtonText: ' No, Cancelalo!',
      reverseButtons: true
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          //redirecciona a la ruta delete/:id<-(e)
          window.location.href = '/empleo/deleteSol/'+link;
      } 
    })
})

$('.btn-delJob').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que deseas eliminar este trabajo?',
      text: "Esta acción eliminará el trabajo seleccionado!",
      icon: 'warning',
      background:'#3e3a49',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: ' No, Cancelalo!',
      reverseButtons: true
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          //redirecciona a la ruta delete/:id<-(e)
          window.location.href = '/empleo/delete/'+link;
      } 
    })
})
//reportar empresa
$('#btn-repEmp').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: 'Reportar a la empresa',
      html: `<h6 class="text-left">Ingresa el motivo del reporte</h6>
      <hr style="background-color: white;">
      <form id="f-reporte" action="/perfil/reportar/${link}" method="POST">
      <textarea id="reporte" class='form-control txt-trab text-left' placeholder='ingresa tu reporte' name="reporte" required></textarea>
      </form>
      <hr style="background-color: white;"> 
      `,
      icon: 'warning',
      background:'#232428',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      preConfirm: () =>{
        const reporte = Swal.getPopup().querySelector('#reporte').value
        if(!reporte){
          Swal.showValidationMessage(`Por favor llena el campo reporte`)
        }
        return;
      }
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          //enviar el formulario
          document.getElementById('f-reporte').submit();
      } 
    })
})


//valorar empresa
$('#btn-valEmp').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: 'Valora a la empresa',
      html: `
      <h6 class="text-left">Colocale una valoración a la empresa</h6>
      <hr style="background-color: white;">
      <form id="f-valoracion" action="/perfil/valorar/${link}" method="POST">
        <div class="clasificacion" id="clasi">
          <input class="rClas" id="radio1" value="5" type="radio" name="valoracion" value="5"><!--
          --><label for="radio1"><i class="fa fa-star"></i></label><!--
          --><input class="rClas" id="radio2" value="4" type="radio" name="valoracion" value="4"><!--
          --><label  for="radio2"><i class="fa fa-star"></i></label><!--
          --><input class="rClas" id="radio3" value="3" type="radio" name="valoracion" value="3"><!--
          --><label for="radio3"><i class="fa fa-star"></i></label><!--
          --><input class="rClas" id="radio4" value="2" type="radio" name="valoracion" value="2"><!--
          --><label for="radio4"><i class="fa fa-star"></i></label><!--
          --><input class="rClas" id="radio5" value="1" type="radio" name="valoracion" value="1"><!--
          --><label for="radio5"><i class="fa fa-star"></i></label>
        </div>
      </form>
      <hr style="background-color: white;"> 
      `,
      icon: 'question',
      background:'#232428',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar Valoración',
      cancelButtonText: ' Cancelar',
      reverseButtons: true,
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          document.getElementById('f-valoracion').submit();
      } 
    })
})

$('.btn-delSEmp').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que deseas eliminar esta solicitud?',
      text: "Esta acción eliminará la solicitud del usuario!",
      icon: 'warning',
      background:'#3e3a49',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: ' No, Cancelalo!',
      reverseButtons: true
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          //redirecciona a la ruta delete/:id<-(e)
          window.location.href = '/empleo/deleteSolEmp/'+link;
      } 
    })
})

$('.btn-accEmp').click((e)=>{
  //e.target.value elige el valor que esta dentro del arreglo de valores
  let link = e.target.value;
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
  })
    
  swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que deseas aceptar esta solicitud?',
      text: "Esta acción aceptará al usuario y este será notificado por correo, además se eliminará la oferta de empleo.",
      icon: 'question',
      background:'#3e3a49',
      color:'white',
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCancelButton: true,
      confirmButtonText: 'Si, Aceptar!',
      cancelButtonText: ' No, Cancelalo!',
      reverseButtons: true
    }).then((result) => {//el resultado de presionar ok
      if (result.isConfirmed) {
          //redirecciona a la ruta delete/:id<-(e)
          window.location.href = '/empleo/accept/'+link;
      } 
    })
})
