---
path: /ru/part-8/2-classes-and-objects
title: Классы и объекты
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что такое класс
- вы поймёте связь между классом и объектом
- вы будете знать, что подразумевается под объектно‑ориентированным программированием

</text-box>

В предыдущем разделе мы работали со списками, кортежами, словарями и строками. Это «особые случаи» в Python: синтаксис языка предоставляет отдельный способ создавать объекты каждого из этих типов:

```python
# Списки объявляются в квадратных скобках
my_list = [1,2,3]

# Строки объявляются в кавычках
my_string = "Hi there!"

# Словари объявляются в фигурных скобках
my_dict = {"one": 1, "two:": 2}

# Кортежи объявляются в круглых скобках
my_tuple = (1,2,3)
```

Когда нужно создать объект другого типа, обычно вызывают специальную функцию инициализации — _конструктор_ (constructor). Посмотрим на работу с дробями с помощью класса `Fraction`.

```python
# используем класс Fraction из модуля fractions
from fractions import Fraction

# создаём несколько дробей
half = Fraction(1,2)

third = Fraction(1,3)

another = Fraction(3,11)

# выводим их
print(half)
print(third)
print(another)

# например, дроби можно складывать
print(half + third)
```

<sample-output>

1/2
1/3
3/11
5/6

</sample-output>

Как видно, вызов конструктора выглядит немного иначе, чем вызов методов, с которыми мы встречались раньше. Во‑первых, он не «привязан» к какому‑то объекту через точку (потому что конструктор как раз создаёт объект). Во‑вторых, имя конструктора начинается с заглавной буквы: `half = Fraction(1,2)`. Разберёмся подробнее, как создаются объекты, познакомившись с понятием _класса_.

## Класс — это «чертёж» объекта {#a-class-is-the-blueprint-of-an-object}

Термин _класс_ уже много раз встречался в материалах. Например, в примере выше мы импортировали класс `Fraction` из модуля `fractions`, а новые объекты‑дроби создавали, вызывая _конструктор_ класса `Fraction`.

Определение класса содержит структуру и функциональность объектов, которые он описывает. Поэтому классы иногда называют «чертежами» объектов. Определение класса говорит, какие данные содержит объект, и какие методы можно у него вызывать. _Объектно‑ориентированное программирование_ — это подход, при котором функциональность программы строится вокруг классов и объектов, созданных на их основе.

Одно определение класса можно использовать для создания множества объектов. Как мы уже говорили, объекты независимы: изменения одного объекта обычно не влияют на другие объекты того же класса. У каждого объекта свой набор значений атрибутов. Можно упростить связь «класс‑объект» так:

* класс определяет переменные (атрибуты)
* при создании объекта этим переменным присваиваются значения

Таким образом, с помощью объекта типа `Fraction` можно получить числитель и знаменатель дроби:

```python
from fractions import Fraction

number = Fraction(2,5)

# Выведем числитель
print(number.numerator)

# ...и знаменатель
print(number.denominator)
```

<sample-output>

2
5

</sample-output>

Определение класса `Fraction` содержит объявления переменных `numerator` и `denominator`. У каждого объекта, созданного по этому классу, есть свои значения этих переменных.

Аналогично объекты класса `date` содержат свои значения года, месяца и дня:

```python
from datetime import date

xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

# выведем только атрибут month у обоих объектов
print(xmas_eve.month)
print(midsummer.month)
```

<sample-output>

12
6

</sample-output>

Определение класса `date` содержит объявления переменных `year`, `month` и `day`. При создании нового объекта `date` этим переменным присваиваются значения. У каждого объекта свои уникальные значения.

## Функции, работающие с объектами {#functions-which-work-with-objects}

Передавать объект в функцию как аргумент вам уже должно быть знакомо: мы делали это много раз. Рассмотрим пример: функция проверяет, приходится ли дата (`date`), переданная в аргументе, на выходной:

```python
def is_it_weekend(my_date: date):
    weekday = my_date.isoweekday()
    return weekday == 6 or weekday == 7
```

