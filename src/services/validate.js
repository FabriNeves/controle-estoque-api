function validate(obj, qtd) {
  if (qtd < obj.min_qtd) {
    return {
      bool: true,
      message: 'A quantidade informada está abaixo do limite mínimo permitido.',
      min_qtd: obj.min_qtd,
    };
  } if (qtd > obj.max_qtd) {
    return {
      bool: true,
      message: 'A quantidade informada está acima do limite máximo permitido.',
      max_qtd: obj.max_qtd,
    };
  }
  return { bool: false };
}

export default validate;
