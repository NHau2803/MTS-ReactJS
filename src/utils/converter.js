
const removeUft8 = (char) => {
    if([225,226,259,7855,7845,224,7857,7847,7843,7859,7849,227,7861,7851,7841,7863,7853]
        .includes(char.charCodeAt(0))){
        return "a";
    }
    if([234,7871,7873,7875,7877,7879]
        .includes(char.charCodeAt(0))){
        return "e";
    }
    if([432,7913,7915,7917,7919,7921 ]
        .includes(char.charCodeAt(0))){
        return "u";
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

//change date => string / fix backend

export const changeListToText = (list) => {
    let str = ""
    list.map(i => {str += " |" +i} );
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

// export const handleEmail = (tickDefaultEmail, email, name, code) => {
//     if(tickDefaultEmail){
//         return getNameFromFullName(name)+ "." + code + "@vanlanguni.vn";
//     }
//     return email;
// }