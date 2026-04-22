# Explicação dos Erros - debug.py

## Erros Encontrados

### 1. **Linha 6: Falta de Aspas na String**
```python
item1 = float(input(Preço do item 1? ))
```
**Problema:** A string `"Preço do item 1? "` está sem aspas duplas.  
**Solução:** Adicionar aspas: `input("Preço do item 1? ")`

---

### 2. **Linha 17: Desconto_cupom não é convertido para número**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)
```
**Problema:** A função `input()` retorna uma **string**, mas o código tenta fazer operação matemática (`desconto_cupom / 100`) sem converter para número.  
**Solução:** Converter para `int` ou `float`: `desconto_cupom = int(input(...))`

---

### 3. **Linha 29: Falta f-string**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```
**Problema:** Falta o `f` antes da string para que a interpolação funcione.  
**Solução:** `print(f" Item 2:        R$ {total_item2:.2f}")`

---

### 4. **Linha 33: Comparação inválida entre String e Integer**
```python
if desconto_cupom > 0:
```
**Problema:** `desconto_cupom` é uma **string** (vindo de `input()`), não pode ser comparada com número usando `>`.  
**Solução:** Converter para número antes: `desconto_cupom = int(input(...))`

---

### 5. **Linha 34: Erro de Indentação**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```
**Problema:** O `print` não está indentado (4 espaços) em relação ao `if`.  
**Solução:** Adicionar indentação corretamente dentro do bloco `if`.

---

## Resumo
- **Erro de sintaxe:** Falta de aspas (1 erro)
- **Erros de tipo:** String usada em operações numéricas (2 erros)
- **Erro de formatação:** Falta f-string (1 erro)
- **Erro de indentação:** Bloco if não indentado (1 erro)
