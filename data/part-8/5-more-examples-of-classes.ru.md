---
path: /ru/part-8/5-more-examples-of-classes
title: Ещё примеры классов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете создавать более «богатые» классы
- вы будете знать, как добавлять метод `__str__` в определения классов

</text-box>


## Пример 1: класс Rectangle {#example-1-the-rectangle-class}

Посмотрим на класс, который моделирует прямоугольник на двумерной плоскости:

```python
class Rectangle:
    def __init__(self, left_upper: tuple, right_lower: tuple):
        self.left_upper = left_upper
        self.right_lower = right_lower
        self.width = right_lower[0]-left_upper[0]
        self.height = right_lower[1]-left_upper[1]

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return self.width * 2 + self.height * 2

    def move(self, x_change: int, y_change: int):
        corner = self.left_upper
        self.left_upper = (corner[0]+x_change, corner[1]+y_change)
        corner = self.right_lower
        self.right_lower = (corner[0]+x_change, corner[1]+y_change)
```

Новый `Rectangle` создаётся с двумя кортежами в аргументах. В кортежах — координаты (x, y) левого верхнего и правого нижнего угла. Конструктор вычисляет ширину и высоту прямоугольника по этим значениям.

Методы `area` и `perimeter` вычисляют площадь и периметр по ширине и высоте. Метод `move` сдвигает прямоугольник на значения x и y, переданные в аргументах.

Прямоугольник расположен в системе координат, где x увеличивается слева направо, а y — сверху вниз. Это распространённый подход в программировании, потому что удобно считать левый верхний угол экрана точкой (0, 0).

Следующая программа тестирует класс `Rectangle`:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle.left_upper)
print(rectangle.right_lower)
print(rectangle.width)
print(rectangle.height)
print(rectangle.perimeter())
print(rectangle.area())

rectangle.move(3, 3)
print(rectangle.left_upper)
print(rectangle.right_lower)
```

<sample-output>

(1, 1)
(4, 3)
3
2
10
6
(4, 4)
(7, 6)

</sample-output>

## Печать объекта {#printing-an-object}

Если вы печатаете объект, созданный из собственного класса, стандартный вывод `print` обычно малоинформативен:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```

Вывод будет примерно таким:

<sample-output>

<__main__.Rectangle object at 0x000002D7BF148A90>

</sample-output>

Очевидно, хочется больше контроля над тем, что печатается. Самый простой способ — добавить в класс специальный метод `__str__`. Его задача — возвращать строковое представление состояния объекта. Если в классе определён `__str__`, именно его результат будет печатать `print`.

Добавим `__str__` в наш `Rectangle`:

```python
class Rectangle:

    # ...остальная часть класса такая же, как выше...

    # Этот метод возвращает строковое представление объекта
    def __str__(self):
        return f"rectangle {self.left_upper} ... {self.right_lower}"
```

Теперь `print` выдаёт более удобный результат:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```

<sample-output>

rectangle (1, 1) ... (4, 3)

</sample-output>

Метод `__str__` часто используют и напрямую через функцию `str`, как в примере ниже:

```python
rectangle = Rectangle((1, 1), (4, 3))
str_rep = str(rectangle)
print(str_rep)
```

<sample-output>

rectangle (1, 1) ... (4, 3)

</sample-output>

У классов есть и многие другие специальные «подчёркнутые» методы. Один из похожих на `__str__` — это `__repr__`, который даёт более «техническое» представление объекта. С ним мы познакомимся позже.

<programming-exercise name='Секундомер' anchor="Stopwatch" tmcname='part08-13_stopwatch'>

В шаблоне задания есть следующий «скелет» класса `Stopwatch`:

```python
class Stopwatch:
    def __init__(self):
        self.seconds = 0
        self.minutes = 0
```

Доработайте класс так, чтобы он работал следующим образом:

```python
watch = Stopwatch()
for i in range(3600):
    print(watch)
    watch.tick()
```

<sample-output>

00:00
00:01
00:02
... many more lines printed out
00:59
01:00
01:01
... many, many more lines printed out
59:58
59:59
00:00
00:01

</sample-output>

Итак, метод `tick` добавляет к секундомеру одну секунду. Максимальное значение для секунд и минут — 59. В классе также должен быть метод `__str__`, который возвращает строковое представление состояния секундомера, как в примере выше.

**Подсказка:** для тестирования `tick` может быть удобнее временно задать в конструкторе начальные значения секунд и минут ближе к 59. Если вы меняете начальные значения, не забудьте вернуть их обратно перед сдачей.

</programming-exercise>

<programming-exercise name='Часы' anchor="Clock" tmcname='part08-14_clock'>

Определите новый класс `Clock`, который расширяет возможности вашего класса `Stopwatch`. Он должен работать так:

```python
clock = Clock(23, 59, 55)
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)

