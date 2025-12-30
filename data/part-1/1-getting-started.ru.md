---
path: "/ru/part-1/1-getting-started"
title: "Начало работы"
hidden: false
---

<text-box variant='learningObjectives' name='Цели обучения'>

После этого раздела:

- вы напишете и запустите свою первую программу на Python
- вы узнаете, как пользоваться командой `print`
- вы сможете использовать программирование для выполнения арифметических операций

</text-box>

Компьютерные программы состоят из _команд_. Каждая команда говорит компьютеру, какое действие нужно выполнить. Компьютер выполняет команды одну за другой. Команды могут, среди прочего, выполнять вычисления, сравнивать значения в памяти, изменять ход выполнения программы, выводить сообщения или запрашивать информацию у пользователя.

Начнём знакомство с программированием с команды `print`, которая _печатает_ (выводит) текст. Здесь печать означает, что программа покажет некоторый текст на экране.

Следующая программа выведет строку «Hi there!»:

```python
print("Hi there!")
```

При запуске программа выведет:

<sample-output>

Hi there!

</sample-output>

Программа не будет работать, если код написан не в точности так, как показано выше. Например, попытка выполнить `print` без кавычек:

```python
print(Hi there!)
```

не выведет сообщение, а приведёт к ошибке:

<sample-output>

<pre>
File "<stdin>", line 1
  print(Hi there!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

Итак: если вы хотите вывести текст, его нужно заключать в кавычки — иначе Python не сможет интерпретировать его правильно.

<in-browser-programming-exercise name="Смайлик" anchor="Emoticon" tmcname="part01-01_emoticon" height="300px">

Напишите программу, которая выводит смайлик: :-)

</in-browser-programming-exercise>

## Программа из нескольких команд {#a-program-of-multiple-commands}

Несколько команд, записанных подряд, будут выполняться в порядке следования — от первой к последней.
Например, программа

```python
print("Welcome to Introduction to Programming!")
print("First we will practice using the print command.")
print("This program prints three lines of text on the screen.")
```

выводит на экран:

<sample-output>

Welcome to Introduction to Programming!
First we will practice using the print command.
This program prints three lines of text on the screen.

</sample-output>

<in-browser-programming-exercise name="Исправьте код: «Семь братьев»" anchor="Fix the code: Seven Brothers" tmcname="part01-02_seven_brothers">

«Seitsemän veljestä» — один из первых романов, написанных на финском языке. Это история о семи братьях-сиротах, которые учатся жить самостоятельно ([подробнее в Википедии](https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4)).

Эта программа должна вывести имена братьев в алфавитном порядке, но пока работает не совсем правильно. Исправьте программу так, чтобы имена выводились в правильном порядке.

```python
print("Simeoni")
print("Juhani")
print("Eero")
print("Lauri")
print("Aapo")
print("Tuomas")
print("Timo")
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Греби, греби, греби свою лодку" anchor="Row, Row, Row Your Boat" tmcname="part01-03_row_your_boat">

Напишите программу, которая выводит следующие строки _точно_ так, как они написаны ниже (включая знаки препинания):

<sample-output>

Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.

</sample-output>

</in-browser-programming-exercise>

## Арифметические операции {#arithmetic-operations}

Арифметические операции можно писать прямо внутри команды `print`. Тогда при запуске будет напечатан результат вычисления. Например, программа

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```

выводит:

<sample-output>

7
9
22

</sample-output>

Обратите внимание: вокруг арифметических выражений выше нет кавычек. Кавычки используются для обозначения _строк_ (strings). В программировании строка — это последовательность символов. Она может содержать буквы, цифры и любые другие символы, например знаки препинания. Строки — это не только слова; одна строка может быть длиной в несколько предложений.

Обычно строки печатаются в точности так, как они написаны. Поэтому две следующие команды дают совершенно разные результаты:

```python
print(2 + 2 * 10)
print("2 + 2 * 10")
```

Эта программа выводит:

<sample-output>

22
2 + 2 * 10

</sample-output>

Во второй строке Python не вычисляет выражение, а печатает само выражение как строку.
То есть строка выводится «как есть», без интерпретации её содержимого.

## Комментарии {#commenting}

Любая строка, начинающаяся со знака решётки `#` (его также называют `hash` или `number sign`), — комментарий. Это означает, что любой текст после символа `#` на этой строке никак не влияет на работу программы — Python просто игнорирует комментарий.

Комментарии используют, чтобы объяснить, как работает программа — как себе, так и другим, кто будет читать код. В следующем примере комментарий поясняет вычисление:

```python
print("Hours in a year:")
# в году 365 дней, и в каждом дне 24 часа
print(365*24)
```

При запуске программы комментарий не будет виден пользователю:

<sample-output>

Hours in a year:
8760

</sample-output>

Короткие комментарии можно также писать в конце строки:

```python
print("Hours in a year:")
print(365*24) # 365 дней, 24 часа в каждом дне
```

<in-browser-programming-exercise name="Минуты в году" anchor="Minutes in a year" tmcname="part01-04_minutes_in_a_year">

Напишите программу, которая печатает количество минут в году. Используйте код на Python для вычисления, как в примере выше.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Выведите код" anchor="Print some code" tmcname="part01-05_print_code">

До этого момента вы, вероятно, использовали двойные кавычки `"` для вывода строк. Помимо двойных кавычек, Python также принимает одинарные кавычки `'`.

Это полезно, если вы хотите напечатать сами кавычки:

```python

print('"Come right back!", shouted the police officer.')

```

<sample-output>

"Come right back!", shouted the police officer.

</sample-output>

Напишите программу, которая выводит следующее:

<sample-output>

print("Hello there!")

</sample-output>

</in-browser-programming-exercise>


<!--

Тест для повторения материала этого раздела:

<quiz id="f1d6d205-dfd6-5c6f-b148-b332dfd64289"></quiz>

-->
