//Jack Strosahl
//Cells
var c = document.getElementById("universe");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;
var cells = [];
for(var x =0;x<width;x++)
{
  cells[x] = new Array();
  for(var y =0;y<height;y++)
  {
    cells[x][y] = 0;
  }
}
for(var x =0;x<8;x++)
{
  for(var y =0;y<8;y++)
  {
    if(parseInt(Math.random()*2)==0) cells[x][y]=1;
  }
}

setInterval(update,0);

function update()
{
  for(var x =0;x<cells.length;x++)
  {
    for(var y =0;y<cells[0].length;y++)
    {
      var numNeighbors = countNeighbors(x,y);
      if (numNeighbors > 3) cells[x][y]= 0;
      else if (numNeighbors == 3) cells[x][y] = 1;
      else if (numNeighbors < 2) cells[x][y] = 0;
    }
  }
	draw();
}

function countNeighbors(xPos,yPos)
{
  var neighbors = 0;
  for(var x =xPos-1;x<=xPos+1;x++)
  {
    for(var y =yPos-1;y<=yPos+1;y++)
    {
      if(x>=0&&y>=0&&x<cells.length&&y<cells[0].length&&!(x==xPos&&y==yPos)&&cells[x][y]==1)
      {
        neighbors++;
      }
    }
  }
  return neighbors;
}

function draw()
{
	ctx.clearRect(0,0,width,height);
	for(var x =0;x<cells.length;x++)
  {
  	for(var y =0;y<cells[0].length;y++)
    {
    	if(cells[x][y]==1) ctx.fillRect(x,y,1,1);
    }
  }
}
