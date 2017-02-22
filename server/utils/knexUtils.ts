export class KnexUtils {
   public static  logVersion = function() {
    (<any>global).knex.raw('SELECT version()').then(function (resp) {
      var dbServer = resp.rows[0].version
      console.log(dbServer);
    }).catch(function (error) {
      console.log("Connection to database failed");
      console.error(error);
    });
  }
}
