// Population object for controlling rockets

var Population = function(size,lifespan,target,obs,inheritedDNA) {
    
    this.size = size;
    this.lifespan = lifespan;
    this.target = target;
    this.rockets = [];
    this.obs = obs;
    for (var i = 0; i < this.size; i ++) {
        if (inheritedDNA) {
            this.rockets[i] = new Rocket(this.lifespan,this.target,this.obs,inheritedDNA[i]);
        } else this.rockets[i] = new Rocket(this.lifespan,this.target,this.obs);
    }
    
    this.run = function() {
        
        for (var i = 0; i < this.size; i ++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
        
    };
    
    this.evaluate = function() {
        
        for (var i = 0; i < this.size; i ++) {
            this.rockets[i].calcFitness();
        }
        
    };
    
    this.getSuccesses = function() {
        
        var cnt = 0;
        for (var i = 0; i < this.size; i ++) {
            if (this.rockets[i].completed) cnt ++;
        }
        
        return cnt;
        
    };
    
    this.createGenepool = function() {
        
        var maxFitness = 0;
        for (var i = 0; i < this.size; i ++) {
            if (this.rockets[i].fitness > maxFitness) maxFitness = this.rockets[i].fitness;
        }
        
        var genepool = [];
        for (i = 0; i < this.size; i ++) {
            this.rockets[i].fitness = this.rockets[i].fitness / maxFitness * this.size;
            for (var j = 0; j < this.rockets[i].fitness; j ++) {
                genepool.push(this.rockets[i].dna);
            }
        }
        
        return genepool;
        
        
    };
    
};