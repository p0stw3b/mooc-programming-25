---
path: /ru/part-2/4-simple-loops
title: Простые циклы
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что такое цикл в программировании
- вы сможете использовать цикл `while True` в своих программах
- вы будете знать, как использовать команду `break`, чтобы выйти из цикла

</text-box>

Мы уже довольно подробно рассмотрели условные конструкции. Ещё один центральный приём в программировании — повторение, или _итерация_. Вместе это образует базовые управляющие конструкции, которыми должен владеть любой программист. Они называются управляющими, потому что позволяют управлять тем, какие строки кода и когда выполняются. Условные конструкции позволяют _выбирать между_ фрагментами кода, а итерационные конструкции позволяют _повторять_ фрагменты кода. Их часто называют _циклами_, потому что они позволяют программе «вернуться» к строке, которая уже выполнялась. Выполнение одного повторения цикла также называют итерацией цикла.

В этом разделе мы познакомимся с простым циклом `while`. Его структура похожа на условные конструкции, которые мы уже изучили. В следующей части мы перейдём к более продвинутым примерам.

Рассмотрим программу, которая просит пользователя ввести число и печатает квадрат этого числа. Так продолжается, пока пользователь не введёт -1.

```python
while True:
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

Запуск программы может выглядеть так:

<sample-output>

Please type in a number, -1 to quit: **2**
4
Please type in a number, -1 to quit: **4**
16
Please type in a number, -1 to quit: **10**
100
Please type in a number, -1 to quit: **-1**
Thanks and bye!

</sample-output>

Как видно выше, благодаря оператору `while` программа запрашивает несколько чисел. Когда пользователь вводит -1, выполняется команда `break`: цикл завершается, и выполнение продолжается с первой строки после блока `while`.

При работе с циклами важно, чтобы в какой-то момент в коде всегда была возможность выйти из цикла — иначе повторение может продолжаться бесконечно. Чтобы это показать, немного изменим пример:

```python
number = int(input("Please type in a number, -1 to quit: "))
while True:
    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

В этой версии программа спрашивает число _вне цикла_. Если пользователь введёт любое число, кроме -1, выхода из цикла больше не будет. Получится _бесконечный цикл_: блок кода внутри цикла повторяется бесконечно:

<sample-output>

Please type in a number, -1 to quit: **2**
4
4
4
4
4
4
4
4
(и так далее…)

</sample-output>

Следующая программа по структуре похожа на пример с бесконечным циклом, но пользовательский опыт совсем другой. Здесь пользователь сможет продолжить только если введёт правильный PIN _1234_:

```python
while True:
    code = input("Please type in your PIN: ")
    if code == "1234":
        break
    print("Incorrect...try again")

print("Correct PIN entered!")
```

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!

</sample-output>

<in-browser-programming-exercise name="Продолжаем?" anchor="Shall we continue?" tmcname="part02-15_shall_we_continue">

Давайте сделаем программу по образцу выше. Она должна печатать сообщение `"hi"`, затем задавать вопрос `"Shall we continue?"` и повторять это до тех пор, пока пользователь не введёт `"no"`. После этого программа должна вывести `"okay then"` и завершиться. Посмотрите пример ниже.

<sample-output>

hi
Shall we continue? **yes**
hi
Shall we continue? **oui**
hi
Shall we continue? **jawohl**
hi
Shall we continue? **no**
okay then

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Проверка ввода" anchor="Input validation" tmcname="part02-16_input_validation">

Напишите программу, которая запрашивает у пользователя целые числа.

Если число меньше нуля, программа должна вывести сообщение `"Invalid number"`.

Если число больше нуля, программа должна вывести квадратный корень этого числа, используя функцию `sqrt` из Python.

В обоих случаях программа должна затем запросить следующее число.

Если пользователь вводит ноль, программа должна прекратить запросы и выйти из цикла.

Ниже — напоминание, как используется функция `sqrt`. Не забудьте импортировать её в начале программы.

```python
# функция sqrt не заработает без этой строки в начале программы
from math import sqrt

print(sqrt(9))
```

<sample-output>

3.0

</sample-output>

Пример ожидаемого поведения программы:

<sample-output>

Please type in a number: **16**
4.0
Please type in a number: **4**
2.0
Please type in a number: **-3**
Invalid number
Please type in a number: **1**
1.0
Please type in a number: **0**
Exiting...

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Исправьте код: Обратный отсчёт" anchor="Fix the code: Countdown" tmcname="part02-17_countdown">

