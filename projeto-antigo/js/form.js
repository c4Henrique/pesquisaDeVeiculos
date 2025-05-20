class Contato {
    constructor(nome, sobrenome, email, cpf, telefone, tipoContato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
    }
}

function Post(form) {
    event.preventDefault(); // Evita que a página seja recarregada
    
    let contato = new Contato(
        form.elements["nome"].value,
        form.elements["sobrenome"].value,
        form.elements["email"].value,
        form.elements["cpf"].value,
        form.elements["telefone"].value,
        form.elements["contato"].value
    );
    
    console.log("Dados do contato:", contato);
    alert(`Obrigado, ${contato.nome}! Seus dados foram enviados com sucesso.`);
    form.reset(); // Limpa o formulário
}

// Adicionando efeito ao botão Enviar
document.addEventListener("DOMContentLoaded", function () {
    let botao = document.querySelector("button[type='submit']");
    botao.addEventListener("mouseover", function () {
        botao.style.transform = "scale(1.1)";
        botao.style.backgroundColor = "#1b357e";
    });
    botao.addEventListener("mouseout", function () {
        botao.style.transform = "scale(1)";
        botao.style.backgroundColor = "#1351d8";
    });
});
