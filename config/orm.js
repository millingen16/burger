var connection = require("../config/connection");

function questionMark(num) {
    var array = [];
    for(var i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}

function objectToSql(ob) {
    var array = [];
    for(var key in ob) {
        var value = ob[key];

        if(Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === "string" || value.indeOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" +value);
        }
    }
    return array.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function(err, result) {
            if (err) { throw err; 
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += "VALUES (";
        queryString += questionMark(vals.length);
        queryString += ") ";
    
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },


    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objectToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;


