def calcular_estatisticas(numeros):
    """
    Calcula estatísticas básicas de uma lista de números.
    
    Args:
        numeros (list): Lista de números para análise
        
    Returns:
        tuple: Tupla contendo (total, média, máximo, mínimo)
    """
    total = sum(numeros)
    media = total / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    
    return total, media, maximo, minimo


# Dados de entrada
numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

# Calcula as estatísticas
total, media, maximo, minimo = calcular_estatisticas(numeros)

# Exibe os resultados
print("total:", total)
print("media:", media)
print("maior:", maximo)
print("menor:", minimo)