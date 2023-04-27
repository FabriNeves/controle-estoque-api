export function validate(obj, qtd) {
    
    if (qtd < obj.min_qtd) {
      return {
        message: "A quantidade informada está abaixo do limite mínimo permitido.",
        min_qtd: obj.min_qtd,
      };
    } else if (qtd > obj.max_qtd) {
      return {
        message: "A quantidade informada está acima do limite máximo permitido.",
        max_qtd: obj.max_qtd,
      };
    } else {
      return false;
    }
  }
  
