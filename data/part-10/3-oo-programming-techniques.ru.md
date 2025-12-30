---
path: /ru/part-10/3-oo-programming-techniques
title: Приёмы объектно-ориентированного программирования
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с некоторыми способами использования переменной `self`
- вы будете знать, как перегружать операторы в своих классах
- вы сможете создать итерируемый класс

</text-box>

Класс может содержать метод, который возвращает объект этого же класса. Например, ниже приведён класс `Product`, а его метод `product_on_sale` возвращает новый объект `Product` с тем же названием, что и у исходного, но с ценой на 25% ниже:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    def product_on_sale(self):
        on_sale = Product(self.__name, self.__price * 0.75)
        return on_sale
```

```python
apple1 = Product("Apple", 2.99)
apple2 = apple1.product_on_sale()
print(apple1)
print(apple2)
```

<sample-output>

Apple (price 2.99)
Apple (price 2.2425)

</sample-output>

Напомним, что означает переменная `self`: внутри определения класса она указывает на сам объект. Обычно её используют, чтобы обращаться к характеристикам объекта — его атрибутам и методам. Но переменная `self` может обозначать и объект целиком, например когда нужно вернуть сам объект в клиентский код. В примере ниже мы добавили в класс метод `cheaper`. Он принимает другой `Product` и возвращает более дешёвый из двух:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def cheaper(self, Product):
        if self.__price < Product.price:
            return self
        else:
            return Product
```

```python
apple = Product("Apple", 2.99)
orange = Product("Orange", 3.95)
banana = Product("Banana", 5.25)

print(orange.cheaper(apple))
print(orange.cheaper(banana))
```

<sample-output>

Apple (2.99)
Orange (3.95)

</sample-output>

Хотя это работает, такой способ сравнения двух объектов очень специализированный. Было бы удобнее использовать стандартные операторы сравнения Python прямо для объектов `Product`.

## Перегрузка операторов {#overloading-operators}

В Python есть специальные встроенные методы для работы со стандартными арифметическими операторами и операторами сравнения. Эта техника называется _перегрузкой операторов_. Если вы хотите применять некоторый оператор к экземплярам собственного класса, можно написать специальный метод, который возвращает правильный результат операции. Мы уже пользовались этой идеей на примере `__str__`: Python знает, что нужно искать метод с таким именем, когда требуется строковое представление объекта.

Начнём с оператора `>`, который проверяет, больше ли первый операнд второго. В определении класса `Product` ниже есть метод `__gt__` (сокращение от *g*reater *t*han). Этот специальный метод должен возвращать правильный результат сравнения: `True` тогда и только тогда, когда «текущий» объект больше объекта, переданного аргументом. По каким критериям считать объект «больше» — решает программист. Под _текущим объектом_ мы понимаем объект, у которого вызывают метод через точку `.`.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def __gt__(self, another_product):
        return self.price > another_product.price
```

В реализации выше метод `__gt__` возвращает `True`, если цена текущего продукта больше цены продукта, переданного аргументом. Иначе метод возвращает `False`.

Теперь оператор сравнения `>` можно использовать с объектами типа `Product`:

```python
orange = Product("Orange", 2.90)
apple = Product("Apple", 3.95)

if orange > apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```

<sample-output>

Apple is greater

</sample-output>

Как уже говорилось, критерий того, что считать «больше» и «меньше», определяет программист. Например, можно решить, что порядок должен зависеть не от цены, а от алфавитного порядка по названию. Тогда `orange` будет «больше», чем `apple`, потому что `"orange"` по алфавиту идёт позже.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    @property
    def name(self):
        return self.__name

    def __gt__(self, another_product):
        return self.name > another_product.name
```

```python
Orange = Product("Orange", 4.90)
Apple = Product("Apple", 3.95)

if Orange > Apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```

<sample-output>

Orange is greater

</sample-output>

## Другие операторы {#more-operators}

Ниже таблица стандартных операторов сравнения и методов, которые нужно реализовать, чтобы эти операторы работали с нашими объектами:

