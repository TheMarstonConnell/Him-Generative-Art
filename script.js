
let img;
let mask;

let width;
let height;

let w;
let h;

let packer;

let globColor;
let background;

let doDraw = true;

let updatedCircles;

let globCount;

let circles;

let tick = 0;

function makeCircles(count) {
    circles = [];

    for (let index = 0; index < count; index++) {
        let k = {
            id: `${index}-circle`,
            position : { 
                x: Math.floor(noise(index) * w), 
                y: Math.floor(noise(index * fxrand()) * h)
            },
            radius: Math.floor(fxrand() * 20 + 50)
        }
        circles.push(k)
    }

}

function setup() {

    w = 800
    h = 800


    noiseSeed(fxrand() * 100000)

    let ks = min(windowHeight, windowWidth)

    width = ks / 4 * 3
    height = ks / 4 * 3

    createCanvas(width, height);
    
    mask = createGraphics(w, h);

    img = createGraphics(w, h);

    let p = getPalette()

    background = color(p.background)
    globColor = color(p.foreground)

    img.background(background)


    let globCount = Math.floor(fxrand() * 10 + 4)
    makeCircles(globCount)

    packer = new CirclePacker( makeOptions() );
    packer.setDamping( 0.005 );

    tick = 0;
    
    window.$fxhashFeatures = {
        "Count": globCount,
    }

    console.log(window.$fxhashFeatures)
}

function makeOptions() {
    return {
		// the point that the circles should be attracted to
		// REQUIRED
		target: { x: (w - 20)/2, y: (h - 20)/2 },

		// the bounds of the area we want to draw the circles in
		// REQUIRED
		bounds: { width: w - 20, height: h - 20 },
	
		// the initial position and sizes of our circles
		// it is possible to add more circles later
		// each circle should have a unique id, a position and a radius
		// REQUIRED
		circles: circles,

		// true: continuous animation loop
		// false: one-time animation
		// OPTIONAL. default: true
		continuousMode: false,
		
		// correctness of collision calculations.
		// higher number means means longer time to calculate
		// OPTIONAL
		// default = 3
		collisionPasses: 3,
		
		// number of centering animations per frame.
		// higher number means faster movement and longer time to calculate
		// OPTIONAL
		// default = 1
		centeringPasses: 2,

		// callback function for when movement started
		// can get called multiple times
		// OPTIONAL
		onMoveStart: function () { },

		// callback function for updated circle positions
		onMove: function ( updatedCirclePositions ) {
			// draw logic here...
            updatedCircles = updatedCirclePositions
		},

		// callback function for when movement ended
		// can get called multiple times
		// OPTIONAL
		onMoveEnd: function () { }
	};

}


function getPalette() {
    colors = [
        {
            name: "Vanilla",
            background: "#fefae0",
            foreground: "#353535",
        }
    ]

    let choice = Math.floor(fxrand() * colors.length)
    return colors[choice]
}

function drawCircles() {
    for (const c of Object.keys(updatedCircles)) {
        let circle = updatedCircles[c]
        let cc = 10
        for (let index = 0; index < cc; index ++) {
            img.noStroke()
            img.fill(index % 2  ? background : globColor)
            let r = circle.radius * 3
            img.circle(circle.position.x, circle.position.y, r - (r / cc * index))
            
        }
        
    }
}

function draw() {

    // drawGrid()

    if (!doDraw) {
        return
    }

    if (tick < 60) {
        packer.update();
        tick += 1;
    }else{
        fxpreview()
        doDraw = false
    }

    if (updatedCircles == null) {
        return
    }

    

    drawCircles()

    image(img, 0, 0, width, height)
    

}