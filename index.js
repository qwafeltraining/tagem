
const express = require("express");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { title } = require("process");
const PORT = process.env.PORT || 1337;
const app = express();
const creds = require('./credentials.json');
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
const { google } = require("googleapis");
const cookieParser =require("cookie-parser");
const { testing } = require("googleapis/build/src/apis/testing");
const { cp } = require("fs");
app.use(cookieParser())
const { table } = require("console");
 



app.get("/", (req, res) => {
    let data ={
      error :""
    }
    res.render("login",data);
});


app.post("/", async (req, res) => {
 
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    // Create client instance for auth
  
    const client = await auth.getClient();
    var usernme = req.body.username ;
    const userpassword= req.body.userpassword;
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "LoginData!A:A",
    });
  
    var djoin = getRows.data.values.join().split(",");
   
    const get_row = djoin.indexOf(usernme.toLowerCase()) 
  
  
    const getpasswords = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "LoginData!B:B",
    });
    const passwords = getpasswords.data
    var passwordjoin = passwords.values.join().split(",")
    const password = passwordjoin[get_row]
      if (userpassword == password ){
        res.cookie("name",usernme,{maxAge:2000000,overwrite: true});
        res.redirect("/main");
      }else {
      let data ={
        error :"لقد ادخلت بيانات خاطيء"
      }
      res.render("login",data);
    }
  
});




app.get("/main", async (req, res) => {
    if(!req.cookies.name){
    res.redirect("/");
           
    }else{
      if(!req.cookies.currentenvents){
        const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        // Create client instance for auth
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
        const getRows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId,
          range: "current-events!A2:J20",
        });
        djoin = getRows.data.values
        res.cookie("currentenvents",djoin,{maxAge:1800000});
        let ejsdata ={
          online : djoin
        }
        res.render("main",ejsdata);
    }else{
      let ejsdata ={
        online : req.cookies.currentenvents
      }
      res.render("main",ejsdata);
    }


    }
});


app.post("/main", async (req, res) => {

        var event = req.body.event ;
        var team = req.body.team ;
        res.cookie("event",event,{maxAge:1800000,overwrite: true});
        res.cookie("team",team,{maxAge:1800000,overwrite: true});

        res.redirect("/tagem");
    
});






