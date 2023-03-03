import pygame.event


class CSnake:

    body = []
    current_dirrection = 'up'
    body_part_size = 0
    cut_snake_event = 0

    def __init__(self, initial_size, body_part_size, comp_num, cut_snake_event):
        self.body_part_size = body_part_size
        self.cut_snake_event = cut_snake_event
        if initial_size and initial_size >=2:
            # Center snake
            center_grid_component = [
                int(comp_num[0]/2) * body_part_size,
                int(comp_num[1]/2) * body_part_size
            ]
            snake_head = [center_grid_component[0], center_grid_component[1]]
            first_body_part = [center_grid_component[0], center_grid_component[1] + body_part_size]

            self.body.append(snake_head)
            self.body.append(first_body_part)
            if initial_size > 2:
                for i in range(2,initial_size):
                    self.body.append([center_grid_component[0], center_grid_component[1] + body_part_size * i])
        else:
            center_grid_component = [
                comp_num[0] / 2 * body_part_size,
                comp_num[1] / 2 * body_part_size
            ]
            snake_head = [center_grid_component[0], center_grid_component[1]]
            first_body_part = [center_grid_component[0], center_grid_component[1] + body_part_size]

            self.body.append(snake_head)
            self.body.append(first_body_part)
        self.getBodySize()
        self.printBody()

    def setDirection(self, direction):
        if direction == 'up' or direction == 'down' or direction == 'left' or direction == 'right':
            self.current_dirrection = direction

    def move(self):
        bLen = len(self.body)
        if self.current_dirrection == "up":
            for i in range(1, bLen):
                self.body[bLen-i][0] = self.body[bLen-1-i][0]
                self.body[bLen-i][1] = self.body[bLen-1-i][1]

            self.body[0][1] -= self.body_part_size

        elif self.current_dirrection == "down":
            for i in range(1, bLen):
                self.body[bLen-i][0] = self.body[bLen-1-i][0]
                self.body[bLen-i][1] = self.body[bLen-1-i][1]

            self.body[0][1] += self.body_part_size

        elif self.current_dirrection == "left":
            for i in range(1, bLen):
                self.body[bLen-i][0] = self.body[bLen-1-i][0]
                self.body[bLen-i][1] = self.body[bLen-1-i][1]

            self.body[0][0] -= self.body_part_size

        elif self.current_dirrection == "right":
            for i in range(1, bLen):
                self.body[bLen-i][0] = self.body[bLen-1-i][0]
                self.body[bLen-i][1] = self.body[bLen-1-i][1]

            self.body[0][0] += self.body_part_size

        self.collision_check()

    def check_apple_col(self, apple):
        if self.body[0][0] == apple[0] and self.body[0][1] == apple[1]:
            return True
        return False

    def grow(self):
        new_body_part = [self.body_part_size * -1, self.body_part_size * -1]
        self.body.append(new_body_part)

    def collision_check(self):
        collisioned_part = None
        for i in range(1, len(self.body)):
            if self.body[i][0] == self.body[0][0] and self.body[i][1] == self.body[0][1]:
                collisioned_part = self.body[i]
                break

        if collisioned_part:
            while self.body[-1] != collisioned_part:
                self.body.pop()
            self.body.pop()
            pygame.time.set_timer(self.cut_snake_event, 1, 1)                                    


    def getBodySize(self):
        return len(self.body)

    def printBody(self):
        for body_part in self.body:
            print(f'{body_part[0]}, {body_part[1]}')
