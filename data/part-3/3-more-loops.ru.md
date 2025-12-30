---
path: /ru/part-3/3-more-loops
title: Ещё о циклах
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете понимать, когда нужна команда `break`, чтобы выйти из цикла
- вы сможете использовать команду `continue`, чтобы перейти к следующей итерации
- вы поймёте, как работают вложенные циклы

</text-box>

## Команда `break` {#the-break-command}

С командой `break` вы уже встречались. Её можно использовать, чтобы немедленно остановить выполнение цикла. Типичный случай применения — когда программа запрашивает ввод пользователя и должна завершить работу только после получения определённого значения.

Того же поведения можно добиться и без `break`, если подобрать подходящее условие. Две программы ниже обе просят пользователя вводить числа и считают их сумму до тех пор, пока пользователь не введёт -1.

```python
# Вариант 1: с использованием команды break

sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number

print (f"The sum is {sum}")
```

```python
# Вариант 2: без использования команды break

sum = 0
number = 0

while number != -1:
    number = int(input("Please type in a number, -1 to exit: "))
    if number != -1:
        sum += number

print (f"The sum is {sum}")
```

Обе программы при одинаковом вводе печатают одно и то же, например:

<sample-output>

Please type in a number, -1 to exit: **2**
Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **3**
Please type in a number, -1 to exit: **-1**
The sum is 14

</sample-output>

Таким образом, программы практически идентичны по поведению. Однако первый способ часто проще: условие `number == -1` встречается только один раз, и переменную `number` не нужно инициализировать вне цикла.

Команду `break` и подходящее условие можно использовать вместе в одном цикле `while`. Например, следующий цикл повторяется, пока сумма чисел не превышает 100, но также останавливается, если пользователь вводит -1.

```python
sum = 0

while sum <= 100:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number

print (f"The sum is {sum}")
```

Примеры выполнения программы:

<sample-output>

Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **-1**
The sum is 44

</sample-output>

<sample-output>

Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **45**
Please type in a number, -1 to exit: **17**
The sum is 106

</sample-output>

В первом примере цикл останавливается, потому что пользователь ввёл -1. Во втором — потому что сумма чисел превысила 100.

Как обычно в программировании, к одному и тому же результату можно прийти разными способами. Следующая программа функционально эквивалентна предыдущей:

```python
sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    sum += number
    if sum > 100:
        break

print (f"The sum is {sum}")
```
## Команда `continue` {#the-continue-command}

Ещё один способ изменить ход выполнения цикла — команда `continue`. Она заставляет выполнение цикла сразу перейти к началу, где проверяется условие, после чего выполнение продолжается как обычно — с проверки условия:

<img src="3_3_1.png">

Например, следующая программа суммирует введённые числа, но учитывает только числа меньше 10. Если число равно 10 или больше, выполнение прыгает в начало цикла, и число не добавляется к сумме.

```python
sum = 0

while True:
    number = int(input("Please type in a number, -1 to exit: "))
    if number == -1:
        break
    if number >= 10:
        continue
    sum += number

print (f"The sum is {sum}")
```

<sample-output>

Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **7**
Please type in a number, -1 to exit: **99**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **-1**
The sum is 16

</sample-output>

## Вложенные циклы {#nested-loops}

Как и конструкции `if`, циклы можно вкладывать друг в друга. Например, следующая программа с помощью внешнего цикла запрашивает у пользователя числа. Затем внутренний цикл печатает обратный отсчёт от введённого числа до 1:

```python
while True:
    number = int(input("Please type in a number: "))
    if number == -1:
        break
    while number > 0:
        print(number)
        number -= 1
```

<sample-output>

Please type in a number: **4**
4
3
2
1
Please type in a number: **3**
3
2
1
Please type in a number: **6**
6
5
4
3
2
1
Please type in a number: **-1**

</sample-output>

Когда циклы вложены, команды `break` и `continue` влияют только на самый внутренний цикл, частью которого они являются. Предыдущий пример можно записать и так:

```python
while True:
    number = int(input("Please type in a number: "))
    if number == -1:
        break
    while True:
        if number <= 0:
            break
        print(number)
        number -= 1
```

Здесь второй `break` останавливает только внутренний цикл, который печатает числа.

## Ещё о вспомогательных переменных в циклах {#more-helper-variables-with-loops}

Мы уже много раз использовали вспомогательные переменные, которые увеличиваются или уменьшаются на каждой итерации цикла, поэтому структура следующей программы должна быть знакомой. Программа печатает все чётные числа, начиная с нуля, пока не достигнет границы, заданной пользователем:

```python
limit = int(input("Please type in a number: "))
i = 0
while i < limit:
    print(i)
    i += 2
```

