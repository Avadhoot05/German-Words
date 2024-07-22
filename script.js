const btn = document.getElementById("check");
btn.addEventListener("click", OnCheck);


let shuffled = [];
let wordObj = {};

async function getData() {
    try 
    {
        const response = await fetch("./word.json");
        wordObj = await response.json();
        Render(wordObj);
    } 
    catch (error) 
    {
        console.error(error.message);
    }
}

getData();


function GetRow(word, i, serialNo)
{
    let wrap = document.createElement("div");
    wrap.id = "word_"+i;

    let english = document.createElement("p");
    english.innerHTML = `${serialNo+1}. ${word["EN"]}`;
    
    let articleIp = document.createElement("input");
    articleIp.id = "article_"+i;
    
    let germanIp =  document.createElement("input");
    germanIp.id = "german_"+i;


    wrap.appendChild(english);
    wrap.appendChild(articleIp);
    wrap.appendChild(germanIp);
    return wrap;
}



function Render(words)
{
    console.log(words);
    const parent = document.getElementById("parent");
    let len = Object.keys(words).length;
    
    let arr = [...Array(len).keys()];
    arr = arr.map(x => ++x);
    shuffled = arr.map(value => ({ value, sort: Math.random() }))
                      .sort((a, b) => a.sort - b.sort)
                      .map(({ value }) => value)

    let frag = document.createDocumentFragment();

    shuffled.forEach((el, i) => {
        frag.appendChild(GetRow(words[el], el, i));
    });

    parent.appendChild(frag);
}

function OnCheck()
{
    for(let i of shuffled)
    {
        let word = wordObj[i];

        let wordRow = document.getElementById("word_"+i);
        
        let article = document.getElementById("article_"+i);
        let german = document.getElementById("german_"+i);

        let val1 = article.value;
        let val2 = german.value;

        
        let ans = document.createElement("span");
        ans.innerHTML = word["Article"] + " " + word["G"];
        wordRow.appendChild(ans);
        
        if(word["G"].trim().toLowerCase() != val2.trim().toLowerCase())
        {
            german.style.border = "solid 1px red";
        }
        if(word["Article"].trim().toLowerCase() != val1.trim().toLowerCase())
        {
            article.style.outline = "solid 1px red";
        }

    }
}
