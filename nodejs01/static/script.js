var suma = 0
for(var v = 1; v <= l; v++){
    if(v % 2 != 0){
        suma = suma + v
    }
}
document.write("suma liczb nieparzystych w zakresie od 0 do podanej lczby wynosi " + suma)