<sample-output>

Please type in a number: **8**
0
2
4
6

</sample-output>

Вспомогательная переменная `i` задаётся равной 0 до начала цикла и увеличивается на 2 на каждой итерации.

При вложенных циклах иногда нужна отдельная вспомогательная переменная для внутреннего цикла. Программа ниже печатает «числовую пирамиду» на основе числа, введённого пользователем:

```python
number = int(input("Please type in a number: "))
while number > 0:
    i = 0
    while i < number:
        print(f"{i} ", end="")
        i += 1
    print()
    number -= 1
```

<sample-output>

Please type in a number: **5**
0 1 2 3 4
0 1 2 3
0 1 2
0 1
0

</sample-output>

В этой программе внешний цикл использует переменную `number`, которая уменьшается на 1 на каждой итерации, пока не станет равной 0. Переменная `i` устанавливается в 0 прямо перед входом во внутренний цикл — на каждой итерации внешнего цикла.

Внутренний цикл использует переменную `i`, которая увеличивается на 1 на каждой итерации внутреннего цикла. Внутренний цикл повторяется, пока `i` не станет равной `number`, и печатает каждое значение `i` в одной строке, разделяя значения пробелом. Когда внутренний цикл заканчивается, команда `print` во внешнем цикле переходит на новую строку.

Теперь вспомните, что на каждой итерации внешнего цикла значение `number` уменьшается, значит, и количество повторений внутреннего цикла тоже уменьшается. С каждой итерацией строка чисел становится короче — так и получается форма пирамиды.

Вложенные циклы быстро начинают путать, но понимать их работу очень важно. Вам может помочь [визуализатор](http://www.pythontutor.com/visualize.html#mode=edit) Python Tutor. Скопируйте код выше в окно инструмента и проследите, как формируется вывод и как меняются значения вспомогательных переменных по мере выполнения.

<in-browser-programming-exercise name="Умножение" anchor="Multiplication" tmcname="part03-23_multiplication">

Напишите программу, которая запрашивает у пользователя положительное целое число. Затем программа должна вывести список операций умножения, пока оба множителя не достигнут введённого числа. Смотрите примеры ниже:

<sample-output>

Please type in a number: 2
1 x 1 = 1
1 x 2 = 2
2 x 1 = 2
2 x 2 = 4

</sample-output>

<sample-output>

Please type in a number: 3
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Первые буквы слов" anchor="First letters of words" tmcname="part03-24_first_letters_of_words">

Напишите программу, которая спрашивает у пользователя предложение. Затем программа должна вывести первую букву каждого слова в предложении, каждую букву — на отдельной строке.

Пример ожидаемого поведения:

<sample-output>

Please type in a sentence: **Humpty Dumpty sat on a wall**
H
D
s
o
a
w

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Factorial" anchor="Factorial" tmcname="part03-25_factorial">

Напишите программу, которая спрашивает у пользователя целое число. Если пользователь вводит число меньше или равное 0, выполнение завершается. Иначе программа должна вывести факториал числа.

Факториал числа — это произведение всех положительных целых чисел, меньших или равных этому числу. Например, факториал 5 равен 1 * 2 * 3 * 4 * 5 = 120.

Примеры ожидаемого поведения:

<sample-output>

Please type in a number: **3**
The factorial of the number 3 is 6
Please type in a number: **4**
The factorial of the number 4 is 24
Please type in a number: **-1**
Thanks and bye!

</sample-output>

<sample-output>

Please type in a number: **1**
The factorial of the number 1 is 1
Please type in a number: **0**
Thanks and bye!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Поменять пары местами" anchor="Flip the pairs" tmcname="part03-26_flip_the_pairs">

Напишите программу, которая спрашивает у пользователя число и затем выводит все положительные целые числа от 1 до введённого числа. Однако порядок нужно изменить так, чтобы каждая пара чисел была «перевёрнута»: 2 идёт перед 1, 4 — перед 3 и так далее. Смотрите примеры ниже.

<sample-output>

Please type in a number: **5**
2
1
4
3
5

</sample-output>

<sample-output>

Please type in a number: **6**
2
1
4
3
6
5

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="По очереди" anchor="Taking turns" tmcname="part03-27_taking_turns">

Напишите программу, которая спрашивает у пользователя число, а затем выводит положительные целые числа от 1 до этого числа, чередуя значения с двух концов диапазона, как в примерах ниже.

<sample-output>

Please type in a number: **5**
1
5
2
4
3

</sample-output>

<sample-output>

Please type in a number: **6**
1
6
2
5
3
4

</sample-output>

</in-browser-programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="b1118ae8-8dd4-563a-b6a5-0c274136535c"></quiz>
-->
