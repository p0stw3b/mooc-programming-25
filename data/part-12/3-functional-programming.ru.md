---
path: /ru/part-12/3-functional-programming
title: Функциональное программирование
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что такое функциональное программирование
- вы сможете использовать функции `map`, `reduce` и `filter` в своих программах

</text-box>

Функциональное программирование — это _парадигма программирования_, которая по возможности избегает изменений состояния программы. Переменные стараются использовать как можно меньше. Вместо этого основу программы составляют цепочки вызовов функций.

Лямбда‑выражения и разные виды включений (comprehensions) — распространённые приёмы функционального стиля: они позволяют обрабатывать данные, не сохраняя их в переменных, и тем самым не менять состояние программы. Например, лямбда‑выражение по сути является функцией, но нам не нужно хранить где‑то именованную ссылку на неё.

Как мы уже упоминали, функциональное программирование — это парадигма (или стиль) программирования. Существует много парадигм, и с некоторыми из них вы уже сталкивались:

* императивное программирование, где программа состоит из последовательности команд, выполняемых по порядку
* процедурное программирование, где программа группируется в процедуры или подпрограммы
* объектно‑ориентированное программирование, где программа и её состояние представлены объектами, определёнными в классах

Разделение парадигм трактуют по‑разному: например, некоторые считают, что императивное и процедурное программирование — одно и то же, а другие используют «императивное» как более широкое понятие, включающее и процедурный, и объектно‑ориентированный подход. Термины и границы тут не так важны, как и строгое следование одной парадигме, но важно понимать, что существуют разные подходы — они влияют на решения, которые принимают программисты.

Многие языки проектируются с упором на одну парадигму, но Python довольно универсален и позволяет применять разные стили даже в рамках одной программы. Это даёт возможность выбирать наиболее эффективный и понятный способ решения каждой задачи.

Рассмотрим некоторые инструменты функционального программирования, которые есть в Python.

## map {#map}

Функция `map` выполняет некоторую операцию над каждым элементом итерируемой последовательности. Это похоже на то, как работают включения (comprehensions), но синтаксис другой.

Предположим, у нас есть список строк, который мы хотим преобразовать в список целых чисел:

```python
str_list = ["123","-10", "23", "98", "0", "-110"]

integers = map(lambda x : int(x), str_list)

print(integers) # так мы видим тип объекта, с которым имеем дело

for number in integers:
    print(number)
```

<sample-output>

<map object at 0x0000021A4BFA9A90>
123
-10
23
98
0
-110

</sample-output>

Общий синтаксис функции `map` такой:

`map(<function>, <series>)`

где `function` — операция, которую нужно выполнить для каждого элемента последовательности `series`.

Функция `map` возвращает объект типа `map`. Это итерируемый объект, который можно преобразовать в список:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized = map(capitalize, test_list)

capitalized_list = list(capitalized)
print(capitalized_list)
```

<sample-output>

['First', 'Second', 'Third', 'Fourth']

</sample-output>

Как видно из примеров, `map` принимает и анонимную лямбда‑функцию, и обычную именованную функцию, объявленную через `def`.

Того же результата можно добиться с помощью спискового включения:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized_list = [capitalize(item) for item in test_list]
print(capitalized_list)
```

Или можно пройтись по исходному списку циклом `for` и складывать обработанные элементы в новый список методом `append`. В программировании обычно существует множество решений для одной и той же задачи. Редко бывает единственно «правильный» вариант. Знание разных подходов помогает выбрать наиболее уместный для конкретной ситуации (или просто более приятный лично вам).

Важно отметить, что `map` возвращает не список, а _итератор_ типа `map`. Итератор во многом похож на список, но есть отличия, которые видно в примере ниже:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

# сохраняем возвращаемое значение функции map
capitalized = map(capitalize, test_list)

for word in capitalized:
  print(word)

print("print the same again:")
for word in capitalized:
  print(word)
