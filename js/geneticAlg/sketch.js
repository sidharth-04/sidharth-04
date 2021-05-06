// Program

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

// Population Control
var population;
var cycles = 300;
var count = 0;
var popSize = 400;
var mutationRate = 0.015;
// Miscellaneous
var successes = 0;
var successRate = 0;
var generation = 0;
var target;
var obs = [];
// Gene Information
var genepool = [];
var newGenes = [];

function setup() {

    if (vw < 410) return;

    let canvas = createCanvas(400,400);
    canvas.parent("canvas");
    target = createVector(350,150);
    obs = [[0,200,300,10],[0,100,400,10]];
    population = new Population(popSize,cycles,target,obs);

}

function crossover() {

    var midpoint = floor(random(genepool.length));
    var parentA = random(genepool);
    var parentB = random(genepool);
    var child = new DNA();
    for (var i = 0; i < cycles; i ++) {
        if (i < midpoint) child.genes[i] = parentA.genes[i];
        else child.genes[i] = parentB.genes[i];
        // child.genes[i] = parentA.genes[i];
    }

    // Cause mutations
    for (i = 0; i < cycles; i ++) {
        if (random(1) <= mutationRate) {
            child.genes[i] = p5.Vector.random2D();
            child.genes[i].setMag(0.1);
        }
    }

    return child;

}

function draw() {

    if (vw < 410) return;

    background(30);

    population.run();

    // Display information
    fill(255,50);
    textSize(15);
    text('Time Left: '+(cycles-count),10,20);
    text('Generation: '+generation,10,35);
    let fps = frameRate();
    text("FPS: " + fps.toFixed(2), 10, height - 10);
    successes = population.getSuccesses();
    text('Success Rate: '+floor(successes/popSize*100)+"%",10,50);
    if (generation !== 0) {
        text('Average Success Rate: '+floor((successRate/(generation))/popSize*100)+"%",200,20);
    }

    // Obstacles
    for (var i = 0; i < obs.length; i ++) {
        rect(obs[i][0],obs[i][1],obs[i][2],obs[i][3]);
    }

    // Target
    noStroke();
    ellipse(target.x,target.y,15,15);

    // Generation control
    count ++;
    if (count > cycles) {
        // Set fitness values for all rockets
        population.evaluate();
        // Create gene pool
        genepool = population.createGenepool();
        // Mix genes to get new rocket dna
        for (i = 0; i < popSize; i ++) {
            newGenes[i] = crossover();
        }
        population = new Population(popSize,cycles,target,obs,newGenes);
        count = 0;
        generation ++;
        successRate += successes;
        genepool = [];
        newGenes = [];
        /* Make target change position
        if (generation % 10 === 0) {
            target.x = random(50,width/2+50);
            target.y = random(50,150);
        }
        */
    }


}
