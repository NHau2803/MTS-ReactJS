export const getNameFromFullName = (fullName) => {
    const fullNameArr = fullName.split(" ");
    return fullNameArr[fullNameArr.length - 1];
   
}

//change date => string / fix backend