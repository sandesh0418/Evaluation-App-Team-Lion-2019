var connection = require('../config');

module.exports.getProgramSummary = function(req, res)
{
    let getOutcomesQuery = "SELECT * FROM outcome";

    let programSummary = {
        title: "Temporary Assessment Name",
        outcomes: []
    }

    connection.query(getOutcomesQuery, function(error, results, fields) {
        
        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'Subject averages could not be retrieved'
              })
        }
        else
        {
            stringifiedOutcomes = Object.values(JSON.parse(JSON.stringify(results)));
            stringifiedOutcomes.forEach(function(element) {
                programSummary.outcomes.push(element);
            });
        }
    })
}
