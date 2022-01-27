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


    