```

Программа выведет следующее:

<sample-output>

First
Second
Third
Fourth
print the same again:

</sample-output>

В примере выше мы попытались вывести содержимое итератора `map` дважды, но во второй раз ничего не вывелось. Причина в том, что `map` — это итератор: обход циклом `for` «исчерпывает» его так же, как исчерпывается генератор после достижения максимального значения. После того как элементы итератора один раз пройдены циклом `for`, в нём больше ничего не остаётся.

Если вам нужно использовать значения из `map` больше одного раза, можно, например, преобразовать результат в список:

```python
test_list = ["first", "second", "third", "fourth"]

# преобразуем возвращаемое значение функции map в список
capitalized = list(map(capitalize, test_list))

for word in capitalized:
  print(word)

print("print the same again:")
for word in capitalized:
  print(word)
```

<sample-output>

First
Second
Third
Fourth
print the same again:
First
Second
Third
Fourth

</sample-output>

## Функция map и ваши классы {#the-map-function-and-your-own-classes}

Разумеется, с помощью `map` можно обрабатывать и экземпляры ваших собственных классов. Ничего особенного для этого не требуется, как видно из примера ниже:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

clients = map(lambda t: t.name, accounts)
for name in clients:
  print(name)

balances = map(lambda t: t.get_balance(), accounts)
for balance in balances:
  print(balance)
```

<sample-output>

Randy Riches
Paul Pauper
Mary Millionaire
5000
1
1000000

</sample-output>

Сначала с помощью `map` мы собираем имена владельцев счетов. Для извлечения значения атрибута `name` из каждого объекта `BankAccount` используется анонимная лямбда‑функция:

```python
clients = map(lambda t: t.name, accounts)
```

Аналогично собираются балансы всех счетов. Здесь лямбда‑функция выглядит немного иначе, потому что баланс получается вызовом метода, а не прямым доступом к атрибуту:

```python
balances = map(lambda t: t.get_balance(), accounts)
```

<programming-exercise name='Попытки прохождения курса' anchor="Attempted courses" tmcname='part12-11_attempted_courses'>

В шаблоне упражнения есть определение класса `CourseAttempt`. Он используется так:

```python
attempt = CourseAttempt("Peter Python", "Introduction to Programming", 5)
print(attempt.student_name)
print(attempt.course_name)
print(attempt.grade)
print(attempt)
```

<sample-output>

Peter Python
Introduction to Programming
5
Peter Python, grade for the course Introduction to Programming 5

</sample-output>

## Имена студентов {#names-of-students}

Напишите функцию `names_of_students(attempts: list)`, которая принимает список объектов `CourseAttempt`. Функция должна вернуть новый список с именами студентов, которые пытались пройти курс.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in names_of_students([s1, s2, s3]):
    print(name)
```

<sample-output>

Peter Python
Olivia C. Objective
Peter Python

</sample-output>

Реализуйте функцию, используя `map`.

## Курсы {#courses}

Напишите функцию `course_names(attempts: list)`, которая принимает список объектов `CourseAttempt`. Функция должна вернуть новый список с названиями курсов из исходного списка, отсортированный по алфавиту. Каждое название курса должно встречаться в списке только один раз.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in course_names([s1, s2, s3]):
    print(name)
```
<sample-output>

Advanced Course in Programming
Introduction to Programming

</sample-output>

Реализуйте функцию, используя `map`. Этого, скорее всего, будет недостаточно: понадобится что‑то ещё, чтобы гарантировать уникальность названий курсов.

</programming-exercise>

## filter {#filter}

Встроенная функция Python `filter` похожа на `map`, но, как следует из названия, она берёт не все элементы исходной последовательности. Вместо этого она отбирает элементы с помощью функции‑критерия, переданной аргументом. Если функция‑критерий возвращает `True`, элемент попадает в результат.

Рассмотрим пример использования `filter`:

```python
integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(lambda number: number % 2 == 0, integers)

for number in even_numbers:
    print(number)
```

<sample-output>

2
6
4
10
14

</sample-output>

Этот пример может быть понятнее, если вместо лямбды использовать именованную функцию:

```python
def is_it_even(number: int):
    if number % 2 == 0:
        return True
    return False

integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(is_it_even, integers)

for number in even_numbers:
    print(number)
```

Эти две программы функционально полностью одинаковы. Какой подход лучше — во многом вопрос вкуса.

Посмотрим на ещё один пример фильтрации. Эта программа моделирует рыб и отбирает только тех, кто весит не меньше 1000 граммов:

```python
class Fish:
    """Класс моделирует рыбу определённого вида и веса."""
    def __init__(self, species: str, weight: int):
        self.species = species
        self.weight = weight

    def __repr__(self):
        return f"{self.species} ({self.weight} g.)"

if __name__ == "__main__":
    f1 = Fish("Pike", 1870)
    f2 = Fish("Perch", 763)
    f3 = Fish("Pike", 3410)
    f4 = Fish("Cod", 2449)
    f5 = Fish("Roach", 210)

    fishes = [f1, f2, f3, f4, f5]

    over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

    for fish in over_a_kilo:
        print(fish)
```

<sample-output>

Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)

</sample-output>

Того же результата можно добиться и списковым включением:

```python
over_a_kilo = [fish for fish in fishes if fish.weight >= 1000]
```

## Возвращаемое значение filter — итератор {#the-return-value-of-filter-is-an-iterator}

Функция `filter`, как и `map`, возвращает _итератор_. В некоторых ситуациях с `filter` нужно быть особенно внимательным, потому что итератор можно обойти только один раз. Поэтому попытка вывести «крупную рыбу» дважды не сработает так прямолинейно, как может показаться:

```python
f1 = Fish("Pike", 1870)
f2 = Fish("Perch", 763)
f3 = Fish("Pike", 3410)
f4 = Fish("Cod", 2449)
f5 = Fish("Roach", 210)

fishes = [f1, f2, f3, f4, f5]

over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

for fish in over_a_kilo:
    print(fish)

print("print the same again:")

for Fish in over_a_kilo:
    print(Fish)
```

Программа выведет следующее:

<sample-output>

Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
print the same again:

</sample-output>

Если вам нужно использовать значения из итератора `filter` больше одного раза, можно преобразовать результат в список:

```python
fishes = [f1, f2, f3, f4, f5]

# преобразуем возвращаемое значение функции filter в список
over_a_kilo = list(filter(lambda fish : fish.weight >= 1000, fishes))
```

<programming-exercise name='Фильтрация попыток' anchor="Filtering attempts" tmcname='part12-12_filtering_attempts'>

В этом упражнении мы продолжим работать с классом `CourseAttempt`.

## Зачтённые попытки {#accepted-attempts}

Напишите функцию `accepted(attempts: list)`, которая принимает список объектов `CourseAttempt`. Функция должна вернуть новый список объектов `CourseAttempt`, содержащий только те элементы исходного списка, у которых оценка не меньше 1.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 0)

for attempt in accepted([s1, s2, s3]):
    print(attempt)
```

<sample-output>

Peter Python, grade for the course Introduction to Programming 3
Olivia C. Objective grade for the course Introduction to Programming 5

</sample-output>

Реализуйте функцию, используя `filter`.

## Попытки с заданной оценкой {#attempts-with-grade}

Напишите функцию `attempts_with_grade(attempts: list, grade: int)`, которая принимает список объектов `CourseAttempt` и целое число. Функция должна вернуть новый список, содержащий только те объекты `CourseAttempt` из исходного списка, у которых оценка равна второму аргументу.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 3)
s4 = CourseAttempt("Olivia C. Objective", "Data Structures and Algorithms", 3)

for attempt in attempts_with_grade([s1, s2, s3, s4], 3):
    print(attempt)
```

<sample-output>

Peter Python, grade for the course Introduction to Programming 3
Peter Python, grade for the course Introduction to AI 3
Olivia C. Objective, grade for the course Data Structures and Algorithms 3

</sample-output>

Реализуйте функцию, используя `filter`.