clock.set(12, 5)
print(clock)
```

<sample-output>
23:59:55
23:59:56
23:59:57
23:59:58
23:59:59
00:00:00
00:00:01
12:05:00
</sample-output>

Как видно, конструктор должен принимать начальные значения часов, минут и секунд. Метод `tick` добавляет одну секунду. Метод `set` задаёт новые значения часов и минут и _сбрасывает секунды в ноль_.

</programming-exercise>

<programming-exercise name='LunchCard' anchor="LunchCard" tmcname='part08-15_lunchcard'>

В Unicafe — студенческой столовой Университета Хельсинки — студенты могут оплачивать обед специальной дебетовой картой.

В этом задании вы напишете класс `LunchCard`, который имитирует функции такой карты.

### Структура нового класса {#the-structure-of-the-new-class}

Создайте новый класс `LunchCard`.

Сначала напишите конструктор класса. Он должен принимать начальный баланс карты и сохранять его в атрибут. Это уже отражено в «скелете» ниже.

Затем напишите метод `__str__`, который возвращает строку с балансом: `"The balance is X euros"`. Баланс нужно выводить с точностью до одного знака после запятой. См. пример ниже.

Ниже приведён «скелет» реализации класса:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def __str__(self):
        pass
```

Пример использования:

```python
card = LunchCard(50)
print(card)
```

При выполнении должно получиться:

<sample-output>

The balance is 50.0 euros

</sample-output>

### Оплата обеда {#paying-for-lunch}

Реализуйте в классе `LunchCard` следующие методы:

- `eat_lunch` вычитает 2.60 евро из баланса
- `eat_special` вычитает 4.60 евро из баланса

Для тестирования можно использовать такой код:

```python
card = LunchCard(50)
print(card)

card.eat_lunch()
print(card)

card.eat_special()
card.eat_lunch()
print(card)
```

Он должен вывести:

<sample-output>

The balance is 50.0 euros
The balance is 47.4 euros
The balance is 40.2 euros

</sample-output>

Убедитесь, что баланс никогда не становится отрицательным:

```python
card = LunchCard(4)
print(card)

card.eat_lunch()
print(card)

card.eat_lunch()
print(card)
```

<sample-output>

The balance is 4.0 euros
The balance is 1.4 euros
The balance is 1.4 euros

</sample-output>

Если на карте недостаточно денег для покупки, стоимость обеда не должна списываться.

### Пополнение карты {#depositing-money-on-the-card}

Реализуйте метод `deposit_money` в классе `LunchCard`.

Метод должен увеличивать баланс на сумму, переданную в аргументе.

```python
card = LunchCard(10)
print(card)
card.deposit_money(15)
print(card)
card.deposit_money(10)
print(card)
card.deposit_money(200)
print(card)
```

<sample-output>

The balance is 10.0 euros
The balance is 25.0 euros
The balance is 35.0 euros
The balance is 235.0 euros

</sample-output>

