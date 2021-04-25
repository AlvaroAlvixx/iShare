window.onload = () => {

    //Executada quando campo estiver fora de foco
    logEmail.onblur = () => {
        //Se campo estiver vazio mostra um aviso
        if (logEmail.value.length == 0) {
            logEmail.style.border = 'thin red solid';
        } else logEmail.style.border = 'none';
    }

    logSenha.onblur = () => {
        if (logSenha.value.length == 0) {
            logSenha.style.border = 'thin red solid';
        } else logSenha.style.border = 'none';
    }


}