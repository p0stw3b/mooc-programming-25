---
path: /ru/part-5/3-dictionary
title: Словари (dict)
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь со структурой данных «словарь» (dictionary)
- вы сможете использовать словарь с разными типами ключей и значений
- вы узнаете, как перебирать содержимое словаря
- вы сможете назвать типичные случаи применения словарей

</text-box>

Списки полезны во многих ситуациях, но у них есть ограничение: к элементам обращаются по индексам — 0, 1, 2 и так далее. Если вы хотите найти элемент в списке, вам нужно либо знать его индекс, либо (в худшем случае) пройти по всему списку.

Другая важная структура данных в Python — _словарь_ (dictionary). В словаре элементы индексируются _ключами_ (keys). Каждый ключ соответствует некоторому _значению_ (value). По ключу можно получить значение и изменить его.

## Использование словаря {#using-a-dictionary}

Следующий пример показывает, как работает структура данных «словарь». Это простой словарь переводов с финского на английский:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Запись `{}` создаёт пустой словарь, в который можно добавлять данные. Здесь добавлены три пары ключ‑значение: `"apina"` соответствует `"monkey"`, `"banaani"` — `"banana"`, а `"cembalo"` — `"harpsichord"`. Затем печатается количество пар в словаре, весь словарь целиком и значение, соответствующее ключу `"apina"`.

После определения словаря его можно использовать вместе с вводом пользователя:

```python
word = input("Please type in a word: ")
if word in my_dictionary:
    print("Translation: ", my_dictionary[word])
else:
    print("Word not found")
```

Обратите внимание на оператор `in`. Если он применяется к словарю, он проверяет, находится ли левый операнд среди ключей словаря. При разных вводах программа может напечатать, например, следующее:

<sample-output>

Please type in a word: **apina**
Translation: monkey

</sample-output>

<sample-output>

Please type in a word: **pöllö**
Word not found

</sample-output>

## Что можно хранить в словаре? {#what-can-be-stored-in-a-dictionary}

Тип данных называется словарём, но это не означает, что он обязан содержать только строки. Например, в следующем словаре ключи — строки, а значения — целые числа:

```python
results = {}
results["Mary"] = 4
results["Alice"] = 5
results["Larry"] = 2
```

А здесь ключи — целые числа, а значения — списки:

```python
lists = {}
lists[5] = [1, 2, 3]
lists[42] = [5, 4, 5, 4, 5]
lists[100] = [5, 2, 3]
```

## Как работают ключи и значения {#how-keys-and-values-work}

Каждый ключ может встречаться в словаре только один раз. Если добавить запись с ключом, который уже есть в словаре, значение по этому ключу будет заменено новым:

```python
my_dictionary["suuri"] = "big"
my_dictionary["suuri"] = "large"
print(my_dictionary["suuri"])
```

<sample-output>

large

</sample-output>

Все ключи в словаре должны быть _неизменяемыми_ (immutable). Поэтому список нельзя использовать как ключ: его можно изменить. Например, выполнение такого кода приводит к ошибке:

```python
my_dictionary[[1, 2, 3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Хеш-таблица">

Обратите внимание на слово `unhashable` в сообщении об ошибке выше. Это отсылка к внутреннему устройству словарей. Python хранит содержимое словаря в _хеш‑таблице_. Каждый ключ преобразуется в _хеш‑значение_, которое определяет, где ключ хранится в памяти компьютера. Сообщение об ошибке означает, что список нельзя преобразовать в хеш‑значение, поэтому его нельзя использовать как ключ словаря.

Хеш‑таблицы подробнее разбираются в курсах _Data Structures and Algorithms_.

</text-box>

В отличие от ключей, _значения_ в словаре могут быть изменяемыми, поэтому в качестве значения подходит любой тип данных. Одно и то же значение также может соответствовать нескольким ключам в одном словаре.

<programming-exercise name='Умножить на десять' anchor="Times ten" tmcname='part05-14_times_ten'>

Напишите функцию `times_ten(start_index: int, end_index: int)`, которая создаёт и возвращает новый словарь. Ключами словаря должны быть числа от `start_index` до `end_index` включительно.

Значением по каждому ключу должно быть число, умноженное на десять.

Например:

```python
d = times_ten(3, 6)
print(d)
```

<sample-output>

{3: 30, 4: 40, 5: 50, 6: 60}

</sample-output>

</programming-exercise>

<programming-exercise name='Факториалы' anchor="Factorials" tmcname='part05-15_factorials'>

Напишите функцию `factorials(n: int)`, которая возвращает словарь с факториалами чисел от 1 до `n`. Число — это ключ, а факториал этого числа — значение по ключу.

Напоминание: факториал числа `n` записывается как `n`! и вычисляется как произведение всех целых чисел от `n` до 1. Например, факториал 4: 4 * 3 * 2 * 1 = 24.

Пример использования:

```python
k = factorials(5)
print(k[1])
print(k[3])
print(k[5])
```

<sample-output>

1
6
120

</sample-output>

</programming-exercise>

## Перебор словаря {#traversing-a-dictionary}

Знакомый цикл `for item in collection` можно применять и к словарю. Если использовать его напрямую со словарём, цикл будет по очереди перебирать ключи, которые хранятся в словаре. В следующем примере печатаются все ключи и значения:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key in my_dictionary:
    print("key:", key)
    print("value:", my_dictionary[key])
```

<sample-output>

key: apina
value: monkey
key: banaani
value: banana
key: cembalo
value: harpsichord

</sample-output>

Иногда нужно перебрать всё содержимое словаря. Метод `items` возвращает пары ключ‑значение по одной:

```python

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

В примерах выше вы могли заметить, что ключи обрабатываются в том же порядке, в каком они были добавлены в словарь. Поскольку ключи обрабатываются на основе хеш‑значений, в большинстве задач порядок не должен иметь значения. Более того, во многих старых версиях Python порядок ключей не гарантировался и мог не совпадать с порядком добавления.

## Ещё несколько приёмов работы со словарями {#some-more-advanced-ways-to-use-dictionaries}

Посмотрим на список слов:

```python
word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]
```

Мы хотим по‑разному проанализировать этот список. Например, узнать, сколько раз каждое слово встречается в списке.

Словарь хорошо подходит для хранения такой информации. В примере ниже мы по очереди перебираем элементы списка. Используя слова как ключи нового словаря, сохраняем в значениях количество появлений каждого слова:

```python
def counts(my_list):
    words = {}
    for word in my_list:
        # если слова ещё нет в словаре, инициализируем значение нулём
        if word not in words:
            words[word] = 0
        # увеличиваем счётчик
        words[word] += 1
    return words

# вызываем функцию
print(counts(word_list))
```

Программа печатает:

<sample-output>

{'banana': 1, 'milk': 1, 'beer': 3, 'cheese': 2, 'sourmilk': 3, 'juice': 1, 'sausage': 2, 'tomato': 1, 'cucumber': 1, 'butter': 2, 'margarine': 1, 'chocolate': 1}

</sample-output>

А что, если мы хотим сгруппировать слова по первой букве? Один из способов сделать это — снова использовать словарь:

```python
def categorize_by_initial(my_list):
    groups = {}
    for word in my_list:
        initial = word[0]
        # создаём новый список при первом появлении буквы
        if initial not in groups:
            groups[initial] = []
        # добавляем слово в нужный список
        groups[initial].append(word)
    return groups

groups = categorize_by_initial(word_list)

for key, value in groups.items():
    print(f"words beginning with {key}:")
    for word in value:
        print(word)
