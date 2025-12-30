---
path: /ru/part-4/4-definite-iteration
title: Счётные циклы
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете понимать разницу между счётной и несчётной итерацией (definite/indefinite iteration)
- вы узнаете, как работает цикл `for` в Python
- вы сможете использовать цикл `for` для перебора списков и строк

</text-box>

Цикл `while` можно использовать и для перебора элементов списка — так же, как мы перебирали символы строк. Следующая программа печатает элементы списка, каждый на отдельной строке:

```python
my_list = [3, 2, 4, 5, 2]

index = 0
while index < len(my_list):
    print(my_list[index])
    index += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

Это, конечно, работает, но способ довольно громоздкий: приходится использовать вспомогательную переменную `index`, чтобы помнить, на каком элементе списка вы находитесь. К счастью, в Python есть более интуитивный способ обхода списков, строк и других похожих структур.

## Цикл `for` {#the-for-loop}

Когда нужно пройти по готовой коллекции элементов, цикл `for` в Python сделает это за вас. Например, он может последовательно перебрать все элементы списка — от первого до последнего.

При использовании `while` программа заранее не «знает», сколько итераций выполнит цикл. Он повторяется, пока условие не станет ложным, либо пока выполнение не будет прервано другим способом. Поэтому такой подход относится к _неопределённой (несчётной) итерации_ (indefinite iteration). В `for` количество итераций определяется в момент создания цикла, поэтому это _определённая (счётная) итерация_ (definite iteration).

Идея в том, что цикл `for` берёт элементы коллекции один за другим и выполняет над каждым одни и те же действия. Программисту не нужно вручную следить, какой именно элемент обрабатывается сейчас. Синтаксис цикла `for` такой:

```python
for <variable> in <collection>:
    <block>
```

Цикл `for` берёт очередной элемент коллекции, присваивает его переменной, выполняет блок кода и переходит к следующему элементу. Когда все элементы обработаны, выполнение программы продолжается со строки после цикла.

<img src="4_4_1.png" alt="Перебор элементов списка">

Следующая программа печатает все элементы списка с помощью цикла `for`:

```python
my_list = [3, 2, 4, 5, 2]

for item in my_list:
    print(item)
```

<sample-output>

3
2
4
5
2

</sample-output>

По сравнению с примером в начале раздела структура стала намного понятнее. Цикл `for` делает прямой перебор элементов коллекции очень простым.

Тот же принцип работает и для символов строки:

```python
name = input("Please type in your name: ")

for character in name:
    print(character)
```

<sample-output>

Please type in your name: **Grace**
G
r
a
c
e

</sample-output>

<programming-exercise name='Со звёздочками' anchor="Star-studded" tmcname='part04-20_star_studded'>

Напишите программу, которая запрашивает у пользователя строку. Затем программа печатает каждый символ введённой строки на отдельной строке. После каждого символа на отдельной строке должна печататься звёздочка (`*`).

Вот как должно работать:

<sample-output>

Please type in a string: **Python**
P
*
y
*
t
*
h
*
o
*
n
*

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Функция `range` {#the-function-range}

Часто заранее известно, сколько раз нужно повторить некоторый фрагмент кода. Например, может понадобиться пройти по всем числам от 1 до 100. В паре с циклом `for` функция `range` легко решает такие задачи.

У `range` есть несколько вариантов вызова. Самый простой — передать один аргумент, обозначающий конец диапазона. Сам конечный пункт не включается — как и при срезах строк. То есть `range(n)` даёт последовательность от 0 до `n-1`:

```python
for i in range(5):
    print(i)
```

<sample-output>

0
1
2
3
4

</sample-output>

Если передать два аргумента, получится диапазон между двумя числами. Вызов `range(a, b)` даёт последовательность, начинающуюся с `a` и заканчивающуюся на `b-1`:

```python
for i in range(3, 7):
    print(i)
```

<sample-output>

3
4
5
6

</sample-output>

Наконец, третьим аргументом можно задать _шаг_ — то есть, на сколько меняется значение на каждой итерации. Вызов `range(a, b, c)` даёт последовательность, начинающуюся с `a`, заканчивающуюся на `b-1` и изменяющуюся на `c` на каждом шаге:

```python
for i in range(1, 9, 2):
    print(i)
```

<sample-output>

1
3
5
7

</sample-output>

Шаг может быть и отрицательным — тогда последовательность будет убывающей. Обратите внимание: в этом случае первые два аргумента тоже «переставляются местами»:

```python
for i in range(6, 2, -1):
    print(i)
