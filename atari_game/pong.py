import pygame
import random
import sys

pygame.init()

WIDTH = 800
HEIGHT = 600
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Atari Pong")

# Cores
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Configurações do Jogo
FPS = 60
PADDLE_WIDTH = 15
PADDLE_HEIGHT = 100
BALL_SIZE = 15
PADDLE_SPEED = 7
BALL_SPEED_X = 5
BALL_SPEED_Y = 5

# Fonte
try:
    FONT = pygame.font.Font("freesansbold.ttf", 32)
except FileNotFoundError:
    FONT = pygame.font.SysFont(None, 32)

class Paddle:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT)
        self.speed = 0

    def move(self):
        self.rect.y += self.speed
        if self.rect.top < 0:
            self.rect.top = 0
        if self.rect.bottom > HEIGHT:
            self.rect.bottom = HEIGHT

    def draw(self):
        pygame.draw.rect(SCREEN, WHITE, self.rect)

class Ball:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, BALL_SIZE, BALL_SIZE)
        self.speed_x = BALL_SPEED_X * random.choice((1, -1))
        self.speed_y = BALL_SPEED_Y * random.choice((1, -1))

    def move(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y

    def reset(self):
        self.rect.center = (WIDTH // 2, HEIGHT // 2)
        self.speed_x *= random.choice((1, -1))
        self.speed_y *= random.choice((1, -1))

    def draw(self):
        pygame.draw.ellipse(SCREEN, WHITE, self.rect)

def main():
    clock = pygame.time.Clock()
    
    player = Paddle(20, HEIGHT // 2 - PADDLE_HEIGHT // 2)
    opponent = Paddle(WIDTH - 20 - PADDLE_WIDTH, HEIGHT // 2 - PADDLE_HEIGHT // 2)
    ball = Ball(WIDTH // 2 - BALL_SIZE // 2, HEIGHT // 2 - BALL_SIZE // 2)

    player_score = 0
    opponent_score = 0

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    player.speed = -PADDLE_SPEED
                if event.key == pygame.K_DOWN:
                    player.speed = PADDLE_SPEED
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                    player.speed = 0

        if not running:
            break

        # Lógica da IA do oponente
        if opponent.rect.centery < ball.rect.y:
            opponent.speed = PADDLE_SPEED - 2 # um pouco mais lento para ser justo
        elif opponent.rect.centery > ball.rect.y:
            opponent.speed = -PADDLE_SPEED + 2
        else:
            opponent.speed = 0

        # Atualização de Movimento
        player.move()
        opponent.move()
        ball.move()

        # Colisões com Paredes Verticais (Teto e Chão)
        if ball.rect.top <= 0 or ball.rect.bottom >= HEIGHT:
            ball.speed_y *= -1

        # Colisões com Raquetes
        if ball.rect.colliderect(player.rect) and ball.speed_x < 0:
            ball.speed_x *= -1
            ball.speed_x += 0.5 # Aumenta a velocidade levemente a cada rebatida
            
        if ball.rect.colliderect(opponent.rect) and ball.speed_x > 0:
            ball.speed_x *= -1
            ball.speed_x -= 0.5 # Aumenta a velocidade levemente a cada rebatida

        # Pontuação (Saída da bola pela esquerda ou direita)
        if ball.rect.left <= 0:
            opponent_score += 1
            ball.reset()
            # Reseta as velocidades
            ball.speed_x = BALL_SPEED_X * random.choice((1, -1))
            ball.speed_y = BALL_SPEED_Y * random.choice((1, -1))
            
        if ball.rect.right >= WIDTH:
            player_score += 1
            ball.reset()
            ball.speed_x = BALL_SPEED_X * random.choice((1, -1))
            ball.speed_y = BALL_SPEED_Y * random.choice((1, -1))

        # Renderização
        SCREEN.fill(BLACK)
        
        # Linha central divisória
        pygame.draw.aaline(SCREEN, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))
        
        player.draw()
        opponent.draw()
        ball.draw()

        # Textos de Pontuação
        player_text = FONT.render(str(player_score), True, WHITE)
        SCREEN.blit(player_text, (WIDTH // 4, 20))

        opponent_text = FONT.render(str(opponent_score), True, WHITE)
        SCREEN.blit(opponent_text, (WIDTH * 3 // 4, 20))

        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