## Студенты, прошедшие курс {#students-who-passed-the-course}

Напишите функцию `passed_students(attempts: list, course: str)`, которая принимает список объектов `CourseAttempt` и название курса. Функция должна вернуть _отсортированный по алфавиту_ список имён студентов, которые прошли курс, то есть их оценка за данный курс была больше 0.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to AI", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 0)
s4 = CourseAttempt("Jack Java", "Introduction to AI", 3)

for attempt in passed_students([s1, s2, s3, s4], "Introduction to AI"):
    print(attempt)
```

<sample-output>

Jack Java
Olivia C. Objective

</sample-output>

Реализуйте функцию, используя `filter` и `map`.

</programming-exercise>

## reduce {#reduce}

Третья «опорная» функция в этом вводном обзоре принципов функционального программирования — `reduce` из модуля `functools`. Как следует из названия, её задача — _свернуть_ (reduce) элементы последовательности в одно значение.

Функция `reduce` начинается с операции и начального значения. Она последовательно применяет операцию к каждому элементу серии, изменяя «накопленное» значение на каждом шаге. Когда все элементы обработаны, возвращается итог.

Раньше мы уже складывали числа в списке разными способами, а теперь сделаем это с помощью `reduce`. Обратите внимание на `import`: в Python версии 3 и выше он нужен, чтобы получить доступ к `reduce`. В более старых версиях Python `import` не требовался, поэтому в интернете можно встретить примеры без него.

```python
from functools import reduce

my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list, 0)

print(sum_of_numbers)
```

<sample-output>

11

</sample-output>

Рассмотрим подробнее, что здесь происходит. `reduce` принимает три аргумента: функцию, последовательность элементов и начальное значение. В нашем случае последовательность — список целых чисел, а так как мы считаем сумму, подходящее начальное значение — ноль.

Первый аргумент — это функция, описывающая операцию, которую нужно выполнить на каждом шаге. Здесь это анонимная лямбда‑функция:

```python
lambda reduced_sum, item: reduced_sum + item
```

Эта функция принимает два аргумента: текущее «свёрнутое» значение и очередной элемент, который нужно обработать. На основе этих двух значений вычисляется новое накопленное значение. В данном случае это сумма старого значения и текущего элемента.

Чтобы было проще понять, что делает `reduce`, можно использовать обычную именованную функцию вместо лямбды. Тогда можно добавить полезные выводы:

```python
from functools import reduce

my_list = [2, 3, 1, 5]

# вспомогательная функция для reduce: добавляет очередное значение к текущей сумме
def sum_helper(reduced_sum, item):
  print(f"the reduced sum is now {reduced_sum}, next item is {item}")
  # новая накопленная сумма = старая сумма + следующий элемент
  return reduced_sum + item

sum_of_numbers = reduce(sum_helper, my_list, 0)

print(sum_of_numbers)
```

Программа выводит:

<sample-output>

the reduced sum is now 0, next item is 2
the reduced sum is now 2, next item is 3
the reduced sum is now 5, next item is 1
the reduced sum is now 6, next item is 5
11

</sample-output>

Сначала функция обрабатывает элемент со значением 2. На старте накопленная сумма равна 0 — это начальное значение, переданное в `reduce`. Функция вычисляет и возвращает сумму: `0 + 2 = 2`.

Это значение попадает в `reduced_sum`, когда `reduce` переходит к следующему элементу списка со значением 3. Функция вычисляет и возвращает сумму: `2 + 3 = 5`. Этот результат используется при обработке следующего элемента, и так далее.

Суммирование — простая операция, и для неё даже есть встроенная функция `sum`. А как насчёт умножения? Нужны лишь небольшие изменения, чтобы получить произведение:

```python
from functools import reduce

my_list = [2, 2, 4, 3, 5, 2]

product_of_list = reduce(lambda product, item: product * item, my_list, 1)

