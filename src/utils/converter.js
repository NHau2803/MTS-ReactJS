
const removeUft8 = (char) => {
    if([225,226,259,7855,7845,224,7857,7847,7843,7859,7849,227,7861,7851,7841,7863,7853]
        .includes(char.charCodeAt(0))){
        return "a";
    }
    if([234,7871,7873,7875,7877,7879,233,232,7869,7867]
        .includes(char.charCodeAt(0))){
        return "e";
    }
    if([432,7913,7915,7917,7919,7921,249,250,361,7911 ]
        .includes(char.charCodeAt(0))){
        return "u";
    }
    if([243,242,245,7887,244,7889,7895,7897,7891,417,7899,7901,7905,7903 ]
        .includes(char.charCodeAt(0))){
        return "o";
    }
    if([237,236,7883,297 ]
        .includes(char.charCodeAt(0))){
        return "i";
    }
    if([253,7923,7927,7929 ]
        .includes(char.charCodeAt(0))){
        return "y";
    }
    if(char.charCodeAt(0) === 273){
        return "d";
    }

    return char;
}

export const getNameFromFullName = (fullName) => {
    
    let result = "";
    const fullNameArr = fullName.split(" ");
    let name = fullNameArr[fullNameArr.length - 1];
    Array.from(name).forEach(char => {
        result += removeUft8(char)
    });
    
    return result;
}

export const changeListToText = (list) => {
    let str = ""
    list.map(i => {
        return( str += " |" + i) 
    });
    return str;
}

export const formatDate = (date) =>{
    let d = new Date(date);
    return d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
}

export const formatDateTime = (date) =>{
    let d = new Date(date);
    return d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " "+d.toLocaleTimeString();
}
