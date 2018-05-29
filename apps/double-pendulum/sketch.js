function setup() 
{
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
}

//Theta
let t1 = 1;
let t2= 2;

//Velocity
let v1=0;
let v2=0;

//Acceleration
let a1=0;
let a2=0;

//Length
let l1 = -200;
let l2 = -200;

//Mass
let m1 = 10;   //Why are these values negative? Who knows.  It kinda works!!!
let m2 = 10;

let g = -.5;

function draw() 
{
	fill(0);
	background(255);
	translate(window.innerWidth/2,window.innerHeight/2);

	let x1 = l1*sin(t1);
	let y1 = -l1*cos(t1);
	let x2 = x1+l2*sin(t2);
	let y2 = y1-l2*cos(t2);

	line(0,0,x1,y1);
	ellipse(x1,y1,m1,m1);

	line(x1,y1,x2,y2);
	ellipse(x2,y2,m2,m2);


	v1+=a1;
	v2+=a2;

	t1+=v1;
	t2+=v2;

	

	a1 = (-g*(2*m1+m2)*sin(t1)-m2*g*sin(t1-2*t2)-2*sin(t1-t2)*m2*(pow(v2,2)*l2+pow(v1,2)*l1*cos(t1-t1))) / (l1*(2*m1+m2-m2*cos(2*t1-2*t2)));
	a2 = (2*sin(t1-t2)*(pow(v1,2)*l1*(m1+m2)+g*(m1+m2)*cos(t1)+pow(v2,2)*l2*m2*cos(t1-t2))) / (l2*(2*m1+m2-m2*cos(2*t1-2*t2)));

	console.log(a1+","+a2);
}

function windowResized()
{
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function arctan(n)
{
	return cos(n)/sin(n);
}