Эта программа должна печатать обратный отсчёт. Код такой:

```python
number = 5
print("Countdown!")
while True:
  print(number)
  number = number - 1
  if number > 0:
    break

print("Now!")
```

Она должна вывести:

<sample-output>

Countdown!
5
4
3
2
1
Now!

</sample-output>

Однако программа работает неправильно. Пожалуйста, исправьте её.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Повтор пароля" anchor="Repeat password" tmcname="part02-18_repeat_password">

Напишите программу, которая запрашивает у пользователя пароль. Затем программа должна попросить ввести пароль ещё раз. Если пользователь вводит что-то отличное от первого пароля, программа должна продолжать спрашивать, пока пароль не будет введён правильно (то есть совпадёт с первым).

Посмотрите пример ожидаемого поведения:

<sample-output>

Password: **sekred**
Repeat password: **secret**
They do not match!
Repeat password: **cantremember**
They do not match!
Repeat password: **sekred**
User account created!

</sample-output>

</in-browser-programming-exercise>

## Циклы и вспомогательные переменные {#loops-and-helper-variables}

Сделаем пример с проверкой PIN-кода чуть реалистичнее. В этой версии пользователю даётся только три попытки.

Программа использует две вспомогательные переменные. Переменная `attempts` отслеживает, сколько раз пользователь вводил PIN-код. Переменная `success` принимает значение `True` или `False` в зависимости от того, удалось ли пользователю «войти».

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if code == "1234":
        success = True
        break

    if attempts == 3:
        success = False
        break

    # это печатается, если код введён неверно И попыток меньше трёх
    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!

</sample-output>

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **4321**
Too many attempts...

</sample-output>

Выход из цикла происходит _либо_ когда пользователь вводит правильный PIN, _либо_ когда попыток стало слишком много. Инструкция `if` после цикла проверяет значение `success` и выводит соответствующее сообщение.

## Отладочные сообщения в циклах {#debugging-print-statements-in-loops}

Добавление циклов в программу увеличивает количество потенциальных источников ошибок. Поэтому ещё важнее освоить отладочные сообщения с помощью `print`, о которых мы говорили в [первом разделе этой части](/ru/part-2/1-programming-terminology).

Рассмотрим программу, почти идентичную предыдущей, но с одним важным отличием:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if attempts == 3:
        success = False
        break

    if code == "1234":
        success = True
        break

    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```

Эта версия ведёт себя странно, если пользователь вводит правильный код с третьей попытки:

<sample-output>

Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Too many attempts...

</sample-output>

Попробуем найти причину, добавив внутри цикла несколько удачно расположенных отладочных сообщений `print`:

```python
while True:
    print("beginning of the while block:")
    code = input("Please type in your PIN: ")
    attempts += 1

    print("attempts:", attempts)
    print("condition1:", attempts == 3)
    if attempts == 3:
        success = False
        break

    print("code:", code)
    print("condition2:", code == "1234")
    if code == "1234":
        success = True
        break

    print("Incorrect...try again")
```

<sample-output>

beginning of the while block:
Please type in your PIN: **2233**
attempts: 1
condition1: False
code: 2233
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **4545**
attempts: 2
condition1: False
code: 4545
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **1234**
attempts: 3
condition1: True
Too many attempts...

</sample-output>

По выводу видно, что на третьей итерации цикла условие в первом `if` становится `True`, и цикл завершается. До второго `if`, который проверяет правильность кода, программа в третьей итерации уже не доходит:

```python
  while True:
    # ....

    # этот блок выполняется слишком рано
    if attempts == 3:
        success = False
        break

    # на третьей итерации выполнение сюда не доходит
    if code == "1234":
        success = True
        break
