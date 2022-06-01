export const emailValidator=(email)=>{
    const reGex=/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return reGex.test(email);
}
export const passwordValidator=(password)=>{
    // const reGex=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    const reGex=/^(?=.{8,})/;
    return reGex.test(password);
}
export const passwordValidator1=(password)=>{
 const reGex=/^(?=.*[a-z])(?=.*[A-Z])/;
    return reGex.test(password);
}
export const passwordValidator2=(password)=>{
    const reGex=/^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    return reGex.test(password);
}
export const NumberValidator = (password) => {
    const reGex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return reGex.test(password);
}