```

<sample-output>

6
5
4
3

</sample-output>

<programming-exercise name='От отрицательного к положительному' anchor="From negative to positive" tmcname='part04-21_negative_to_positive'>

Напишите программу, которая запрашивает у пользователя положительное целое число N. Затем программа должна вывести все числа от -N до N включительно, но _пропустить число 0_. Каждое число печатается на отдельной строке.

Пример ожидаемого поведения:

<sample-output>

Please type in a positive integer: **4**
-4
-3
-2
-1
1
2
3
4

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Преобразование `range` в список {#from-a-range-to-a-list}

Функция `range` возвращает объект диапазона (range object). Он во многом ведёт себя как список, но на самом деле списком не является. Если попробовать вывести то, что возвращает `range`, вы увидите лишь описание объекта диапазона:

```python
numbers = range(2, 7)
print(numbers)
```

<sample-output>

range(2, 7)

</sample-output>

Функция `list` преобразует диапазон в настоящий список. В результате получится список всех значений из диапазона. Более подробно об этом вы узнаете в следующем курсе — Advanced Course in Programming.

```python
numbers = list(range(2, 7))
print(numbers)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

## Напоминание о требованиях автоматических тестов {#a-reminder-of-the-demands-of-the-automatic-tests}

До сих пор, когда в заданиях нужно было писать функции, шаблоны выглядели примерно так:

```python
# Напишите ваше решение здесь
# Вы можете протестировать функцию, вызвав её в блоке ниже
if __name__ == "__main__":
    sentence = "it was a dark and stormy python"
    print(first_word(sentence))
    print(second_word(sentence))
    print(last_word(sentence))
```

Начиная с этого момента в шаблонах больше не будет напоминаний про блок `if __name__ == "__main__"`. Однако автоматические тесты по‑прежнему рассчитывают на то, что при локальном тестировании вы будете использовать этот блок, поэтому добавляйте его сами, когда хотите вызывать свои функции из «главной» части программы.

**Важно:** некоторые упражнения (например, _Palindromes_ в этом разделе) требуют, чтобы вы написали и код, который вызывает созданную функцию. Такой код _нельзя_ помещать в блок `if __name__ == "__main__"`. Автоматические тесты не выполняют код внутри этого блока, и если вы разместите вызовы там, решение окажется неполным.

<programming-exercise name='Список звёздочек' anchor="List of stars" tmcname='part04-22_list_of_stars'>

Напишите функцию `list_of_stars`, которая принимает список целых чисел. Функция должна печатать строки из звёздочек. Числа в списке задают, сколько звёздочек должно быть в каждой строке.

Например, при вызове `list_of_stars([3, 7, 1, 1, 2])` должно быть выведено следующее:

<sample-output>

<pre>
***
*******
*
*
**
</pre>

</sample-output>

<!-- **Важно:** сейчас в Windows бывают проблемы с запуском тестов некоторых заданий. Если вы столкнётесь со следующим сообщением об ошибке:

<img src="4_3_2.png" alt="Listan iterointi">

Вы можете запустить тесты, отправив решение на сервер: откройте меню TMC (значок справа от кнопки запуска тестов) и выберите _Submit solutions_.

Проблему можно исправить, открыв настройки расширения и в разделе "TMC Data" изменив расположение заданий на другой путь, который короче. На изображении ниже для этого есть кнопка _change path_. Перенос может занять некоторое время — дождитесь завершения операции.

<img src="4_3_3.png" alt="Listan iterointi">

В ближайшие дни планируется более надёжное решение этой проблемы. -->

</programming-exercise>

<programming-exercise name='Анаграммы' anchor="Anagrams" tmcname='part04-23_anagrams'>

Напишите функцию `anagrams`, которая принимает две строки. Функция должна вернуть `True`, если строки являются анаграммами друг друга. Два слова — анаграммы, если они состоят ровно из одних и тех же символов.

Примеры того, как должна работать функция:

```python
print(anagrams("tame", "meta")) # True
print(anagrams("tame", "mate")) # True
print(anagrams("tame", "team")) # True
print(anagrams("tabby", "batty")) # False
print(anagrams("python", "java")) # False
```

Подсказка: функцию `sorted` можно применять и к строкам.

</programming-exercise>

<programming-exercise name='Палиндромы' anchor="Palindromes" tmcname='part04-24_palindromes'>

Напишите функцию `palindromes`, которая принимает строку и возвращает `True`, если строка является палиндромом. Палиндромы — это слова, которые читаются одинаково слева направо и справа налево.

Также напишите программу, которая запрашивает у пользователя слова до тех пор, пока он не введёт палиндром:

<sample-output>

Please type in a palindrome: **python**
that wasn't a palindrome
Please type in a palindrome: **java**
that wasn't a palindrome
Please type in a palindrome: **oddoreven**
that wasn't a palindrome
Please type in a palindrome: **neveroddoreven**
neveroddoreven is a palindrome!

</sample-output>

**Важно:** основной код программы **не должен** находиться внутри блока `if __name__ == "__main__":`

</programming-exercise>

<programming-exercise name='Сумма положительных чисел' anchor="The sum of positive numbers" tmcname='part04-25_sum_of_positives'>

