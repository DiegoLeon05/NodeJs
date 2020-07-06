const log = require('../Generic/log');
const functionsUtil = require('../Generic/functionsUtil');
const enumerator = require('../Generic/Enumerators');
const className = 'request'
const { isArray } = require('util');

getEnterprise = () =>{
    functionsUtil.executeAjax(
        {
            url : 'Enterprise/__4MHn9n2qWT0kyF34?strBusqueda={"enterpriseNit":111111}'
        },
        (objResponse)=>{
            if (objResponse.estado){
                log.Write({class:className, method: 'request', message:'The Read was success ', TypeMessage: enumerator.TypeMessage.Success});
                if (isArray(objResponse.respuesta.lstEnterprise)){
                    objResponse.respuesta.lstEnterprise.forEach(enterprise => {
                        console.log(enterprise);
                    });
                }else{
                    console.log(objResponse.respuesta.lstEnterprise);
                }
            } else {
                log.Write({class:className, method: 'request', message:objResponse.excepcion.mensaje});
            }
        }
    );
}

getEnterprise();