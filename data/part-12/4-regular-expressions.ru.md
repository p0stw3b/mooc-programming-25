---
path: /ru/part-12/4-regular-expressions
title: Регулярные выражения
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что такое регулярные выражения
- вы сможете использовать регулярные выражения в своих программах

</text-box>

Мы уже убедились, что Python отлично подходит для обработки текста. Ещё один мощный инструмент для этого — _регулярные выражения_ (их часто сокращают до _regex_ или _regexp_). С их помощью можно искать и отбирать строки, которые соответствуют определённому шаблону. В этом разделе рассматриваются основы регулярных выражений, но гораздо больше информации можно найти в интернете, например в Python‑[учебнике](https://docs.python.org/3/howto/regex.html).

## Что такое регулярные выражения? {#what-are-regular-expressions}

Регулярные выражения — это не особенность только Python. В некотором смысле это «язык внутри языка»: регулярные выражения в определённой степени совместимы во многих языках программирования. У них есть собственный синтаксис, а идея состоит в том, чтобы описать множество строк, которые удовлетворяют заданным правилам.

Прежде чем углубляться в синтаксис, начнём с простого примера:

```python
import re

words = ["Python", "Pantone", "Pontoon", "Pollute", "Pantheon"]

for word in words:
    # строка должна начинаться с "P" и заканчиваться на "on"
    if re.search("^P.*on$", word):
        print(word, "found!")
```

<sample-output>

Python found!
Pontoon found!
Pantheon found!

</sample-output>

Чтобы использовать регулярные выражения в Python, нужно импортировать модуль `re`. Модуль `re` содержит множество функций для работы с регулярными выражениями. В примере выше функция `search` принимает два строковых аргумента: строку‑шаблон и строку, в которой нужно искать совпадение.

Во втором примере ищутся любые числа в строке. Функция `findall` возвращает список всех совпадений с шаблоном:

```python
import re

sentence = "First, 2 !#third 44 five 678xyz962"

numbers = re.findall("\d+", sentence)

for number in numbers:
    print(number)
```

<sample-output>

2
44
678
962

</sample-output>

## Синтаксис регулярных выражений {#the-syntax-of-regular-expressions}

Познакомимся с базовым синтаксисом регулярных выражений. В большинстве следующих примеров используется такая тестовая программа:

```python
import re

expression = input("Please type in an expression: ")

while True:
    input_string = input("Please type in a string: ")
    if input_string == "":
        break
    if re.search(expression, input_string):
        print("Found!")
    else:
        print("Not found.")
```

### Альтернативные подстроки {#alternate-substrings}

Вертикальная черта `|` (её также называют pipe) позволяет задавать альтернативы. По смыслу это _или_. Например, выражение `911|112` совпадает со строками, которые содержат либо подстроку `911`, либо подстроку `112`.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **aa|ee|ii**
Please type in a string: **aardvark**
Found!
Please type in a string: **feelings**
Found!
Please type in a string: **radii**
Found!
Please type in a string: **smooch**
Not found.
Please type in a string: **continuum**
Not found.

</sample-output>


### Группы символов {#groups-of-characters}

Квадратные скобки используются для задания множества допустимых символов. Например, выражение `[aeio]` совпадает со строками, которые содержат любой из символов `a`, `e`, `i` или `o`.

Также можно задавать диапазоны символов с помощью дефиса. Например, выражение `[0-68a-d]` совпадает со строками, которые содержат цифру от 0 до 6, либо цифру 8, либо букву от `a` до `d`. В этой записи все диапазоны _включительные_ (границы входят в диапазон).

Если поставить два таких набора подряд, можно искать две последовательные позиции. Например, выражение `[1-3][0-9]` совпадает с любым двузначным числом от 10 до 39 включительно.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **[C-FRSO]**
Please type in a string: **C**
Found!
Please type in a string: **E**
Found!
Please type in a string: **G**
Not found.
Please type in a string: **R**
Found!
Please type in a string: **O**
Found!
Please type in a string: **T**
Not found.

</sample-output>

### Повторения {#repeated-matches}

Любую часть выражения можно повторять с помощью следующих операторов:

* `*` повторяет 0 или более раз
* `+` повторяет 1 или более раз
* `{m}` повторяет ровно `m` раз

Эти операторы относятся к части выражения непосредственно перед оператором. Например, выражение `ba+b` совпадает с подстроками `bab`, `baab`, `baaaaaaaaaaab` и т. п. Выражение `A[BCDE]*Z` совпадает с подстроками `AZ`, `ADZ`, `ABCDEBCDEBCDEZ` и т. п.

Пример с тестовой программой:

<sample-output>

Please type in an expression: **1[234]\*5**
Please type in a string: **15**
Found!
Please type in a string: **125**
Found!
Please type in a string: **145**
Found!
Please type in a string: **12342345**
Found!
Please type in a string: **126**
Not found.
Please type in a string: **165**
Not found.

</sample-output>


### Другие специальные символы {#other-special-characters}

Точка — это шаблонный символ (wildcard), который совпадает с любым одиночным символом. Например, выражение `c...o` совпадает с любой подстрокой длиной 5, начинающейся на `c` и заканчивающейся на `o`, например `c-3po` или `cello`.

Символ `^` означает, что совпадение должно начинаться в начале строки, а `$` — что совпадение должно заканчиваться в конце строки. Их также можно использовать, чтобы запретить любые другие символы, кроме указанных:

<sample-output>

Please type in an expression: **\^[123]\*$**
Please type in a string: **4**
Not found.
Please type in a string: **1221**
Found!
Please type in a string: **333333333**
Found!

</sample-output>

Иногда нужно искать специальные символы, зарезервированные в синтаксисе регулярных выражений. Обратный слэш `\` используется для _экранирования_ специальных символов. Так, выражение `1+` совпадает с одним или несколькими символами `1`, а выражение `1\+` совпадает со строкой `1+`.

<sample-output>

Please type in an expression: **^\\\***
Please type in a string: **moi\***
Not found.
Please type in a string: **m\*o\*i**
Not found.
Please type in a string: **\*moi**
Found!

</sample-output>

Круглые скобки позволяют группировать части выражения. Например, выражение `(ab)+c` совпадает с подстроками `abc`, `ababc`, `ababababababc`, но не совпадает со строками `ac` или `bc`, потому что подстрока `ab` должна встретиться целиком хотя бы один раз.

<sample-output>

Please type in an expression: **^(jabba).\*(hut)$**
Please type in a string: **jabba the hut**
Found!
Please type in a string: **jabba a hut**
Found!
Please type in a string: **jarjar the hut**
Not found.
Please type in a string: **jabba the smut**
Not found.

</sample-output>

<programming-exercise name='Регулярные выражения' anchor="Regular expressions" tmcname='part12-14_regular_expressions'>

Несколько упражнений, чтобы лучше освоиться с синтаксисом регулярных выражений.

## Дни недели {#days-of-the-week}

С помощью регулярного выражения напишите функцию `is_dotw(my_string: str)`. Функция должна возвращать `True`, если строка содержит сокращение дня недели (Mon, Tue, Wed, Thu, Fri, Sat, Sun).

Примеры работы функции:

```python
print(is_dotw("Mon"))
print(is_dotw("Fri"))
print(is_dotw("Tui"))
```

<sample-output>

True
True
False

</sample-output>

## Проверка на гласные {#check-for-vowels}

Напишите функцию `all_vowels(my_string: str)`, которая с помощью регулярного выражения проверяет, состоят ли все символы строки из гласных.

Примеры работы функции:

```python
print(all_vowels("eioueioieoieou"))
print(all_vowels("autoooo"))
```

<sample-output>

True
False

</sample-output>

## Время суток {#time-of-day}

Напишите функцию `time_of_day(my_string: str)`, которая с помощью регулярного выражения проверяет, является ли строка в формате `XX:YY:ZZ` корректным временем в 24‑часовом формате (две цифры на часы, минуты и секунды).

Примеры работы функции:

```python
print(time_of_day("12:43:01"))
print(time_of_day("AB:01:CD"))
print(time_of_day("17:59:59"))
print(time_of_day("33:66:77"))
```

<sample-output>

True
False
True
False

</sample-output>

</programming-exercise>

## Грандиозный финал {#grand-finale}

В завершение этой части материалов поработаем ещё с объектами и классами и сделаем чуть более объёмную программу. Это упражнение не обязательно связано с регулярными выражениями, но разделы про [функции как аргументы](/ru/part-12/1-functions-as-arguments) и [списковые включения](/ru/part-11/1-list-comprehensions) наверняка пригодятся.

Также полезными могут оказаться примеры из [части 10](/ru/part-10/4-application-development).

<programming-exercise name='Статистика хоккея' anchor="Hockey statistics" tmcname='part12-15_hockey_statistics'>

В этом упражнении вы создадите приложение для анализа статистики игроков хоккейной лиги NHL несколькими разными способами.

Шаблон упражнения содержит два JSON‑файла: `partial.json` и `all.json`. Первый в основном предназначен для тестирования. Второй содержит много данных: в нём собрана статистика всех игроков NHL за сезон 2019–2020.

Запись об одном игроке имеет такой формат:

```json
{
    "name": "Patrik Laine",
    "nationality": "FIN",
    "assists": 35,
    "goals": 28,
    "penalties": 22,
    "team": "WPG",
    "games": 68
}
```

Оба файла содержат список записей в этом формате.

Если вы хотите освежить в памяти работу с JSON‑файлами, посмотрите [раздел в части 7](/ru/part-7/4-data-processing#reading-json-files).

## Поиск и списки {#search-and-list}

Напишите интерактивное приложение, которое сначала спрашивает имя файла, а затем предлагает такие функции:

- поиск статистики игрока по имени
- вывести все аббревиатуры команд в алфавитном порядке
- вывести все аббревиатуры стран в алфавитном порядке

Эти функции дают один балл за упражнение. Приложение должно работать так:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **1**
name: **Travis Zajac**
<pre>
Travis Zajac         NJD   9 + 16 =  25
</pre>

command: **2**
BUF
CGY
DAL
NJD
NYI
OTT
PIT
WPG
WSH

command: **3**
CAN
CHE
CZE
SWE
USA

command: **0**

</sample-output>

Важно: формат вывода строки игрока должен быть _точно_ таким:

<sample-output>

<pre>
Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</pre>

</sample-output>

Последняя строка в примере выше добавлена только для того, чтобы было легче измерить ширину полей в выводе; в финальном решении печатать эту строку с цифрами не нужно.

Аббревиатура команды выводится, начиная с 22‑го символа. Знак `+` — это 30‑й символ, а знак `=` — 35‑й. Все поля должны быть выровнены по правому краю. Все пробелы — это именно пробелы (space), а не табуляция.

Скорее всего, проще всего добиться нужного формата с помощью f‑строк. Процесс похож на [это упражнение](/ru/part-6/1-reading-files#programming-exercise-course-grading-part-3) из части 6.

## Списки игроков по очкам {#list-players-by-points}

Эти две функции дают второй балл:

- вывести игроков указанной команды по убыванию набранных очков. Очки = _goals_ + _assists_
- вывести игроков указанной страны по убыванию набранных очков

Приложение должно работать так:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **4**
team: **OTT**
<pre>
Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</pre>

command: **5**
country: **CAN**
<pre>
Jared McCann         PIT  14 + 21 =  35
Travis Zajac         NJD   9 + 16 =  25
Taylor Fedun         DAL   2 +  7 =   9
Mark Jankowski       CGY   5 +  2 =   7
Logan Shaw           WPG   3 +  2 =   5
</pre>

command: **0**

</sample-output>

## Самые результативные игроки {#most-successful-players}

Эти две функции дают третий балл:

- список из `n` игроков, набравших больше всего очков
  - если очков поровну, выше должен быть тот, кто забил больше голов
- список из `n` игроков, забивших больше всего голов
  - если голов поровну, выше должен быть тот, кто сыграл меньше игр

Приложение должно работать так:

<sample-output>

file name: **partial.json**
read the data of 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **6**
how many: **2**
<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</pre>

command: **6**
how many: **5**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
John Klingberg       DAL   6 + 26 =  32
Travis Zajac         NJD   9 + 16 =  25
Conor Sheary         BUF  10 + 13 =  23
</pre>

command: **7**
how many: **6**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
Conor Sheary         BUF  10 + 13 =  23
Travis Zajac         NJD   9 + 16 =  25
John Klingberg       DAL   6 + 26 =  32
Mark Jankowski       CGY   5 +  2 =   7
</pre>

command: **0**

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на небольшой опрос по этой части курса.

<quiz id="1e16612c-1004-5cf5-9525-6669104f50ec"></quiz>
