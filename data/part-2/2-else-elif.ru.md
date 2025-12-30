---
path: /ru/part-2/2-else-elif
title: Ещё об условных конструкциях
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы научитесь создавать несколько ветвей в условных конструкциях
- вы поймёте назначение `if`, `elif` и `else` в условной конструкции
- вы сможете использовать операцию остатка от деления `%` в булевых выражениях

</text-box>

Рассмотрим программу, которая просит пользователя ввести число и печатает разные сообщения в зависимости от того, отрицательное оно, положительное или равно нулю:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")

if number >= 0:
    print("The number is positive or zero")
```

Это выглядит немного громоздко и повторяется. Нам нужно выполнить только один из блоков `if`, потому что введённое число всегда либо меньше нуля, либо равно нулю или больше. То есть истинно либо `number < 0`, либо `number >= 0`, но не оба одновременно. Значит, первой условной конструкции здесь вполне достаточно: если условие истинно — число отрицательное, иначе — число равно нулю или положительное.

Вместо того чтобы писать вторую условную конструкцию, как в примере выше, можно добавить ещё одну ветвь к той же конструкции, чтобы покрыть все случаи, _когда условие ложно_. Это ветвь `else`.

Тот же пример, переписанный:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")
else:
    print("The number is positive or zero")
```

В конструкции if-else всегда выполняется ровно одна из ветвей. Структура показана на рисунке:

<img src="2_2_1.png">

Примечание: ветви `else` не бывает без предшествующей ветви `if`. Вся конструкция if-else образует одну _условную конструкцию_.

Следующий пример проверяет, является ли введённое пользователем число чётным. Чётность можно проверить с помощью оператора остатка от деления `%`, который возвращает остаток от целочисленного деления. При делении на два, если остаток равен нулю, число чётное. Иначе — нечётное.

```python
number = int(input("Please type in a number: "))

if number % 2 == 0:
    print("The number is even")
else:
    print("The number is odd")
```

<sample-output>

Please type in a number: **5**
The number is odd

</sample-output>

Ещё один пример — сравнение строк:

```python
correct = "kittycat"
password = input("Please type in the password: ")

if password == correct:
    print("Welcome")
else:
    print("No admittance")
```

При двух разных вводах программа должна вывести:

<sample-output>

Please type in the password: **kittycat**
Welcome

</sample-output>

<sample-output>

Please type in the password: **monkey**
No admittance

</sample-output>


<in-browser-programming-exercise name="Возраст совершеннолетия" anchor="Age of maturity" tmcname="part02-04_age_of_maturity" height="400px">

Напишите программу, которая спрашивает возраст пользователя. Затем программа должна напечатать сообщение в зависимости от того, является ли пользователь совершеннолетним, считая 18 лет возрастом совершеннолетия.

Примеры ожидаемого поведения:

<sample-output>

How old are you? **12**
You are not of age!

</sample-output>


<sample-output>

How old are you? **32**
You are of age!

</sample-output>

</in-browser-programming-exercise>

## Альтернативные ветви с помощью `elif` {#alternative-branches-using-the-elif-statement}

Часто вариантов бывает больше двух. Например, исход футбольного матча может быть трёх типов: победа хозяев, победа гостей или ничья.

К условной конструкции можно добавить ветвь `elif`. Это сокращение от `else if` — «иначе если», то есть ветвь содержит альтернативное условие. Важно, что `elif` выполняется только если не выполнилась ни одна из предыдущих ветвей.

<img src="2_2_2.png">

Рассмотрим программу, определяющую победителя матча:

```python
goals_home = int(input("Home goals scored: "))
goals_away = int(input("Away goals scored: "))

if goals_home > goals_away:
    print("The home team won!")
elif goals_away > goals_home:
    print("The away team won!")
else:
    print("It's a tie!")
```

В зависимости от ввода программа может вывести одно из трёх сообщений:

