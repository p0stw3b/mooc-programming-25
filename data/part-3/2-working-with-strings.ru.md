---
path: /ru/part-3/2-working-with-strings
title: Работа со строками
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете использовать операторы `+` и `*` со строками
- вы будете знать, как определить длину строки
- вы будете понимать, что такое индексирование строк
- вы научитесь искать подстроки внутри строки

</text-box>

## Операции со строками {#string-operations}

Строки можно объединять, или _конкатенировать_, с помощью оператора `+`:

```python
begin = "ex"
end = "ample"
word = begin+end
print(word)
```

<sample-output>

example

</sample-output>

Оператор `*` тоже можно использовать со строкой, если второй операнд — целое число. Тогда строка повторяется столько раз, сколько указано числом. Например, так:

```python
word = "banana"
print(word*3)
```

<sample-output>

bananabananabanana

</sample-output>

Используя строковые операции вместе с циклом, можно написать программу, которая рисует «пирамиду»:

```python
n = 10 # количество уровней в пирамиде
row = "*"

while n > 0:
    print(" " * n + row)
    row += "**"
    n -= 1
```

Она печатает следующее:

```x
          *
         ***
        *****
       *******
      *********
     ***********
    *************
   ***************
  *****************
 *******************
```

Команда `print` внутри цикла печатает строку, которая начинается с `n` пробелов, а затем содержит то, что хранится в переменной `row`. После этого к `row` добавляются две звёздочки, а значение `n` уменьшается на 1.

<in-browser-programming-exercise name="Умножение строки" anchor="String multiplied" tmcname="part03-08_string_multiplied">

Напишите программу, которая спрашивает у пользователя строку и количество. Затем программа должна вывести строку столько раз, сколько указано числом. Всё должно быть напечатано в одной строке, без лишних пробелов или символов.

Пример ожидаемого поведения:

<sample-output>

Please type in a string: **hiya**
Please type in an amount: **4**
hiyahiyahiyahiya

</sample-output>

</in-browser-programming-exercise>

## Длина строки и индексы {#the-length-and-index-of-a-string}

Функция `len` возвращает количество символов в строке — это всегда целое число. Например, `len("hey")` возвращает 3, потому что в строке `hey` три символа.

Следующая программа просит пользователя ввести строку, а затем печатает её «подчёркнутой». Программа выводит вторую строку из символов `-`, причём их количество равно длине введённой строки:

```python
input_string = input("Please type in a string: ")
print(input_string)
print("-"*len(input_string))
```

<sample-output>

Please type in a string: **Hi there!**

<pre>
Hi there!
---------
</pre>

</sample-output>

Длина строки включает все символы, в том числе пробелы. Например, длина строки `bye bye` равна 7.

<in-browser-programming-exercise name="Более длинная строка" anchor="The longer string" tmcname="part03-09_longer_string">

Напишите программу, которая спрашивает у пользователя две строки и затем выводит ту, которая длиннее (то есть содержит больше символов). Если строки одинаковой длины, программа должна вывести `The strings are equally long`.

Примеры ожидаемого поведения:

<sample-output>

Please type in string 1: **hey**
Please type in string 2: **hiya**
hiya is longer

</sample-output>

<sample-output>

Please type in string 1: **howdy doody**
Please type in string 2: **hola**
howdy doody is longer

</sample-output>

<sample-output>

Please type in string 1: **hey**
Please type in string 2: **bye**
The strings are equally long

</sample-output>

</in-browser-programming-exercise>

Так как строка — это по сути последовательность символов, из неё можно получить отдельный символ. Оператор `[]` возвращает символ по _индексу_, указанному в квадратных скобках.

Индекс — это позиция в строке, считая от нуля. Первый символ имеет индекс 0, второй — 1 и так далее.

<img src="3_2_1.png">

Например, программа

```python

input_string = input("Please type in a string: ")
print(input_string[0])
print(input_string[1])
print(input_string[3])

```

выведет:

<sample-output>

Please type in a string: **monkey**
m
o
k

</sample-output>

Так как первый символ имеет индекс 0, последний символ имеет индекс _длина - 1_. Следующая программа печатает первый и последний символ строки:

```python
input_string = input("Please type in a string: ")
print("First character: " + input_string[0])
print("Last character: " + input_string[len(input_string) - 1])
```

<sample-output>

Please type in a string: **testing**
First character: t
Last character: g

</sample-output>

Следующая программа проходит по всем символам строки от первого до последнего:

```python
input_string = input("Please type in a string: ")
index = 0
while index < len(input_string):
    print(input_string[index])
    index += 1
```

