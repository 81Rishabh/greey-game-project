// get Month name
 function getMonthName(month_number) {
    let name = "";
    switch(month_number) {
       case 1:{
         name = "Jan"
          break;
       }
       case 2:{
         name = "Fab"
          break;
       }
       case 3:{
         name = "March"
          break;
       }
       case 4:{
         name = "Aprail"
          break;
       }
       case 5:{
         name = "May"
          break;
       }
       case 6:{
         name = "Jun"
          break;
       }
       case 7:{
         name = "July"
          break;
       }
       case 8:{
         name = "Aug"
          break;
       }
       case 9:{
         name = "Sep"
          break;
       }
       case 10:{
         name = "Oct"
          break;
       }
       case 11:{
         name = "Nov"
          break;
       }
       case 12:{
         name = "Dec"
         break;
       }
       default : return "Invalid Month Number"
    }
    return name;
  }

  export function getSimplifiedDate(UTC_Date) {
      let dateString = "";
      let d = new Date(UTC_Date);
      dateString = `${d.getDate()} ${getMonthName(d.getMonth())} ${d.getFullYear()}`;
      return dateString;
  }