<sample-output>

Home goals scored: **4**
Away goals scored: **2**
The home team won!

</sample-output>

<sample-output>

Home goals scored: **0**
Away goals scored: **6**
The away team won!

</sample-output>

<sample-output>

Home goals scored: **3**
Away goals scored: **3**
It's a tie!

</sample-output>

В примере выше есть три альтернативные ветви, и всегда выполняется ровно одна из них. При этом число ветвей `elif` не ограничено, а ветвь `else` не обязательна.

Вот ещё один корректный пример условной конструкции:

```python
print("Holiday calendar")
date = input("What is the date today? ")

if date == "Dec 26":
    print("It's Boxing Day")
elif date == "Dec 31":
    print("It's Hogmanay")
elif date == "Jan 1":
    print("It's New Year's Day")

print("Thanks and bye.")
```

<sample-output>

Holiday calendar
What is the date today? **Dec 31**
It's Hogmanay
Thanks and bye.

</sample-output>

Обратите внимание: в предыдущем примере нет ветви `else`. Если пользователь введёт дату, которой нет ни в одной из ветвей `if`/`elif`, или введёт дату в другом формате, то не выполнится ни одна из трёх ветвей условной конструкции.

<sample-output>

Holiday calendar
What is the date today? **Dec 25**
Thanks and bye.

</sample-output>

<in-browser-programming-exercise name="Больше или равно" anchor="Greater than or equal to" tmcname="part02-05_greater_or_equal" height="400px">

Напишите программу, которая запрашивает два целых числа. Затем программа должна вывести большее из них. Если числа равны, программа должна вывести другое сообщение.

Примеры ожидаемого поведения:

<sample-output>

Please type in the first number: **5**
Please type in another number: **3**
The greater number was: 5

</sample-output>

<sample-output>

Please type in the first number: **5**
Please type in another number: **8**
The greater number was: 8

</sample-output>

<sample-output>

Please type in the first number: **5**
Please type in another number: **5**
The numbers are equal!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Кто старше" anchor="The elder" tmcname="part02-06_elder" height="550px">

Напишите программу, которая спрашивает имена и возраст двух людей. Затем программа должна вывести имя того, кто старше.

Примеры ожидаемого поведения:

<sample-output>

Person 1:
Name: **Alan**
Age: **26**
Person 2:
Name: **Ada**
Age: **27**
The elder is Ada

</sample-output>

<sample-output>

Person 1:
Name: **Bill**
Age: **1**
Person 2:
Name: **Jean**
Age: **1**
Bill and Jean are the same age

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Последнее по алфавиту" anchor="Alphabetically last" tmcname="part02-07_alphabetically_last" height="500px">

Операторы сравнения Python можно применять и к строкам. Строка `a` меньше строки `b`, если в алфавитном порядке она идёт раньше `b`. Однако сравнение будет надёжным только если:
- сравниваемые символы в одном регистре, то есть оба слова в ВЕРХНЕМ регистре или оба в нижнем
- используется только стандартный английский алфавит от a до z (или от A до Z).

Напишите программу, которая запрашивает у пользователя два слова. Затем программа должна вывести то из них, которое идёт позже по алфавиту.

Можно считать, что все слова вводятся полностью в нижнем регистре.

Примеры ожидаемого поведения:

<sample-output>

Please type in the 1st word: **car**
Please type in the 2nd word: **scooter**
scooter comes alphabetically last.

</sample-output>

<sample-output>

Please type in the 1st word: **zorro**
Please type in the 2nd word: **batman**
zorro comes alphabetically last.

</sample-output>

<sample-output>

Please type in the 1st word: **python**
Please type in the 2nd word: **python**
You gave the same word twice.

</sample-output>

</in-browser-programming-exercise>

<!--

Тест для повторения материала этого раздела:

<quiz id="82f644fe-5d89-5153-842a-11d5d11bc059"></quiz>

-->