app.get("/tagem", async (req, res) => {
  if(!req.cookies.name){
    res.redirect("/");
           
    }else{
          if(!req.cookies.event){
              res.redirect("/main");
          }else{
              if(!req.cookies.codes || !req.cookies.currentenvents){
                  const auth = new google.auth.GoogleAuth({
                    keyFile: "credentials.json",
                    scopes: "https://www.googleapis.com/auth/spreadsheets",
                  });
                  // Create client instance for auth
                  const client = await auth.getClient();
                  const googleSheets = google.sheets({ version: "v4", auth: client });
                  const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
                  const getRows = await googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range: "current-events!A2:J20",
                  });
                  const getdata = await googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range: "data!A:D",
                  });
                  djoin = getRows.data.values
                  codes = getdata.data.values
          
                  res.cookie("currentenvents",djoin,{maxAge:1800000});
                  res.cookie("codes",codes,{maxAge:1800000});
                  let ejsdata ={
                    online : djoin,
                    type : req.cookies.event.charAt(0),
                    index :req.cookies.event.charAt(2),
                    team :req.cookies.team,
                    codes :codes,
                  }
                  res.render("tagem",ejsdata);
                }else{
                    let ejsdata ={
                      online : req.cookies.currentenvents,
                      type : req.cookies.event.charAt(0),
                      index :req.cookies.event.charAt(2),
                      team :req.cookies.team,
                      codes :req.cookies.codes,
                    }
                    res.render("tagem",ejsdata);
                }
          }
    }
});
app.post("/tagem", async (req, res) => {
 
  if(req.body.input_type == "c"){
    if(req.body.ismyteam == true){
      var name = req.cookies.name ;
      var code = req.body.code ;
      var team =  req.body.team ;
      var input_type = req.body.input_type ;
      var event_name = req.body.event_name ;
      var modadra = req.body.modadra ===""  ? 0 :req.body.modadra;
      var Dmodadra = req.body.Dmodadra ===""  ? 0 : req.body.Dmodadra;
      var sloak = req.body.sloak ===""  ? 0 : req.body.sloak;
      var dsloak = req.body.dsloak ===""  ? 0 : req.body.dsloak ;
      var active = req.body.active ===""  ? 0 : req.body.active;
      var dactive = req.body.dactive ===""  ? 0 : req.body.dactive ;
      var responsa = req.body.responsa  ===""  ? 0 : req.body.responsa ;
      var dresponsa = req.body.dresponsa ===""  ? 0 : req.body.dresponsa ;
      var bonus = req.body.bonus ===""  ? 0 : req.body.bonus ;
      var dbonus = req.body.dbonus ===""  ? 0 : req.body.dbonus ;
      var servuy = req.body.servuy ===""  ? 0 : req.body.servuy;
      var attendance = req.body.attendance ===""  ? 0 : req.body.attendance ;
      var rules = req.body.rules ===""  ? 0 : req.body.rules;
      var drules = req.body.drules ===""  ? 0 : req.body.drules ;
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
      // Create client instance for auth
      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1s64gjDBFemJSJEDUVt_nhuqf7lN2Gtnli3zB9n2KtPU";
  
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'تقيم الشهر!A2:S',
        valueInputOption: 'USER_ENTERED',
        resource :{
          values: [ [name,code,team,input_type,event_name,modadra,Dmodadra,sloak,dsloak,active,dactive,responsa,dresponsa,bonus,dbonus,servuy,attendance,rules,drules] ]
        }   
      });
      
    }else{
        var name = req.cookies.name ;
      var team =  req.body.team ;
      var code = req.body.code ;
      var input_type = req.body.input_type ;
      var event_name = req.body.event_name ;
      var sloak = req.body.sloak ;
      var active = req.body.active ;
      var responsa = req.body.responsa  ;
      
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
      // Create client instance for auth
      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
    
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'branch!A2:H',
        valueInputOption: 'USER_ENTERED',
        resource :{
          values: [ [name,code,team,input_type,event_name,sloak,active,responsa] ]
        }   
      });
    
    }


  }else{
    var name = req.cookies.name ;
    var code = req.body.code ;
    var team =  req.body.team ;
    var input_type = req.body.input_type ;
    var event_name = req.body.event_name ;
    var modadra = req.body.modadra ===""  ? 0 :req.body.modadra;
    var Dmodadra = req.body.Dmodadra ===""  ? 0 : req.body.Dmodadra;
    var sloak = req.body.sloak ===""  ? 0 : req.body.sloak;
    var dsloak = req.body.dsloak ===""  ? 0 : req.body.dsloak ;
    var active = req.body.active ===""  ? 0 : req.body.active;
    var dactive = req.body.dactive ===""  ? 0 : req.body.dactive ;
    var responsa = req.body.responsa  ===""  ? 0 : req.body.responsa ;
    var dresponsa = req.body.dresponsa ===""  ? 0 : req.body.dresponsa ;
    var bonus = req.body.bonus ===""  ? 0 : req.body.bonus ;
    var dbonus = req.body.dbonus ===""  ? 0 : req.body.dbonus ;
    var servuy = req.body.servuy ===""  ? 0 : req.body.servuy;
    var attendance = req.body.attendance ===""  ? 0 : req.body.attendance ;
    var rules = req.body.rules ===""  ? 0 : req.body.rules;
    var drules = req.body.drules ===""  ? 0 : req.body.drules ;
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    // Create client instance for auth
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1s64gjDBFemJSJEDUVt_nhuqf7lN2Gtnli3zB9n2KtPU";

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'تقيم الشهر!A2:S',
      valueInputOption: 'USER_ENTERED',
      resource :{
        values: [ [name,code,team,input_type,event_name,modadra,Dmodadra,sloak,dsloak,active,dactive,responsa,dresponsa,bonus,dbonus,servuy,attendance,rules,drules] ]
      }   
    });
    
  }
  res.redirect("/tagem");
    
});



app.get("/branch", async (req, res) => {
  if(!req.cookies.name){
    res.redirect("/");
           
    }else{
          if(!req.cookies.currentenvents){
            const auth = new google.auth.GoogleAuth({
              keyFile: "credentials.json",
              scopes: "https://www.googleapis.com/auth/spreadsheets",
            });
            // Create client instance for auth
            const client = await auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: client });
            const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
            const getRows = await googleSheets.spreadsheets.values.get({
              auth,
              spreadsheetId,
              range: "current-events!A2:J20",
            });
            djoin = getRows.data.values
            res.cookie("currentenvents",djoin,{maxAge:1800000});
            let ejsdata ={
              online : djoin
            }
            res.render("branch",ejsdata);
          }else{
            let ejsdata ={
              online : req.cookies.currentenvents
            }
            res.render("branch",ejsdata);
          }
  }
});
app.post("/branch", async (req, res) => {

  var event = req.body.event ;
  var team = req.body.team ;
  res.cookie("event",event,{maxAge:1800000,overwrite: true});

  res.cookie("team",team,{maxAge:1800000,overwrite: true});
  var event_name = req.cookies.currentenvents[event.charAt(2)][1];

  res.cookie("event_name",event_name,{maxAge:1800000,overwrite: true});

  res.redirect("/branch-tagem");

});








