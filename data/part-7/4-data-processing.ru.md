---
path: /ru/part-7/4-data-processing
title: Обработка данных
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как использовать модуль для обработки CSV‑файлов
- вы будете знать, как использовать модуль для обработки JSON‑файлов
- вы сможете получать и читать файлы из интернета

</text-box>

## Чтение CSV‑файлов {#reading-csv-files}

CSV — настолько простой формат, что до сих пор мы обрабатывали его «вручную», собственным кодом. Однако в стандартной библиотеке Python есть готовый модуль для работы с CSV: [csv](https://docs.python.org/3/library/csv.html). Он используется так:

```python
import csv

with open("test.csv") as my_file:
    for line in csv.reader(my_file, delimiter=";"):
        print(line)
```

Этот код читает все строки файла `test.csv`, разделяет содержимое каждой строки на список по разделителю `;` и печатает получившиеся списки. Если файл содержит, например, такие строки:

```x
012121212;5
012345678;2
015151515;4
```

то программа выведет:

<sample-output>

['012121212', '5']
['012345678', '2']
['015151515', '4']

</sample-output>

Раз CSV такой простой, зачем нужен отдельный модуль, если можно использовать `split`? Во‑первых, модуль корректно обработает случаи, когда значения в файле — строки, внутри которых тоже может встречаться символ‑разделитель. Если строка файла выглядит так:

```x
"aaa;bbb";"ccc;ddd"
```

то приведённый выше код даст:

<sample-output>

['aaa;bbb', 'ccc;ddd']

</sample-output>

Если же использовать `split`, разделение произойдёт и внутри строк, что, скорее всего, «сломает» данные — а вместе с ними и программу.

## Чтение JSON‑файлов {#reading-json-files}

CSV — лишь один из многих машиночитаемых форматов данных. Другой популярный формат — [JSON](https://www.json.org/json-en.html). Его часто используют при обмене данными между приложениями.

JSON‑файлы — это текстовые файлы со строгой структурой, и они, возможно, чуть менее удобны для чтения «глазами», чем CSV. В следующем примере используется файл `courses.json` с информацией о нескольких курсах:

```x
[
    {
        "name": "Introduction to Programming",
        "abbreviation": "ItP",
        "periods": [1, 3]
    },
    {
        "name": "Advanced Course in Programming",
        "abbreviation": "ACiP",
        "periods": [2, 4]
    },
    {
        "name": "Database Application",
        "abbreviation": "DbApp",
        "periods": [1, 2, 3, 4]
    }
]
```

Структура JSON к этому моменту должна выглядеть знакомо. JSON выше очень похож на список Python, содержащий три словаря Python.

В стандартной библиотеке есть модуль для работы с JSON: [json](https://docs.python.org/3/library/json.html). Функция `loads` принимает данные в формате JSON и преобразует их в структуру данных Python. Поэтому обработка файла `courses.json` кодом ниже:

```python
import json

with open("courses.json") as my_file:
    data = my_file.read()

courses = json.loads(data)
print(courses)
```

выведет:

<sample-output>

[{'name': 'Introduction to Programming', 'abbreviation': 'ItP', 'periods': [1, 3]}, {'name': 'Advanced Course in Programming', 'abbreviation': 'ACiP', 'periods': [2, 4]}, {'name': 'Database Application', 'abbreviation': 'DbApp', 'periods': [1, 2, 3, 4]}]

</sample-output>

Если мы хотим вывести название каждого курса, можно добавить цикл `for`:

```python
for course in courses:
    print(course["name"])
```

<sample-output>

Introduction to Programming
Advanced Course in Programming
Database Application

</sample-output>


<programming-exercise name='Обработка JSON‑файлов' anchor="Handling JSON files" tmcname='part07-12_json_files'>

Рассмотрим JSON‑файл, который содержит информацию о студентах в таком формате:

```json
[
    {
        "name": "Peter Pythons",
        "age": 27,
        "hobbies": [
            "coding",
            "knitting"
        ]
    },
    {
        "name": "Jean Javanese",
        "age": 24,
        "hobbies": [
            "coding",
            "rock climbing",
            "reading"
        ]
    }
]
```

Напишите функцию `print_persons(filename: str)`, которая читает JSON‑файл в указанном формате и выводит содержимое, как показано ниже. В файле может быть любое количество записей.

<sample-output>

Peter Pythons 27 years (coding, knitting)
Jean Javanese 24 years (coding, rock climbing, reading)

</sample-output>

Хобби должны выводиться в том же порядке, в котором они записаны в JSON‑файле.

</programming-exercise>

## Получение файла из интернета {#retrieving-a-file-from-the-internet}

В стандартной библиотеке Python есть модули для работы с сетевым содержимым. Одна полезная функция — [urllib.request.urlopen](https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen). Рекомендуем посмотреть документацию по модулю целиком, но следующего примера достаточно, чтобы понять принцип. Эта функция позволяет получить содержимое из интернета и затем обработать его в программе.

Следующий код выведет содержимое главной страницы Университета Хельсинки:

```python
import urllib.request

my_request = urllib.request.urlopen("https://helsinki.fi")
print(my_request.read())
```

Страницы, предназначенные для людей, обычно выглядят не очень «красиво», если печатать их исходный код. Однако в следующих примерах мы будем работать с машиночитаемыми _данными_ из онлайн‑источников. Большая часть таких данных в интернете доступна в формате JSON.

<programming-exercise name='Статистика курса' anchor="Course statistics" tmcname='part07-13_course_statistics'>

#### Получение списка активных курсов {#retrieving-the-list-of-active-courses}

По адресу <https://studies.cs.helsinki.fi/stats-mock/api/courses> доступна базовая информация о некоторых курсах кафедры компьютерных наук Университета Хельсинки в формате JSON.

Напишите функцию `retrieve_all()`, которая получает данные обо всех курсах, которые сейчас активны (поле `enabled` равно `true`). Функция должна вернуть список кортежей в следующем формате:

<sample-output>

<pre>
[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
</pre>

</sample-output>

Каждый кортеж должен содержать следующие поля исходных данных:

- название курса: `fullName`
- `name`
- `year`
- сумму значений в списке `exercises`


**Важно:** данные необходимо получать именно с помощью `urllib.request.urlopen`, иначе автоматические тесты могут работать некорректно.

**Важно 2:** тесты устроены так, что слегка изменяют данные, полученные из интернета, чтобы убедиться, что вы не возвращаете заранее заготовленные значения, а действительно обрабатываете полученные данные.

**Важно 3:** некоторые пользователи macOS сталкиваются со следующей проблемой:

```sh
File "/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py", line 1353, in do_open
    raise URLError(err)
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1124)>
```

Решение зависит от того, как Python установлен на вашем компьютере. В некоторых случаях помогает выполнение следующей команды в терминале:

```sh
cd "/Applications/Python 3.8/"
sudo "./Install Certificates.command
```

Путь в команде `cd` зависит от версии установленного Python. Например, это может быть `"/Applications/Python 3.9/"`.

[Разные решения](https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error) предлагались на Stack Overflow.

Один из трюков, который некоторым помог:

```python
import urllib.request
import json
import ssl # добавьте эту библиотеку в секцию import

def retrieve_all():
    # добавьте следующую строку в начало каждой функции
    context = ssl._create_unverified_context()
    # остальная часть функции
```

Ещё один возможный обходной путь:

 ```python
import urllib.request
import certifi # добавьте эту библиотеку в секцию import
import json

def retrieve_all():
    address = "https://studies.cs.helsinki.fi/stats-mock/api/courses"
    # добавьте второй аргумент к вызову функции
    request = urllib.request.urlopen(address, cafile=certifi.where())
    # остальная часть функции
```

#### Получение данных по одному курсу {#retrieving-the-data-for-a-single-course}

У каждого курса есть свой URL, где доступны более подробные еженедельные данные. URL имеют формат <https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats>, где вместо звёздочек нужно подставить значение поля `name` нужного курса.

Например, данные по курсу `docker2019` находятся по адресу <https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats>.

Напишите функцию `retrieve_course(course_name: str)`, которая возвращает статистику указанного курса в виде словаря.

Например, вызов `retrieve_course("docker2019")` должен вернуть словарь следующего вида:

<sample-output>

<pre>
{
    'weeks': 4,
    'students': 220,
    'hours': 5966,
    'hours_average': 27,
    'exercises': 4988,
    'exercises_average': 22
}
</pre>

</sample-output>

Значения в словаре вычисляются так:

- `weeks`: количество полученных JSON‑объектов (недель)
- `students`: максимальное значение `students` среди всех недель
- `hours`: сумма всех `hour_total` по неделям
- `hours_average`: `hours`, делённое на `students` (округление вниз до целого)
- `exercises`: сумма всех `exercise_total` по неделям
- `exercises_average`: `exercises`, делённое на `students` (округление вниз до целого)

**Важно:** предупреждения из части 1 задания относятся и к этой части.

**Важно 2:** в модуле Python [math](https://docs.python.org/3/library/math.html) есть полезная функция для округления вниз.

</programming-exercise>

<programming-exercise name='Кто жульничал' anchor="Who cheated" tmcname='part07-14_who_cheated'>

Файл `start_times.csv` содержит время начала экзамена для каждого студента в формате `name;hh:mm`. Например:

```csv
jarmo;09:00
timo;18:42
kalle;13:23
```

Кроме того, файл `submissions.csv` содержит баллы и время сдачи отдельных заданий. Формат: `name;task;points;hh:mm`. Пример:

```csv
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
jne...
```

Ваша задача — найти студентов, которые потратили на экзамен более 3 часов. То есть студент считается «жульничавшим», если _хотя бы одно_ задание было сдано позже чем через 3 часа после времени начала экзамена. У одного студента может быть несколько попыток сдачи одного и того же задания. Можно считать, что все времена относятся к одному и тому же дню.

Напишите функцию `cheaters()`, которая возвращает список имён студентов, которые жульничали.

</programming-exercise>

<programming-exercise name='Кто жульничал, версия 2' anchor="Who cheated, version 2" tmcname='part07-15_who_cheated_2'>

У вас снова есть CSV‑файлы из предыдущего задания. Напишите функцию `final_points()`, которая возвращает итоговые экзаменационные баллы студентов в виде словаря, соблюдая следующие правила:

* Если для одного задания есть несколько сдач, учитывается сдача с максимальным количеством баллов.
* Если сдача сделана позже чем через 3 часа после начала, она игнорируется.

Задания пронумерованы от 1 до 8, каждая сдача оценивается от 0 до 6 баллов.

В возвращаемом словаре ключом должно быть имя студента, а значением — сумма баллов, полученных студентом.

Подсказка: вложенные словари могут оказаться удобным способом хранить данные о заданиях и времени сдачи каждого студента.

</programming-exercise>

## Где искать модули {#looking-for-modules}

В официальной документации Python есть информация обо всех модулях стандартной библиотеки:

* https://docs.python.org/3/library/

Помимо стандартной библиотеки, в интернете есть множество свободно доступных модулей Python для самых разных задач. Список некоторых популярных модулей:

* https://wiki.python.org/moin/UsefulModules

<programming-exercise name='Проверка орфографии, версия 2' anchor="Spell checker, version 2" tmcname='part07-16_spellchecker_2'>

В этом задании вы напишете улучшенную версию проверки орфографии из [предыдущей части](/ru/part-6/1-reading-files).

Как и раньше, программа должна попросить пользователя ввести строку текста. Затем программа должна выполнить проверку орфографии и вывести пользователю результат так, чтобы все слова с ошибками были окружены звёздочками. Кроме того, _программа должна вывести список вариантов исправлений для слов с ошибками_.

Посмотрите на два примера ниже.

<sample-output>

write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
suggestions:
ptython: python, pythons, typhon
</pre>

</sample-output>

<sample-output>

write text: **this is acually a good and usefull program**
<pre>
this is *acually* a good and *usefull* program
suggestions:
acually: actually, tactually, factually
usefull: usefully, useful, museful
</pre>

</sample-output>

Подсказки нужно формировать с помощью функции [get\_close\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) из модуля стандартной библиотеки Python [difflib](https://docs.python.org/3/library/difflib.html).

**Важно:** чтобы автоматические тесты работали корректно, используйте функцию с настройками «по умолчанию». То есть передавайте ей только два аргумента: слово с ошибкой и список слов.

</programming-exercise>

<!---
<quiz id="311e3116-a763-50b5-b79e-056fdccb3394"></quiz>
-->
