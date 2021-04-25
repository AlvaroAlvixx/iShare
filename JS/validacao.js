$(function() {

    var tbUsers = localStorage.getItem("tbUsers"); // Recupera os dados armazenados
    tbUsers = JSON.parse(tbUsers); // Converte string para objeto
    if (tbUsers == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbUsers = [];

    // VERIFICAÇÃO LOGADO
    var Logado = localStorage.getItem("Logado"); // Recupera os dados armazenados
    Logado = JSON.parse(Logado); // Converte string para objeto
    if (Logado == null) {
        let logado = "false";
        localStorage.setItem("Logado", logado);
    } else if (Logado == false) {
        console.log("Não logado")
        topMenu = document.getElementById("topMenu");
        let texto = '';
        texto = ` 
        <li class="nav-item">
            <a class="nav-link" href="register.html">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="login.html">Log In</a>
        </li>
            `;
        topMenu.innerHTML = texto;
    } else {
        let logado = JSON.parse(localStorage.getItem("Logado"));
        topMenu = document.getElementById("topMenu");
        let texto = '';
        texto = ` 
            <li class="nav-item">
                <a class="nav-link" href="">${logado}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" onclick="sair()">Sair</a>
            </li>
            `;
        topMenu.innerHTML = texto;

    }

    //FORM REGISTRO//
    $("#formRegister").on("submit", function() {
        //Salvar checkbox marcadas
        const checkMusic = document.getElementById('regMusics');
        const checkGames = document.getElementById('regGames');
        const checkSeries = document.getElementById('regSeries');
        const checkTermos = document.getElementById('regTermos');

        //Verificar marcação dos assuntos
        if (!checkMusic.checked && !checkGames.checked && !checkSeries.checked) {
            alert("ERRO - Necessário selecionar pelo menos um interesse!");
            return false;
        } else {
            //Verificar preenchimento dos campos
            if (regNome.value == 0 || regEmail.value == 0 || regSenha.value == 0 || regConfSenha.value == 0) {
                alert("ERRO - Necessário preencher todos os campos!");
                return false;
            } else {
                //Verificar aceitação dos termos
                if (!checkTermos.checked) {
                    alert("ERRO - Necessário aceitar os Termos de Uso!");
                    return false;
                } else {
                    //Verificar se as senhas batem
                    if (regSenha.value != regConfSenha.value) {
                        alert("ERRO - As senhas não são iguais!");
                        return false;
                    } else {
                        //Criação do novo usuário
                        var user = ({
                            Nome: regNome.value,
                            Email: regEmail.value,
                            Senha: regSenha.value,
                            Musics: checkMusic.checked,
                            Games: checkGames.checked,
                            Series: checkSeries.checked

                        });

                        //Insere no final do vetor
                        tbUsers.push(user);
                        localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
                        alert("Registrado com SUCESSO!");


                    }

                }

            }
        }

    });

    //FORM LOGIN//
    $("#formLogin").on("submit", function() {
        //Verifica se os campos estão preenchidos
        if (logEmail.value == 0 || logSenha.value == 0) {
            alert("ERRO - Necessário preencher todos os campos!");
            return false;
        } else {
            //Contador utilizado para o login
            let i = 0
                //Função que percorre todo o vetor e realiza a verificação
            tbUsers.map(res => {
                if (((res).Email == logEmail.value) && ((res).Senha == logSenha.value)) {
                    i++;
                    //Salva o usuário que está logado
                    const logado = ((res).Email)
                    localStorage.setItem("Logado", JSON.stringify(logado));
                }
            })

            //Verifica se o Login foi realizado com sucesso
            if (i == 1)
                alert("Logado com SUCESSO!");
            else
                alert("ERRO - Email ou senha incorretos!");
        }

    });

    //NOVA POSTAGEM//
    var tbPosts = localStorage.getItem("tbPosts"); // Recupera os dados armazenados
    tbPosts = JSON.parse(tbPosts); // Converte string para objeto
    if (tbPosts == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbPosts = [];

    //FORM NOVO POST//
    $("#formNewPost").on("submit", function() {
        if (JSON.parse(localStorage.getItem("Logado")) == false) {
            alert("ERRO - Necessário estar logado!");
            return false;
        } else {

            //Salvar checkbox marcadas
            const checkMusic = document.getElementById('checkMusics');
            const checkGames = document.getElementById('checkGames');
            const checkSeries = document.getElementById('checkSeries');

            //Verificar marcação dos assuntos
            if (!checkMusic.checked && !checkGames.checked && !checkSeries.checked) {
                alert("ERRO - Necessário selecionar pelo menos um interesse!");
                return false;
            } else {
                //Verificar preenchimento dos campos
                if (newTitulo.value == 0 || newLink.value == 0 || newDescricao.value == 0) {
                    alert("ERRO - Necessário preencher todos os campos!");
                    return false;
                } else {

                    //Criação do novo post
                    var post = ({
                        Id: tbPosts.length,
                        Titulo: newTitulo.value,
                        Link: newLink.value,
                        Descricao: newDescricao.value,
                        Series: checkSeries.checked,
                        Games: checkGames.checked,
                        Musics: checkMusic.checked,
                    });

                    //Insere no final do vetor
                    tbPosts.push(post);
                    localStorage.setItem("tbPosts", JSON.stringify(tbPosts));
                    alert("Postagem criada com SUCESSO!");
                    id++;

                }
            }
        }

    });
});

//EXIBE POST//
function exibePost() {
    let varPosts = JSON.parse(localStorage.getItem("tbPosts"));
    let idPost = JSON.parse(localStorage.getItem("postClicked"));
    let texto = '';

    let titulo = (varPosts[idPost]).Titulo;
    let descricao = (varPosts[idPost]).Descricao;

    let divTela = document.getElementById('divPosts');

    texto = texto + `
    <h2 class="text-center" id="titulo1">${titulo}</h2>
    <img src="img/post${idPost+1}.jpg">
    <p class="text-justify" id="descricao1">${descricao}</p>`

    divTela.innerHTML = texto;

    criarComent();

};

//CRIA COMENTÁRIO//
function criarComent() {
    //COMENTARIO//
    var tbComents = localStorage.getItem("tbComents"); // Recupera os dados armazenados
    tbComents = JSON.parse(tbComents); // Converte string para objeto
    if (tbComents == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbComents = [];
    else
        exibeComent();

    //Executada quando campo estiver fora de foco
    descricao.onblur = () => {
        //Se campo estiver vazio mostra um aviso
        if (descricao.value.length == 0) {
            descricao.style.border = 'thin red solid';
        } else descricao.style.border = 'none';
    }

    //SISTEMA AVALIAÇÃO//
    var like = false;
    var dislike = false;
    negativo.onclick = () => {
        // Analiza após o click se é icone de X está vermelho, caso não esteja executa o codigo abaixo, deixando vermelho
        if (dislike == false) {
            negativo.style.color = 'red';
            dislike = true;
        }
        // caso esteja vermelho o deixa azul novamente 
        else {
            negativo.style.color = '#007bff';
            dislike = false;
        }
    }

    positivo.onclick = () => {
        // Analiza após o click se é icone de coração está vermelho, caso não esteja executa o codigo abaixo, deixando vermelho
        if (like == false) {
            positivo.style.color = 'red';
            like = true;
        }
        // caso esteja vermelho o deixa azul novamente 
        else {
            positivo.style.color = '#007bff';
            like = false;
        }


    }

    //FORM COMENTÁRIO//
    comentarios.onsubmit = (evento) => {
        if (JSON.parse(localStorage.getItem("Logado")) == false) {
            alert("ERRO - Necessário estar logado!");
            return false;
        } else {
            if (descricao.value == 0) {
                alert("ERRO - Deve-se escrever algo no comentario!")
                evento.preventDefault()
            } else {
                if (like == true && dislike == true) {
                    alert("ERRO - Deve escolher apenas uma opção!");
                    evento.preventDefault()
                } else if (dislike == false && like == false) {
                    alert("ERRO - Deve escolher pelo menos uma opção!");
                    evento.preventDefault()
                } else if (dislike == true && like == false) {
                    //Criação do novo comentario
                    let id = JSON.parse(localStorage.getItem("postClicked"));
                    var coment = ({
                        Comentario: descricao.value,
                        Like: 'false',
                        Dislike: 'true',
                        IdPost: id

                    });

                    //Insere no final do vetor
                    tbComents.push(coment);
                    localStorage.setItem("tbComents", JSON.stringify(tbComents));
                    alert("Avaliação criada com SUCESSO!");
                    evento.preventDefault()
                    exibeComent();
                } else {

                    //Criação do novo comentario
                    let id = JSON.parse(localStorage.getItem("postClicked"));
                    var coment = ({
                        Comentario: descricao.value,
                        Like: 'true',
                        Dislike: 'false',
                        IdPost: id

                    });

                    //Insere no final do vetor
                    tbComents.push(coment);
                    localStorage.setItem("tbComents", JSON.stringify(tbComents));
                    alert("Avaliação criada com SUCESSO!");
                    evento.preventDefault()
                    exibeComent();
                }
            }
        }
    }

    //EXIBE COMENTÁRIO//
    function exibeComent() {

        let tbComentarios = JSON.parse(localStorage.getItem("tbComents"));
        let texto = '';
        let i = 0;
        let id = JSON.parse(localStorage.getItem("postClicked"));

        while (i < tbComents.length) {
            if (tbComentarios[i].IdPost == id) {
                let escreve = (tbComentarios[i]).Comentario;

                let divTela = document.getElementById('divComents');

                let avaliacao
                if (tbComentarios[i].Like == 'true') {
                    avaliacao = `<i class="fas fa-heart "></i>`
                } else {
                    avaliacao = `<i class="fas fa-times style=" style="margin-right: 8px; "></i>`
                }


                texto = texto + `
                    <div class="coment2" id="exibeComent1">
                        <p>${escreve}.${avaliacao}</p>
                    </div>`

                divTela.innerHTML = texto;
            }

            i++;
        }
    }


};

//EXIBE POSTAGEM//
function exibePostHome() {

    let tbPosts = JSON.parse(localStorage.getItem("tbPosts"));
    let texto = '';
    let i = 0;
    while (i < tbPosts.length) {
        let titulo = (tbPosts[i]).Titulo;
        let descricao = (tbPosts[i]).Descricao;
        let id = (tbPosts[i]).Id;

        let divTela = document.getElementById('divPosts');

        texto = texto + `
        <div class="col mb-4">
            <div class="card">
                <div class="text-center" style="padding: 10px;">
                    <h4 class="card-title">${titulo}</h4>
                </div>
                <div class="view overlay">
                    <img class="card-img-top" src="img/post${i+1}.jpg" alt="Post Image">
                </div>
                <div class="card-body">
                    <p class="card-text">${descricao}...
                        <i onclick="idPostClicked${id}()">
                            <a href="post.html">
                                <i class="fa fa-arrow-right"> Ver mais</i>
                            </a>
                        </i>
                    </p>
                </div>
            </div>
        </div>`

        divTela.innerHTML = texto;

        i++;

    }


}

//EXIBE POSTAGENS - MY PAGE//
function exibeMyPage() {
    if (JSON.parse(localStorage.getItem("Logado")) == false) {
        alert("ERRO - Necessário estar logado para exibir esta pagina!");
    } else {
        let tbUsers = JSON.parse(localStorage.getItem("tbUsers"));
        let logado = JSON.parse(localStorage.getItem("Logado"));

        let i = 0;

        while (tbUsers[i].Email != logado) {
            i++;
        }

        if (tbUsers[i].Series == true) {
            exibeSeries();
        }
        if (tbUsers[i].Games == true) {
            exibeGames();
        }
        if (tbUsers[i].Musics == true) {
            exibeMusicas();
        }
    }

};

//ASSUNTO SÉRIES//
function exibeSeries() {
    let main = document.getElementById('main');
    main.innerHTML = main.innerHTML + `
    <section class="cointainer-posts">

    <div class="row">
        <h4> Séries </h4>
    </div>

    <div class="row row-cols-1 row-cols-md-3 area-cards" id="divSeries">

    </div>

    </section>`;

    let tbPosts = JSON.parse(localStorage.getItem("tbPosts"));
    let texto = '';
    //Series
    let i = 0;
    while (i < tbPosts.length) {
        let titulo = (tbPosts[i]).Titulo;
        let descricao = (tbPosts[i]).Descricao;
        let id = (tbPosts[i]).Id;

        let divTela = document.getElementById('divSeries');

        let assunto = tbPosts[i].Series;

        if (assunto == true) {
            texto = texto + `
            <div class="col mb-4">
                <div class="card">
                    <div class="text-center" style="padding: 10px;">
                        <h4 class="card-title">${titulo}</h4>
                    </div>
                    <div class="view overlay">
                        <img class="card-img-top" src="img/post${i+1}.jpg" alt="Post Image">
                    </div>
                    <div class="card-body">
                        <p class="card-text">${descricao}...
                            <i onclick="idPostClicked${id}()">
                                <a href="post.html">
                                    <i class="fa fa-arrow-right"> Ver mais</i>
                                </a>
                            </i>
                        </p>
                    </div>
                </div>
            </div>`

            divTela.innerHTML = texto;
        }

        i++;

    }
};

//ASSUNTO GAMES//
function exibeGames() {
    let main = document.getElementById('main');
    main.innerHTML = main.innerHTML + `
    <section class="cointainer-posts">

    <div class="row">
        <h4> Games </h4>
    </div>

    <div class="row row-cols-1 row-cols-md-3 area-cards" id="divGames">

    </div>

    </section>`;

    let tbPosts = JSON.parse(localStorage.getItem("tbPosts"));
    let texto = '';
    //Games
    let i = 0;
    while (i < tbPosts.length) {
        let titulo = (tbPosts[i]).Titulo;
        let descricao = (tbPosts[i]).Descricao;
        let id = (tbPosts[i]).Id;

        let divTela = document.getElementById('divGames');

        let assunto = tbPosts[i].Games;

        if (assunto == true) {
            texto = texto + `
        <div class="col mb-4">
            <div class="card">
                <div class="text-center" style="padding: 10px;">
                    <h4 class="card-title">${titulo}</h4>
                </div>
                <div class="view overlay">
                    <img class="card-img-top" src="img/post${i+1}.jpg" alt="Post Image">
                </div>
                <div class="card-body">
                    <p class="card-text">${descricao}...
                        <i onclick="idPostClicked${id}()">
                            <a href="post.html">
                                <i class="fa fa-arrow-right"> Ver mais</i>
                            </a>
                        </i>
                    </p>
                </div>
            </div>
        </div>`

            divTela.innerHTML = texto;
        }
        i++;

    }
};

//ASSUNTO MÚSICAS//
function exibeMusicas() {
    let main = document.getElementById('main');
    main.innerHTML = main.innerHTML + `
    <section class="cointainer-posts">

    <div class="row">
        <h4> Músicas </h4>
    </div>

    <div class="row row-cols-1 row-cols-md-3 area-cards" id="divMusicas">

    </div>

    </section>`;

    let tbPosts = JSON.parse(localStorage.getItem("tbPosts"));
    let texto = '';
    //Musicas
    let i = 0;
    while (i < tbPosts.length) {
        let titulo = (tbPosts[i]).Titulo;
        let descricao = (tbPosts[i]).Descricao;
        let id = (tbPosts[i]).Id;

        let divTela = document.getElementById('divMusicas');

        let assunto = tbPosts[i].Musics;

        if (assunto == true) {
            texto = texto + `
        <div class="col mb-4">
            <div class="card">
                <div class="text-center" style="padding: 10px;">
                    <h4 class="card-title">${titulo}</h4>
                </div>
                <div class="view overlay">
                    <img class="card-img-top" src="img/post${i+1}.jpg" alt="Post Image">
                </div>
                <div class="card-body">
                    <p class="card-text">${descricao}...
                        <i onclick="idPostClicked${id}()">
                            <a href="post.html">
                                <i class="fa fa-arrow-right"> Ver mais</i>
                            </a>
                        </i>
                    </p>
                </div>
            </div>
        </div>`

            divTela.innerHTML = texto;
        }

        i++;

    }
};

//LOGIN - SAIR//
function sair() {
    localStorage.setItem("Logado", "false");
    location.reload();
}