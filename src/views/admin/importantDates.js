import React from "react";

export function Dates(fechaOpcional) {
    const fechasForUse = {
        "2021/12/20": "Hanukkah",
        "2021/12/24": "Nochebuena",
        "2021/12/25": "Navidad",
        "2021/12/31": "Fiesta de Año Nuevo",
        "2022/01/01": "Año Nuevo",
        "2022/01/06": "Día de los Reyes Magos",
        "2022/01/17": "Blue Monday",
        "2022/02/07": "Super Bowl",
        "2022/02/14": "San Valentin",
        "2022/02/17": "Día del gato",
        "2022/03/08": "Día de la Mujer",
        "2022/03/15": "Día del Consumidor",
        "2022/03/17": "Día de San Patricio",
        "2022/03/27": "Gala Oscars",
        "2022/04/17": "Pascua Resurreccion",
        "2022/04/22": "Día de la Tierra",
        "2022/04/23": "Día internacional del libro",
        "2022/05/01": "Día del Trabajador",
        "2022/05/04": "Día mundial de Star Wars",
        "2022/05/09": "Día de la madre",
        "2022/05/28": "Final Champions League",
        "2022/05/29": "Inicio Roland Gaross",
        "2022/06/19": "Wallmart Prime Day Sale",
        "2022/06/20": "Día del padre",
        "2022/06/21": "Amazon Prime Day",
        "2022/06/28": "Día internacional del orgullo LGBTIQ+",
        "2022/07/21": "Día del perro",
        "2022/08/29": "Día mundial del Videojuego",
        "2022/09/05": "Día del abuelo",
        "2022/09/18": "Fiestas Patrias",
        "2022/10/31": "Halloween",
        "2022/11/19": "Día del Hombre",
        "2022/11/21": "Inicio mundial de futbol Qatar 2022",
        "2022/11/24": "Día de acción de gracias",
        "2022/11/25": "Black Friday",
        "2022/11/28": "CyberMonday",
        "2022/12/18": "Final de la copa mundial de futbol Qatar 2022",
        "2022/12/20": "Hanukkah",
        "2022/12/24": "Nochebuena",
        "2022/12/25": "Navidad",
        "2022/12/31": "Fiesta de Año Nuevo",
    }
    const fechas = [
        {"20/12": "Hanukkah"},
        {"24/12": "Nochebuena"},
        {"25/12": "Navidad"},
        {"31/12": "Fiesta de Año Nuevo"},
        {"01/01": "Año nuevo"},
        {"06/01": "Día de los reyes magos"},
        {"17/01": "Blue Monday"},
        {"07/02": "Super Bowl"},
        {"14/02": "San Valentin"},
        {"17/02": "Día del gato"},
        {"08/03": "Día de la Mujer"},
        {"15/03": "Día del Consumidor"},
        {"17/03": "Día de San Patricio"},
        {"27/03": "Gala Oscars"},
        {"17/04": "Pascua Resurreccion"},
        {"22/04": "Día de la Tierra"},
        {"23/04": "Día internacional del libro"},
        {"01/05": "Día del Trabajador"},
        {"04/05": "Día mundial de Star Wars"},
        {"09/05": "Día de la madre"},
        {"28/05": "Final Champions League"},
        {"29/05": "Inicio Roland Gaross"},
        {"19/06": "Finales NBA"},
        {"19/06-22/06": "Wallmart Prime Day Sale"},
        {"20/06": "Día del padre"},
        {"21/06": "Amazon Prime Day"},
        {"28/06": "Día internacional del orgullo LGBTIQ+"},
        {"21/07": "Día del perro"},
        {"29/08": "Día mundial del Videojuego"},
        {"05/09": "Día del abuelo"},
        {"17/09 - 19/09": "Fiestas Patrias"},
        {"31/10": "Halloween"},
        {"19/11": "Día del Hombre"},
        {"21/11": "Inicio mundial de futbol Qatar 2022"},
        {"24/11": "Día de acción de gracias"},
        {"25/11": "Black Friday"},
        {"28/11": "CyberMonday"},
        {"18/12": "Final de la copa mundial de futbol Qatar 2022"},
        {"18/12- 26/12": "Hanukkah"},
        {"24/12": "Nochebuena"},
        {"25/12": "Navidad"},
        {"31/12": "Fiesta de Año Nuevo"},
    ]
    var now = fechaOpcional ? fechaOpcional : new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    
    let cont = 0;
    let aux = 0;
    for (const [key, value] of Object.entries(fechasForUse)) {
        var fechss = new Date(key);
        var diff = (fechss - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var dayEvent = Math.floor(diff / oneDay);
        console.log((parseInt(day)-parseInt(dayEvent)));
        console.log(key);
        if ((parseInt(day)-parseInt(dayEvent)) < 0) {
          aux = cont;
          break;
        }
        cont = cont +1;
    }
    const fechasFinales = [];
    fechasFinales.push((Object.entries(fechas[aux])[0]))
    fechasFinales.push((Object.entries(fechas[aux+1])[0]))
    fechasFinales.push((Object.entries(fechas[aux+2])[0]))
    console.log(fechasFinales);
  return (fechasFinales);
}