<sample-output>

Please type in a string: **test**
t
e
s
t

</sample-output>

Можно использовать и отрицательные индексы, чтобы обращаться к символам с конца строки. Последний символ имеет индекс -1, предпоследний — -2 и так далее. Можно считать, что `input_string[-1]` — это сокращение для `input_string[len(input_string) - 1]`.

<img src="3_2_2.png">

Пример выше можно упростить, используя отрицательный индекс:

```python
input_string = input("Please type in a string: ")
print("First character: " + input_string[0])
print("Last character: " + input_string[-1])
```

<sample-output>

Please type in a string: **testing**
First character: t
Last character: g

</sample-output>

## IndexError: string index out of range {#indexerror-string-index-out-of-range}

Если вы пробовали примеры сами, возможно, уже сталкивались с ошибкой _IndexError: string index out of range_. Она возникает, когда вы пытаетесь обратиться к индексу, которого нет в строке.

```python
input_string = input("Please type in a string: ")
print("The tenth character: " + input_string[9])
```

<sample-output>

Please type in a string: **introduction to programming**
The tenth character: i

</sample-output>

<sample-output>

Please type in a string: **python**

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range

</sample-output>

Иногда ошибка индексирования связана с багом в коде. Например, довольно часто «промахиваются» на один символ, пытаясь обратиться к последнему символу строки:

```python
input_string = input("Please type in a string: ")
print("Last character: " + input_string[len(input_string)])
```

Так как индексирование начинается с нуля, последний символ находится по индексу `len(input_string) - 1`, а не `len(input_string)`.

Иногда программу нужно заранее защитить от ошибок, которые могут возникнуть из-за пользовательского ввода:

```python
input_string = input("Please type in a string: ")
if len(input_string) > 0:
    print("First character: " + input_string[0])
else:
    print("The input string is empty. There is no first character.")
```

В примере выше, если бы программист не проверил длину строки, строка длины ноль вызвала бы ошибку. Строку длины ноль называют пустой строкой. В данном случае она получается, если на приглашении ввода просто нажать Enter.

<in-browser-programming-exercise name="С конца к началу" anchor="End to beginning" tmcname="part03-10_end_to_beginning">

Напишите программу, которая спрашивает у пользователя строку, а затем выводит её в обратном порядке — с конца к началу. Каждый символ должен быть выведен на отдельной строке.

Пример ожидаемого поведения:

<sample-output>

Please type in a string: **hiya**
a
y
i
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Второй и предпоследний символ" anchor="Second and second to last characters" tmcname="part03-11_second_and_second_to_last">

Напишите программу, которая спрашивает у пользователя строку, а затем выводит сообщение в зависимости от того, совпадают ли второй символ и предпоследний символ. Смотрите примеры ниже.

<sample-output>

Please type in a string: **python**
The second and the second to last characters are different

</sample-output>

<sample-output>

Please type in a string: **pascal**
The second and the second to last characters are a

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Строка из решёток" anchor="A line of hashes" tmcname="part03-12_line_of_hashes">

Напишите программу, которая печатает строку из символов решётки `#` заданной пользователем длины.

<sample-output>

Width: **3**
<pre>
###
</pre>

</sample-output>

<sample-output>

Width: **8**
<pre>
########
</pre>

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Прямоугольник из решёток" anchor="A rectangle of hashes" tmcname="part03-13_rectangle_of_hashes">

Измените предыдущую программу так, чтобы она также спрашивала высоту и печатала прямоугольник из решёток соответствующего размера.

<sample-output>

Width: **10**
Height: **3**
##########
##########
##########

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Подчёркивание" anchor="Underlining" tmcname="part03-14_underlining">

Напишите программу, которая в цикле запрашивает у пользователя строки. Каждую строку нужно выводить «подчёркнутой», как в примерах ниже. Выполнение заканчивается, когда пользователь вводит пустую строку (то есть просто нажимает Enter).

<sample-output>

Please type in a string: **Hi there!**
<pre>
Hi there!
---------
</pre>
Please type in a string: **This is a test**
<pre>
This is a test
--------------
</pre>
Please type in a string: **a**
<pre>
a
-
</pre>
Please type in a string:

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Выравнивание вправо" anchor="Right-aligned" tmcname="part03-15_right_aligned">

Напишите программу, которая спрашивает у пользователя строку и выводит её так, чтобы всего отображалось ровно 20 символов. Если строка короче 20 символов, начало строки нужно заполнить символами `*`.

Можно считать, что введённая строка имеет длину не больше 20 символов.

<sample-output>