Оператор | Значение | Имя метода
:--:|:--:|:--:
`<` | Меньше | `__lt__(self, another)`
`>` | Больше | `__gt__(self, another)`
`==` | Равно | `__eq__(self, another)`
`!=` | Не равно | `__ne__(self, another)`
`<=` | Меньше или равно | `__le__(self, another)`
`>=` | Больше или равно | `__ge__(self, another)`

Можно реализовать и другие операторы, включая арифметические:

Оператор | Значение | Имя метода
:--:|:--:|:--:
`+` | Сложение | `__add__(self, another)`
`-` | Вычитание | `__sub__(self, another)`
`*` | Умножение | `__mul__(self, another)`
`/` | Деление (результат — число с плавающей точкой) | `__truediv__(self, another)`
`//` | Деление (целочисленный результат) | `__floordiv__(self, another)`

Другие операторы и соответствующие им имена методов легко найти в интернете. Также помните про команду `dir`, которая выводит методы, доступные у объекта.

Очень редко нужно реализовывать все арифметические и сравнительные операторы в собственных классах. Например, деление редко имеет смысл вне числовых объектов. Что должно получиться, если разделить объект `Student` на 3 или на другого студента? Тем не менее, некоторые операторы бывают очень полезны и в пользовательских классах. Набор методов зависит от того, что имеет смысл с учётом свойств ваших объектов.

Рассмотрим класс, который моделирует одну заметку. Если реализовать метод `__add__` в определении класса, оператор `+` станет доступен для объектов `Note`:

```python
from datetime import datetime

class Note:
    def __init__(self, entry_date: datetime, entry: str):
        self.entry_date = entry_date
        self.entry = entry

    def __str__(self):
        return f"{self.entry_date}: {self.entry}"

    def __add__(self, another):
        # Дата новой заметки — текущее время
        new_note = Note(datetime.now(), "")
        new_note.entry = self.entry + " and " + another.entry
        return new_note
```
        
```python
entry1 = Note(datetime(2016, 12, 17), "Remember to buy presents")
entry2 = Note(datetime(2016, 12, 23), "Remember to get a tree")

# Эти заметки можно сложить оператором +
# Это вызывает метод __add__ в классе Note
both = entry1 + entry2
print(both)
```

<sample-output>

2020-09-09 14:13:02.163170: Remember to buy presents and Remember to get a tree

</sample-output>

## Строковое представление объекта {#a-string-representation-of-an-object}

Вы уже реализовали довольно много методов `__str__` в своих классах. Как вы знаете, этот метод возвращает строковое представление объекта. Есть и похожий метод `__repr__`, который возвращает _техническое_ представление объекта. Часто `__repr__` реализуют так, чтобы он возвращал программный код, который можно выполнить и получить объект с _тем же содержимым_, что и текущий.

Функция `repr` возвращает такое техническое строковое представление объекта. Техническое представление используется также тогда, когда у объекта не определён `__str__`. Следующий пример делает это более понятным:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"
```

```python3
person1 = Person("Anna", 25)
person2 = Person("Peter", 99)
print(person1)
print(person2)
```

<sample-output>

Person('Anna', 25)
Person('Peter', 99)

</sample-output>

Обратите внимание: сам метод `__repr__` использует функцию `repr`, чтобы получить техническое представление строки. Это нужно, чтобы включить в результат кавычки `'`.

В следующем классе определены оба метода: `__repr__` и `__str__`:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"

    def __str__(self):
        return f"{self.name} ({self.age} years)"
```

```python3
Person = Person("Anna", 25)
print(Person)
print(repr(Person))
```

<sample-output>

Anna (25 years)
Person('Anna', 25)

</sample-output>

Стоит отметить, что для структур данных (например, списков) Python всегда использует `__repr__` для строкового представления элементов. Иногда это выглядит немного неожиданно:

```python3
persons = []
persons.append(Person("Anna", 25))
persons.append(Person("Peter", 99))
persons.append(Person("Mary", 55))
print(persons)
```

<sample-output>

[Person('Anna', 25), Person('Peter', 99), Person('Mary', 55)]

</sample-output>

<programming-exercise name='Деньги' anchor="Money" tmcname='part10-07_money'>

Шаблон упражнения содержит заготовку класса `Money`. В этом упражнении нужно реализовать дополнительные методы и исправить несколько небольших проблем в шаблоне.

## Исправьте строковое представление {#fix-the-string-representation}

Метод `__str__` в определении класса работает не совсем правильно. Если создать следующие два объекта `Money`, второй выводится неверно:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)  # два евро и пять центов

print(e1)
print(e2)
```

