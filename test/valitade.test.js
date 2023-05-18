import validate from "../src/services/validate";

describe('validate', () => {
    it('deve retornar false se a quantidade estiver dentro dos limites', () => {
      const obj = { min_qtd: 5, max_qtd: 10 };
      const qtd = 8;
  
      const result = validate(obj, qtd);
  
      expect(result.bool).toBe(false);
    });
  
    it('deve retornar true e a mensagem correta se a quantidade for menor que o limite mínimo', () => {
      const obj = { min_qtd: 5, max_qtd: 10 };
      const qtd = 3;
  
      const result = validate(obj, qtd);
  
      expect(result.bool).toBe(true);
      expect(result.message).toBe('A quantidade informada está abaixo do limite mínimo permitido.');
      expect(result.min_qtd).toBe(5);
    });
  
    it('deve retornar true e a mensagem correta se a quantidade for maior que o limite máximo', () => {
      const obj = { min_qtd: 5, max_qtd: 10 };
      const qtd = 12;
  
      const result = validate(obj, qtd);
  
      expect(result.bool).toBe(true);
      expect(result.message).toBe('A quantidade informada está acima do limite máximo permitido.');
      expect(result.max_qtd).toBe(10);
    });
  });
  