Please type in a string: **python**
<pre>
**************python
</pre>

</sample-output>

<sample-output>

Please type in a string: **alongerstring**
<pre>
*******alongerstring
</pre>

</sample-output>

<sample-output>

Please type in a string: **averyverylongstring**
<pre>
*averyverylongstring
</pre>

</sample-output>


</in-browser-programming-exercise>

<in-browser-programming-exercise name="Слово в рамке" anchor="A framed word" tmcname="part03-16_framed_word">

Напишите программу, которая спрашивает у пользователя строку и затем печатает рамку из символов `*`, поместив слово по центру. Ширина рамки должна быть 30 символов. Можно считать, что введённая строка всегда помещается в рамку.

Если длина строки нечётная, можно вывести слово в любом из двух возможных «центральных» положений.

<sample-output>

Word: **testing**
<pre>
******************************
*          testing           *
******************************
</pre>

</sample-output>

<sample-output>

Word: **python**
<pre>
******************************
*           python           *
******************************
</pre>

</sample-output>

</in-browser-programming-exercise>


## Подстроки и срезы {#substrings-and-slices}

_Подстрока_ — это последовательность символов, которая является частью строки. Например, строка `example` содержит подстроки `exam`, `amp`, `ple` и другие. В Python выделение подстрок обычно называют _slicing_ («срез»), а саму подстроку часто называют _срезом_ (slice). Эти термины во многих случаях взаимозаменяемы.

Если вы знаете начальный и конечный индексы среза, его можно получить с помощью записи `[a:b]`. Это означает, что срез начинается с индекса `a` и заканчивается символом перед индексом `b`: то есть включает первый символ и не включает последний. Индексы можно представить как линии-разделители слева от символов, как показано на рисунке:

<img src="3_2_3.png">

Рассмотрим несколько примеров срезов:

```python
input_string = "presumptious"

print(input_string[0:3])
print(input_string[4:10])

# если начальный индекс опущен, по умолчанию он равен 0
print(input_string[:3])

# если конечный индекс опущен, по умолчанию это длина строки
print(input_string[4:])
```

<sample-output>

pre
umptio
pre
umptious

</sample-output>

<text-box variant='hint' name='Полуоткрытые интервалы'>

В обработке строк в Python интервал `[a:b]` является _полуоткрытым_: символ на начальном индексе `a` включается, а символ на конечном индексе `b` не включается. Почему так?

Глубокой причины нет — это скорее соглашение, унаследованное от других языков программирования.

Полуоткрытые интервалы могут казаться непривычными, но на практике у них есть преимущества. Например, длину среза легко вычислить как `b-a`. С другой стороны, нужно помнить, что символ по индексу `b` не входит в срез.

</text-box>

<in-browser-programming-exercise name="Подстроки, часть 1" anchor="Substrings, part 1" tmcname="part03-17_substrings_part_1">

Напишите программу, которая спрашивает у пользователя строку. Затем программа должна вывести все подстроки, начинающиеся с первого символа, от самой короткой до самой длинной. Смотрите пример ниже.

<sample-output>

Please type in a string: **test**
t
te
tes
test

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Подстроки, часть 2" anchor="Substrings, part 2" tmcname="part03-18_substrings_part_2">

Напишите программу, которая спрашивает у пользователя строку. Затем программа должна вывести все подстроки, заканчивающиеся последним символом, от самой короткой до самой длинной. Смотрите пример ниже.

<sample-output>

Please type in a string: **test**
t
st
est
test

</sample-output>

</in-browser-programming-exercise>

## Поиск подстрок {#searching-for-substrings}

Оператор `in` помогает проверить, содержит ли строка заданную подстроку. Булево выражение `a in b` истинно, если строка `b` содержит подстроку `a`.

Например, такой код

```python
input_string = "test"

print("t" in input_string)
print("x" in input_string)
print("es" in input_string)
print("ets" in input_string)
```

печатает следующее:

<sample-output>

True
False
True
False

</sample-output>

Программа ниже позволяет пользователю искать подстроки в строке, которая задана прямо в коде:

```python
input_string = "perpendicular"

while True:
    substring = input("What are you looking for? ")
    if substring in input_string:
        print("Found it")
    else:
        print("Not found")
```

<sample-output>

What are you looking for? **perp**
Found it
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it
...

</sample-output>

<in-browser-programming-exercise name="Содержит ли гласные" anchor="Does it contain vowels" tmcname="part03-19_does_it_contain_vowels">

Напишите программу, которая спрашивает у пользователя строку. Затем программа должна вывести разные сообщения в зависимости от того, содержит ли строка гласные a, e или o.

