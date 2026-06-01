let totalGames = 0;
let gamesWon = 0;
let gamesLost = 0;
let gamesDrawn = 0;


async function setStats()
{
    let num = await chrome.storage.local.get(["gameCount"]);
    num = num.gameCount;
    if(num>0)
    {
        totalGames = num;
        document.getElementById("total-games").textContent = "Total Games: " + totalGames;

    }

    num = await chrome.storage.local.get(["winCount"]);
    num = num.winCount;
    if(num > 0)
    {
        gamesWon = num;
        document.getElementById("games-won").textContent = "Games Won: " + gamesWon;

    }

    num = await chrome.storage.local.get(["lossCount"]);
    num = num.lossCount;
    if(num > 0)
    {
        gamesLost = num;
        document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;

    }

    num = await chrome.storage.local.get(["drawCount"]);
    num = num.drawCount;
    if(num > 0)
    {
        gamesDrawn = num;
        document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;

    }
}
setStats();

//ON button click
function addWin()
{
    totalGames++;
    gamesWon++;
    chrome.storage.local.set({winCount: gamesWon});
    chrome.storage.local.set({gameCount: totalGames});
    

    document.getElementById("games-won").textContent = "Games Won: " + gamesWon;
    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
     
}
function addLoss()
{
    totalGames++;
    gamesLost++;
    chrome.storage.local.set({lossCount: gamesLost});
    chrome.storage.local.set({gameCount: totalGames});
    


    document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;
    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
}
function addDraw()
{
    totalGames++;
    gamesDrawn++;
    chrome.storage.local.set({drawCount: gamesDrawn});
    chrome.storage.local.set({gameCount: totalGames});
    


    document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;
    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
}

function clearAll()
{
    totalGames = 0;
    gamesWon = 0;
    gamesLost = 0;
    gamesDrawn = 0;
    chrome.storage.local.set({gameCount:0});
    chrome.storage.local.set({winCountL:0});
    chrome.storage.local.set({lossCount:0});
    chrome.storage.local.set({drawCount:0});

    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
    document.getElementById("games-won").textContent = "Games Won: " + gamesWon;
    document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;


}




//event listeners
document.getElementById("Won-Button").addEventListener("click", addWin);
document.getElementById("Lost-Button").addEventListener("click", addLoss);
document.getElementById("Draw-Button").addEventListener("click",addDraw);
document.getElementById("Clear-Button").addEventListener("click",clearAll);