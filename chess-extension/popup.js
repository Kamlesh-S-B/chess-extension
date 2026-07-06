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
    
    updateProgressBar(stats);
    updateBadges(stats, winrate);
}

function getTreeLevel(stats)
{
    let currentTree = document.getElementById("tree-image");
    if(stats.all<20)
    {
        document.getElementById("games-to-next").textContent=(20-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F330.svg";
        return "Seed";
    }
    if(stats.all>=20 && stats.all<75)
    {
        document.getElementById("games-to-next").textContent=(75-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F331.svg";
        return "Sapling";
    }
    if(stats.all>=75 && stats.all<200)
    {
        document.getElementById("games-to-next").textContent=(200-stats.all) + " Games To Next Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F33F.svg";
        return "Young Tree";
    }
    if(stats.all>=200 && stats.all<500)
    {
        document.getElementById("games-to-next").textContent=(500-stats.all) + " Games To Next Tree";
        currentTree.src="https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f333.svg"
        return "Mature Tree";
    }
    if(stats.all>=500)
    {
        document.getElementById("games-to-next").textContent= "Forest Achieved!"
        currentTree.src="https://imgproxy.attic.sh/insecure/f:webp/h:993/q:90/w:993/plain/https://attic.sh/qkqlry3bju95ui8tue1acaz07v6g";
        return "Forest";
    }


}

function updateProgressBar(stats)
{
    document.getElementById("progress-bar").style.opacity = 1;
    let treeLevel = getTreeLevel(stats);
    console.log(treeLevel);
    let list = [[0,20],[20,75],[75,200],[200,500]];
    let start = 0;
    let end = 0;
    if(treeLevel === "Seed")
    {
        start = list[0][0];
        end = list[0][1];
    }
    if(treeLevel === "Sapling")
    {
        start = list[1][0];
        end = list[1][1];
    }
    if(treeLevel === "Young Tree")
    {
        start = list[2][0];
        end = list[2][1];
    }
    if(treeLevel === "Mature Tree")
    {
        start = list[3][0];
        end = list[3][1];
    }
    let current = stats.all-start;//how much progress has been made in the current level
    let needed = end-start;//how much progress is needed to reach the next level
    let percent = (current/needed)*100;//calculate the percentage of progress made in the current level
    if(treeLevel === "Forest")
    {
        document.getElementById("progress-fill").style.width = 100 + "%";
        return;
    }
    document.getElementById("progress-fill").style.width = percent + "%";

}


async function onEnter()
{
    document.getElementById("username-input").disabled = true;
    let username = document.getElementById("username-input").value;
    let stats = await getLichessStats(username);
    let validity = checkUsername(stats);
    if(validity === "valid")
    {
    await chrome.storage.local.set({username:username})    
    
    let winRate =calculateWinRate(stats);
    updateUI(stats, winRate);
    }
    document.getElementById("username-input").disabled = false;

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
    else
    {
        document.getElementById("username-input").value = "Enter Username";
    }

    let winRate = calculateWinRate(stats);
    updateUI(stats, winRate);
}

function openBadgesPage()
{
    let home = document.getElementById("home");
    let badges = document.getElementById("badges-page");

    home.style.opacity = 0;

    setTimeout(function()
    {
        home.style.display = "none";

        badges.style.display = "inline";

        badges.style.opacity = 1;

    }, 300);
}
function openHomePage() {
    let home = document.getElementById("home");
    let badges = document.getElementById("badges-page");
 
    badges.style.opacity = 0;
    setTimeout(function(){
        badges.style.display = "none";
        home.style.display = "inline";
        home.style.opacity =1;
    },300);

}


function updateBadges(stats,winRate)
{
    console.log("updating badges");
    if(stats.all >= 1)
    {
        console.log(stats.all);
        let firstGameBadge = document.getElementById("first-game-badge");
        firstGameBadge.textContent = "☝️ First Game  ✔";
        firstGameBadge.style.color = "rgb(46, 125, 50)";
        firstGameBadge.classList.add("pop-element");
        
    }
    else
    {
        let firstGameBadge = document.getElementById("first-game-badge");
        firstGameBadge.style.color = "rgb(227, 38, 38)";
        firstGameBadge.textContent = "🔒 First Game";
        firstGameBadge.classList.remove("pop-element");
        
    }
    if(stats.all >= 20)
    {
        let twentyGamesBadge = document.getElementById("twenty-games-badge");
        twentyGamesBadge.textContent = "♟️ 20 Games  ✔";
        twentyGamesBadge.style.color = "rgb(46, 125, 50)";
        twentyGamesBadge.classList.add("pop-element");

    }
    else
    {
        let twentyGamesBadge = document.getElementById("twenty-games-badge");
        twentyGamesBadge.style.color = "rgb(227, 38, 38)";
        twentyGamesBadge.textContent = "🔒 20 Games";
        twentyGamesBadge.classList.remove("pop-element");

    }
    if(stats.all >= 75)
    {
        let seventyFiveGamesBadge = document.getElementById("seventy-five-games-badge");
        seventyFiveGamesBadge.textContent = "♜ 75 Games  ✔";
        seventyFiveGamesBadge.style.color = "rgb(46, 125, 50)";
        seventyFiveGamesBadge.classList.add("pop-element");


    }
    else
    {
        let seventyFiveGamesBadge = document.getElementById("seventy-five-games-badge");
        seventyFiveGamesBadge.style.color = "rgb(227,38,38)";
        seventyFiveGamesBadge.textContent = "🔒 75 Games";
        seventyFiveGamesBadge.classList.remove("pop-element");

    }
    if(stats.all >= 200)
    {
        let twoHundredGamesBadge = document.getElementById("two-hundred-games-badge");
        twoHundredGamesBadge.textContent = "♛ 200 Games  ✔";
        twoHundredGamesBadge.style.color = "rgb(46, 125, 50)";
        twoHundredGamesBadge.classList.add("pop-element");

    }
    else
        
    {
        console.log("started");
        let twoHundredGamesBadge = document.getElementById("two-hundred-games-badge");
        twoHundredGamesBadge.style.color = "rgb(227,38,38)";
        twoHundredGamesBadge.textContent = "🔒 200 Games";
        twoHundredGamesBadge.classList.remove("pop-element");

    }
    if(stats.win >= 50)
    {
        let fiftyWinsBadge = document.getElementById("fifty-wins-badge");
        fiftyWinsBadge.textContent = "🏅 50 Wins  ✔";
        fiftyWinsBadge.style.color = "rgb(46, 125, 50)";
        fiftyWinsBadge.classList.add("pop-element");

    }
    else
    {
        let fiftyWinsBadge = document.getElementById("fifty-wins-badge");
        fiftyWinsBadge.style.color = "rgb(227,38,38)";
        fiftyWinsBadge.textContent = "🔒 50 Wins"   ;
        fiftyWinsBadge.classList.remove("pop-element");
    }
    if(winRate >= 60)
    {
        let sixtyPercentWinRateBadge = document.getElementById("sixty-percent-win-rate-badge");
        sixtyPercentWinRateBadge.textContent = "🏆 60% Win Rate  ✔";
        sixtyPercentWinRateBadge.style.color = "rgb(46, 125, 50)";
        sixtyPercentWinRateBadge.classList.add("pop-element");


    }
    else
    {
        let sixtyPercentWinRateBadge = document.getElementById("sixty-percent-win-rate-badge");
        sixtyPercentWinRateBadge.style.color = "rgb(227,38,38)";
        sixtyPercentWinRateBadge.textContent = "🔒 60% Win Rate";
        sixtyPercentWinRateBadge.classList.remove("pop-element");
    }
    if(getTreeLevel(stats) === "Forest")
    {
        let forestBadge = document.getElementById("forest-badge");
        forestBadge.textContent = "🌲 Forest  ✔";
        forestBadge.style.color = "rgb(46, 125, 50)";
        forestBadge.classList.add("pop-element");

    }
    else
    {
        let forestBadge = document.getElementById("forest-badge");
        forestBadge.style.color = "rgb(227,38,38)";
        forestBadge.textContent = "🔒 Forest";
        forestBadge.classList.remove("pop-element");
    }
}

//event listeners

document.addEventListener("DOMContentLoaded", loadUser)
document.getElementById("username-input").addEventListener("keydown",(event)=>checkKey(event));
document.getElementById("to-badges-button").addEventListener("click", openBadgesPage);
document.getElementById("to-home-button").addEventListener("click", openHomePage);