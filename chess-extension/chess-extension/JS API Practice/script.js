async function getData()
{
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    let data = await response.json();
    console.log(data);
    document.getElementById("output").textContent = data.body;

}

let url = "https://lichess.org/api/account";
let token = "YOUR TOKEN HERE"; //the variable would contain your token
async function getTotalGames()
{
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    let data = await response.json();
    console.log(data);
    document.getElementById("total-games-output").textContent = "Total games: " + data.count.all;
}
async function getTotalWins()
{
    let response = await fetch(url,{
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });
    let data = await response.json();
    console.log(data);
    document.getElementById("total-wins-output").textContent = "Total wins: " + data.count.win;

}

async function getTotalDraws()
{
    let response = await fetch(url,{
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${token}`
        }        
    });
    let data = await response.json();
    console.log(data);
    document.getElementById("total-draws-output").textContent = "Total draws: " + data.count.draw;
}

async function getTotalLosses()
{
    let response = await fetch(url, {
        method:"GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    let data = await response.json();
    console.log(data);
    document.getElementById("total-losses-output").textContent = "Total Losses: " + data.count.loss;
}

document.getElementById("fetch-button").addEventListener("click", getData)
document.getElementById("total-games-button").addEventListener("click", getTotalGames)
document.getElementById("total-wins-button").addEventListener("click", getTotalWins);
document.getElementById("total-draws-button").addEventListener("click", getTotalDraws);
document.getElementById("total-losses-button").addEventListener("click", getTotalLosses);