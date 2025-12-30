---
path: /ru/part-13/4-more-pygame-techniques
title: Ещё приёмы работы с Pygame
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как задавать заголовок окна pygame
- вы сможете рисовать фигуры с помощью pygame
- вы будете знать, как выводить текст в окне

</text-box>

## Заголовок окна {#the-window-title}

Ваши программы будут выглядеть профессиональнее, если вместо «pygame window» в заголовке окна будет название программы. Заголовок задаётся функцией `pygame.display.set_caption`:

```python
pygame.display.set_caption("Great Adventure")
```

## Рисование фигур {#drawing-shapes}

Следующая программа рисует на экране прямоугольник, круг и линию:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

pygame.draw.rect(display, (0, 255, 0), (50, 100, 200, 250))
pygame.draw.circle(display, (255, 0, 0), (200, 150), 40)
pygame.draw.line(display, (0, 0, 255), (80, 120), (300, 160), 2)

pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Запуск кода выше должен выглядеть так:

<img src="pygame_shapes.gif">

## Рисование текста {#drawing-text}

Текст в pygame рисуется в два шага: сначала создаётся изображение с нужным текстом, а затем это изображение рисуется на экране. Это работает так:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

game_font = pygame.font.SysFont("Arial", 24)
text = game_font.render("Moikka!", True, (255, 0, 0))
display.blit(text, (100, 50))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Запуск кода выше должен выглядеть так:

<img src="pygame_text.gif">

Здесь метод `pygame.font.SysFont` создаёт объект шрифта, используя системный шрифт Arial размером 24. Затем метод `render` создаёт изображение с указанным текстом и цветом. Это изображение рисуется в окне методом `blit`, как и раньше.

Важно: на разных системах доступен разный набор шрифтов. Если на компьютере, где запускается программа, нет шрифта Arial (хотя он довольно распространён), вместо него будет использован шрифт по умолчанию. Если для игры нужен конкретный шрифт, вы можете положить файл шрифта в папку игры и указать путь к нему в `pygame.font.Font`.

## Упражнения {#exercises}

Ниже — более продвинутые упражнения, чтобы попрактиковаться в том, что вы изучили в этой части.

<programming-exercise name='Часы' anchor="Clock" tmcname='part13-16_clock'>

Напишите программу, которая отображает циферблат с текущим системным временем. Итог должен выглядеть так:

<img src="pygame_clock.gif">

</programming-exercise>

<programming-exercise name='Астероиды' anchor="Asteroids" tmcname='part13-17_asteroids'>

Создайте игру, где астероиды падают с неба. Игрок двигает робота влево и вправо и пытается собирать падающие камни. За каждый пойманный астероид начисляется одно очко, а сумма очков показывается в верхней части окна. Игра заканчивается, когда игрок пропускает астероид. Итог должен выглядеть так:

<img src="pygame_asteroids.gif">

Важно: анимация выше — из финской версии курса. Вы можете использовать слово `Points` вместо финского `Pisteet`, показанного на примере.

В шаблоне упражнения есть изображение астероида `rock.png`.

</programming-exercise>

Пожалуйста, ответьте на небольшой опрос по этой части курса.

<quiz id="f191a4ab-73b8-5c08-af6c-b19d75a8f8fc"></quiz>
