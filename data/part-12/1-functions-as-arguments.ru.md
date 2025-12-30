---
path: /ru/part-12/1-functions-as-arguments
title: Функции как аргументы
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете сортировать списки по разным критериям
- вы будете знать, что такое лямбда‑выражение
- вы сможете использовать лямбда‑выражения вместе с другими функциями Python
- вы будете знать, как функция передаётся как аргумент другой функции

</text-box>

Мы уже знакомы с методом `sort` и функцией `sorted`, которые используются для сортировки списков в их «естественном порядке». Для чисел и строк это обычно работает отлично. Но для чего‑то более сложного «естественный порядок», который Python считает правильным, не всегда совпадает с тем, что мы как программисты хотели получить.

Например, список кортежей по умолчанию сортируется по первому элементу каждого кортежа:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

products.sort()

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('banana', 5.95)
('orange', 4.5)
('watermelon', 4.95)

</sample-output>

Но что, если мы хотим отсортировать список по цене?

## Функции как аргументы {#functions-as-arguments}

Метод или функция сортировки обычно принимает необязательный второй аргумент, который позволяет переопределить критерий сортировки по умолчанию. Этот аргумент — функция, определяющая, какое значение использовать для сравнения каждого элемента списка. Во время сортировки Python вызывает эту функцию, когда сравнивает элементы между собой.

Рассмотрим пример:

```python
def order_by_price(item: tuple):
    # Возвращаем цену — это второй элемент кортежа
    return item[1]

if __name__ == "__main__":
    products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

    # Используем функцию order_by_price для сортировки
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Теперь список отсортирован по цене товаров, но что именно происходит в программе?

Функция `order_by_price` довольно проста. Она принимает один элемент и возвращает для него значение. Конкретно в данном случае она возвращает второй элемент кортежа — цену. А затем встречается строка, где вызывается метод `sort`:

`products.sort(key=order_by_price)`

Здесь метод `sort` вызывается с функцией в качестве аргумента. Это ссылка не на возвращаемое значение функции, а на _саму функцию_. Метод `sort` вызывает эту функцию много раз, каждый раз передавая очередной элемент списка как аргумент.

Если добавить дополнительный `print` в определение `order_by_price`, можно убедиться, что функция действительно вызывается один раз для каждого элемента списка:

```python
def order_by_price(item: tuple):
    # Печатаем элемент
    print(f"Function call: order_by_price({item})")

    # Возвращаем цену — это второй элемент кортежа
    return item[1]


products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Используем функцию order_by_price для сортировки
products.sort(key=order_by_price)

for product in products:
    print(product)
```

<sample-output>

Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Порядок сортировки можно _обратить_ с помощью ещё одного именованного аргумента `reverse`, доступного и у метода `sort`, и у функции `sorted`:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## Определение функции внутри другой функции {#a-function-definition-within-a-function-definition}

Мы также можем оформить созданную нами сортировку по цене в виде именованной функции. Добавим функцию `sort_by_price`:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # Здесь используем функцию order_by_price
    return sorted(items, key=order_by_price)

products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

for product in sort_by_price(products):
    print(product)
```

Если мы знаем, что вспомогательная функция `order_by_price` нигде не используется вне `sort_by_price`, её определение можно поместить внутрь `sort_by_price`:

```python
def sort_by_price(items: list):
    # Вспомогательная функция, определённая внутри функции
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

<programming-exercise name='Сортировка по остатку на складе' anchor="Sort by remaining stock" tmcname='part12-01_remaining_stock'>

Напишите функцию `sort_by_remaining_stock(items: list)`. Функция принимает список кортежей. В каждом кортеже указаны название товара, цена и остаток на складе. Функция должна вернуть новый список, в котором элементы отсортированы по остатку на складе (по возрастанию, сначала минимальный). Исходный список изменять нельзя.

Функция должна работать так:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} pcs")
```

<sample-output>
orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs
</sample-output>

</programming-exercise>

<programming-exercise name='Сортировка по количеству сезонов' anchor="Sort by number of seasons" tmcname='part12-02_seasons'>

Напишите функцию `sort_by_seasons(items: list)`, которая принимает список словарей. Каждый словарь содержит информацию об одном сериале. Функция должна отсортировать список по количеству сезонов (по возрастанию). Исходный список менять нельзя — нужно вернуть новый список.

Функция должна работать так:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} seasons")
```

<sample-output>
Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons
</sample-output>

</programming-exercise>

<programming-exercise name='Сортировка по рейтингам' anchor="Sort by ratings" tmcname='part12-03_ratings'>

Напишите функцию `sort_by_ratings(items: list)`, которая принимает список словарей. Структура словарей такая же, как в предыдущем упражнении. Функция должна отсортировать словари _по убыванию рейтинга_ сериала. Исходный список менять нельзя — нужно вернуть новый список.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Rating according to IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```

