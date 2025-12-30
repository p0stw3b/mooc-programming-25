---
path: /ru/part-13/3-events
title: События
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знакомы с событиями pygame
- вы сможете писать программы, реагирующие на нажатия клавиш
- вы сможете писать программы, реагирующие на события мыши

</text-box>

До сих пор наши главные циклы выполняли заранее заданные анимации и реагировали только на события типа `pygame.QUIT`, хотя в цикле мы получаем список _всех_ событий от операционной системы. Разберёмся и с другими типами событий.

## Обработка событий {#handling-events}

Эта программа печатает информацию обо всех событиях, которые операционная система передаёт pygame‑программе во время её работы:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        print(event)
        if event.type == pygame.QUIT:
            exit()
```

Предположим, программа поработала некоторое время, после чего мы нажали кнопку закрытия окна. Тогда программа напечатает примерно такую информацию:

```x
<Event(4-MouseMotion {'pos': (495, 274), 'rel': (495, 274), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (494, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (492, 274), 'rel': (-2, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (491, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(5-MouseButtonDown {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(6-MouseButtonUp {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(2-KeyDown {'unicode': 'a', 'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(3-KeyUp {'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(2-KeyDown {'unicode': 'b', 'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(3-KeyUp {'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(2-KeyDown {'unicode': 'c', 'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(3-KeyUp {'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(12-Quit {})>
```

Первые несколько событий относятся к движению и кликам мыши, затем идут события клавиатуры, а последнее событие закрывает программу. У каждого события есть как минимум тип, но также могут быть дополнительные данные — например, положение курсора мыши или клавиша, которая была нажата.

Описание событий можно найти в [документации pygame](https://www.pygame.org/docs/ref/event.html), но иногда проще вывести события с помощью кода выше и посмотреть, какое событие возникает в момент, когда происходит то, на что вы хотите реагировать.

## События клавиатуры {#keyboard-events}

Эта программа обрабатывает события нажатия клавиш со стрелками влево и вправо. Программа печатает, какая клавиша была нажата.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                print("left")
            if event.key == pygame.K_RIGHT:
                print("right")

        if event.type == pygame.QUIT:
            exit()
```

Константы `pygame.K_LEFT` и `pygame.K_RIGHT` соответствуют клавишам стрелок влево и вправо. Константы pygame для разных клавиш клавиатуры перечислены в [документации pygame](https://www.pygame.org/docs/ref/key.html#key-constants-label).

Например, если пользователь нажмёт стрелку вправо два раза, затем один раз влево и затем ещё раз вправо, программа выведет:

```x
right
right
left
right
```

Теперь у нас есть все инструменты, чтобы двигать персонажа (или _спрайт_) по экрану вправо и влево с помощью стрелок. Следующий код делает именно это:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                x -= 10
            if event.key == pygame.K_RIGHT:
                x += 10

        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
```

В зависимости от того, как вы нажимаете стрелки, программа может выглядеть так:

<img src="pygame_move_robot.gif">

В коде выше есть переменные `x` и `y`, которые хранят координаты спрайта. Переменная `y` выбрана так, чтобы спрайт находился внизу окна. Значение `y` не меняется во время выполнения программы. А вот значение `x` увеличивается на 10 при нажатии стрелки вправо и уменьшается на 10 при нажатии стрелки влево.

Программа в целом работает, но для каждого шага нужно снова нажимать клавишу. Было бы лучше, если бы движение продолжалось, пока клавиша удерживается. Следующая программа делает именно так:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

to_right = False
to_left = False

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                to_left = True
            if event.key == pygame.K_RIGHT:
                to_right = True

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                to_left = False
            if event.key == pygame.K_RIGHT:
                to_right = False

        if event.type == pygame.QUIT:
            exit()

    if to_right:
        x += 2
    if to_left:
        x -= 2

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    clock.tick(60)
```

Теперь в коде есть переменные `to_right` и `to_left`. Они «помнят», должен ли спрайт в данный момент двигаться вправо или влево. Когда пользователь нажимает соответствующую стрелку, значение нужной переменной становится `True`. Когда клавиша отпускается — значение снова становится `False`.

Таймер используется для того, чтобы перемещения спрайта происходили (потенциально) 60 раз в секунду. Если стрелка нажата, спрайт смещается на 2 пикселя вправо или влево. Это значит, что при удержании клавиши спрайт будет двигаться со скоростью 120 пикселей в секунду.

<programming-exercise name='Четыре направления' anchor="Four directions" tmcname='part13-11_four_directions'>

Напишите программу, в которой игрок может двигать робота в четырёх направлениях с помощью стрелок на клавиатуре. Итог должен выглядеть так:

<img src="pygame_four_directions.gif">

</programming-exercise>

<programming-exercise name='Четыре стены' anchor="Four walls" tmcname='part13-12_four_walls'>

Улучшите программу из предыдущего упражнения так, чтобы робот не мог выйти за пределы окна ни в одном из четырёх направлений. Итог должен выглядеть так:

<img src="pygame_four_walls.gif">

</programming-exercise>

<programming-exercise name='Два игрока' anchor="Two players" tmcname='part13-13_two_players'>

Напишите программу, в которой два игрока управляют своими роботами. Один игрок должен использовать стрелки, а другой — например клавиши `w-s-a-d`. Итог должен выглядеть так:

<img src="pygame_two_players.gif">

</programming-exercise>

## События мыши {#mouse-events}

Следующий код реагирует на событие нажатия кнопки мыши, когда курсор находится внутри окна:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            print("you pressed the button number", event.button, "at location", event.pos)

        if event.type == pygame.QUIT:
            exit()
```

Запуск программы должен выглядеть примерно так:

```x
you pressed the button number 1 at location (82, 135)
you pressed the button number 1 at location (369, 135)
you pressed the button number 1 at location (269, 297)
you pressed the button number 3 at location (515, 324)
```

Кнопка номер 1 — это левая кнопка мыши, а кнопка номер 3 — правая.

Следующая программа сочетает обработку событий мыши и рисование изображения на экране. Когда пользователь нажимает кнопку мыши внутри окна, изображение робота рисуется в этой точке.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            x = event.pos[0]-robot.get_width()/2
            y = event.pos[1]-robot.get_height()/2

            window.fill((0, 0, 0))
            window.blit(robot, (x, y))
            pygame.display.flip()

        if event.type == pygame.QUIT:
            exit()
```

Пример работы программы:

<img src="pygame_cursor.gif">

Следующая программа содержит анимацию, где спрайт робота «следует» за курсором. Координаты робота хранятся в `robot_x` и `robot_y`. Когда мышь двигается, её положение сохраняется в `target_x` и `target_y`. Если робот находится не в целевой точке, он начинает двигаться в нужном направлении.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

robot_x = 0
robot_y = 0
target_x = 0
target_y = 0

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEMOTION:
            target_x = event.pos[0]-robot.get_width()/2
            target_y = event.pos[1]-robot.get_height()/2

        if event.type == pygame.QUIT:
            exit(0)

    if robot_x > target_x:
        robot_x -= 1
    if robot_x < target_x:
        robot_x += 1
    if robot_y > target_y:
        robot_y -= 1
    if robot_y < target_y:
        robot_y += 1

    window.fill((0, 0, 0))
    window.blit(robot, (robot_x, robot_y))
    pygame.display.flip()

    clock.tick(60)
```

Работа программы должна выглядеть примерно так:

<img src="pygame_cursor2.gif">

<programming-exercise name='Робот и мышь' anchor="Robot and mouse" tmcname='part13-14_robot_and_mouse'>

Напишите программу, в которой робот следует за курсором мыши так, чтобы центр робота всегда совпадал с курсором. Итог должен выглядеть так:

<img src="pygame_robot_cursor.gif">

</programming-exercise>

<programming-exercise name='Положение робота' anchor="The location of the robot" tmcname='part13-15_robot_location'>

Напишите программу, в которой робот появляется в случайном месте внутри окна. Когда игрок кликает по роботу мышью, робот перемещается в новое место. Итог должен выглядеть так:

<img src="pygame_robot_location.gif">

</programming-exercise>