```
Структура функции очень похожа на предыдущий пример, но теперь значениями по ключам являются списки. Программа печатает:

<sample-output>

words beginning with b:
banana
beer
butter
beer
butter
beer
words beginning with m:
milk
margarine
words beginning with c:
cheese
cucumber
cheese
chocolate
words beginning with s:
sourmilk
sausage
sausage
sourmilk
sourmilk
words beginning with j:
juice
words beginning with t:
tomato

</sample-output>

<programming-exercise name='Гистограмма' anchor="Histogram" tmcname='part05-16_histogram'>

Напишите функцию `histogram`, которая принимает строку. Функция должна напечатать гистограмму, показывающую, сколько раз каждая буква встречается в строке. Каждое вхождение буквы обозначается звёздочкой в строке соответствующей буквы.

Например, вызов `histogram("abba")` должен напечатать:

<sample-output>

<pre>
a **
b **
</pre>

</sample-output>

а `histogram("statistically")` должен напечатать:

<sample-output>

<pre>
s **
t ***
a **
i **
c *
l **
y *
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Телефонная книга, версия 1' anchor="Phone book, version 1" tmcname='part05-17_phone_book_v1'>

Напишите приложение «телефонная книга». Оно должно работать так:

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</sample-output>

Как видно из примера, каждому имени соответствует только один номер. Если добавить запись с уже существующим именем, старый номер должен быть заменён новым.

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<programming-exercise name='Телефонная книга, версия 2' anchor="Phone book, version 2" tmcname='part05-18_phone_book_v2'>

Напишите улучшенную версию телефонной книги. Теперь каждой записи может соответствовать несколько номеров. Во всём остальном программа должна работать так же, как в предыдущем задании, но теперь нужно печатать _все_ номера, привязанные к имени.

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</sample-output>

</programming-exercise>

## Удаление ключей и значений из словаря {#removing-keys-and-values-from-a-dictionary}

Разумеется, из словаря можно удалять пары ключ‑значение. Есть два способа сделать это. Первый — команда `del`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["David"]
print(staff)
```

<sample-output>

{'Alan': 'lecturer', 'Emily': 'professor'}

</sample-output>

Если попытаться удалить ключ, которого нет в словаре, команда `del` вызовет ошибку:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["Paul"]
```

<sample-output>

<pre>
>>> del staff["Paul"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Paul'
</pre>

</sample-output>

Поэтому перед удалением ключа стоит проверять, что он действительно есть в словаре:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
if "Paul" in staff:
  del staff["Paul"]
  print("Deleted")
else:
  print("This person is not a staff member")
```

Другой способ удалять записи — метод `pop`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("David")
print(staff)
print(deleted, "deleted")
```

<sample-output>

{'Alan': 'lecturer', 'Emily': 'professor'}
lecturer deleted

</sample-output>

Как видно, `pop` также возвращает значение удалённой записи.

По умолчанию `pop` тоже вызовет ошибку, если ключа нет в словаре. Этого можно избежать, передав вторым аргументом _значение по умолчанию_. Оно будет возвращено, если ключ не найден. Здесь удобно использовать специальное значение Python `None`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("Paul", None)
if deleted == None:
  print("This person is not a staff member")
else:
  print(deleted, "deleted")
```

<sample-output>

This person is not a staff member

</sample-output>

Важно: если вам нужно очистить весь словарь целиком и вы попробуете сделать это циклом `for`, например так,

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
for key in staff:
  del staff[key]