<sample-output>

Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Сортировка коллекций собственных объектов {#sorting-collections-of-your-own-objects}

По тому же принципу напишем программу, которая сортирует список объектов нашего собственного класса `Student` двумя разными способами:

```python
class Student:
    """Класс представляет одного студента."""
    def __init__(self, name: str, id: str, credits: int):
        self.name = name
        self.id = id
        self.credits = credits

    def __str__(self):
        return f"{self.name} ({self.id}), {self.credits} cr."


def by_id(item: Student):
    return item.id

def by_credits(item: Student):
    return item.credits


if __name__ == "__main__":
    o1 = Student("Archie", "a123", 220)
    o2 = Student("Marvin", "m321", 210)
    o3 = Student("Anna", "a999", 131)

    students = [o1, o2, o3]

    print("Sort by id:")
    for student in sorted(students, key=by_id):
        print(student)

    print()

    print("Sort by credits:")
    for student in sorted(students, key=by_credits):
        print(student)
```

<sample-output>

Sort by id:
Archie (a123), 220 cr.
Anna (a999), 131 cr.
Marvin (m321), 210 cr.

Sort by credits:
Anna (a999), 131 cr.
Marvin (m321), 210 cr.
Archie (a123), 220 cr.

</sample-output>

Как вы видите, сортировка по разным критериям работает именно так, как задумано. Если функции `by_id` и `by_credits` не нужны больше нигде, есть способы сделать реализацию проще. Мы вернёмся к этому после следующих упражнений.

<programming-exercise name='Скалолазный маршрут' anchor="ClimbingRoute" tmcname='part12-04_climbing_route'>

В шаблоне упражнения есть определение класса `ClimbingRoute`. Он используется так:

```python
route1 = ClimbingRoute("Edge", 38, "6A+")
route2 = ClimbingRoute("Smooth operator", 11, "7A")
route3 = ClimbingRoute("Synchro", 14, "8C+")


print(route1)
print(route2)
print(route3.name, route3.length, route3.grade)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
Synchro 14 8C+

</sample-output>

## Сортировка по длине {#sort-by-length}

Напишите функцию `sort_by_length(routes: list)`, которая возвращает новый список маршрутов, отсортированный по длине от самого длинного к самому короткому.

Функция должна работать так:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]

for route in sort_by_length(routes):
    print(route)
```

<sample-output>

Edge, length 38 metres, grade 6A+
Synchro, length 14 metres, grade 8C+
Small steps, length 12 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A

</sample-output>

## Сортировка по сложности {#sort-by-difficulty}

Напишите функцию `sort_by_difficulty(routes: list)`, которая возвращает новый список маршрутов, отсортированный по сложности (то есть по категории `grade`) от самых сложных к самым простым. Если категории одинаковы, более сложным считается более длинный маршрут. Шкала категорий сложности выглядит так: _4, 4+, 5, 5+, 6A, 6A+, …_. На практике в этой задаче это соответствует лексикографическому (алфавитному) порядку строк.

Функция должна работать так:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]
for route in sort_by_difficulty(routes):
    print(route)
```

<sample-output>

Synchro, length 14 metres, grade 8C+
Smooth operator, length 11 metres, grade 7A
Edge, length 38 metres, grade 6A+
Small steps, length 12 metres, grade 6A+

</sample-output>

**Подсказка:** если ключ сортировки — это список или кортеж, Python по умолчанию сортирует элементы сначала по первому значению, затем по второму и т. д.:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Скалолазные районы' anchor="Climbing areas" tmcname='part12-05_climbing_areas'>

Помимо `ClimbingRoute` из предыдущего упражнения, шаблон содержит определение класса `ClimbingArea`.

```python
ca1 = ClimbingArea("Olhava")
ca1.add_route(ClimbingRoute("Edge", 38, "6A+"))
ca1.add_route(ClimbingRoute("Great cut", 36, "6B"))
ca1.add_route(ClimbingRoute("Swedish route", 42, "5+"))

ca2 = ClimbingArea("Nummi")
ca2.add_route(ClimbingRoute("Synchro", 14, "8C+"))

ca3 = ClimbingArea("Nalkkila slab")
ca3.add_route(ClimbingRoute("Small steps", 12, "6A+"))
ca3.add_route(ClimbingRoute("Smooth operator", 11, "7A"))
ca3.add_route(ClimbingRoute("Piggy not likey", 12 , "6B+"))
ca3.add_route(ClimbingRoute("Orchard", 8, "6A"))

