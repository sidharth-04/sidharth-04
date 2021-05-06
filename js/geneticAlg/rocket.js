// Rocket object

var Rocket = function(lifespan,target,obs,dna) {
    
    // Physics variables
    this.pos = createVector(width/2,height);
    this.vel = createVector();
    this.acc = createVector();
    // Miscellaneous variables
    this.lifespan = lifespan;
    this.target = target;
    this.obs = obs;
    if (dna) {
        this.dna = dna;
    } else this.dna = new DNA(this.lifespan);
    this.count = 0;
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
    
    this.calcFitness = function() {
        
        var d = dist(this.pos.x,this.pos.y,this.target.x,this.target.y);
        this.fitness = map(d,0,width,width,0);
        if (this.completed) {
            this.fitness *= 20;
        }
        if (dist(this.pos.x,this.pos.y,this.target.x,this.target.y) < 80) {
            this.fitness *= 10;
            if (dist(this.pos.x,this.pos.y,this.target.x,this.target.y) < 30) {
                this.fitness *= 3;
            }
        }
        else if (this.crashed) {
            this.fitness /= 5;
        }

    };
    
    this.checkCrash = function() {
        
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y > height+5) {
            this.crashed = true;
            return;
        }
        
        for (var i = 0; i < this.obs.length; i ++) {
            if (this.pos.x > this.obs[i][0] && this.pos.x < this.obs[i][0]+this.obs[i][2] &&
            this.pos.y > this.obs[i][1] && this.pos.y < this.obs[i][1]+this.obs[i][3]) {
                this.crashed = true;
                return;
            }
        }
        
    };
    
    this.applyForce = function(force) {
        
        this.acc.add(force);
        
    };
    
    this.update = function() {
        
        if (!this.completed && !this.crashed) {
            this.applyForce(this.dna.genes[this.count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.count ++;
            // Check for success
            if (dist(this.pos.x,this.pos.y,this.target.x,this.target.y) < 10) {
                this.completed = true;
                this.pos.x = target.x;
                this.pos.y = target.y;
            }
            // Check for crash
            this.checkCrash();
            this.count ++;
        }
        
    };

    this.show = function() {
        
        push();
        noStroke();
        fill(255,50);
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,25,5);
        pop();
        
    };

};