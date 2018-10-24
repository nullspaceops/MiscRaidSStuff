function makeCopy() {
/* Erstellt ein regelmäßiges Backup der Tabelle, um sie vor z.B. Vandalismus zu schützen */

var formattedDate = Utilities.formatDate(new Date(), "GMT+2", "dd.MM.yyyy", "HH:mm:ss");
var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
var sheetName = SpreadsheetApp.getActiveSpreadsheet().getName();
var url = "https://spreadsheets.google.com/feeds/download/spreadsheets/Export?key="+ ssID +  "&gid=0&portrait=true" +"&exportFormat=pdf"
var result = UrlFetchApp.fetch(url);
var contents = result.getContent();
var name = SpreadsheetApp.getActiveSpreadsheet().getName() + " Backup " + formattedDate;
var destination = DriveApp.getFolderById("XXXXXXXXXXXX");
var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId())

file.makeCopy(name, destination);

var emailAdress = "xxxx@yyyy";
var subject = "Backup " + formattedDate + " wurde angelegt.";
var message = "Hallo User,\n das Backup des Raidkalenders wurde um " + formattedDate + " angelegt und befindet sich jetzt in der Ablage und im Anhang.\n Link: https://docs.google.com/spreadsheets/d/1I8ha5Yvh1K0aZ8VSc2o0MoFIWeeJjaxLZCE03OKBKfU/edit#gid=0";

MailApp.sendEmail(emailAdress, subject, message, {attachments:[{fileName:sheetName+".pdf", content:contents, mimeType:"application//pdf"}]});
}

function sendReminder(){
/* Sendet auf Wunsch eine Erinnerung zur Prüfung der Anmeldung zu, unabhängig vom Anmeldestatus. */
var date = new Date();
var weekday = date.getDay();
 
var emailAdress = ["xxxx@yyyy"];
var names = ["nullspace"];
var index = 0;  
var formattedDate = Utilities.formatDate(date, "GMT+2", "dd.MM.yyyy");
var url = "xxxxx";  
var subject = "Anmeldehinweis für Raid " + formattedDate;
  
if (weekday == 1 || weekday == 4){ /* Mon and Thursday*/
  for(index;index < names.length; index++){
      var message = "Hallo " + names[index] + ",\ndu erhälst wie gewünscht einen Anmeldehinweis für den heutigen (" + formattedDate + ") Raid.\nBitte überprüfe deinen Anmeldestatus unter dem folgendem Link:\n" + url + "\nDiese Email kannst du jederzeit bei Zebee (Discord: El Presidente#7760) abbestellen.\nViele Grüße";

  MailApp.sendEmail(emailAdress[index], subject, message);
     }
  }
}

function LockCells(){
/* Sperrt die Zellen an Montagen und Donnerstagen, wenn die Anmelde DL vorbei ist */
var date = new Date();
var weekday = date.getDay();
var sheet = SpreadsheetApp.getActive();
var range = sheet.getRange('A1:B10');
/*var range = sheet.getRange('A1:P62'); */ 
  if (weekday == 1 || weekday == 4){/* Mon and Thursday*/
    var protection = range.protect().setDescription("Anmelde-DL  vorbei - automatische Entsperrung zwischen 23:00-00:00 Uhr");
    var me = Session.getEffectiveUser();
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
      }
   }
}
function UnlockCells() {
/* Gibt die Zellen wieder frei */
  var date = new Date();
  var weekday = date.getDay();
  var sheet = SpreadsheetApp.getActive();
    if (weekday == 1 || weekday == 4) {/* Mon and Thursday*/
      var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
      for (var i = 0; i < protections.length; i++) {
      var protection = protections[i];
          if (protection.canEdit()) {
              protection.remove();
       }
     }
   }
}