print(ca1)
print(ca3.name, ca3.routes())
print(ca3.hardest_route())
```

<sample-output>

Olhava, 3 routes, hardest 6B
Nalkkila slab 4
Smooth operator, length 9 metres, grade 7A

</sample-output>

## Сортировка по количеству маршрутов {#sort-by-number-of-routes}

Напишите функцию `sort_by_number_of_routes`, которая сортирует районы для скалолазания по количеству маршрутов (по возрастанию).

```python
# ca1, ca2 и ca3 объявлены выше
areas = [ca1, ca2, ca3]
for area in sort_by_number_of_routes(areas):
    print(area)

```

<sample-output>

Nummi, 1 routes, hardest 8C+
Olhava, 3 routes, hardest 6B
Nalkkila slab, 4 routes, hardest 7A

</sample-output>

## Сортировка по самому сложному маршруту {#sort-by-the-most-difficult-route}

Напишите функцию `sort_by_most_difficult`, которая сортирует районы для скалолазания _по убыванию_ сложности самого трудного маршрута в каждом районе.

```python
# ca1, ca2 и ca3 объявлены выше
areas = [ca1, ca2, ca3]
for area in sort_by_most_difficult(areas):
    print(area)
```

<sample-output>

Nummi, 1 routes, hardest 8C+
Nalkkila slab, 4 routes, hardest 7A
Olhava, 3 routes, hardest 6B

</sample-output>

</programming-exercise>

## Лямбда‑выражения {#lambda-expressions}

До сих пор мы в основном рассматривали функции с точки зрения модульности. Действительно, функции помогают управлять сложностью программ и избегать повторения кода. Обычно функции пишут так, чтобы их можно было использовать много раз.

Но иногда нужна «почти функция», которую вы примените всего один раз. Лямбда‑выражения позволяют создавать небольшие анонимные функции, которые создаются (и «выбрасываются») по мере необходимости прямо в коде. Общий синтаксис такой:

`lambda <parameters> : <expression>`

Сортировка списка кортежей по второму элементу каждого кортежа с помощью лямбда‑выражения выглядит так:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Функция создаётся «на лету» лямбда‑выражением:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Выражение

`lambda item: item[1]`

эквивалентно определению функции

```python
def price(item):
    return item[1]
```

за исключением того, что у лямбда‑функции нет имени. Поэтому лямбда‑функции называют анонимными функциями.

Во всём остальном лямбда‑функция ничем не отличается от обычной, и её можно использовать в тех же местах, что и эквивалентную именованную функцию. Например, следующая программа сортирует список строк по _последнему_ символу каждой строки:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: word[-1]):
    print(word)
```

<sample-output>

Minnie
Mack
Merl
Marvin
Mickey

</sample-output>

Можно также сочетать списковые включения, метод `join` и лямбда‑выражения. Например, можно сортировать строки, учитывая только гласные в них и игнорируя все остальные символы:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: "".join([c for c in word if c in "aeiou"])):
    print(word)
```

<sample-output>

Mack
Marvin
Merl
Mickey
Minnie

</sample-output>

Анонимные функции можно использовать и с другими встроенными функциями Python, не только с сортировкой. Например, функции `min` и `max` тоже принимают именованный аргумент `key`. Он задаёт критерий сравнения элементов при выборе минимального или максимального значения.

В следующем примере мы работаем со звукозаписями. Сначала выбираем самую старую запись, затем — самую длинную:

```python

class Recording:
    """Класс моделирует одну звукозапись."""
    def __init__(self, name: str, performer: str, year: int, runtime: int):
        self.name = name
        self.performer = performer
        self.year = year
        self.runtime = runtime


    def __str__(self):
        return f"{self.name} ({self.performer}), {self.year}. {self.runtime} min."

if __name__ == "__main__":
    r1 = Recording("Nevermind", "Nirvana", 1991, 43)
    r2 = Recording("Let It Be", "Beatles", 1969, 35)
    r3 = Recording("Joshua Tree", "U2", 1986, 50)

    recordings = [r1, r2, r3]


    print("The oldest recording:")
    print(min(recordings, key=lambda rec: rec.year))

    print("The longest recording:")
    print(max(recordings, key=lambda rec: rec.runtime))
