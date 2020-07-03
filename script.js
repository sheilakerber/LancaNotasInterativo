//variaveis globais
let alunos = []
let table

//percebe os eventos de clique no botao 'Adicionar'
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addNotasButton').addEventListener('click', addNota)
})

//funcao que add as notas ao clicar no botao 'Adicionar'
let addNota = (ev) => {
    ev.preventDefault() //previne a atualizacao da pag apos a add de notas

    //cria variaveis a partir dos inputs do usuario
    let b1 = document.getElementById("nota1Bi").value
    let b2 = document.getElementById("nota2Bi").value
    let b3 = document.getElementById("nota3Bi").value
    let b4 = document.getElementById("nota4Bi").value
    let alunoNome = document.getElementById("nomeAluno").value

    // msg erro: falta nome do aluno
    if (alunoNome == '') {
        window.alert("Nome do aluno não foi inserido!")
        return
    }

    // msg erro: falta alguma nota
    if (b1 == '' || b2 == '' || b3 == '' || b4 == '') {
        window.alert("Verifique se todas as notas estao preenchidas!")
        return
    }

    //cria o objeto aluno, contendo seu nome e notas
    let aluno = {
        nome: alunoNome,
        bimestre1: Number(b1),
        bimestre2: Number(b2),
        bimestre3: Number(b3),
        bimestre4: Number(b4),
    }

    //cria a tabela de alunos add, se esta ainda nao existir
    if (!table) {
        table = document.querySelector("table");
    }

    //calcula a media do aluno
    aluno.media = (aluno.bimestre1 + aluno.bimestre2 + aluno.bimestre3 + aluno.bimestre4) / 4

    //verifica aprovacao, considerando a media
    if (aluno.media >= 7) {
        aluno.resAprovacao = "Aprovado"
    } else {
        aluno.resAprovacao = "Reprovado"
    }

    // msg erro: notas menor que 0 ou maior que 10
    if (aluno.bimestre1 < 0 || aluno.bimestre1 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre2 < 0 || aluno.bimestre2 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre3 < 0 || aluno.bimestre3 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre4 < 0 || aluno.bimestre4 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }

    //add cada aluno e suas notas ao array alunos[]
    alunos.push(aluno);

    clearTable(); //limpa a tabela, para entao mostrar os dados atualizados com o proximo comando
    mostrarAlunos(); //funcao que cria a tabela na tela
    document.getElementById("guardarNotas").reset() //limpa os inputs de preenchimento do usuario 
}

function mostrarAlunos() {
    var table = document.getElementById("tableAlunos"); //acessa a tabela criada no html

    //verificacao da maior media da turma
    let alunosMaiorMedia = [] //array vazio
    let maiorMedia = -1 //-1 para obrigar a entrada no loop 'for' apos add a nota

    for (i = 0; i < alunos.length; i++) {

        if (alunos[i].media >= 7) { //destaca o aluno somente se a nota for igual ou maior que 7
            alunosMaiorMedia.push(alunos[i]) //guarda o aluno[i] com a maior media
            maiorMedia = alunos[i].media //atualiza a maiorMedia

            for (j = 0; j < alunosMaiorMedia.length; j++) {
                if (alunosMaiorMedia[j].media < maiorMedia) {
                    alunosMaiorMedia.splice(j, 1); //remore o aluno com a menor media no array alunosMaiorMedia[]
                }
            }

        }
    }

    //adiciona linhas a tabela conforme as notas sao inseridas pelo usuario
    for (i = 0; i < alunos.length; i++) {
        var row = table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);

        //destaca o nome, media e aprovacao do aluno com maior media da turma
        if (alunosMaiorMedia.includes(alunos[i])) {
            cell0.innerHTML = '<font color=\'#f11cf1\'>' + alunos[i].nome + '</font>';
            cell5.innerHTML = '<font color=\'#f11cf1\'>' + alunos[i].media + '</font>';
            cell6.innerHTML = '<font color=\'#f11cf1\'>' + alunos[i].resAprovacao + '</font>';
        } else {
            cell0.innerHTML = alunos[i].nome;
            cell5.innerHTML = alunos[i].media;
            cell6.innerHTML = alunos[i].resAprovacao;
        }
        cell1.innerHTML = alunos[i].bimestre1;
        cell2.innerHTML = alunos[i].bimestre2;
        cell3.innerHTML = alunos[i].bimestre3;
        cell4.innerHTML = alunos[i].bimestre4;
    }

    generateTableHead(table)
}

//cria o cabecalho da tabela, usando 'table' como parametro
function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    addColumn("Aluno(a) ", row);
    addColumn("1º Bimestre", row);
    addColumn("2º Bimestre", row);
    addColumn("3º Bimestre", row);
    addColumn("4º Bimestre", row);
    addColumn("Média", row)
    addColumn("Resultado", row)
}

function addColumn(name, row) {
    let th = document.createElement("th");
    let text = document.createTextNode(name);
    th.appendChild(text);
    row.appendChild(th);
}

//limpa a tabela para evitar a duplicacao de dados
function clearTable() {
    var tableRef = document.getElementById("tableAlunos");
    while (tableRef.rows.length > 0) {
        tableRef.deleteRow(0);
    }
}