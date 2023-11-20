const genererCodeConfirmation = function (length) {
    const caracteresPermis = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let codeConfirmation = "";
  
    for (let i = 0; i < length ; i++) {
      const indiceAleatoire = Math.floor(Math.random() * caracteresPermis.length);
      codeConfirmation += caracteresPermis.charAt(indiceAleatoire);
    }
  
    return codeConfirmation;
  }

  module.exports = genererCodeConfirmation;
  