# Explicação técnica do código `num_primos.py`

Este arquivo contém a função `eh_primo(n: int) -> bool`, que determina se um número inteiro é primo.

## Estrutura do código

- `eh_primo(n: int) -> bool`: função principal de verificação de primalidade.
- `_tem_fator_ate_raiz(n: int) -> bool`: função auxiliar que busca um divisor até a raiz quadrada de `n`.
- `main() -> None`: bloco de execução que testa uma lista de valores e imprime o resultado.

## Como funciona a verificação

1. Casos triviais:
   - `n <= 1` retorna `False` (não primo).
   - `n <= 3` retorna `True` (2 e 3 são primos).

2. Eliminação rápida de múltiplos de 2 e 3:
   - Se `n` for divisível por 2 ou por 3, retorna `False` imediatamente.
   - Esse filtro reduz o número de divisões necessárias antes de entrar no laço principal.

3. Verificação até a raiz quadrada:
   - A função auxiliar usa `math.isqrt(n)` para calcular o limite inteiro de teste.
   - O laço itera em passos de 6, testando `divisor` e `divisor + 2`.
   - Essa abordagem cobre todos os possíveis divisores primos restantes após eliminar 2 e 3.

## Por que usar `range(5, limite + 1, 6)`?

Após descartar múltiplos de 2 e 3, os únicos candidatos a fatores primos são números da forma `6k - 1` e `6k + 1`.
Assim, testar `divisor` e `divisor + 2` em intervalos de 6 reduz significativamente a quantidade de operações.

## Boas práticas aplicadas

- Separação da lógica em funções pequenas e nomeadas.
- Uso de `math.isqrt()` para evitar cálculos redundantes e manter a condição de parada clara.
- Criação de `main()` para organizar o fluxo de execução principal.
- Manutenção de tipagem explícita com anotações `int` e `bool`.

## Exemplo de saída

Para os valores de teste definidos no arquivo, a saída é:

- `0`: não primo
- `1`: não primo
- `2`: primo
- `3`: primo
- `4`: não primo
- `17`: primo
- `18`: não primo
- `19`: primo
- `20`: não primo
- `97`: primo
- `100`: não primo

## Eficiência

- A complexidade do algoritmo é `O(√n)` no pior caso.
- O uso de passos de 6 reduz aproximadamente pela metade o número de divisões em comparação com a verificação de todos os ímpares.
- A separação em funções facilita a leitura, manutenção e testes unitários.
