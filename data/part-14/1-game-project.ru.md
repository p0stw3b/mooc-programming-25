---
path: /ru/part-14/1-game-project
title: Игровой проект
hidden: false
---

В этой части мы с помощью pygame создадим игру немного крупнее, чем предыдущие примеры. Это вариация классической игры Sokoban, где игрок двигает робота по клетчатому полю и толкает коробки в нужные места, стараясь сделать как можно меньше ходов.

Итог будет выглядеть примерно так:

<img src="game.png">

## Карта игры {#the-game-map}

Начнём с отрисовки карты игры. Игра реализована в классе `Sokoban`, который будет содержать всю функциональность, необходимую для игры. На первом этапе содержимое класса будет таким:

```python
import pygame

class Sokoban:
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()

    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))

    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()

if __name__ == "__main__":
    Sokoban()
```

При запуске программа должна показать окно с начальным состоянием игры. Разберёмся подробнее, как этого добиться.

## Конструктор {#the-constructor}

Конструктор класса инициализирует модули pygame и основные переменные и структуры данных, которые используются в игре. Он также запускает главный цикл игры.

```python
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()
```

Метод `load_images` загружает изображения, используемые в игре, в список `images`. Метод `new_game` создаёт двумерный список `map`, который хранит состояние игрового поля в начале игры.

Переменные `height` и `width` инициализируются по размеру игрового поля. Переменная `scale` хранит длину стороны одной клетки. Так как каждое изображение — квадрат одного и того же размера, достаточно одного значения `scale`, и ширина первого изображения отлично подходит для этой роли. Затем по `scale` можно вычислить ширину и высоту всего поля и создать окно подходящего размера.

## Загрузка изображений {#loading-images}

Метод `load_images` загружает все изображения, используемые в игре:

```python
    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))
```

В игре используются следующие изображения:

### Клетка пола {#floor-square}

<img src="floor.png">

* Имя файла: `floor.png`
* Позиция в списке: 0

### Клетка стены {#wall-square}

<img src="wall.png">

* Имя файла: `wall.png`
* Позиция в списке: 1

### Клетка цели {#target-square}

<img src="target.png">

* Имя файла: `target.png`
* Позиция в списке: 2
* На эту клетку робот должен переместить коробку

### Коробка {#box}

<img src="box.png">

* Имя файла: `box.png`
* Позиция в списке: 3

### Робот {#robot}

<img src="robot.png">

* Имя файла: `robot.png`
* Позиция в списке: 4

### Коробка на клетке цели {#box-on-a-target-square}

<img src="done.png">

* Имя файла: `done.png`
* Позиция в списке: 5
* Коробка уже перемещена на клетку цели

### Робот на клетке цели {#robot-on-a-target-square}

<img src="target_robot.png">

* Имя файла: `target_robot.png`
* Позиция в списке: 6
* Робот также может стоять на пустой клетке цели

## Создание сетки {#creating-the-grid}

Метод `new_game` создаёт начальное состояние игрового поля:

```python
    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
```

Метод создаёт двумерный список `map`, который использует номера позиций изображений в списке `images`, чтобы указать, какое изображение должно стоять в каждой клетке. Так игра всегда хранит актуальное состояние игрового поля.

Важно: в начале все клетки содержат числа от 0 до 4. Числа 5 и 6 не используются, потому что в стартовом состоянии ни коробка, ни робот не стоят на клетке цели.

## Главный цикл {#the-main-loop}

Метод `main_loop` довольно короткий. На каждой итерации он вызывает два метода: `check_events` обрабатывает события, накопившиеся с прошлой итерации, а `draw_window` обновляет содержимое окна.

```python
    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()
```

На этом этапе игра обрабатывает только одно событие — закрытие окна (например, кнопкой «крестик»). В этом случае программа завершается вызовом `exit`.

Каждый раз при вызове `draw_window` выполняется обход всего игрового поля, и изображение для каждой клетки рисуется в правильном месте.

Важно: координаты `x` и `y` в этой игре используются в двух смыслах. При обращении к двумерному списку логично сначала указывать `y`, потому что `y` — это номер строки, а `x` — номер столбца. С другой стороны, в методах pygame обычно сначала передают `x`, что привычно для графики и также часто встречается в математическом контексте.
