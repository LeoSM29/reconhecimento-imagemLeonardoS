import math


def eh_primo(n: int) -> bool:
    """
    Verifica se um número inteiro é primo.

    Esta função determina se o número fornecido é um número primo,
    ou seja, um número maior que 1 que não tem divisores positivos
    além de 1 e ele mesmo.

    Args:
        n (int): O número inteiro a ser verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.
    """
    if n <= 1:
        return False

    if n <= 3:
        return True

    if n % 2 == 0 or n % 3 == 0:
        return False

    return not _tem_fator_ate_raiz(n)


def _tem_fator_ate_raiz(n: int) -> bool:
    """Retorna True se n tiver um divisor diferente de 1 e n até a raiz quadrada."""
    limite = math.isqrt(n)
    for divisor in range(5, limite + 1, 6):
        if n % divisor == 0 or n % (divisor + 2) == 0:
            return True
    return False


def main() -> None:
    valores_de_teste = [0, 1, 2, 3, 4, 17, 18, 19, 20, 97, 100]

    for numero in valores_de_teste:
        status = "primo" if eh_primo(numero) else "não primo"
        print(f"{numero}: {status}")


if __name__ == "__main__":
    main()
