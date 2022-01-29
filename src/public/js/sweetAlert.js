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