const express   = require("express");
const mysql     = require("mysql");
const app       = express()

app.use(express.static("public"));
app.use(express.json());

const con = mysql.createConnection({
    host:       "localhost",
    user:       "root",
    password:   "qwerty",
    database:   "short_urls"
});

con.connect(function(error){
    if(error){
        console.log("Database connection failed");
    }
})

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/api/create-short-url", function(request, response){
    let uniqueID    = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').substr(2, 10);
    let sql         = `INSERT INTO links(long_url, short_url_id) VALUES('${request.body.long_url}','${uniqueID}')`;

    con.query(sql, function(error, result){
        if(error){
            response.status(500).json({
                status:     "notok",
                message:    "Something went wrong..."
            });
        } else {
            response.status(200).json({
                status:         "ok",
                short_url_id:   uniqueID
            });
        }
    })
});

app.get("/api/get-all-short-urls",function(request, response){
	let sql = `SELECT * FROM links`;
	con.query(sql, function(error, result){
		if(error){
			response.status(500).json({
				status:     "notok",
				message:    "Something went wrong..."
			});
		} else {
			response.status(200).json(result);
		}
	})
});

app.get("/:short_url_id", function(request, response){
	let short_url_id = request.params.short_url_id;
	let sql = `SELECT * FROM links WHERE short_url_id='${short_url_id}' LIMIT 1`;
	con.query(sql, function(error, result){
		if(error){
			response.status(500).json({
				status:     "notok",
				message:    "Something went wrong..."
			});
		} else {
			sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}' LIMIT 1`;
			con.query(sql, function(error, result2){
				if(error){
					response.status(500).json({
						status:     "notok",
						message:    "Something went wrong..."
					});
				} else {
					response.redirect(result[0].long_url);
				}
			})
		}
	})
});


app.listen(5000);