```

вы получите ошибку:

<sample-output>

RuntimeError: dictionary changed size during iteration

</sample-output>

При переборе коллекции циклом `for` нельзя изменять её содержимое во время выполнения цикла.

К счастью, у словаря есть метод как раз для этого:

```python
staff.clear()
```

<programming-exercise name='Инвертировать словарь' anchor="Invert a dictionary" tmcname='part05-19_invert_dictionary'>

Напишите функцию `invert(dictionary: dict)`, которая принимает словарь. Функция должна инвертировать словарь «на месте»: значения становятся ключами, а ключи — значениями.

Пример использования:

```python
s = {1: "first", 2: "second", 3: "third", 4: "fourth"}
invert(s)
print(s)
```

<sample-output>

{"first": 1, "second": 2, "third": 3, "fourth": 4}

</sample-output>

**Важно:** принципы, которые мы разбирали для списков [здесь](/ru/part-5/2-references#using-lists-as-parameters-in-functions), также применимы и к словарям, переданным аргументом.

Если у вас возникнут трудности, [инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit) поможет понять, что делает (или не делает) ваш код.

</programming-exercise>

<programming-exercise name='Числа прописью' anchor="Numbers spelled out" tmcname='part05-20_numbers_spelled_out'>

Напишите функцию `dict_of_numbers()`, которая возвращает новый словарь. Ключами должны быть числа от 0 до 99, а значениями — запись числа словами. Посмотрите на пример:

```python
numbers = dict_of_numbers()
print(numbers[2])
print(numbers[11])
print(numbers[45])
print(numbers[99])
print(numbers[0])
```

<sample-output>

two
eleven
forty-five
ninety-nine
zero

</sample-output>

Важно: не нужно вручную прописывать каждое число. Подумайте, как использовать циклы и словари, чтобы получить решение.

</programming-exercise>

## Использование словарей для структурирования данных {#using-dictionaries-for-structured-data}

Словари очень удобны для структурирования данных. Следующий код создаёт словарь с некоторыми личными данными:

```python
person = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
```

То есть перед нами человек по имени Pippa Python ростом 154, весом 61 и возрастом 44. Ту же информацию можно хранить и в отдельных переменных:

```python
name = "Pippa Python"
height = 154
weight = 61
age = 44
```

Преимущество словаря в том, что это коллекция: он хранит связанные данные в одной переменной, и к разным компонентам удобно обращаться. Похожее преимущество даёт и список:

```python
person = ["Pippa Python", 153, 61, 44]
```

Но при работе со списком программист должен помнить, что именно хранится по каждому индексу. Ничто не подсказывает, что `person[2]` — это вес, а `person[3]` — возраст. В словаре этой проблемы нет: к каждому значению обращаются по именованному ключу.

Если определить несколько людей в одном формате, к их данным можно обращаться так:

```python
person1 = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
person2 = {"name": "Peter Pythons", "height": 174, "weight": 103, "age": 31}
person3 = {"name": "Pedro Python", "height": 191, "weight": 71, "age": 14}

people = [person1, person2, person3]

for person in people:
    print(person["name"])

combined_height = 0
for person in people:
    combined_height += person["height"]

print("The average height is", combined_height / len(people))
```

<sample-output>

Pippa Python
Peter Pythons
Pedro Python
The average height is 173.0

</sample-output>

<programming-exercise name='База фильмов' anchor="Movie database" tmcname='part05-21_movie_database'>

Напишите функцию `add_movie(database: list, name: str, director: str, year: int, runtime: int)`, которая добавляет новый фильм в базу фильмов.

База данных — это список, а каждый фильм в списке — словарь. Словарь должен содержать следующие ключи:

* `name`
* `director`
* `year`
* `runtime`

Значения по этим ключам передаются аргументами функции.

Пример использования:

```python
database = []
add_movie(database, "Gone with the Python", "Victor Pything", 2017, 116)
add_movie(database, "Pythons on a Plane", "Renny Pytholin", 2001, 94)
print(database)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

<programming-exercise name='Поиск фильмов' anchor="Find movies" tmcname='part05-22_find_movies'>

Напишите функцию `find_movies(database: list, search_term: str)`, которая обрабатывает базу фильмов из предыдущего упражнения. Функция должна сформировать новый список, содержащий только те фильмы, в названии которых встречается искомое слово. Регистр букв не важен. Поиск `ana` должен вернуть список, содержащий и `Anaconda`, и `Management`.

Пример использования:

```python
database = [{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116},
{"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
{"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

my_movies = find_movies(database, "python")
print(my_movies)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

На этом этапе курса вы можете по желанию принять участие в исследовании, связанном с обучением программированию. Участие добровольное, и по собранным данным нельзя идентифицировать отдельных участников. Вы можете прекратить участие в любой момент. [Нажмите здесь, чтобы начать исследование](https://runestone.academy/ns/books/published/p3pt/index.html).

<!---
Тест для повторения материала этого раздела:

<quiz id="6361eeca-a2e2-5577-892c-749706d754f0"></quiz>
-->
