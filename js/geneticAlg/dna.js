// DNA object

var DNA = function(lifespan) {
    
    this.lifespan = lifespan;
    this.genes = [];
    for (var i = 0; i < this.lifespan; i ++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
    }

};