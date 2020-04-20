var listElement      = document.querySelector('#app ul');
var linkInputElement = document.getElementById('link');
var nomeInputElement = document.getElementById('nome');
var buttonAddElement = document.querySelector('#app button');

var lista = JSON.parse(localStorage.getItem("savedList")) || []

function renderLista() {
    listElement.innerHTML = ''

    for (item of lista) {
        var itemElement   = document.createElement('li');
        var linkElement   = document.createElement('a');
        var buttonElement = document.createElement('button');
        
        var buttonText = document.createTextNode('Excluir');
        var nomeText   = document.createTextNode(item.nome);
        
        buttonElement.appendChild(buttonText);
        linkElement  .appendChild(nomeText);

        linkElement  .setAttribute("href", item.link);
        buttonElement.setAttribute("onclick", `deleteLink(${lista.indexOf(item)})`);

        itemElement.appendChild(linkElement);
        itemElement.appendChild(buttonElement);
        listElement.appendChild(itemElement);
    }
}

renderLista();
function addLink() {
    if (linkInputElement.value && nomeInputElement.value){
        var linkText = linkInputElement.value;
        var nomeText = nomeInputElement.value;
        
        lista.push({link: linkText, nome: nomeText});
        
        var inputList = document.querySelectorAll('input');
        for (input of inputList){
            input.value = '';
        }
        renderLista();
        saveStorage();
    } else {
        alert('Preencha os campos');
    }
}
buttonAddElement.onclick = addLink;

function deleteLink(posicao){
    lista.splice(posicao, 1);
    renderLista();
    saveStorage();
}

function saveStorage(){
    localStorage.setItem("savedList",JSON.stringify(lista));
}