```

Порядок условных проверок (или порядок ветвей внутри условной конструкции) — частая причина ошибок, особенно в циклах. Отладочные сообщения `print` часто оказываются самым простым способом быстро найти источник проблемы.

<in-browser-programming-exercise name="PIN и количество попыток" anchor="PIN and number of attempts" tmcname="part02-19_pin_and_number_of_attempts">

Напишите программу, которая продолжает спрашивать PIN-код, пока пользователь не введёт правильный: _4321_. После этого программа должна вывести, сколько раз пользователь пытался вводить код.

<sample-output>

PIN: **3245**
Wrong
PIN: **1234**
Wrong
PIN: **0000**
Wrong
PIN: **4321**
Correct! It took you 4 attempts

</sample-output>

Если пользователь вводит правильный код с первой попытки, программа должна вывести немного другое сообщение:

<sample-output>

PIN: **4321**
Correct! It only took you one single attempt!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Следующий високосный год" anchor="The next leap year" tmcname="part02-20_next_leap_year">

Напишите программу, которая спрашивает у пользователя год и выводит следующий високосный год.

<sample-output>

Year: **2023**
The next leap year after 2023 is 2024

</sample-output>

Если пользователь вводит год, который сам является високосным (например, 2024), программа должна вывести следующий за ним високосный год:

<sample-output>

Year: **2024**
The next leap year after 2024 is 2028

</sample-output>

</in-browser-programming-exercise>

## Конкатенация строк с помощью оператора `+` {#concatenating-strings-with-the-operator}

В примере с проверкой PIN-кода выше использовалась вспомогательная переменная `attempts`, чтобы отслеживать, сколько раз пользователь пытался ввести код:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    # ...
```

Переменная задаётся равной нулю вне цикла, а на каждой итерации увеличивается на единицу.

Похожая идея «наращивания» работает и со строковыми переменными. Например, программа может собирать все PIN-коды, которые вводил пользователь:

```python

codes = ""
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    codes += code + ", "
    # ...
```

Вспомогательная переменная инициализируется _пустой строкой_, то есть строкой без символов:

```python
codes = ""
```

На каждой итерации строка становится длиннее: добавляется введённый код и запятая:

```python
    code = input("Please type in your PIN: ")
    codes += code + ", "
```

Если пользователь введёт коды _1111 2222 1234_, то в конце выполнения программы значение `codes` будет таким:

<sample-output>

1111, 2222, 1234,

</sample-output>


<in-browser-programming-exercise name="История" anchor="Story" tmcname="part02-21_story">

### Часть 1 {#part-1}

Напишите программу, которая продолжает запрашивать у пользователя слова. Если пользователь вводит `end`, программа должна вывести «историю», составленную из введённых слов, и завершиться.

<sample-output>

Please type in a word: **Once**
Please type in a word: **upon**
Please type in a word: **a**
Please type in a word: **time**
Please type in a word: **there**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **girl**
Please type in a word: **end**
Once upon a time there was a girl

</sample-output>

### Часть 2 {#part-2}

Измените программу так, чтобы цикл завершался также тогда, когда пользователь вводит одно и то же слово два раза подряд.

<sample-output>

Please type in a word: **It**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **dark**
Please type in a word: **and**
Please type in a word: **stormy**
Please type in a word: **night**
Please type in a word: **night**
It was a dark and stormy night

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Работа с числами" anchor="Working with numbers" tmcname="part02-22_working_with_numbers">

### Подготовка {#pre-task}

Напишите программу, которая запрашивает у пользователя целые числа. Программа должна продолжать спрашивать числа, пока пользователь не введёт ноль.

<sample-output>

Please type in integer numbers. Type in 0 to finish.
Number: **5**
Number: **22**
Number: **9**
Number: **-2**
Number: **0**

</sample-output>

### Часть 1: Количество {#part-1-count}

После ввода чисел программа должна вывести, сколько чисел было введено. Ноль в конце учитывать не нужно.

Здесь вам понадобится новая переменная, чтобы считать количество введённых чисел.

<sample-output>

... the program asks for numbers
Numbers typed in 4

</sample-output>

### Часть 2: Сумма {#part-2-sum}

Программа также должна вывести сумму всех введённых чисел. Ноль в конце в расчёт не включается.

Теперь программа должна выводить следующее:

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34

</sample-output>

### Часть 3: Среднее {#part-3-mean}

Программа также должна вывести среднее значение введённых чисел. Ноль в конце учитывать не нужно. Можно считать, что пользователь всегда вводит хотя бы одно корректное ненулевое число.

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5

</sample-output>

#### Часть 4: Положительные и отрицательные {#part-4-positives-and-negatives}

Программа также должна вывести статистику: сколько введено положительных и сколько отрицательных чисел. Ноль в конце учитывать не нужно.

<sample-output>

... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
Positive numbers 3
Negative numbers 1

</sample-output>

</in-browser-programming-exercise>

<!--

Тест для повторения материала этого раздела:

<quiz id="63a51999-e525-5f1d-a333-b26392a5585b"></quiz>

-->

Пожалуйста, ответьте на небольшой опрос по материалам этой недели.

<quiz id="5ab8aa39-8d52-5fb7-ac91-253bba93c84b"></quiz>
