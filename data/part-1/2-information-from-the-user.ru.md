---
path: "/ru/part-1/2-information-from-the-user"
title: "Информация от пользователя"
hidden: false
---

<text-box variant='learningObjectives' name='Цели обучения'>

После этого раздела:

- вы научитесь писать программы, которые используют ввод пользователя
- вы будете знать, как хранить ввод в переменных и выводить его
- вы сможете объединять строки

</text-box>

_Ввод_ (input) — это любая информация, которую пользователь передаёт программе. В частности, команда Python `input` читает строку, которую пользователь вводит с клавиатуры. Эта же команда может показывать пользователю сообщение, подсказывая, какой именно ввод ожидается.

Следующая программа считывает имя пользователя с помощью `input`, а затем выводит его с помощью `print`:

```python
name = input("What is your name? ")
print("Hi there, " + name)
```

Запуск может выглядеть так (ввод пользователя выделен красным):

<sample-output>

What is your name? **Paul Python**
Hi there, Paul Python

</sample-output>

То, что печатает эта программа, частично зависит от ввода пользователя. Значит, запуск может выглядеть и так:

<sample-output>

What is your name? **Paula Programmer**
Hi there, Paula Programmer

</sample-output>

Слово `name` в этой программе — это _переменная_. В программировании переменная — это место, в котором хранится некоторое _значение_ (например, строка или число). Это значение можно использовать позже, и его также можно менять.

<text-box variant="hint" name="Как называть переменные">

В целом, имена переменных можно выбирать довольно свободно, но в пределах правил языка Python.

В международной практике программирования переменные обычно называют по-английски. Но вы можете встретить код, где имена переменных на другом языке — например, на родном языке автора. Само имя переменной напрямую не влияет на её содержимое, так что «технически» имя не важно. Тем не менее, хорошо подобранные и понятные имена (часто — на английском) заметно упрощают понимание программы.

</text-box>

<in-browser-programming-exercise name="Имя дважды" anchor="Name twice" tmcname="part01-06_name_twice">

Напишите программу, которая спрашивает имя пользователя, а затем печатает его дважды — в двух строках подряд.

Пример того, как должна работать программа:

<sample-output>

What is your name? **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Использование переменной {#referencing-a-variable}

К одной и той же переменной можно обращаться много раз в программе:

```python
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

Если пользователь введёт имя `Paul Python`, программа напечатает:

<sample-output>

What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.

</sample-output>

Рассмотрим внимательнее, как здесь используется `print`. Внутри скобок команды есть и текст в кавычках, и имена переменных, которые ссылаются на ввод пользователя. Они объединяются оператором `+`, который _конкатенирует_ (склеивает) две строки в одну.

Строки и переменные можно комбинировать довольно свободно:

```python
name = input("What is your name? ")

print("Hi " + name + "! Let me make sure: your name is " + name + "?")
```

Если пользователь введёт `Ellen Example`, программа выведет:

<sample-output>

What is your name? **Ellen Example**
Hi Ellen Example! Let me make sure: your name is Ellen Example?

</sample-output>

<in-browser-programming-exercise name="Имя и восклицательные знаки" anchor="Name and exclamation marks" tmcname="part01-07_name_and_exclamation_marks">

Напишите программу, которая спрашивает имя пользователя, а затем печатает его дважды в одной строке так, чтобы в начале строки стоял восклицательный знак, ещё один — между двумя именами, и третий — в конце строки.

Программа должна работать так:

<sample-output>

What is your name? **Paul**
!Paul!Paul!

</sample-output>

</in-browser-programming-exercise>

## Несколько вводов {#more-than-one-input}

Программа может запрашивать больше одного значения. Обратите внимание: в примере ниже каждый `input` сохраняет полученное значение в отдельную переменную.

```python
name = input("What is your name? ")
email = input("What is your email address? ")
nickname = input("What is your nickname? ")

print("Let's make sure we got this right")
print("Your name: " + name)
print("Your email address: " + email)
print("Your nickname: " + nickname)
```

Например, вывод программы может быть таким:

<sample-output>

What is your name? **Frances Fictitious**
What is your email address? **frances99@example.com**
What is your nickname? **Fran**
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran

</sample-output>

Если одну и ту же переменную использовать для хранения нескольких вводов, то каждое новое значение заменит предыдущее. Например:

```python
address = input("What is your address? ")
print("So you live at address " + address)

address = input("Please type in a new address: ")
print("Your address is now " + address)
```

Пример выполнения:

<sample-output>

What is your address? **Python Path 101, Flat 3D**
So you live at address Python Path 101, Flat 3D
Please type in a new address: **New Road 999**
Your address is now New Road 999

</sample-output>

Это означает, что если одну и ту же переменную использовать для двух вводов подряд, то после второй записи добраться до первого значения уже невозможно:

```python
address = input("What is your address? ")
address = input("Please type in a new address: ")

print("Your address is now " + address)
```

Пример того, как может выглядеть вывод программы:

<sample-output>

What is your address? **Python Path 10**
Please type in a new address: **Programmer's Walk 23**
Your address is now Programmer's Walk 23

</sample-output>

<in-browser-programming-exercise name="Имя и адрес" anchor="Name and address" tmcname="part01-08_name_and_address">

Напишите программу, которая спрашивает имя и адрес пользователя. Затем программа должна напечатать полученную информацию так, как показано ниже:

<sample-output>

Given name: **Steve**
Family name: **Sanders**
Street address: **91 Station Road**
City and postal code: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Исправьте код: Реплики" anchor="Fix the code: Utterances" tmcname="part01-09_utterances">

Вот программа, которая должна спрашивать три «реплики» (три части) и выводить их так:

<sample-output>

The 1st part: **hickory**
The 2nd part: **dickory**
The 3rd part: **dock**
hickory-dickory-dock!

</sample-output>

Однако в коде ниже есть ошибка. Исправьте её.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="История" anchor="Story" tmcname="part01-10_story">

Напишите программу, которая выводит следующую историю. Пользователь вводит имя и год, и эти значения нужно подставить в вывод.

<sample-output>

Please type in a name: **Mary**
Please type in a year: **1572**

Mary is a valiant knight, born in the year 1572. One morning Mary woke up to an awful racket: a dragon was approaching the village. Only Mary could save the village's residents.

</sample-output>

История должна меняться в зависимости от введённых значений.

</in-browser-programming-exercise>


<!--

Тест для повторения материала этого раздела:

<quiz id="10cb3510-d8a6-5e9b-b372-c85c4c7eb957"></quiz>

-->