```

<sample-output>

The oldest recording:
Let It Be (Beatles), 1969. 35 min.
The longest recording:
U2 (Joshua Tree), 1986. 50 min.

</sample-output>

<programming-exercise name='Игроки с мячом' anchor="BallPlayers" tmcname='part12-06_ballplayers'>

В шаблоне упражнения есть определение класса `BallPlayer`. У него есть следующие публичные атрибуты:

* имя `name`
* номер на футболке `number`
* забитые голы `goals`
* голевые передачи `assists`
* сыгранные минуты `minutes`

Реализуйте следующие функции. Обратите внимание: каждая функция возвращает значение разного типа.

## Больше всего голов {#most-goals}

Напишите функцию `most_goals`, которая принимает список игроков.

Функция должна вернуть имя игрока, который забил больше всего голов (строку).

## Больше всего очков {#most-points}

Напишите функцию `most_points`, которая принимает список игроков.

Функция должна вернуть кортеж, содержащий имя и номер на футболке игрока, набравшего больше всего очков. Количество очков — это сумма забитых голов и голевых передач.

## Меньше всего минут {#least-minutes}

Напишите функцию `least_minutes`, которая принимает список игроков.

Функция должна вернуть объект `BallPlayer`, у которого значение `minutes` минимальное.

Вы можете протестировать свои функции такой программой:

```python
if __name__ == "__main__":
    player1 = BallPlayer("Archie Bonkers", 13, 5, 12, 46)
    player2 = BallPlayer("Speedy Tickets", 7, 2, 26, 55)
    player3 = BallPlayer("Cruella De Hill", 9, 1, 32, 26)
    player4 = BallPlayer("Devilled Tasmanian", 12, 1, 11, 41)
    player5 = BallPlayer("Donald Quack", 4, 3, 9, 12)
    
    team = [player1, player2, player3, player4, player5]
    print(most_goals(team))
    print(most_points(team))
    print(least_minutes(team))
```

Это должно вывести:

<sample-output>

Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, passes=9, minutes=12)

</sample-output>

</programming-exercise>

## Функции как аргументы в ваших функциях {#functions-as-arguments-within-your-own-functions}

Мы уже выяснили, что можно передавать ссылку на функцию как аргумент другой функции. В завершение раздела напишем свою собственную функцию, которая принимает функцию в качестве аргумента.

```python
# Аннотация типа "callable" означает функцию
def perform_operation(operation: callable):
    # Вызываем функцию, переданную аргументом
    return operation(10, 5)

def my_sum(a: int, b: int):
    return a + b

def my_product(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(perform_operation(my_sum))
    print(perform_operation(my_product))
    print(perform_operation(lambda x,y: x - y))

```

<sample-output>

15
50
5

</sample-output>

Значение, которое возвращает `perform_operation`, зависит от того, какую функцию передали аргументом. Подойдёт любая функция, принимающая два аргумента — не важно, анонимная она или именованная.

Передача функций как аргументов — это, возможно, не то, что вы будете делать каждый день, но приём бывает полезным. Следующая программа выбирает строки из одного файла и записывает их в другой. То, какие строки копировать, определяет функция‑критерий, возвращающая `True` только для тех строк, которые нужно перенести:

```python
def copy_lines(source_file: str, target_file: str, criterion= lambda x: True):
    with open(source_file) as source, open(target_file, "w") as target:
        for line in source:
            # Удаляем пробелы в начале и конце строки
            line = line.strip()

            if criterion(line):
                target.write(line + "\n")

# Несколько примеров
if __name__ == "__main__":
    # Если третий параметр не задан, копируем все строки
    copy_lines("first.txt", "second.txt")

    # Копируем все непустые строки
    copy_lines("first.txt", "second.txt", lambda line: len(line) > 0)

    # Копируем все строки, содержащие слово "Python"
    copy_lines("first.txt", "second.txt", lambda line: "Python" in line)

    # Копируем все строки, которые не заканчиваются точкой
    copy_lines("first.txt", "second.txt", lambda line: line[-1] != ".")
```

В определении функции для именованного параметра `criterion` задано значение по умолчанию: `lambda x: True`. Эта анонимная функция всегда возвращает `True` независимо от входных данных, поэтому поведение по умолчанию — копировать все строки. Как обычно, если передать значение параметру со значением по умолчанию, оно заменит значение по умолчанию.

<programming-exercise name='Поиск товаров' anchor="Product search" tmcname='part12-07_product_search'>

В этом упражнении товары представлены кортежами. Во всех примерах предполагается, что переменной `products` присвоено такое значение:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("kale", 0.99, 1)]
```

Каждый кортеж содержит три значения: название, цена и количество.

Напишите функцию `search(products: list, criterion: callable)`. Второй аргумент — это функция, которая должна уметь принимать описанный выше кортеж и возвращать булево значение. Функция `search` должна вернуть новый список, содержащий те кортежи из исходного списка, которые удовлетворяют критерию.

Если мы хотим выбрать только товары дешевле 4 евро, можно использовать такой критерий:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

Функция возвращает `True`, если второй элемент кортежа меньше четырёх.

Пример использования функции `search`:

```python
for product in search(products, price_under_4_euros):
    print(product)
```

<sample-output>

('apple', 3.95, 3)
('kale', 0.99, 1)

</sample-output>

Функция‑критерий может быть и лямбда‑функцией. Если мы хотим выбрать товары, количество которых не меньше 11, можно написать так:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```

<sample-output>

('banana', 5.95, 12)
('watermelon', 4.95, 22)

</sample-output>

</programming-exercise>
