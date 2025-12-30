---
path: "/ru/part-1/5-conditional-statements"
title: "Условные операторы"
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете использовать простую условную конструкцию в программах
- вы узнаете, что такое булево значение (Boolean)
- вы сможете записывать условия с помощью операторов сравнения

</text-box>

До этого момента каждая программа, которую мы писали, выполнялась построчно — строка за строкой. Но часто полезно делать так, чтобы некоторые части программы выполнялись только при выполнении определённых условий.

Например, следующий код проверяет, достиг ли пользователь совершеннолетия:

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

Если пользователю больше 17 лет, выполнение программы будет выглядеть так:

<sample-output>

How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!

</sample-output>

Если пользователю 17 лет или меньше, будет напечатано только:

<sample-output>

How old are you? **16**
Next customer, please!

</sample-output>

Эти примеры показывают, что введённое значение влияет на то, какие части программы выполняются. Программа содержит _условную конструкцию_ (conditional statement) с блоком кода, который выполняется только если условие истинно.

<img src="1_5_1.png">

В условной конструкции ключевое слово `if` сопровождается _условием_ — например, сравнением двух значений. Блок кода после строки `if ...:` выполняется только если условие истинно.

Обратите внимание на двоеточие в конце строки `if`. В следующем коде двоеточия нет:

```python
age = 10

# нет двоеточия в конце следующей строки
if age > 17
    print("You are of age.")
```

При запуске это приводит к ошибке:

<sample-output>
<pre>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</pre>
</sample-output>

## Операторы сравнения {#comparison-operators}

Чаще всего условие — это сравнение двух значений. В таблице ниже приведены самые распространённые операторы сравнения в Python:

| Оператор | Назначение        | Пример  |
|:--------:|-------------------|----------|
| `==`     | Равно             | `a == b` |
| `!=`     | Не равно          | `a != b` |
| `>`      | Больше            | `a > b`  |
| `>=`     | Больше или равно  | `a >= b` |
| `<`      | Меньше            | `a < b`  |
| `<=`     | Меньше или равно  | `a <= b` |

Рассмотрим программу, которая печатает разные сообщения в зависимости от того, отрицательное число ввёл пользователь, положительное, или ноль:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

Три примера работы программы с разными вводами:

<sample-output>

Please type in a number: **15**
The number is positive.

</sample-output>

<sample-output>

Please type in a number: **-18**
The number is negative.

</sample-output>

<sample-output>

Please type in a number: **0**
The number is zero.

</sample-output>

## Отступы (indentation) {#indentation}

Python понимает, что строка относится к блоку внутри `if`, если все строки в этом блоке имеют одинаковый _отступ_. То есть в начале каждой строки внутри блока должно быть некоторое количество пробелов (или табуляция), и оно должно быть одинаковым для всех строк блока.

Например:

````python
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
````

Клавиша Tab (табуляция) добавляет отступ.

<img src="1_5_keyboard.png">

Многие редакторы автоматически добавляют отступ на следующей строке, если нажать Enter после двоеточия. Когда нужно закончить блок с отступом, можно нажать `Backspace`, чтобы вернуться к началу строки.

<img src="1_5_keyboard2.png">
<small><center>
Источник изображений клавиатуры:
 <a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> на <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a>
</center></small>

<in-browser-programming-exercise name="Оруэлл" anchor="Orwell" tmcname="part01-21_orwell">

Напишите программу, которая спрашивает у пользователя целое число. Если число ровно 1984, программа должна вывести `Orwell`. В противном случае программа ничего не выводит.

<sample-output>

Please type in a number: **2020**

</sample-output>

<sample-output>

Please type in a number: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Модуль числа" anchor="Absolute value" tmcname="part01-22_absolute_value">

Напишите программу, которая спрашивает у пользователя целое число. Если число меньше нуля, программа должна вывести число, умноженное на -1. Иначе программа выводит число как есть. Посмотрите примеры ожидаемого поведения ниже.

