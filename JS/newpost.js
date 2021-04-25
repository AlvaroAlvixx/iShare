$(function() {

    //Executada quando campo estiver fora de foco
    newTitulo.onblur = () => {
        //Se campo estiver vazio mostra um aviso
        if (newTitulo.value.length == 0) {
            newTitulo.style.border = 'thin red solid';
        } else newTitulo.style.border = 'none';
    }

    newLink.onblur = () => {

        if (newLink.value.length == 0) {
            newLink.style.border = 'thin red solid';
        } else {
            newLink.style.border = 'none';
        }

    }

    newDescricao.onblur = () => {
        if (newDescricao.value.length == 0) {
            newDescricao.style.border = 'thin red solid';
        } else newDescricao.style.border = 'none';
    }


});