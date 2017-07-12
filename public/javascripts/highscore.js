var Highscore = function() {
    this.hsaurl = $("#hsaurl").val();
    if (!this.hsaurl) {
        console.log("no highscoreurl found, fallback initiated to http://localhost:1234");
        this.hsaurl = "http://localhost:1234";
    }
    console.log("env: " + this.hsaurl);
    
    this.getTop10 = function(callback) {
        $.ajax({
            type: "GET",
            url: this.hsaurl+"/api/highscore",
            dataType: "json",
            accepts: "application/json",
            success: callback,
            error: function(err){ 
                console.log('no highscore could be retrieved: ' + err);
                callback(undefined);
            }
        });
    },
    this.saveHighscore = function(person, points, callback) {
        $.ajax({
            type: "PUT",
            url: this.hsaurl+"/api/highscore",
            dataType: "json",
            headers: {
                "name": person,
                "score": points
            },
            success: callback,
            error: function(err){ 
                throw new Error(err);
            }
        });
    }
};