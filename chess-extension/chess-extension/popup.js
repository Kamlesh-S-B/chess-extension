let totalGames = 0;
let gamesWon = 0;
let gamesLost = 0;
let gamesDrawn = 0;

let username="";


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

    updateTree()
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
    updateTree();
     
}
function addLoss()
{
    totalGames++;
    gamesLost++;
    chrome.storage.local.set({lossCount: gamesLost});
    chrome.storage.local.set({gameCount: totalGames});
    


    document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;
    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
    updateTree();
}
function addDraw()
{
    totalGames++;
    gamesDrawn++;
    chrome.storage.local.set({drawCount: gamesDrawn});
    chrome.storage.local.set({gameCount: totalGames});
    


    document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;
    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
    updateTree()
}

function clearAll()
{
    totalGames = 0;
    gamesWon = 0;
    gamesLost = 0;
    gamesDrawn = 0;
    chrome.storage.local.set({gameCount:0});
    chrome.storage.local.set({winCount:0});
    chrome.storage.local.set({lossCount:0});
    chrome.storage.local.set({drawCount:0});

    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
    document.getElementById("games-won").textContent = "Games Won: " + gamesWon;
    document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;
    updateTree()

}

async function updateTree()
{
    let currentTree = document.getElementById("tree-image");
    if(totalGames<10)
    {
        document.getElementById("games-to-next").textContent=(10-totalGames) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Seed";
        currentTree.src="https://openmoji.org/data/color/svg/1F330.svg";
    }
    if(totalGames>=10 && totalGames<25)
    {
        document.getElementById("games-to-next").textContent=(25-totalGames) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Sapling";
        currentTree.src="https://openmoji.org/data/color/svg/1F331.svg";
    }
    if(totalGames>=25 && totalGames<50)
    {
        document.getElementById("games-to-next").textContent=(50-totalGames) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Young Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F33F.svg";
    }
    if(totalGames>=50 && totalGames<100)
    {
        document.getElementById("games-to-next").textContent=(100-totalGames) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Mature Tree";
        currentTree.src="https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f333.svg"
    }
    if(totalGames>=100)
    {
        document.getElementById("games-to-next").textContent= "Forest Achieved!"
        document.getElementById("tree-level").textContent = "Current Tree: Forest";
        currentTree.src="https://imgproxy.attic.sh/insecure/f:webp/h:993/q:90/w:993/plain/https://attic.sh/qkqlry3bju95ui8tue1acaz07v6g";
    }
}


async function onEnter()
{
    username = document.getElementById("username-input").value;
    await chrome.storage.local.set({username:username})

    let stats = await getLichessStats(username);
    console.log(stats)


    totalGames = stats.all;
    gamesWon = stats.win;
    gamesLost = stats.loss;
    gamesDrawn = stats.draw;


    await chrome.storage.local.set({
    gameCount: stats.all,
    winCount: stats.win,
    lossCount: stats.loss,
    drawCount: stats.draw
});

    document.getElementById("total-games").textContent = "Total Games: " + stats.all;
    document.getElementById("games-won").textContent = "Games Won: " + stats.win;
    document.getElementById("games-lost").textContent = "Games Lost: " + stats.loss;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + stats.draw;
    
    await updateTree();
}





async function getLichessStats(username)
{
    let url =  `https://lichess.org/api/user/${username}`;
    let response = await fetch(url);

    if(!response.ok)
    {
        throw new Error("User not found");
    }

    let data = await response.json();
    console.log(data);
    return data.count;
}


function checkKey(event)
{
    if(event.key === "Enter")
    {
        onEnter();
    }
}

async function loadUser()
{
    let result = await chrome.storage.local.get("username");
    username = result.username
    
    document.getElementById("username-input").value = username;

    

    let stats = await getLichessStats(username);
    totalGames = stats.all;
    gamesWon = stats.win;
    gamesLost = stats.loss;
    gamesDrawn = stats.draw;

    document.getElementById("total-games").textContent = "Total Games: " + totalGames;
    document.getElementById("games-won").textContent = "Games Won: " + gamesWon;
    document.getElementById("games-lost").textContent = "Games Lost: " + gamesLost;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + gamesDrawn;

    await chrome.storage.local.set({
    gameCount: stats.all,
    winCount: stats.win,
    lossCount: stats.loss,
    drawCount: stats.draw
});
    updateTree();
}

//event listeners


/*
document.getElementById("Won-Button").addEventListener("click", addWin);
document.getElementById("Lost-Button").addEventListener("click", addLoss);
document.getElementById("Draw-Button").addEventListener("click",addDraw );
document.getElementById("Clear-Button").addEventListener("click",clearAll);

*/
document.addEventListener("DOMContentLoaded", loadUser)
document.getElementById("username-input").addEventListener("keydown",(event)=>checkKey(event));