# Reconhecimento de Imagem com Teachable Machine

Este projeto implementa um classificador de imagens em tempo real usando a câmera do dispositivo, baseado na biblioteca Teachable Machine do Google. O sistema permite treinar e usar modelos de machine learning para reconhecimento de objetos ou gestos diretamente no navegador.

## Funcionalidades

- **Classificação em Tempo Real**: Utiliza a câmera do dispositivo para capturar imagens e classificar em tempo real
- **Interface Web Moderna**: Interface responsiva e intuitiva construída com Bootstrap
- **Treinamento Personalizado**: Capacidade de treinar modelos personalizados através da plataforma Teachable Machine
- **Visualização de Resultados**: Exibe as previsões com porcentagens de confiança

## Como Usar

1. **Clone ou baixe o repositório**
2. **Abra o arquivo `index.html` em um navegador web moderno** (Chrome, Firefox, Safari, etc.)
3. **Permita o acesso à câmera** quando solicitado pelo navegador
4. **Treine seu modelo** (opcional):
   - Acesse [Teachable Machine](https://teachablemachine.withgoogle.com/)
   - Crie um projeto de "Image Project"
   - Treine com suas próprias imagens
   - Exporte o modelo e substitua no código
5. **Use o classificador** apontando a câmera para os objetos treinados

## Estrutura do Projeto

```
reconhecimento-imagemLeonardoS/
├── index.html                 # Interface principal do classificador
└── test-assistent-code/       # Exemplos e exercícios de programação
    ├── debug.py              # Código com erros para prática de debug
    ├── explicacao-debug.md   # Explicação dos erros encontrados
    ├── num_primos.py         # Função para verificar números primos
    ├── explicacao_num_primo.md # Explicação técnica do algoritmo
    ├── refatoracao.py        # Código refatorado para cálculo de estatísticas
    └── explicacao-refatoracao.md # Análise da refatoração
```

## Tecnologias Utilizadas

- **HTML5/CSS3**: Estrutura e estilização da interface
- **JavaScript**: Lógica de classificação e integração com Teachable Machine
- **Bootstrap 5.3.3**: Framework CSS para design responsivo
- **Teachable Machine**: Biblioteca de machine learning para classificação de imagens

## Requisitos do Sistema

- Navegador web moderno com suporte a WebRTC (para acesso à câmera)
- Conexão com internet (para carregar as bibliotecas externas)
- Câmera funcional no dispositivo

## Exemplos de Uso

### Pasta `test-assistent-code`

Esta pasta contém exemplos educacionais de programação Python:

- **`num_primos.py`**: Implementação otimizada para verificar se um número é primo
- **`debug.py`**: Exemplo de código com erros comuns para prática de debugging
- **`refatoracao.py`**: Demonstração de refatoração de código para melhor legibilidade

Cada arquivo Python inclui uma explicação detalhada em arquivos `.md` correspondentes.

## Desenvolvimento

Para modificar ou estender o projeto:

1. Edite o arquivo `index.html` para alterar a interface
2. Modifique os estilos CSS inline ou adicione arquivos CSS externos
3. Personalize o modelo de machine learning através do Teachable Machine
4. Teste sempre em diferentes navegadores e dispositivos

## Limitações

- Requer acesso à câmera do dispositivo
- Funciona apenas em navegadores com suporte a WebRTC
- Dependente de conexão com internet para carregar bibliotecas
- Performance pode variar dependendo do dispositivo

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Autor

Leonardo S. - Projeto de reconhecimento de imagem para fins educacionais e demonstrativos.