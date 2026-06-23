function updateUI(stats, winrate)
{
    
    let treeLevel = getTreeLevel(stats);
    document.getElementById("total-games").textContent = "Total Games: " + stats.all;
    document.getElementById("games-won").textContent = "Games Won: " + stats.win;
    document.getElementById("games-lost").textContent = "Games Lost: " + stats.loss;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + stats.draw;


    let health = "Struggling";
    if(winrate >=60)
    {
        health = "Thriving";
    }
    else if(winrate >=45)
    {
        health = "Growing";
    }

    document.getElementById("tree-level").textContent = `${treeLevel} | ${health} | WR: ${winrate}%`;
}

function getTreeLevel(stats)
{
    let currentTree = document.getElementById("tree-image");
    if(stats.all<10)
    {
        document.getElementById("games-to-next").textContent=(10-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F330.svg";
        return "Seed";
    }
    if(stats.all>=10 && stats.all<25)
    {
        document.getElementById("games-to-next").textContent=(25-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F331.svg";
        return "Sapling";
    }
    if(stats.all>=25 && stats.all<50)
    {
        document.getElementById("games-to-next").textContent=(50-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F33F.svg";
        return "Young Tree";
    }
    if(stats.all>=50 && stats.all<100)
    {
        document.getElementById("games-to-next").textContent=(100-stats.all) + " Games To Next Tree";
        currentTree.src="https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f333.svg"
        return "Mature Tree";
    }
    if(stats.all>=100)
    {
        document.getElementById("games-to-next").textContent= "Forest Achieved!"
        currentTree.src="https://imgproxy.attic.sh/insecure/f:webp/h:993/q:90/w:993/plain/https://attic.sh/qkqlry3bju95ui8tue1acaz07v6g";
        return "Forest";
    }

}



async function onEnter()
{
    let username = document.getElementById("username-input").value;
    let stats = await getLichessStats(username);
    checkUsername(stats);

    await chrome.storage.local.set({username:username})    


    let winRate =calculateWinRate(stats);

    
     updateUI(stats, winRate);
}


function checkUsername(stats)
{
    if(stats === undefined)
    {
        document.getElementById("username-input").value = "User Not Found!";
         return "invalid";
    }
    return "valid";
   
}

async function getLichessStats(username)
{
    let url =  `https://lichess.org/api/user/${username}`;
    let response = await fetch(url);
    if(response.status === 404)
    {
        return undefined;
    }
    

    let data = await response.json();
    return data.count;
}


function checkKey(event)
{
    if(event.key === "Enter")
    {
        onEnter();
    }
}

function calculateWinRate(stats)
{
    let winRate = (stats.win/stats.all) *100;
    winRate =  Math.round(winRate*100)/100;
    return winRate;
}

async function loadUser()
{

    let result = await chrome.storage.local.get("username");
    username = result.username;
    let stats = await getLichessStats(username);
    
    let validity = checkUsername(stats);
    if(username!="" && validity != "invalid")
    { 
        document.getElementById("username-input").value = username;
    }

    let winRate = calculateWinRate(stats);
    updateUI(stats, winRate);
}

//event listeners

document.addEventListener("DOMContentLoaded", loadUser)
document.getElementById("username-input").addEventListener("keydown",(event)=>checkKey(event));