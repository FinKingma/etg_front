$( document ).ready(function() {
    var highscore = new Highscore();
    highscore.getTop10(function(data) {
        console.log('highscore retrieved: ');
        var generatedTable = '<table>';
            
        generatedTable += '<tr>';
        generatedTable += '<th>';
        generatedTable += 'Who';
        generatedTable += '</th>';
        generatedTable += '<th>';
        generatedTable += 'How much';
        generatedTable += '</th>';
        generatedTable += '<th>';
        generatedTable += 'When';
        generatedTable += '</th>';
        generatedTable += '</tr>';

        for(var i=0;i<data.length;i++) {
            var datetime = new Date(data[i]["date"]);
            generatedTable += '<tr>';
            generatedTable += '<td>';
            generatedTable += data[i]["name"];
            generatedTable += '</td>';
            generatedTable += '<td>';
            generatedTable += data[i]["score"];
            generatedTable += '</td>';
            generatedTable += '<td>';
            generatedTable += datetime.toLocaleString();
            generatedTable += '</td>';
            generatedTable += '</tr>';
        }
        generatedTable += '</table>';
        $("#highscores").html(generatedTable);
    });
});