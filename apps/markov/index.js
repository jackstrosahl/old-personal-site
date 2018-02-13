function input(str)
{
    var list =  str.split(" ");
    var ids = [];
    for(x=list.length-1;x>=0;x--)
    {
        if(list[x].length>0)
        {
            switch(list[x][list[x].length-1])
            {
                case ",":
                case ":":
                case ";":
                    if(x>ids.length-1) ids[x+1] =1;
                    else ids.splice(x+1,0,1);
                    break;
                case ".":
                case "!":
                case "?":
                    if(x>ids.length-1) ids[x+1] =2;
                    else ids.splice(x+1,0,2);
                    break;
            }
            ids[x] =0;
            if(x+1<ids.length&&ids[x+1]!=0)
            {
                list.splice(x+1,0,list[x].slice(list[x].length-1));
                list[x] = list[x].slice(0,list[x].length-1);
            }
        }
        else 
        {
            list.splice(x,1);
            ids.shift();
        }
    }
    list.unshift(".");
    ids.unshift(2);
    list.push("");
    ids.push(2);
    return[list,ids];
}

function generateText(list,ids)
{
    var strings =[];
    var nextStrings = [];
    var curID;
    var nextString = chooseNextString(list[0]);
    var output = "";
    while(nextString!="")
    {
        switch (curID)
        {
            case 0:
                output+= " "+nextString;
                break;
            case 1:
                output+=nextString;
                break;
            case 2:
                output += nextString+ " ";
                break;
        }
        nextString = chooseNextString(nextString);
    }
    output  =output.trim();
    if(output.length==0)
    {
        return generateText(list,ids);
    }
    return output;
    
    function chooseNextString(str)
    {
        var index = strings.indexOf(str);
        if(index==-1)
        {
            strings.push(str);
            var index = strings.length-1;
            nextStrings[index] = [];
            for(x=0;x<list.length-1;x++)
            {
                if(list[x]==strings[index]) nextStrings[index].push(list[x+1]);
            }
        }
        var string = nextStrings[index][parseInt(Math.random()*nextStrings[index].length)];
        curID = ids[list.indexOf(string)];
        return string;
    }
}

var simBtn =document.getElementById("simulateButton");
var clearChk = document.getElementById("clear");

if(localStorage.getItem("list")===null)
{
    simBtn.style.visibility = "hidden";
}

var list = [];
var ids= [];
function applyButtonClick()
{
    var textInput = document.getElementById("addString").value;
	if(clearChk.checked)
	{
      localStorage.removeItem("list");
      localStorage.removeItem("ids");
      simBtn.style.visibility = "hidden";
	}
	else
	{
      var storedList = localStorage.getItem("list");
      if(storedList === null) 
      {
         var output = input(textInput);
         list = output[0];
         ids = output[1];
      }
      else
      {
		 list = JSON.parse(storedList);
		 ids = JSON.parse(localStorage.getItem("ids"));
		 var output = input(textInput);
		 list = list.concat(output[0]);
		 ids = ids.concat(output[1]);
      }
      localStorage.setItem("list",JSON.stringify(list));
      localStorage.setItem("ids",JSON.stringify(ids));
      simBtn.style.visibility = "visible";
      console.log(list);
	}
}

function simulateButtonClick()
{
	document.getElementById("output").innerText = generateText(list,ids);
}

window.onload = function(event) 
{
    document.getElementById("applyButton").addEventListener("click",applyButtonClick);
    document.getElementById("simulateButton").addEventListener("click",simulateButtonClick);
}