<sample-output>

4.10
2.5

</sample-output>

Исправьте метод так, чтобы он печатал:

<sample-output>

4.10 eur
2.05 eur

</sample-output>

## Равные суммы {#equal-amounts}

Определите метод `__eq__(self, another)`, чтобы можно было использовать оператор `==` для объектов `Money`. Для проверки можно использовать следующий код:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)
e3 = Money(4, 10)

print(e1)
print(e2)
print(e3)
print(e1 == e2)
print(e1 == e3)
```

<sample-output>

4.10 eur
2.05 eur
4.10 eur
False
True

</sample-output>

## Другие операторы сравнения {#other-comparison-operators}

Реализуйте соответствующие методы для операторов сравнения `<`, `>` и `!=`.

```python
e1 = Money(4, 10)
e2 = Money(2, 5)

print(e1 != e2)
print(e1 < e2)
print(e1 > e2)
```

<sample-output>

True
False
True

</sample-output>

## Сложение и вычитание {#addition-and-subtraction}

Реализуйте операторы `+` и `-` для объектов `Money`. Оба должны возвращать новый объект типа `Money`. Ни исходный объект, ни объект‑аргумент не должны изменяться.

Важно: значение объекта `Money` не может быть отрицательным. Если попытка вычесть приводит к отрицательному результату, метод должен выбросить исключение `ValueError`.

```python
e1 = Money(4, 5)
e2 = Money(2, 95)

e3 = e1 + e2
e4 = e1 - e2

print(e3)
print(e4)

e5 = e2-e1
```

<sample-output>

7.00 eur
1.10 eur
Traceback (most recent call last):
  File "money.py", line 416, in <module>
    e5 = e2-e1
  File "money.py", line 404, in __sub__
    raise ValueError(f"a negative result is not allowed")
ValueError: a negative result is not allowed

</sample-output>

## Значение не должно быть доступно напрямую {#the-value-must-not-be-directly-accessible}

В классе всё ещё есть небольшая проблема с целостностью. Пользователь может «обмануть», напрямую обратившись к атрибутам и изменив значение, хранящееся в объекте `Money`:

```python
print(e1)
e1.euros = 1000
print(e1)
```

<sample-output>

4.05 eur
1000.05 eur

</sample-output>

Пожалуйста, [инкапсулируйте](/ru/part-9/3-encapsulation#encapsulation) реализацию атрибутов, определённых в классе, чтобы описанный выше «обман» был невозможен. У класса не должно быть публичных атрибутов и не должно быть геттеров/сеттеров для евро и центов.

</programming-exercise>

<programming-exercise name='Простая дата' anchor="Simple date" tmcname='part10-08_simple_date'>

В этом упражнении вам нужно реализовать класс `SimpleDate`, который позволяет работать с датами. Для простоты будем считать, что _в каждом месяце 30 дней_.

Из‑за этого упрощения не используйте модуль `datetime` из стандартной библиотеки Python. Вместо этого вы реализуете похожую функциональность самостоятельно.

## Сравнения {#comparisons}

Реализуйте заготовку класса и методы, позволяющие сравнивать объекты операторами `<`, `>`, `==` и `!=`. Для проверки можно использовать следующий код:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)
d3 = SimpleDate(28, 12, 1985)

print(d1)
print(d2)
print(d1 == d2)
print(d1 != d2)
print(d1 == d3)
print(d1 < d2)
print(d1 > d2)
```

<sample-output>

4.10.2020
28.12.1985
False
True
False
False
True

</sample-output>

## Увеличение (сложение) {#increment}

Реализуйте оператор сложения `+`, который позволяет добавить к объекту `SimpleDate` заданное количество дней. Оператор должен возвращать новый объект `SimpleDate`. Исходный объект не должен изменяться.

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)