Эта функция использует метод [isoweekday](https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday), определённый в классе `date`. Он возвращает целое число: 1 для понедельника, 2 для вторника и т. д.

Использовать функцию можно так:

```python
xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

print(is_it_weekend(xmas_eve))
print(is_it_weekend(midsummer))
```

<sample-output>

False
True

</sample-output>

## Методы и переменные {#methods-vs-variables}

Работая с объектом типа `date`, вы можете заметить небольшую разницу: атрибуты (переменные) объекта читаются иначе, чем вызываются методы:

```python
my_date = date(2020, 12, 24)

# вызываем метод
weekday = my_date.isoweekday()

# обращаемся к переменной
my_month = my_date.month

print("The day of the week:", weekday)
print("The month:", my_month)
```

<sample-output>

The day of the week: 4
The month: 12

</sample-output>

День недели доступен через _метод_ `isoweekday`:

```python
weekday = my_date.isoweekday()
```

Это вызов метода, поэтому после имени стоят круглые скобки. Если скобки опустить, ошибки не будет, но результат окажется странным:

```python
weekday =  my_date.isoweekday
print("The day of the week:", weekday)
```

<sample-output>

The day of the week: <built-in method isoweekday of datetime.date object at 0x10ed66450>

</sample-output>

А месяц (`month`) — это атрибут, то есть переменная, и к её значению обращаются по _ссылке_ (через точку).

```python
my_month = my_date.month
```

Обратите внимание: _скобок нет_. Если добавить скобки, будет ошибка:

```python
my_month = my_date.month()
```

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable

</sample-output>

<programming-exercise name='Список лет' anchor="List of years" tmcname='part08-03_list_years'>

Напишите функцию `list_years(dates: list)`, которая принимает список объектов типа `date`. Функция должна вернуть новый список, содержащий _годы из исходного списка в хронологическом порядке_ — от раннего к позднему.

Пример работы функции:

```python
date1 = date(2019, 2, 3)
date2 = date(2006, 10, 10)
date3 = date(1993, 5, 9)

years = list_years([date1, date2, date3])
print(years)
```

<sample-output>

[1993, 2006, 2019]

</sample-output>

</programming-exercise>


<programming-exercise name='Список покупок' anchor="Shopping list" tmcname='part08-04_shopping_list'>

В шаблоне задания уже есть класс `ShoppingList`, который моделирует список покупок. Ваша задача — добавить в класс один метод. Уже существующие методы менять не нужно.

Предположим, объект `ShoppingList` хранится в переменной `shopping_list`. Тогда с ним можно работать с помощью таких методов:

```python

print(shopping_list.number_of_items())
print(shopping_list.item(1))
print(shopping_list.amount(1))
print(shopping_list.item(2))
print(shopping_list.amount(2))

```

<sample-output>

2
Bananas
4
Milk
1

</sample-output>

Можно сделать и так:

```python
# элементы списка покупок нумеруются с 1
for i in range(1, shopping_list.number_of_items()+1):
    item = shopping_list.item(i)
    amount = shopping_list.amount(i)
    print(f"{item}: {amount} units")
```


<sample-output>

Bananas 4 units
Milk 1 units

</sample-output>

Как видите, `ShoppingList` похож на обычный список, но доступ к данным идёт через методы класса. В отличие от обычных списков Python, индексация начинается с 1, а не с 0.

Напишите функцию `total_units(my_list: ShoppingList)`, которая принимает объект `ShoppingList`. Функция должна посчитать общее количество единиц товаров в списке и вернуть это число.

Для проверки можно использовать такой код:

```python
if __name__ == "__main__":
    my_list = ShoppingList()
    my_list.add("bananas", 10)
    my_list.add("apples", 5)
    my_list.add("pineapple", 1)

    print(total_units(my_list))
```

<sample-output>

16

</sample-output>

**Важно:** определение класса `ShoppingList` уже включено в шаблон задания. Его не нужно импортировать через `import`, в отличие от примеров выше со стандартными классами `Fraction` и `date`.

</programming-exercise>