app.get("/branch-tagem", async (req, res) => {
  if(!req.cookies.name){
    res.redirect("/");
           
    }else{
          if(!req.cookies.event){
              res.redirect("/branch");
          }else{
              
            const auth = new google.auth.GoogleAuth({
              keyFile: "credentials.json",
              scopes: "https://www.googleapis.com/auth/spreadsheets",
            });
            // Create client instance for auth
            const client = await auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: client });
            const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
            const getRows = await googleSheets.spreadsheets.values.get({
              auth,
              spreadsheetId,
              range: "branch!A2:J",
            });
  
            var data = getRows.data.values
            res.cookie("currentbranch",data,{maxAge:1800000,overwrite: true});
            if (data == null){
              let ejsdata ={
                data : [["لا يوجد متدريبن"]],
                event_name :req.cookies.event_name,
                team :req.cookies.team,
                exists : 0,
              }
              res.render("branch-tagem",ejsdata);

            }else{
            var teamData = [];

            for(var i=0; i<data.length ; i++){
              if (data[i][9]==req.cookies.team & data[i][4]== req.cookies.event_name){
                teamData.push(data[i]);
              }
            }
            
              let ejsdata ={
                data : teamData,
                event_name :req.cookies.event_name,
                team :req.cookies.team,
                exists : 1,
              }
            res.render("branch-tagem",ejsdata);

              

            }
            
               
          }
    }
});

app.post("/branch-tagem", async (req, res) => {
    if(!req.cookies.name){
      res.redirect("/");
           
    }else{
      var name = req.body.user_name+","+req.cookies.name ;
      var code = req.body.code ;
      var team =  req.body.team ;
      var input_type = req.body.input_type ;
      var event_name = req.body.event_name ;
      var sloak = req.body.sloak ;
      var dsloak = req.body.dsloak ;
      var active = req.body.active ;
      var dactive = req.body.dactive ;
      var responsa = req.body.responsa  ;
      var dresponsa = req.body.dresponsa ;
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
      // Create client instance for auth
      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1s64gjDBFemJSJEDUVt_nhuqf7lN2Gtnli3zB9n2KtPU";
  
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'تقيم الشهر!A2:S',
        valueInputOption: 'USER_ENTERED',
        resource :{
          values: [ [name,code,team,input_type,event_name,0,0,sloak,dsloak,active,dactive,responsa,dresponsa,0,0,0,0,0,0] ]
        }   
      });
      if(!req.cookies.currentbranch){
        const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";

        const getRows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId,
          range: "branch!A2:J",
        });
        data = getRows.data.values
        res.cookie("currentbranch",data,{maxAge:1800000,overwrite: true});
        for(var i=0; i<data.length ; i++){
          if (data[i][4]== req.cookies.event_name & data[i][1] ==code  ){
            var row= i+2
            await googleSheets.spreadsheets.values.clear({
              auth,
              spreadsheetId,
              range: "branch!A"+row+":H"+row,
               
            });
            break;
          }
        }


      }else{
        const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
        var alldata = req.cookies.currentbranch;
        for(var i=0; i<alldata.length ; i++){
          if (alldata[i][4]== req.cookies.event_name & alldata[i][1] ==code  ){
            await googleSheets.spreadsheets.values.clear({
              auth,
              spreadsheetId,
              range: "branch!A"+(i+2)+":H"+(i+2),
               
            });
            break;
          }
        }

      }        
    }
    res.redirect("/branch-tagem");

});

app.post("/getbranchdata", async (req, res) => {
    var code= req.body.code;
    if(!req.cookies.event_name){
        res.redirect("/branch");
    }else{

        if(!req.cookies.currentbranch || !req.cookies.currentenvents){
            const auth = new google.auth.GoogleAuth({
              keyFile: "credentials.json",
              scopes: "https://www.googleapis.com/auth/spreadsheets",
            });
            // Create client instance for auth
            const client = await auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: client });
            const spreadsheetId = "1VatSeUdpQkP4YX2xrzBXwn9PZzxkfs96-QEXVszCxvw";
            const getRows = await googleSheets.spreadsheets.values.get({
              auth,
              spreadsheetId,
              range: "branch!A2:J",
            });
            const currentdata = await googleSheets.spreadsheets.values.get({
              auth,
              spreadsheetId,
              range: "current-events!A2:J20",
            });
            data = getRows.data.values
            djoin = currentdata.data.values
            res.cookie("currentenvents",djoin,{maxAge:1800000,overwrite: true});
            res.cookie("currentbranch",data,{maxAge:1800000,overwrite: true});
            var codedata = [];

            for(var i=0; i<data.length ; i++){
              if (data[i][4]== req.cookies.event_name & data[i][1] ==code  ){
                codedata.push(data[i]);
                break;
              }
            }
            var degree = [];

            for(var i=0; i<djoin.length ; i++){
              if (djoin[i][1]== req.cookies.event_name  ){
                degree.push(djoin[i]);
                break;
              }
            }
            res.status(200).send({ codedata : codedata , degree:degree });
          }else{
            var codedata = [];
            var alldata = req.cookies.currentbranch;
            for(var i=0; i<alldata.length ; i++){
              if (alldata[i][4]== req.cookies.event_name & alldata[i][1] ==code  ){
                codedata.push(alldata[i]);
                break;
              }
            }
            var degree = [];
            var alldegree = req.cookies.currentenvents;

            for(var i=0; i<alldegree.length ; i++){
              if (alldegree[i][1]== req.cookies.event_name  ){
                degree.push(alldegree[i]);
                break;
              }
            }
            res.status(200).send({ codedata : codedata , degree:degree});
          }
    }    
});




app.listen(3000, () => {
    console.log(' Server listening on port 3000 ');
});