d3 = d1 + 3
d4 = d2 + 400

print(d1)
print(d2)
print(d3)
print(d4)
```

<sample-output>

4.10.2020
28.12.1985
7.10.2020
8.2.1987

</sample-output>

## Разность {#difference}

Реализуйте оператор вычитания `-`, который позволяет узнать разницу в днях между двумя объектами `SimpleDate`. Так как мы считаем, что в месяце 30 дней, то год в рамках этого упражнения имеет длину 12*30 = 360 дней.

Для проверки можно использовать следующий код:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(2, 11, 2020)
d3 = SimpleDate(28, 12, 1985)

print(d2-d1)
print(d1-d2)
print(d1-d3)
```

<sample-output>

28
28
12516

</sample-output>

</programming-exercise>

## Итераторы {#iterators}

Мы знаем, что оператор `for` можно использовать для _итерации_ по самым разным структурам данных, файлам и коллекциям элементов. Типичный пример — такая функция:

```python

def count_positives(my_list: list):
    n = 0
    for item in my_list:
        if item > 0:
            n += 1
    return n

```

Функция проходит по элементам списка один за другим и подсчитывает, сколько из них положительные.

Собственные классы тоже можно сделать итерируемыми. Это полезно, когда основная задача класса — хранить коллекцию элементов. Например, класс `Bookshelf` из предыдущего примера — хороший кандидат: логично уметь проходить по книгам на полке в цикле `for`. То же самое относится, скажем, к реестру студентов: возможность итерироваться по студентам может быть удобной.

Чтобы сделать класс итерируемым, нужно реализовать методы итератора `__iter__` и `__next__`. К деталям этих методов мы вернёмся после следующего примера:

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # Метод инициализации итератора
    # Здесь нужно инициализировать переменную(-ые) итерации
    def __iter__(self):
        self.n = 0
        # метод возвращает ссылку на сам объект, так как
        # итератор реализован в этом же классе
        return self

    # Этот метод возвращает следующий элемент
    # Если все элементы пройдены, возбуждается StopIteration
    def __next__(self):
        if self.n < len(self._books):
            # Выбираем текущий элемент из списка внутри объекта
            book = self._books[self.n]
            # увеличиваем счётчик (переменную итерации) на один
            self.n += 1
            # возвращаем текущий элемент
            return book
        else:
            # Все книги уже пройдены
            raise StopIteration
```

Метод `__iter__` инициализирует переменную (или переменные) итерации. Здесь достаточно простого счётчика — индекса текущего элемента в списке. Также нужен метод `__next__`, который возвращает следующий элемент итератора. В примере выше он возвращает элемент по индексу `n` из списка внутри объекта `Bookshelf`, а затем увеличивает переменную итерации.

Когда все элементы пройдены, `__next__` выбрасывает исключение `StopIteration`. Это ничем не отличается от выбрасывания других исключений, но `StopIteration` автоматически обрабатывается Python: оно сообщает коду, который использует итератор (например, циклу `for`), что итерация завершена.

Теперь наш `Bookshelf` готов к итерации, например в цикле `for`:

```python
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Выведем названия всех книг
    for book in shelf:
        print(book.name)
```

<sample-output>

The Life of Python
The Old Man and the C
A Good Cup of Java

</sample-output>


<programming-exercise name='Итерируемый список покупок' anchor="An iterable shopping list" tmcname='part10-09_iterable_shopping_list'>

Шаблон упражнения содержит класс `ShoppingList` из [упражнения части 8](/ru/part-8/2-classes-and-objects#programming-exercise-shopping-list). Измените класс так, чтобы он стал итерируемым и мог использоваться так:

```python
shopping_list = ShoppingList()
shopping_list.add("bananas", 10)
shopping_list.add("apples", 5)
shopping_list.add("pineapple", 1)

for product in shopping_list:
    print(f"{product[0]}: {product[1]} units")
```

<sample-output>

bananas: 10 units
apples: 5 units
pineapple: 1 units

</sample-output>

Метод `__next__` вашего итератора должен возвращать кортежи, где первый элемент — название продукта, а второй — количество.

</programming-exercise>
