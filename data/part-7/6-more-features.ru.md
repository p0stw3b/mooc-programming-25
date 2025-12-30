---
path: /ru/part-7/6-more-features
title: Дополнительные возможности Python
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с некоторыми дополнительными возможностями Python

</text-box>

В завершение курса рассмотрим несколько полезных возможностей Python.

## Условие в одну строку {#single-line-conditionals}

Следующие два фрагмента кода дают один и тот же результат:

```python
if x%2 == 0:
    print("even")
else:
    print("odd")
```

```python
print("even" if x%2 == 0 else "odd")
```

Во втором примере используется условное выражение в одну строку: `a if [condition] else b`. Значение выражения равно `a`, если условие истинно, и `b` — если ложно. Иногда такую конструкцию называют _тернарным оператором_.

Условные выражения полезны, когда нужно присваивать значение _в зависимости от условия_. Например, если есть переменные `x` и `y`, и вы хотите либо увеличить `y`, либо обнулить её в зависимости от чётности `x`, это можно написать обычным `if`/`else`:

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

То же самое можно записать одним выражением:

```python
y = y + 1 if x%2 == 0 else 0
```

## «Пустой» блок {#an-empty-block}

В предыдущей части мы видели, что в Python нельзя оставлять блок кода пустым. Если вам нужен блок, который ничего не делает (например, при отладке), используйте команду `pass`. Например, можно написать функцию, которая ничего не делает:

```python
def testing():
    pass
```

Такая функция просто сразу завершится. Если убрать `pass` и оставить блок полностью пустым, будет ошибка.

```python
def testing():  # это вызовет ошибку!
```

## Циклы с блоком `else` {#loops-with-else-blocks}

В Python у циклов тоже может быть блок `else`. Он выполняется, если цикл завершился «нормально», без `break`.

Например, в следующем примере мы просматриваем список чисел. Если встречается чётное число, программа печатает сообщение и прерывает цикл. Если чётных чисел нет, цикл заканчивается сам, и тогда печатается другое сообщение.

```python
my_list = [3,5,2,8,1]
for x in my_list:
    if x%2 == 0:
        print("found an even number", x)
        break
else:
    print("there were no even numbers")
```

Более традиционный способ — использовать вспомогательную переменную, чтобы запомнить, нашли ли мы нужный элемент:

```python
my_list = [3,5,2,8,1]
found = False
for x in my_list:
    if x%2 == 0:
        print("found an even number", x)
        found = True
        break
if not found:
    print("there were no even numbers")
```

Конструкция `for ... else` избавляет от необходимости заводить отдельную переменную.

## Значение параметра по умолчанию {#default-parameter-value}

У параметра функции Python может быть значение по умолчанию. Оно используется, если соответствующий аргумент не передан. Пример:

```python
def say_hello(name="Emily"):
    print("Hi there,", name)

say_hello()
say_hello("Eric")
say_hello("Matthew")
say_hello("")
```

<sample-output>

Hi there, Emily
Hi there, Eric
Hi there, Matthew
Hi there,

</sample-output>

Важно: пустая строка — это тоже строка, поэтому значение по умолчанию не применяется, если передать пустую строку.

## Переменное число параметров {#a-variable-number-of-parameters}

Можно определить функцию с переменным количеством аргументов, поставив звёздочку перед именем параметра. Все дополнительные аргументы будут собраны в кортеж, доступный через этот параметр.

Следующая функция выводит количество аргументов и их сумму:

```python
def testing(*my_args):
    print("You passed", len(my_args), "arguments")
    print("The sum of the arguments is", sum(my_args))

testing(1, 2, 3, 4, 5)
```

<sample-output>

You passed 5 arguments
The sum of the arguments is 15

</sample-output>

<programming-exercise name='Свой язык программирования' anchor="Your own programming language" tmcname='part07-18_own_programming_language'>

В этом задании вы напишете исполнитель (интерпретатор) для собственного мини‑языка программирования. Можно использовать любые приёмы и навыки, которые вы освоили на курсе.

Программа состоит из строк, и каждая строка имеет один из следующих форматов:

* `PRINT [value]`: печатает значение
* `MOV [variable] [value]`: присваивает значение переменной
* `ADD [variable] [value]`: добавляет значение к переменной
* `SUB [variable] [value]`: вычитает значение из переменной
* `MUL [variable] [value]`: умножает переменную на значение
* `[location]:`: задаёт метку, на которую можно перейти
* `JUMP [location]`: выполняет переход к указанной метке
* `IF [condition] JUMP [location]`: если условие истинно, перейти к указанной метке
* `END`: завершить выполнение

Квадратные скобки здесь — лишь обозначение операндов; ниже приведены примеры.

Программа выполняется построчно, начиная с первой строки. Выполнение заканчивается, когда встречается команда `END` или когда больше не осталось строк для выполнения.

У каждой программы есть 26 предопределённых переменных с именами от `A` до `Z`. В начале выполнения все они равны 0. Обозначение `[variable]` означает одну из этих переменных.

Все значения в программе — целые числа. Обозначение `[value]` означает либо значение, хранящееся в переменной, либо целое число, записанное прямо в строке.

Обозначение `[location]` означает имя метки, состоящее из строчных латинских букв `a`–`z` и/или цифр `0`–`9`. Две разные метки не могут иметь одинаковое имя.

Обозначение `[condition]` означает выражение формата `[value] [comparison] [value]`, где `[comparison]` — один из операторов `==`, `!=`, `<`, `<=`, `>` или `>=`.

Напишите функцию `run(program)`, которая принимает список команд программы. Каждый элемент списка — одна строка кода. Функция должна вернуть новый список, содержащий результаты команд `PRINT`, выполненных во время работы программы.

Можно считать, что на вход функции будут подаваться только корректные программы. Не нужно реализовывать проверку входных данных или обработку ошибок.

Это задание оценивается в два балла. Один балл вы получите, если корректно работают команды `PRINT`, `MOV`, `ADD`, `SUB`, `MUL` и `END`. Второй балл — если также работают остальные команды, которые используются для реализации циклов.

Ниже приведены примеры, которые можно использовать для тестирования. Пример 1:

```python
program1 = []
program1.append("MOV A 1")
program1.append("MOV B 2")
program1.append("PRINT A")
program1.append("PRINT B")
program1.append("ADD A B")
program1.append("PRINT A")
program1.append("END")
result = run(program1)
print(result)
```

<sample-output>

[1, 2, 3]

</sample-output>

Пример 2:

```python
program2 = []
program2.append("MOV A 1")
program2.append("MOV B 10")
program2.append("begin:")
program2.append("IF A >= B JUMP quit")
program2.append("PRINT A")
program2.append("PRINT B")
program2.append("ADD A 1")
program2.append("SUB B 1")
program2.append("JUMP begin")
program2.append("quit:")
program2.append("END")
result = run(program2)
print(result)
```

<sample-output>

[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

</sample-output>

Пример 3 (факториал):

```python
program3 = []
program3.append("MOV A 1")
program3.append("MOV B 1")
program3.append("begin:")
program3.append("PRINT A")
program3.append("ADD B 1")
program3.append("MUL A B")
program3.append("IF B <= 10 JUMP begin")
program3.append("END")
result = run(program3)
print(result)
```

<sample-output>

[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

</sample-output>

Пример 4 (простые числа):

```python
program4 = []
program4.append("MOV N 50")
program4.append("PRINT 2")
program4.append("MOV A 3")
program4.append("begin:")
program4.append("MOV B 2")
program4.append("MOV Z 0")
program4.append("test:")
program4.append("MOV C B")
program4.append("new:")
program4.append("IF C == A JUMP error")
program4.append("IF C > A JUMP over")
program4.append("ADD C B")
program4.append("JUMP new")
program4.append("error:")
program4.append("MOV Z 1")
program4.append("JUMP over2")
program4.append("over:")
program4.append("ADD B 1")
program4.append("IF B < A JUMP test")
program4.append("over2:")
program4.append("IF Z == 1 JUMP over3")
program4.append("PRINT A")
program4.append("over3:")
program4.append("ADD A 1")
program4.append("IF A <= N JUMP begin")
result = run(program4)
print(result)
```

<sample-output>

[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

</sample-output>

</programming-exercise>

Пожалуйста, заполните анкету с отзывом о курсе. Ваши ответы помогают улучшать курс.

<quiz id="d62984be-5496-56b5-a725-ea811a8ba38b"></quiz>