Напишите функцию `sum_of_positives`, которая принимает список целых чисел и возвращает сумму положительных значений списка.

```python
my_list = [1, -2, 3, -4, 5]
result = sum_of_positives(my_list)
print("The result is", result)
```

<sample-output>

The result is 9

</sample-output>

</programming-exercise>

В следующих упражнениях мы будем использовать списки как аргументы и как возвращаемые значения. Если нужно освежить в памяти, это разбиралось в [предыдущем разделе](/ru/part-4/3-lists#a-list-as-an-argument-or-a-return-value).

<programming-exercise name='Чётные числа' anchor="Even numbers" tmcname='part04-26_even_numbers'>

Напишите функцию `even_numbers`, которая принимает список целых чисел. Функция должна вернуть новый список, содержащий только чётные числа из исходного списка.

```python
my_list = [1, 2, 3, 4, 5]
new_list = even_numbers(my_list)
print("original", my_list)
print("new", new_list)
```

<sample-output>

original [1, 2, 3, 4, 5]
new [2, 4]

</sample-output>

</programming-exercise>

<programming-exercise name='Сумма списков' anchor="The sum of lists" tmcname='part04-27_sum_of_lists'>

Напишите функцию `list_sum`, которая принимает два списка целых чисел. Функция должна вернуть новый список, где каждый элемент — это сумма элементов с тем же индексом из двух исходных списков. Можно считать, что списки имеют одинаковую длину.

Пример работы функции:

```python
a = [1, 2, 3]
b = [7, 8, 9]
print(list_sum(a, b)) # [8, 10, 12]
```

</programming-exercise>

<programming-exercise name='Уникальные числа' anchor="Distinct numbers" tmcname='part04-28_distinct_numbers'>

Напишите функцию `distinct_numbers`, которая принимает список целых чисел. Функция должна вернуть новый список, содержащий числа из исходного списка в порядке возрастания, причём каждое различное число должно присутствовать ровно один раз.

```python
my_list = [3, 2, 2, 1, 3, 3, 1]
print(distinct_numbers(my_list)) # [1, 2, 3]
```

</programming-exercise>

## Поиск «лучшего» или «худшего» элемента в списке {#finding-the-best-or-the-worst-item-in-a-list}

Очень распространённая задача — найти в списке «лучший» или «худший» элемент по некоторому критерию. Простой подход — использовать вспомогательную переменную, чтобы «запоминать», какой из уже обработанных элементов оказался самым подходящим. Затем этот временный лучший вариант по очереди сравнивается с каждым элементом, и в конце перебора в переменной остаётся лучший из всех.

Черновой набросок (он ещё не компилируется как код) выглядит так:

```python
best = initial_value # Начальное значение зависит от ситуации
for item in my_list:
    if item is better than best:
        best = item

# Теперь у нас есть лучший элемент!
```

Детали итогового решения зависят от типа элементов в списке и от критериев выбора «лучшего» (или «худшего») элемента. Иногда может понадобиться больше одной вспомогательной переменной.

Давайте немного потренируемся в этом подходе.

<programming-exercise name='Длина самой длинной строки' anchor="The length of the longest in the list" tmcname='part04-29_length_of_longest'>

Напишите функцию `length_of_longest`, которая принимает список строк и возвращает длину самой длинной строки.

```python
my_list = ["first", "second", "fourth", "eleventh"]

result = length_of_longest(my_list)
print(result)
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = length_of_longest(my_list)
print(result)
```

<sample-output>

8
7

</sample-output>

</programming-exercise>

<programming-exercise name='Самая короткая строка в списке' anchor="The shortest in the list" tmcname='part04-30_shortest_in_list'>

Напишите функцию `shortest`, которая принимает список строк и возвращает самую короткую строку. Если несколько строк одинаково короткие, можно вернуть любую из них (в тестах такой ситуации не будет). Можно считать, что пустых строк в списке нет.


```python
my_list = ["first", "second", "fourth", "eleventh"]

result = shortest(my_list)
print(result)
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = shortest(my_list)
print(result)
```

<sample-output>

first
tim

</sample-output>

</programming-exercise>

<programming-exercise name='Все самые длинные строки' anchor="All the longest in the list" tmcname='part04-31_all_longest_in_list'>

Напишите функцию `all_the_longest`, которая принимает список строк. Функция должна вернуть новый список, содержащий самую длинную строку из исходного списка. Если самых длинных строк несколько, нужно вернуть их все.

Порядок строк в возвращаемом списке должен совпадать с порядком в исходном списке.

```python
my_list = ["first", "second", "fourth", "eleventh"]

result = all_the_longest(my_list)
print(result) # ['eleventh']
```

```python
my_list = ["adele", "mark", "dorothy", "tim", "hedy", "richard"]

result = all_the_longest(my_list)
print(result) # ['dorothy', 'richard']
```

</programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="b1a91143-3137-5833-a771-6801f541a43b"></quiz>
-->