print(product_of_list)
```

<sample-output>

480

</sample-output>

Так как мы умножаем, начальным значением будет не ноль, а 1. Как вы думаете, что произойдёт, если использовать 0 как начальное значение?

Выше мы в основном работали с целыми числами, но `map`, `filter` и `reduce` умеют обрабатывать коллекции объектов любого типа.

Например, посчитаем суммарный баланс всех счетов в банке с помощью `reduce`:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

from functools import reduce

def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()

balances_total = reduce(balance_sum_helper, accounts, 0)

print("The total of the bank's balances:")
print(balances_total)
```

Эта программа выведет:

<sample-output>

The total of the bank's balances:
1005001

</sample-output>

Функция `balance_sum_helper` получает баланс каждого банковского счёта через метод, предназначенный для этого в классе `BankAccount`:

```python
def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()
```

<text-box variant='hint' name='Reduce без начального значения'>

Не обязательно всегда передавать третий аргумент в `reduce`. Например, суммирование будет работать и _без_ начального значения:

```python
my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list)

print(sum_of_numbers)
```

Если начальное значение не указано, `reduce` берёт первый элемент списка как начальное значение и начинает свёртку со второго элемента.

</text-box>

**Важно:** если элементы последовательности имеют другой тип, чем ожидаемый тип результата свёртки, третий аргумент обязателен. Пример с банковскими счетами не сработает без начального значения. То есть попытка сделать так:

```python
balances_total = reduce(balance_sum_helper, accounts)
```

приведёт к ошибке:

```python
TypeError: unsupported operand type(s) for +: 'BankAccount' and 'int'
```

В этом случае, когда `reduce` пытается вызвать `balance_sum_helper` в первый раз, аргументами становятся _два первых элемента списка_, и оба они имеют тип `BankAccount`. Конкретно параметру `balance_sum` будет присвоен первый объект `BankAccount` из списка. Далее `balance_sum_helper` попытается прибавить к нему целое число, но операция сложения целого числа и объекта `BankAccount` напрямую не поддерживается.

<programming-exercise name='Учебные кредиты' anchor="Study credits" tmcname='part12-13_credits'>

В этом упражнении мы будем работать с немного изменённой версией класса `CourseAttempt`. Имя студента убрано, но добавлено количество кредитов. Класс используется так:

```python
attempt = CourseAttempt("Data Structures and Algorithms", 3, 10)
print(attempt)
print(attempt.course_name)
print(attempt.credits)
print(attempt.grade)
```

<sample-output>

Data Structures and Algorithms (10 cr) grade 3
Data Structures and Algorithms
10
3

</sample-output>

## Сумма всех кредитов {#the-sum-of-all-credits}

Реализуйте функцию `sum_of_all_credits`, которая принимает список попыток прохождения курсов. Функция должна суммировать общее количество учебных кредитов по всем курсам. Она должна работать так:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 4, 5)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_all_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

20

</sample-output>

Реализуйте функцию, используя `reduce`.

## Сумма зачтённых кредитов {#the-sum-of-passed-credits}

Реализуйте функцию `sum_of_passed_credits`, которая принимает список попыток прохождения курсов. Функция должна суммировать кредиты только для тех попыток, где оценка не меньше 1. Она должна работать так:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_passed_credits([s1, s2, s3])
print(credit_sum)
```

<sample-output>

15

</sample-output>

Реализуйте функцию, используя `reduce` и `filter`.

## Средняя оценка по зачтённым курсам {#average-grade-for-passed-courses}

Реализуйте функцию `average`, которая принимает список попыток прохождения курсов. Функция должна вычислять среднюю оценку среди попыток с оценкой 1 и выше. Она должна работать так:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
ag = average([s1, s2, s3])
print(ag)
```

<sample-output>

4.0

</sample-output>

Реализуйте функцию, используя `reduce` и `filter`. Важно: требуется обычное среднее арифметическое, а не взвешенное среднее.

Во время выполнения этого упражнения полезно помнить, что [возвращаемое значение `filter` — это итератор](/ru/part-12/3-functional-programming#the-return-value-of-filter-is-an-iterator).

</programming-exercise>