<sample-output>

Please type in a number: **-7**
The absolute value of this number is 7

</sample-output>

<sample-output>

Please type in a number: **1**
The absolute value of this number is 1

</sample-output>

<sample-output>

Please type in a number: **-99**
The absolute value of this number is 99

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Суп или без супа" anchor="Soup or no soup" tmcname="part01-23_soup_or_no_soup">

Напишите программу, которая спрашивает имя пользователя. Если имя — что угодно, кроме `"Jerry"`, программа затем спрашивает количество порций супа и печатает общую стоимость. Цена одной порции — 5.90.

Два примера выполнения:

<sample-output>

Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!

</sample-output>

<sample-output>

Please tell me your name: **Jerry**
Next please!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Порядок величины" anchor="Order of magnitude" tmcname="part01-24_order_of_magnitude">

Напишите программу, которая спрашивает у пользователя целое число. Затем программа должна печатать «порядок величины» числа согласно примерам ниже.

<sample-output>

Please type in a number: **950**
This number is smaller than 1000
Thank you!

</sample-output>

<sample-output>

Please type in a number: **59**
This number is smaller than 1000
This number is smaller than 100
Thank you!

</sample-output>

<sample-output>

Please type in a number: **2**
This number is smaller than 1000
This number is smaller than 100
This number is smaller than 10
Thank you!

</sample-output>

<sample-output>

Please type in a number: **1123**
Thank you!

</sample-output>

</in-browser-programming-exercise>

## Булевы значения и булевы выражения {#boolean-values-and-boolean-expressions}

Любое условие в условной конструкции даёт логическое значение — либо истина, либо ложь. Например, условие `a < 5` истинно, если `a` меньше 5, и ложно, если `a` больше или равно 5.

Такие значения часто называют _булевыми_ (Boolean) — в честь английского математика Джорджа Буля (George Boole). В Python для них используется тип данных `bool`. Переменная типа `bool` может иметь только два значения: `True` или `False`.

Любой фрагмент кода, результатом которого является булево значение, называется _булевым выражением_ (Boolean expression). Например, условие в `if` всегда является булевым выражением, и слова «условие» и «булево выражение» часто используются как синонимы.

Результат булевого выражения можно сохранить в переменную так же, как результат любого числового вычисления:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a is less than 5")
```

<sample-output>

True
a is less than 5

</sample-output>

Ключевые слова Python `True` и `False` можно использовать и напрямую. В следующем примере `print` выполняется каждый раз, потому что условие равно `True`:

```python
condition = True
if condition:
    print("This is printed every time.")
```

<sample-output>

This is printed every time.

</sample-output>

Такая программа не слишком полезна, но позже по ходу курса вы увидите примеры, где булевы переменные оказываются очень удобными.

<in-browser-programming-exercise name="Калькулятор" anchor="Calculator" tmcname="part01-25_calculator">

Напишите программу, которая спрашивает у пользователя два числа и операцию. Если операция — _add_, _multiply_ или _subtract_, программа должна вычислить и вывести результат соответствующей операции для введённых чисел. Если пользователь вводит что-то другое, программа не должна выводить ничего.

Несколько примеров ожидаемого поведения:

<sample-output>

Number 1: **10**
Number 2: **17**
Operation: **add**

10 + 17 = 27

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **multiply**

4 * 6 = 24

</sample-output>

<sample-output>

Number 1: **4**
Number 2: **6**
Operation: **subtract**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Температуры" anchor="Temperatures" tmcname="part01-26_temperatures">

Напишите программу, которая спрашивает температуру в градусах Фаренгейта, а затем печатает ту же температуру в градусах Цельсия. Если переведённая температура ниже нуля градусов Цельсия, программа должна также вывести `Brr! It's cold in here!`.

Формулу перевода из градусов Фаренгейта в градусы Цельсия легко найти в любом поисковике.

Два примера ожидаемого поведения:

<sample-output>

Please type in a temperature (F): **101**
101 degrees Fahrenheit equals 38.333333333333336 degrees Celsius

Please type in a temperature (F): **21**
21 degrees Fahrenheit equals -6.111111111111111 degrees Celsius
Brr! It's cold in here!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Заработок за день" anchor="Daily wages" tmcname="part01-27_daily_wages">

Напишите программу, которая спрашивает почасовую оплату, количество отработанных часов и день недели. Затем программа должна вывести заработок за день: почасовая ставка, умноженная на количество часов. По воскресеньям (`Sunday`) почасовая ставка удваивается.

<sample-output>

Hourly wage: **8.5**
Hours worked: **3**
Day of the week: **Monday**
Daily wages: 25.5 euros

</sample-output>

<sample-output>

Hourly wage: **12.5**
Hours worked: **10**
Day of the week: **Sunday**
Daily wages: 250.0 euros

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Бонус за лояльность" anchor="Loyalty bonus" tmcname="part01-28_loyalty_bonus">

Эта программа вычисляет годовой бонус, который клиент получает на карту лояльности. Бонус рассчитывается по формуле:

* Если на карте меньше ста баллов, бонус — 10 %
* Во всех остальных случаях бонус — 15 %

Программа должна работать так:

<sample-output>

How many points are on your card? **55**
Your bonus is 10 %
You now have 60.5 points

</sample-output>

Но в программе есть проблема, и при некоторых вводах она работает неправильно:

<sample-output>

How many points are on your card? **95**
Your bonus is 10 %
Your bonus is 15 %
You now have 120.175 points

</sample-output>

Исправьте программу так, чтобы бонус всегда был либо 10 %, либо 15 %, но никогда оба одновременно.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Что надеть завтра" anchor="What to wear tomorrow" tmcname="part01-29_what_to_wear_tomorrow">

Напишите программу, которая спрашивает прогноз погоды на завтра и предлагает подходящую одежду.

Совет должен меняться, если температура (в градусах Цельсия) выше 20, 10 или 5 градусов, а также если ожидается дождь.

Несколько примеров ожидаемого поведения:

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **21**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **11**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **7**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you

</sample-output>

<sample-output>

What is the weather forecast for tomorrow?
Temperature: **3**
Will it rain (yes/no): **yes**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
Make it a warm coat, actually
I think gloves are in order
Don't forget your umbrella!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Решение квадратного уравнения" anchor="Solving a quadratic equation" tmcname="part01-30_quadratic_formula">

В модуле Python `math` есть функция `sqrt`, которая вычисляет квадратный корень числа. Её можно использовать так:

```python
from math import sqrt

print(sqrt(9))
```

Это должно вывести:

<sample-output>

3.0

</sample-output>

К понятию _модуля_ и оператору `import` мы вернёмся позже. Сейчас достаточно понимать, что строка `from math import sqrt` позволяет использовать функцию `sqrt` в программе.

Напишите программу для решения квадратного уравнения вида ax² + bx + c. Программа спрашивает значения `a`, `b` и `c`, а затем использует формулу корней квадратного уравнения. Формула, записанная через `sqrt`, выглядит так:

x = (-b ± sqrt(b²-4ac))/(2a).

Можно считать, что уравнение всегда имеет два действительных корня, так что формула всегда сработает.

Пример ожидаемого поведения:

<sample-output>

Value of a: **1**
Value of b: **2**
Value of c: **-8**

The roots are 2.0 and -4.0

</sample-output>

</in-browser-programming-exercise>


<!--

Тест для повторения материала этого раздела:

<quiz id="bc7e500f-a91e-5709-8ae6-34637ff01737"></quiz>

-->

Пожалуйста, ответьте на небольшую анкету по материалам этой недели. Анкета даёт один балл за упражнение.

<quiz id="9ee2113a-a265-5bd2-9609-1f9c2298fe02"></quiz>
