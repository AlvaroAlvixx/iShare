$(function() {

    //Executada quando campo estiver fora de foco
    regNome.onblur = () => {
        //Se campo estiver vazio mostra um aviso
        if (regNome.value.length == 0) {
            regNome.style.border = 'thin red solid';
        } else regNome.style.border = 'none';
    }

    regEmail.onblur = () => {

        if (regEmail.value.length == 0) {
            regEmail.style.border = 'thin red solid';
        } else {
            regEmail.style.border = 'none';
        }

    }

    regSenha.onblur = () => {
        if (regSenha.value.length == 0) {
            regSenha.style.border = 'thin red solid';
        } else regSenha.style.border = 'none';
    }

    regConfSenha.onblur = () => {
        if (regConfSenha.value.length == 0) {
            regConfSenha.style.border = 'thin red solid';
        } else regConfSenha.style.border = 'none';
    }


});