Можно считать, что ввод всегда будет в нижнем регистре. Смотрите примеры ниже.

<sample-output>

Please type in a string: **hello there**
a not found
e found
o found

</sample-output>

<sample-output>

Please type in a string: **hiya**
a found
e not found
o not found

</sample-output>


</in-browser-programming-exercise>

Оператор `in` возвращает булево значение, то есть сообщает только, _есть ли_ подстрока в строке, но не помогает понять, _где_ именно она находится. Для этого можно использовать строковый метод Python `find`. Он принимает искомую подстроку как аргумент и возвращает либо индекс первого вхождения, либо `-1`, если подстрока не найдена.

На изображении ниже показано, как это работает:

<img src="3_2_4.png">

Примеры использования `find`:

```python
input_string = "test"

print(input_string.find("t"))
print(input_string.find("x"))
print(input_string.find("es"))
print(input_string.find("ets"))
```

<sample-output>

0
-1
1
-1

</sample-output>

Пример поиска подстроки выше, реализованный с помощью `find`:

```python
input_string = "perpendicular"

while True:
    substring = input("What are you looking for? ")
    index = input_string.find(substring)
    if index >= 0:
        print(f"Found it at the index {index}")
    else:
        print("Not found")
```

<sample-output>

What are you looking for? **perp**
Found it at the index 0
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it at the index 3
...

</sample-output>

<text-box variant='hint' name='Методы'>

Выше мы использовали строковый _метод_ `find`. Методы во многом похожи на _функции_, которые мы проходили в предыдущей части. Отличие в том, что метод всегда «принадлежит» _объекту_, на котором он вызывается. Объект — это то, что стоит перед точкой в вызове метода. В случае `find` объект — это строка, в которой метод ищет переданную подстроку.

</text-box>

<in-browser-programming-exercise name="Найти первый фрагмент" anchor="Find the first substring" tmcname="part03-20_find_first_substring">

Напишите программу, которая запрашивает у пользователя строку и один символ. Затем программа должна вывести первый срез длиной три символа, который начинается с указанного символа. Можно считать, что строка ввода имеет длину не меньше трёх. Программа должна вывести ровно три символа — либо ничего.

Обратите особое внимание на случай, когда после первого вхождения искомого символа в строке остаётся меньше двух символов. Тогда ничего печатать не нужно, и при выполнении программы не должно возникать ошибок индексирования.

<sample-output>

Please type in a word: **mammoth**
Please type in a character: **m**
mam

</sample-output>

<sample-output>

Please type in a word: **banana**
Please type in a character: **n**
nan

</sample-output>

<sample-output>

Please type in a word: **tomato**
Please type in a character: **x**

</sample-output>

<sample-output>

Please type in a word: **python**
Please type in a character: **n**

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Найти все фрагменты" anchor="Find all the substrings" tmcname="part03-21_find_all_substrings">

Сделайте расширенную версию предыдущей программы: она должна печатать _все подстроки длиной не менее трёх символов_, которые начинаются с указанного пользователем символа. Можно считать, что строка ввода имеет длину не меньше трёх.

<sample-output>

Please type in a word: **mammoth**
Please type in a character: **m**
mam
mmo
mot

</sample-output>

<sample-output>

Please type in a word: **banana**
Please type in a character: **n**
nan

</sample-output>

**Подсказка:** следующий пример может подсказать идею, как решать это упражнение:

```python
word = input("Word: ")
while True:
    if len(word) == 0:
        break
    print(word)
    word = word[2:]
```

<sample-output>

Word: **mammoth**
mammoth
mmoth
oth
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Второе вхождение" anchor="The second occurrence" tmcname="part03-22_second_occurrence">

Напишите программу, которая находит _второе_ вхождение подстроки. Если второго (или даже первого) вхождения нет, программа должна вывести соответствующее сообщение.

В этом упражнении вхождения _не могут_ перекрываться. Например, в строке `aaaa` второе вхождение подстроки `aa` начинается с индекса 2.

Примеры ожидаемого поведения:

<sample-output>

Please type in a string: **abcabc**
Please type in a substring: **ab**
The second occurrence of the substring is at index 3.

</sample-output>

<sample-output>

Please type in a string: **methodology**
Please type in a substring: **o**
The second occurrence of the substring is at index 6.

</sample-output>

<sample-output>

Please type in a string: **aybabtu**
Please type in a substring: **ba**
The substring does not occur twice in the string.

</sample-output>

</in-browser-programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="6bfa7eab-80de-52e2-afe5-285af914099f"></quiz>
-->
