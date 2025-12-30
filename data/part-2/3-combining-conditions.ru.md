---
path: /ru/part-2/3-combining-conditions
title: Комбинирование условий
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы научитесь использовать операторы `and`, `or` и `not` в условиях
- вы сможете писать вложенные условные конструкции

</text-box>

## Логические операторы {#logical-operators}

Условия можно объединять логическими операторами `and` и `or`. Оператор `and` означает, что все указанные условия должны быть истинны одновременно. Оператор `or` означает, что хотя бы одно из условий должно быть истинно.

Например, условие `number >= 5 and number <= 8` означает, что `number` одновременно не меньше 5 и не больше 8, то есть находится в диапазоне от 5 до 8.

```python
number = int(input("Please type in a number: "))
if number >= 5 and number <= 8:
    print("The number is between 5 and 8")
```

А условие `number < 5 or number > 8` означает, что `number` либо меньше 5, либо больше 8. То есть оно не должно попадать в диапазон от 5 до 8.

```python
number = int(input("Please type in a number: "))
if number < 5 or number > 8:
    print("The number is not within the range of 5 to 8")
```

Таблица истинности ниже показывает поведение этих операторов в разных случаях:

a     | b     | a and b | a or b |
:----:|:-----:|:-------:|:------:|
False | False | False   | False  |
True  | False | False   | True   |
False | True  | False   | True   |
True  | True  | True    | True   |

Иногда нужно проверить, что что-то _не_ является истинным. Оператор `not` инвертирует (отрицает) условие:

a     | not a
:----:|:----:
True  | False
False | True

Пример выше, но с _исключением_ диапазона 5–8, можно написать и так:

```python
number = int(input("Please type in a number: "))
if not (number >= 5 and number <= 8):
    print("The number is not within the range of 5 to 8")
```

В программировании логические операторы часто называют _булевыми операторами_ (Boolean operators).

<text-box variant='hint' name="Упрощённые комбинированные условия">

Условие `x >= a and x <= b` — очень распространённый способ проверить, попадает ли число `x` в диапазон от `a` до `b`. Выражение такой формы работает одинаково в большинстве языков программирования.

Python также позволяет использовать сокращённую запись: `a <= x <= b` даёт тот же результат, что и длинная версия с `and`. Эта запись может быть привычнее по математике, но в Python её используют не так часто — возможно потому, что в большинстве других языков такого сокращения нет.

</text-box>

## Объединение и «цепочки» условий {#combining-and-chaining-conditions}

Следующая программа просит пользователя ввести четыре числа. Затем, используя условия, она определяет, какое из них самое большое:

```python
n1 = int(input("Number 1: "))
n2 = int(input("Number 2: "))
n3 = int(input("Number 3: "))
n4 = int(input("Number 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    greatest = n1
elif n2 > n3 and n2 > n4:
    greatest = n2
elif n3 > n4:
    greatest = n3
else:
    greatest = n4

print(f" {greatest} is the greatest of the numbers.")
```

<sample-output>

Number 1: **2**
Number 2: **4**
Number 3: **1**
Number 4: **1**
4 is the greatest of the numbers.

</sample-output>

В этом примере первое условие `n1 > n2 and n1 > n3 and n1 > n4` истинно только если истинны все три сравнения внутри него.

<in-browser-programming-exercise name="Проверка возраста" anchor="Age check" tmcname="part02-08_age_check">

Напишите программу, которая спрашивает возраст пользователя. Если возраст неправдоподобен (например, меньше 5 лет или очевидно не может быть реальным человеческим возрастом), программа должна вывести соответствующий комментарий.

Посмотрите на примеры ниже и определите, какой комментарий нужно выводить в каждом случае.

<sample-output>

What is your age? **13**
Ok, you're 13 years old

</sample-output>

<sample-output>

What is your age? **2**
I suspect you can't write quite yet...

</sample-output>

<sample-output>

What is your age? **-4**
That must be a mistake

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Племянники" anchor="Nephews" tmcname="part02-09_nephews">

Напишите программу, которая спрашивает имя пользователя. Если имя — Huey, Dewey или Louie, программа должна распознать пользователя как одного из племянников Дональда Дака.

Аналогично, если имя — Morty или Ferdie, программа должна распознать пользователя как одного из племянников Микки Мауса.

Примеры:

<sample-output>

Please type in your name: **Morty**
I think you might be one of Mickey Mouse's nephews.

</sample-output>

<sample-output>

Please type in your name: **Huey**
I think you might be one of Donald Duck's nephews.

</sample-output>

<sample-output>

Please type in your name: **Ken**
You're not a nephew of any character I know of.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Оценки и баллы" anchor="Grades and points" tmcname="part02-10_grades_and_points">

В таблице ниже показаны границы оценок на одном университетском курсе. Напишите программу, которая спрашивает количество набранных баллов и печатает соответствующую оценку по таблице.

points   | grade
:--:|:----:
< 0 |  impossible!
0-49 | fail
50-59 | 1
60-69 | 2
70-79 | 3
80-89| 4
90-100 | 5
\> 100 |  impossible!

Примеры:

<sample-output>

How many points [0-100]: **37**
Grade: fail

</sample-output>

<sample-output>

How many points [0-100]: **76**
Grade: 3

</sample-output>

<sample-output>

How many points [0-100]: **-3**
Grade: impossible!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" anchor="FizzBuzz" tmcname="part02-11_fizzbuzz">

