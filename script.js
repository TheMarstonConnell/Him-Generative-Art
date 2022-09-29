
let img;

let width;
let height;

let w;
let h;

let nSize = 0.05;

let tick = 0;

let drawSpeed = 1
let drawCounter = 0

let doDraw = true


let radSpacing = 20
let currentRadius = 100

let globColor;
let backgroundColor;
let accentColor;


let minSize;
let maxSize;

let circles;
let packer;
let updatedCircles;

function makeCircles(cCount) {

    let r = Math.floor(cCount / (Math.floor(fxrand() * 3) + 1))

    circles = []
    for (let index = 0; index < cCount; index++) {
        circles.push({
            id: `${index}-circle`,
            radius: Math.floor(fxrand() * (maxSize - minSize) + minSize),
            position: {x : fxrand() * w, y : fxrand() * h},
            color: index % r > 0 ? globColor : accentColor,
        })
        
    }
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
		continuousMode: true,
		
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

function setup() {

    w = 800
    h = 800

    noiseSeed(fxrand() * 100000)

    let ks = min(windowHeight, windowWidth)

    width = ks / 4 * 3
    height = ks / 4 * 3

    createCanvas(width, height);

    img = createGraphics(w, h);

    let p = getPalette()

    backgroundColor = color(p.background)
    globColor = color(p.foreground)
    accentColor = color(p.accent)

    img.background(backgroundColor)


    maxSize = Math.floor(fxrand() * 100)
    minSize = Math.floor(fxrand() * 30 + 5)

    let cc = Math.floor(fxrand() * 10 + 10) 

    makeCircles(cc)


    packer = new CirclePacker( makeOptions() );

    window.$fxhashFeatures = {
        "Count": cc,
        "Min Size": minSize,
        "Max Size": maxSize,
    }

    console.log(window.$fxhashFeatures)
}


function getPalette() {
    colors = [
        {
            name: "Coffee Bean",
            background: "#e6dfcf",
            foreground: "#202020",
            accent: "#61A0AF"
        }
    ]

    let choice = Math.floor(fxrand() * colors.length)
    return colors[choice]
}



function draw() {

    if (!doDraw) {
        return
    }

    if (updatedCircles == null) {
        return
    }

    img.background(backgroundColor)

    let x = 0;
    for (const c of Object.keys(updatedCircles)) {
        let b = updatedCircles[c]
        img.noStroke()
        img.fill(circles[x].color)
        img.circle(b.position.x + 10, b.position.y + 10, b.radius * 2)
        x ++;
    }

    

    let ratio = width / w

    drawCounter += drawSpeed

    // img.background(backgroundColor)

    while (drawCounter >= 1) {
        drawCounter -= 1
    }



    image(img, 0, 0, width, height)

    // img.circle(400, 400, 20)

    if (currentRadius > w) {
        doDraw = false
    }
}