# This is a sample Python script.
import random
import time

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


import pygame, sys
from pygame.locals import *
from Snake import *

pygame.init()
pygame.display.set_caption('Snake!')

my_clock = pygame.time.Clock()

FPS = 30

time_delay = 150
move_snake_event = pygame.USEREVENT + 1
pygame.time.set_timer(move_snake_event, time_delay)

cut_snake_event = pygame.USEREVENT + 2

DISPLAYSURF          = pygame.display.set_mode((1400, 800))
disp_info            = pygame.display.Info()
SCREEN_W             = disp_info.current_w
SCREEN_H             = disp_info.current_h
NUM_OF_GRID_COMP_W   = 50
GCOMP_HEIGHT         = SCREEN_W / NUM_OF_GRID_COMP_W
NUM_OF_GRID_COMP_H   = int(SCREEN_H / GCOMP_HEIGHT)
GCOMP_WIDTH          = GCOMP_HEIGHT
snake_got_cut = False

apple = [0, 0]
print(f"apple at : {apple[0]}, {apple[1]}")

apple_icon = pygame.image.load(r"C:\Users\LittleShinyFlower\Desktop\apple.png")
apple_icon = pygame.transform.scale(apple_icon, (GCOMP_WIDTH, GCOMP_HEIGHT))

moveInterval = 300

body_part_img = pygame.image.load(r"C:\Users\LittleShinyFlower\Desktop\body_part.png")
body_part_img = pygame.transform.scale(body_part_img, (GCOMP_WIDTH, GCOMP_HEIGHT))

cut_img = pygame.image.load(r"C:\Users\LittleShinyFlower\Desktop\cut.png")
cut_img = pygame.transform.scale(cut_img, (GCOMP_WIDTH, GCOMP_HEIGHT))

my_snake = CSnake(100, GCOMP_HEIGHT, (NUM_OF_GRID_COMP_W, NUM_OF_GRID_COMP_H), cut_snake_event)

def draw_grid():
    # draw vertical grid lines
    for i in range(0, NUM_OF_GRID_COMP_W):
        pygame.draw.line(DISPLAYSURF, (50, 50, 50), (i*GCOMP_HEIGHT, 0), (i*GCOMP_HEIGHT, SCREEN_H))
    # draw horizontal grid lines
    for i in range(0, NUM_OF_GRID_COMP_H+1):
        pygame.draw.line(DISPLAYSURF, (50, 50, 50), (0, i*GCOMP_HEIGHT), (SCREEN_W, i*GCOMP_HEIGHT))

def move_apple():
    a_x = random.randint(0, NUM_OF_GRID_COMP_W-1)
    a_y = random.randint(0, NUM_OF_GRID_COMP_H-1)

    apple[0] = a_x * GCOMP_HEIGHT
    apple[1] = a_y * GCOMP_HEIGHT

    print(f'new apple at : {apple[0]}, {apple[1]}')


move_apple()


while True:

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_w:
                my_snake.setDirection('up')
            elif event.key == pygame.K_s:
                my_snake.setDirection('down')
            elif event.key == pygame.K_a:
                my_snake.setDirection('left')
            elif event.key == pygame.K_d:
                my_snake.setDirection('right')
        elif event.type == move_snake_event:
            my_snake.move()
            if my_snake.check_apple_col(apple):
                move_apple()
                my_snake.grow()
        elif event.type == cut_snake_event:
            # run some animation
            print("Snake got cut")
            snake_got_cut = True

        DISPLAYSURF.fill("BLACK ")
        draw_grid()

        if not snake_got_cut:
            for body_part in my_snake.body:
                DISPLAYSURF.blit(body_part_img, (body_part[0], body_part[1]))
        else:
            for body_part in my_snake.body:
                DISPLAYSURF.blit(cut_img, (body_part[0], body_part[1]))

        DISPLAYSURF.blit(apple_icon, (apple[0], apple[1]))

        pygame.display.update()
        if snake_got_cut:
            pygame.time.wait(200)
            snake_got_cut = False
        my_clock.tick(FPS)