Если аргумент отрицательный, метод должен [возбудить исключение](/ru/part-6/3-errors#raising-exceptions) `ValueError`:

```python
card = LunchCard(10)
card.deposit_money(-10)
```

<sample-output>

File "testi.py", line 3, in lunchcard
ValueError: You cannot deposit an amount of money less than zero

</sample-output>

**Важно:** метод должен именно _возбуждать_ исключение. См. инструкции по возбуждению исключений в [части 6](/ru/part-6/3-errors#raising-exceptions). Метод ни в коем случае не должен сам ничего печатать — пример выше показывает вывод интерпретатора при возникновении исключения.

### Несколько карт {#multiple-cards}

Напишите основную программу, которая выполняет следующую последовательность действий:

- Создать карту для Питера с балансом 20 евро.
- Создать карту для Грейс с балансом 30 евро.
- Питер покупает «специальный» обед.
- Грейс покупает обычный обед.
- _Вывести баланс каждой карты (по одной строке, имя владельца в начале строки)._
- Питер пополняет карту на 20 евро.
- Грейс покупает «специальный» обед.
- _Вывести баланс каждой карты (по одной строке, имя владельца в начале строки)._
- Питер покупает обычный обед.
- Питер покупает обычный обед.
- Грейс пополняет карту на 50 евро.
- _Вывести баланс каждой карты (по одной строке, имя владельца в начале строки)._

Тело основной программы:

```python
peters_card = LunchCard(20)
graces_card = LunchCard(30)
# остальная часть вашей основной программы
```

Программа должна вывести ровно следующее:

<sample-output>

Peter: The balance is 15.4 euros
Grace: The balance is 27.4 euros
Peter: The balance is 35.4 euros
Grace: The balance is 22.8 euros
Peter: The balance is 30.2 euros
Grace: The balance is 72.8 euros

</sample-output>

</programming-exercise>

## Пример 2: список задач {#example-2-task-list}

Следующий класс `TaskList` моделирует список задач:

```python
class TaskList:
    def __init__(self):
        self.tasks = []

    def add_task(self, name: str, priority: int):
        self.tasks.append((priority, name))

    def get_next(self):
        self.tasks.sort()
        # Метод pop у списка удаляет и возвращает последний элемент
        task = self.tasks.pop()
        # Возвращаем имя задачи (второй элемент кортежа)
        return task[1]

    def number_of_tasks(self):
        return len(self.tasks)

    def clear_tasks(self):
        self.tasks = []
```

Метод `add_task` добавляет задачу в список. У каждой задачи есть приоритет, который используется для сортировки. Метод `get_next` удаляет и возвращает задачу с самым высоким приоритетом. Также есть метод `number_of_tasks`, возвращающий количество задач, и метод `clear_tasks`, очищающий список.

Внутри объекта задачи хранятся в списке. Каждая задача — это кортеж из приоритета и имени. Приоритет стоит первым, поэтому после сортировки задача с самым высоким приоритетом окажется в конце списка. Поэтому удобно использовать `pop`, чтобы извлечь и удалить последний элемент.

Посмотрите на пример использования списка задач:

```python
tasks = TaskList()
tasks.add_task("studying", 50)
tasks.add_task("exercise", 60)
tasks.add_task("cleaning", 10)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.add_task("date", 100)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.clear_tasks()
print(tasks.number_of_tasks())
```

<sample-output>

3
exercise
2
3
date
studying
1
0

</sample-output>

<programming-exercise name='Сериал' anchor="Series" tmcname='part08-16_series'>

### Класс `Series` {#a-class-named-series}

Напишите класс `Series` со следующей функциональностью:

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
no ratings

</sample-output>

Конструктор должен принимать название, количество сезонов и список жанров сериала.

**Подсказка:** чтобы собрать строку из списка строк с выбранным разделителем, можно использовать метод `join`:

```python
genre_list = ["Crime", "Drama", "Mystery", "Thriller"]
genre_string = ", ".join(genre_list)
print(genre_string)
```

<sample-output>

Crime, Drama, Mystery, Thriller

</sample-output>

### Добавление оценок {#adding-reviews}

Реализуйте метод `rate(rating: int)`, который добавляет оценку от 0 до 5 для объекта‑сериала. Также нужно изменить `__str__`: если оценки есть, метод должен выводить количество оценок и их среднее (округлённое до одного знака после запятой).

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
dexter.rate(4)
dexter.rate(5)
dexter.rate(5)
dexter.rate(3)
dexter.rate(0)
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
5 ratings, average 3.4 points

</sample-output>

### Поиск сериалов {#searching-for-series}

Реализуйте две функции для поиска по списку сериалов: `minimum_grade(rating: float, series_list: list)` и `includes_genre(genre: str, series_list: list)`.

Пример использования:

```python
s1 = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
s1.rate(5)

s2 = Series("South Park", 24, ["Animation", "Comedy"])
s2.rate(3)

s3 = Series("Friends", 10, ["Romance", "Comedy"])
s3.rate(2)

series_list = [s1, s2, s3]

print("a minimum grade of 4.5:")
for series in minimum_grade(4.5, series_list):
    print(series.title)

print("genre Comedy:")
for series in includes_genre("Comedy", series_list):
    print(series.title)
```

<sample-output>

a minimum rating of 4.5:
Dexter
genre Comedy:
South Park
Friends

</sample-output>

Код выше и автоматические тесты предполагают, что в вашем классе есть атрибут `title`. Если вы использовали другое имя атрибута для названия сериала, измените его на `title` перед сдачей.

</programming-exercise>

Пожалуйста, ответьте на короткий опрос по материалам этой недели.

<quiz id="5fa782a4-59cc-5e75-9f77-e3a2b35a81e2"></quiz>
