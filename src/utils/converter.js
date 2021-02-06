export const getNameFromFullName = (fullName) => {
    const fullNameArr = fullName.split(" ");
    return fullNameArr[fullNameArr.length - 1];
   
}

//change date => string / fix backend

export const changeListToText = (list) => {
    let str = ""
    list.map(i => {str += " |" +i} );
    return str;
}