Напишите программу, которая спрашивает у пользователя целое число. Если число делится на 3, программа должна вывести Fizz. Если число делится на 5, программа должна вывести Buzz. Если число делится и на 3, и на 5, программа должна вывести FizzBuzz.

Примеры ожидаемого поведения:

<sample-output>

Number: **9**
Fizz

</sample-output>

<sample-output>

Number: **7**

</sample-output>

<sample-output>

Number: **20**
Buzz

</sample-output>

<sample-output>

Number: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Вложенные условные конструкции {#nested-conditionals}

Условные конструкции можно вкладывать друг в друга. Например, следующая программа сначала проверяет, больше ли число нуля, а затем определяет, чётное оно или нечётное:

```python
number = int(input("Please type in a number: "))

if number > 0:
    if number % 2 == 0:
        print("The number is even")
    else:
        print("The number is odd")
else:
    print("The number is negative or zero")
```

Примеры работы программы:

<sample-output>

Please type in a number: **3**
The number is odd

Please type in a number: **18**
The number is even

Please type in a number: **-4**
The number is negative or zero

</sample-output>

При вложенных условных конструкциях особенно важно правильно расставлять отступы. Отступы определяют, какие ветви связаны между собой. Например, ветви `if` и `else` с одинаковым отступом считаются ветвями одной и той же условной конструкции.

Один и тот же результат часто можно получить либо с помощью вложенных условий, либо с помощью объединения условий логическими операторами. Пример ниже функционально не отличается от предыдущего: при тех же входных данных он напечатает то же самое:

```python
number = int(input("Please type in a number: "))

if number > 0 and number % 2 == 0:
    print("The number is even")
elif number > 0 and number % 2 != 0:
    print("The number is odd")
else:
    print("The number is negative or zero")
```

Нельзя сказать, что какой-то из подходов «лучше» сам по себе: в разных задачах один может казаться логичнее другого. В этом примере большинству людей обычно проще воспринимать первый вариант с вложенностью.

<in-browser-programming-exercise name="Високосный год" anchor="Leap year" tmcname="part02-12_leap_year">

Обычно любой год, который делится на 4, является високосным. Однако если год дополнительно делится на 100, то он считается високосным только в том случае, если также делится на 400.

Напишите программу, которая спрашивает у пользователя год и затем печатает, является ли этот год високосным.

Примеры:

<sample-output>

Please type in a year: **2011**
That year is not a leap year.

</sample-output>

<sample-output>

Please type in a year: **2020**
That year is a leap year.

</sample-output>

<sample-output>

Please type in a year: **1800**
That year is not a leap year.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="По алфавиту в середине" anchor="Alphabetically in the middle" tmcname="part02-13_alphabetically_in_the_middle">

Напишите программу, которая запрашивает у пользователя три буквы. Затем программа должна вывести ту букву, которая оказалась бы «серединной», если расположить буквы в алфавитном порядке.

Можно считать, что буквы будут либо все в верхнем регистре, либо все в нижнем.

Примеры ожидаемого поведения:

<sample-output>

1st letter: x
2nd letter: c
3rd letter: p
The letter in the middle is p

</sample-output>

<sample-output>

1st letter: C
2nd letter: B
3rd letter: A
The letter in the middle is B

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Калькулятор налога на подарок" anchor="Gift tax calculator" tmcname="part02-14_gift_tax_calculator" height="500px">

Говорят, что уплата налогов делает финнов счастливыми — посмотрим, не скрывается ли секрет счастья в одном из налогов, описанных в финском налоговом законодательстве.

Согласно [финской налоговой службе](https://www.vero.fi/en/individuals/property/gifts/), подарок — это передача имущества другому человеку без компенсации или оплаты. Если суммарная стоимость подарков, полученных от одного и того же дарителя в течение 3 лет, составляет 5 000 евро или больше, необходимо заплатить налог на подарок.

Если подарок получен от близкого родственника или члена семьи, сумма налога определяется по следующей таблице (она также доступна на [этом сайте](https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/)):

Стоимость подарка | Налог на нижней границе | Ставка для превышающей части (%)
:------------:|:----------------------:|:-----------------------------------:
5 000 — 25 000 |        100     |       8
25 000 — 55 000	|       1 700   |	10
55 000 — 200 000 |      4 700	|       12
200 000 — 1 000 000 |   22 100  |	15
1 000 000 —	|       142 100 |	17

Так, для подарка на 6 000 евро получатель платит налог 180 евро (100 + (6 000 - 5 000) * 0.08). Аналогично, для подарка на 75 000 евро налог составит 7 100 евро (4 700 + (75 000 - 55 000) * 0.12).

Напишите программу, которая вычисляет правильную сумму налога для подарка от близкого родственника. Посмотрите примеры ниже, чтобы понять, какой вывод ожидается. Обратите внимание: во входных значениях нет разделителей тысяч — можно считать, что в числах не будет пробелов или других разделителей, так как мы ещё не проходили обработку таких форматов.

<sample-output>

Value of gift: **3500**
No tax!

</sample-output>

<sample-output>

Value of gift: **5000**
Amount of tax: 100.0 euros

</sample-output>

<sample-output>

Value of gift: **27500**
Amount of tax: 1950.0 euros

</sample-output>

</in-browser-programming-exercise>

<!--

Тест для повторения материала этого раздела:

<quiz id="6bfd7e0d-2998-5697-80dc-418703fabbbf"></quiz>

-->
