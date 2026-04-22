# Explicação do Código - refatoracao.py

## Visão Geral
Este programa calcula **4 estatísticas** sobre uma lista de números: total, média, valor máximo e valor mínimo.

---

## Análise Detalhada

### 1. Definição da Função
```python
def c(l):
```
- Define uma função chamada `c` (nome não descritivo - seria melhor `calcular_estatisticas`)
- Recebe um parâmetro `l` (representa uma lista)

### 2. Primeiro Loop - Cálculo do Total
```python
    t=0
    for i in range(len(l)):
        t=t+l[i]
```
- `t=0`: Inicializa uma variável `t` (total) com zero
- `for i in range(len(l))`: Percorre cada índice da lista
- `t=t+l[i]`: Acumula a soma de todos os elementos
- **Resultado**: `t` contém a soma de todos os valores

### 3. Cálculo da Média
```python
    m=t/len(l)
```
- `m=t/len(l)`: Calcula a média aritmética
- `t` (total) dividido pela quantidade de elementos (`len(l)`)
- **Resultado**: `m` contém a média dos valores

### 4. Segundo Loop - Máximo e Mínimo
```python
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
```
- Inicializa `mx` (máximo) e `mn` (mínimo) com o primeiro elemento
- Percorre toda a lista comparando cada elemento:
  - Se o elemento é **maior** que `mx`, atualiza `mx`
  - Se o elemento é **menor** que `mn`, atualiza `mn`
- **Resultado**: `mx` contém o maior valor e `mn` contém o menor valor

### 5. Retorno dos Valores
```python
    return t,m,mx,mn
```
- Retorna uma tupla com os 4 valores calculados

---

## Execução do Programa

```python
x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
```
- `x`: Lista com 10 números
- Chama a função `c` com a lista `x`
- Desempacota os 4 valores retornados em variáveis:
  - `a` = total
  - `b` = média
  - `c2` = máximo
  - `d` = mínimo

### Saída
```python
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```
Imprime os 4 resultados calculados.

---

## Saída Esperada
Para a lista `[23,7,45,2,67,12,89,34,56,11]`:
- **total**: 346
- **media**: 34.6
- **maior**: 89
- **menor**: 2

---

## Observações sobre o Código
⚠️ **Pontos de Melhoria (Refatoração):**
1. Os nomes de variáveis são pouco descritivos (`c`, `l`, `t`, `m`, `mx`, `mn`)
2. Seria melhor usar `sum(l)` do Python em vez de um loop manual
3. Poderia usar funções built-in como `min()` e `max()`
4. O nome da função poderia ser mais significativo
