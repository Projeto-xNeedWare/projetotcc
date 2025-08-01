//Pega os Id´s do html e usa um biblioteca do java script para colocar números aleatórios.
let numRandom = (id, id2, id3,id4) => {
    document.getElementById(id).innerHTML = `${Math.floor(Math.random() * 10000) +1}`
    document.getElementById(id2).innerHTML = `${Math.floor(Math.random() * 100) +10}%`
    document.getElementById(id3). innerHTML = `${Math.floor(Math.random() * 500)+100}`
    document.getElementById(id4).innerHTML = `${Math.floor(Math.random() * 100) +10}%`
}