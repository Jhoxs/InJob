const plantilla = {}



plantilla.msjReporte = (nombre,comentario,nombre_us,apellido_us) =>{

    contentHTML = `
    <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    
    <tr>
        <td style="padding: 0">
            <img style="padding: 0; display: block" src="https://i.postimg.cc/6qcd3jyp/injob.png" width="100%">
        </td>
    </tr>
    <tr>
        <td style="background-color: #3d3d3d">
            <div style="color: #A69595; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                <h1 style="text-align: center;color:#afa7af; text-decoration: solid;">Notificacion de Reporte</h1>
                <hr>
                <h2 style="color: #928492; margin: 0 0 7px">Saludos Empresa ${nombre}.</h2>
                <br>
                <p style="margin: 2px; font-size: 15px">
                    Este mensaje es para notificarte que tu empresa ha sido reportada.<br><br>
                    <em>"${comentario}"</em>-${nombre_us} ${apellido_us}.
                    <br>
                    <br>
                    <b>Recuerda que varios reportes pueden afectar tu prestigio.</b>
                    <br>
                    <hr style="margin-top: 30px;">
                    *Te recordamos que no es necesario responder este mensaje.
                </p>
                
                <div style="width: 100%; text-align: center; margin-top: 40px;">
                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #302E40" href="http://192.168.100.89:3000/inicio">Ir a la página</a>	
                </div>
                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Injob 2022</p>
            </div>
        </td>
    </tr>
    </table>
    `
    return contentHTML;
}

plantilla.msjAceptacion = (nU,aU,nE,aE,nom_trab) =>{
    contentHTML = `
    <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    
    <tr>
        <td style="padding: 0">
            <img style="padding: 0; display: block" src="https://i.postimg.cc/6qcd3jyp/injob.png" width="100%">
        </td>
    </tr>
    <tr>
        <td style="background-color: #3d3d3d">
            <div style="color: #A69595; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                <h1 style="text-align: center;color:#afa7af; text-decoration: solid;">Mensaje de Aceptación</h1>
                <hr>
                <br>
                <h2 style="color: #928492; margin: 0 0 7px">Felicitaciones ${nU} ${aU}.</h2>
                <br>
                <p style="margin: 2px; font-size: 15px">
                    Este mensaje es para notificarte que usted ha sido seleccionado para formar parte de la empresa ${nE} ${aE}.<br>
                    El cargo que ocupará usted será el de: <b>${nom_trab}</b>
                    <br>
                    <hr style="margin-top: 30px;">
                    *Te recordamos que no es necesario responder este mensaje.
                </p>
                
                <div style="width: 100%; text-align: center; margin-top: 40px;">
                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #302E40" href="http://192.168.100.89:3000/inicio">Ir a la página</a>	
                </div>
                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Injob 2022</p>
            </div>
        </td>
    </tr>
    </table>
    `
    return contentHTML;
}


module.exports = plantilla;