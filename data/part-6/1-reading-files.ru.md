---
path: /ru/part-6/1-reading-files
title: Чтение файлов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы узнаете, как читать содержимое файлов в Python
- вы будете понимать, что такое текстовый файл и CSV‑файл
- вы сможете обрабатывать содержимое CSV‑файлов в своих программах

</text-box>

<!--тот же текст есть в разделах 3-1, 5-1 и 6-1; если меняете здесь — проверьте и там-->
<text-box variant='hint' name="Об упражнениях на этом курсе">

Чтобы стать уверенным программистом, нужно много практиковаться — иногда даже довольно «механически». Также важно развивать навыки решения задач и интуицию. Поэтому в этом курсе много упражнений разных типов. Некоторые из них предлагают просто применить то, что вы только что изучили, а некоторые намеренно сделаны более сложными и открытыми.

Некоторые упражнения поначалу могут показаться слишком трудными — это нормально и не повод переживать. Ни одно упражнение не является строго обязательным, и на самом деле _для прохождения курса достаточно набрать лишь 25% баллов в каждой части_. Подробнее — на [странице об оценивании](/ru/grading-and-exams).

**Упражнения не расположены в порядке сложности.** Обычно в каждом разделе вводятся новые концепции, а затем они закрепляются упражнениями — как простыми, так и более сложными. **Если вам попалось упражнение, которое кажется слишком трудным, переходите к следующему.** К сложным упражнениям можно вернуться позже, если останется время.

И когда (неизбежно) станет трудно, небольшое утешение: задача, которая кажется невозможной на этой неделе, через четыре недели, скорее всего, покажется довольно простой.

</text-box>

Один из самых частых случаев применения программирования — работа с данными, хранящимися в файлах. Программы могут читать данные из файлов и записывать вычисленные результаты обратно в файлы. Даже большие объёмы данных удобно обрабатывать автоматически, если использовать файлы.

В этом курсе мы будем работать только с _текстовыми файлами_. Все используемые файлы будут состоять из строк текста. Например, редактор Visual Studio Code, которым мы пользуемся, работает именно с текстовыми файлами. Важно: хотя текстовые редакторы вроде Microsoft Word тоже используются для работы с «текстом», сами документы Word не являются текстовыми файлами. Они содержат информацию о форматировании и имеют такую кодировку, из‑за которой обрабатывать их в программах заметно сложнее.

## Чтение данных из файла {#reading-data-from-a-file}

Сначала поработаем с файлом `example.txt` со следующим содержимым:

<sample-data>

Hello there!
This example file contains three lines of text.
This is the last line.

</sample-data>

Простой способ работать с файлами в Python — использовать конструкцию `with`. Строка заголовка открывает файл, затем идёт блок, в котором файл доступен. После блока файл автоматически закрывается и больше недоступен.

Например, следующий код открывает файл, читает содержимое, печатает его и затем закрывает файл:

```python
with open("example.txt") as new_file:
    contents = new_file.read()
    print(contents)
```

<sample-output>

Hello there!
This example file contains three lines of text.
This is the last line.

</sample-output>

Переменная `new_file` в примере выше — это _дескриптор файла_ (file handle). Через него можно обращаться к файлу, пока он открыт. Здесь мы использовали метод `read`, который возвращает содержимое файла одной строкой. В нашем случае строка, возвращаемая `read`, была бы такой:

```
"Hello there!\nThis example file contains three lines of text.\nThis is the last line."
```

## Построчный обход файла {#going-through-the-contents-of-a-file}

Метод `read` удобен, когда нужно получить содержимое файла целиком, но чаще нам потребуется проходить файл построчно.

Текстовый файл можно представить как список строк, где каждая строка — одна строка файла. Такой «список строк» можно перебрать циклом `for`.

Следующий пример читает наш файл с помощью цикла `for`, удаляет символ перевода строки в конце каждой строки, считает количество строк и печатает каждую строку вместе с её номером. Также он подсчитывает суммарную длину строк:

```python
with open("example.txt") as new_file:
    count = 0
    total_length = 0

    for line in new_file:
        line = line.replace("\n", "")
        count += 1
        print("Line", count, line)
        length = len(line)
        total_length += length

print("Total length of lines:", total_length)
```

<sample-output>

Line 1 Hello there!
Line 2 This example file contains three lines of text.
Line 3 This is the last line.
Total length of lines: 81

</sample-output>

В конце каждой строки файла есть символ перевода строки `\n`, но функция `print` по умолчанию тоже добавляет перевод строки. В выводе выше нет лишних пустых строк, потому что символ `\n` в конце строк удаляется методом `replace`: он заменяет перевод строки на пустую строку. Благодаря этому длины строк вычисляются корректно.

<programming-exercise name='Наибольшее число' anchor="Largest number" tmcname='part06-01_largest_number'>

Файл `numbers.txt` содержит целые числа, по одному числу в строке. Содержимое может выглядеть так:

```sh
2
45
108
3
-10
1100
...и так далее...
```

Напишите функцию `largest`, которая читает файл и возвращает наибольшее число в файле.

Обратите внимание: функция не принимает аргументов. Файл всегда называется `numbers.txt`.

**Важно:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите инструкции сразу после этого упражнения.

</programming-exercise>

## Что делать, если Visual Studio Code не может найти файл? {#what-if-visual-studio-code-cannot-find-my-file}

При запуске программы Visual Studio Code может сообщить, что не находит файл, хотя вы проверили имя и убедились, что файл существует. Попробуйте изменить следующую настройку — это часто решает проблему:

* Откройте настройки через меню: _File_ -> _Preferences_ -> _Settings_
* Найдите нужную настройку по поиску `executeinfile`
* Выберите вкладку _Workspace_
* Выберите опцию в разделе _Python_ -> _Terminal_ -> _Execute In File Dir_

Окно настроек должно выглядеть примерно так:

<img src="6_1_1.png">

Если это не помогает, можно скопировать файл из папки _src_

<img src="6_1_2.png">

прямо в корень папки упражнения

<img src="6_1_3.png">

## Отладка программ, работающих с файлами {#debugging-code-which-handles-files}

При использовании [отладчика](/ru/part-4/1-vscode#the-built-in-debugger) Visual Studio Code для программ, работающих с файлами, часто появляется неприятное сообщение об ошибке:

<img src="6_1_4.png">

Причина в том, что отладчик всегда ищет файлы в корне папки упражнения. Настройка _Execute In File Dir_ на это не влияет. Самое простое решение — скопировать нужный файл в корень папки.

После копирования всех необходимых файлов может понадобиться перезапустить Visual Studio Code.

## Чтение CSV‑файлов {#reading-csv-files}

CSV‑файл (сокращение от _comma‑separated values_) — это текстовый файл с данными, разделёнными заранее выбранным символом. Чаще всего используют запятую `,` или точку с запятой `;`, но в принципе разделителем может быть любой символ.

CSV‑файлы часто используют для хранения записей разных типов. Многие базы данных и табличные редакторы (например, Excel) умеют импортировать и экспортировать данные в CSV, благодаря чему удобно обмениваться данными между разными системами.

Мы уже научились перебирать строки файла циклом `for`, но как разделить поля внутри одной строки? Для этого в Python есть строковый метод `split`. Он принимает строку‑разделитель и возвращает список частей исходной строки, разделённой по этому разделителю.

Пример работы метода:

```python
text = "monkey,banana,harpsichord"
words = text.split(",")
for word in words:
    print(word)
```

<sample-output>

monkey
banana
harpsichord

</sample-output>

Предположим, есть файл `grades.csv` с именами студентов и их оценками по курсам. Каждая строка содержит данные одного студента, а поля разделены точкой с запятой.

<sample-data>

Paul;5;4;5;3;4;5;5;4;2;4
Beth;3;4;2;4;4;2;3;1;3;3
Ruth;4;5;5;4;5;5;4;5;4;4

</sample-data>

Следующая программа проходит по файлу построчно, разбивает каждую строку на части и печатает имя и оценки каждого студента.

```python
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades = parts[1:]
        print("Name:", name)
        print("Grades:", grades)
```

<sample-output>

Name: Paul
Grades: ['5', '4', '5', '3', '4', '5', '5', '4', '2', '4']
Name: Beth
Grades: ['3', '4', '2', '4', '4', '2', '3', '1', '3', '3']
Name: Ruth
Grades: ['4', '5', '5', '4', '5', '5', '4', '5', '4', '4']

</sample-output>

<programming-exercise name='Фруктовый рынок' anchor="Fruit market" tmcname='part06-02_fruit_market'>

Файл `fruits.csv` содержит названия фруктов и их цены в формате, показанном в примере:

```sh
banana;6.50
apple;4.95
orange;8.0
...и так далее...
```

Напишите функцию `read_fruits`, которая читает файл и возвращает словарь по его содержимому. В словаре ключом должно быть название фрукта, а значением — его цена. Цены должны быть типа `float`.

Важно: функция не принимает аргументов. Файл всегда называется `fruits.csv`.

</programming-exercise>

<programming-exercise name='Матрица' anchor="Matrix" tmcname='part06-03_matrix'>

Файл `matrix.txt` содержит матрицу в формате, показанном в примере:

```sh
1,0,2,8,2,1,3,2,5,2,2,2
9,2,4,5,2,4,2,4,1,10,4,2
...и так далее...
```

Напишите две функции: `matrix_sum` и `matrix_max`. Обе должны пройти по матрице в файле и вернуть соответственно сумму элементов и максимальный элемент.

Также напишите функцию `row_sums`, которая возвращает список сумм строк матрицы. Например, если матрица в файле такая:

```sh
1,2,3
2,3,4
```

то функция должна вернуть список `[6, 9]`.

Подсказка: вы можете добавить в программу и вспомогательные функции. Полезно подумать, какая логика общая для трёх функций, которые нужно написать. Обратите внимание: три указанные функции не принимают аргументов, но ваши вспомогательные функции могут принимать аргументы. Файл всегда называется `matrix.txt`.

**Важно:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите инструкции перед этим упражнением.

</programming-exercise>

## Чтение одного и того же файла несколько раз {#reading-the-same-file-multiple-times}

Иногда в одной программе нужно обработать содержимое файла больше одного раза. Рассмотрим программу, которая работает с персональными данными, записанными в CSV‑файле:

<sample-data>
Peter;40;Helsinki
Emily;34;Espoo
Eric;42;London
Adam;100;Amsterdam
Alice;58;Paris
</sample-data>

```python
with open("people.csv") as new_file:
    # вывести имена
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

    # найти самого старшего
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("the oldest is", oldest)
```

Если запустить этот код, появится довольно загадочное сообщение об ошибке:

```python
Traceback (most recent call last):
    print("the oldest is"; oldest)
UnboundLocalError: local variable 'oldest' referenced before assignment
```

Это происходит потому, что второй цикл `for` вообще не выполняется: файл можно «прочитать» только один раз. Когда прочитана последняя строка, позиция чтения оказывается в конце файла, и данные больше недоступны через этот дескриптор.

Если мы хотим снова пройти по файлу во втором цикле `for`, нужно открыть файл второй раз:

```python
with open("people.csv") as new_file:
    # вывести имена
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

with open("people.csv") as new_file:
    # найти самого старшего
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("the oldest is", oldest)
```

Хотя такой код заработает, в нём много ненужного повторения. Обычно лучше прочитать файл один раз и сохранить данные в удобном формате для дальнейшей обработки:

```python
people = []
# читаем содержимое файла и сохраняем в список
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(";")
        people.append((parts[0], int(parts[1]), parts[2]))

# вывести имена
for person in people:
    print("Name:", person[0])

# найти самого старшего
age_of_oldest = -1
for person in people:
    name = person[0]
    age = person[1]
    if age > age_of_oldest:
        age_of_oldest = age
        oldest = name
print("the oldest is", oldest)
```

## Дополнительная обработка CSV‑файлов {#more-csv-file-processing}

Продолжим работать с файлом `grades.csv`, у которого такое содержимое:

<sample-data>

Paul;5;4;5;3;4;5;5;4;2;4
Beth;3;4;2;4;4;2;3;1;3;3
Ruth;4;5;5;4;5;5;4;5;4;4

</sample-data>

Следующая программа создаёт словарь `grades` по содержимому файла. Ключи — имена студентов, а значения — списки оценок каждого студента. Оценки преобразуются в целые числа, чтобы их было удобнее обрабатывать.

```python
grades = {}
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades[name] = []
        for grade in parts[1:]:
            grades[name].append(int(grade))

print(grades)
```

<sample-output>

{'Paul': [5, 4, 5, 3, 4, 5, 5, 4, 2, 4], 'Beth': [3, 4, 2, 4, 4, 2, 3, 1, 3, 3], 'Ruth': [4, 5, 5, 4, 5, 5, 4, 5, 4, 4]}

</sample-output>

Теперь по словарю `grades` можно вывести статистику по каждому студенту:

```python
for name, grade_list in grades.items():
    best = max(grade_list)
    average = sum(grade_list) / len(grade_list)
    print(f"{name}: best grade {best}, average {average:.2f}")
```

<sample-output>

Paul: best grade 5, average 4.10
Beth: best grade 4, average 2.90
Ruth: best grade 5, average 4.50

</sample-output>

Внимательно посмотрите на программу выше. Сначала она может показаться сложной, но этот приём можно использовать для обработки файлов с данными самых разных типов.

## Удаление лишних строк, пробелов и переводов строк {#removing-unnecessary-lines-spaces-and-line-breaks}

Предположим, у нас есть CSV‑файл с именами, экспортированный из Excel:

```sh
first; last
Paul; Python
Jean; Java
Harry; Haskell
```

Excel известен тем, что добавляет лишние пробелы. Здесь после каждой точки с запятой появился дополнительный пробел между значениями.

Мы хотим вывести фамилии всех людей из списка. Первая строка содержит заголовки столбцов, её можно безопасно игнорировать:

```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(";")
        # пропустить строку заголовка
        if parts[0] == "first":
            continue
        last_names.append(parts[1])

print(last_names)
```

Если выполнить программу, получится:

<sample-output>

[' Python\n', ' Java\n', ' Haskell']

</sample-output>

У первых двух элементов в конце есть символ перевода строки, а у всех трёх — лишний пробел в начале.

Мы уже использовали метод `replace`, чтобы убирать лишние символы, но более удобный способ — строковый метод `strip`, который удаляет пробельные символы в начале и конце строки. Он убирает пробелы, переводы строк, табуляции и другие символы, которые обычно не видны при печати.

Можно попробовать в консоли Python:

```python
>>> " tryout ".strip()
'tryout'
>>> "\n\ntest\n".strip()
'test'
>>>
```

Чтобы применить `strip`, нужно совсем немного изменить программу:

```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "first":
            continue # это строка заголовка, поэтому пропускаем
        last_names.append(parts[1].strip())
print(last_names)
```

Теперь вывод аккуратный:

<sample-output>

['Python', 'Java', 'Haskell']

</sample-output>

Есть и похожие методы `lstrip` и `rstrip`. Они удаляют пробельные символы только слева или только справа соответственно: `l` — от слова _left_, `r` — от слова _right_:

```python
>>> " teststring  ".rstrip()
' teststring'
>>> " teststring  ".lstrip()
'teststring  '
```

## Объединение данных из разных файлов {#combining-data-from-different-files}

Очень часто данные, которые обрабатывает программа, распределены по нескольким файлам. Рассмотрим ситуацию, в которой личные данные сотрудников компании хранятся в файле `employees.csv`:

```csv
pic;name;address;city
080488-123X;Pekka Mikkola;Vilppulantie 7;00700 Helsinki
290274-044S;Liisa Marttinen;Mannerheimintie 100 A 10;00100 Helsinki
010479-007Z;Arto Vihavainen;Pihapolku 4;01010 Kerava
010499-345K;Leevi Hellas;Tapiolantie 11 B;02000 Espoo
```

Зарплаты хранятся в отдельном файле `salaries.csv`:

```csv
pic;salary;bonus
080488-123X;3300;0
290274-044S;4150;200
010479-007Z;1300;1200
```

В обеих таблицах каждая строка содержит _личный идентификационный код_ (personal identity code, PIC), который позволяет понять, чьи именно данные мы рассматриваем. Используя PIC как общий идентификатор, легко сопоставить имена сотрудников и их зарплаты. Например, можно вывести такой список ежемесячных доходов:

<sample-output>

<pre>
incomes:
Pekka Mikkola    3300 euros
Liisa Marttinen  4350 euros
Arto Vihavainen  2500 euros
</pre>

</sample-output>

Эта программа использует два словаря как вспомогательные структуры данных: `names` и `salaries`. В обоих словарях PIC выступает ключом:

```python
names = {}

with open("employees.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        names[parts[0]] = parts[1]

salaries = {}

with open("salaries.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        salaries[parts[0]] = int(parts[1]) +int(parts[2])

print("incomes:")

for pic, name in names.items():
    if pic in salaries:
        salary = salaries[pic]
        print(f"{name:16} {salary} euros")
    else:
        print(f"{name:16} 0 euros")
```

Сначала программа создаёт словари `names` и `salaries`. Их содержимое выглядит так:

```sh
{
    '080488-123X': 'Pekka Mikkola',
    '290274-044S': 'Liisa Marttinen',
    '010479-007Z': 'Arto Vihavainen',
    '010499-345K': 'Leevi Hellas'
}

{
    '080488-123X': 3300,
    '290274-044S': 4350,
    '010479-007Z': 2500
}
```

Цикл `for` в конце программы объединяет имена сотрудников с их соответствующими зарплатами.

Программа также обрабатывает ситуацию, когда PIC сотрудника отсутствует в файле зарплат.

Помните: порядок хранения элементов в словаре не важен, так как обработка ключей основана на хеш‑значениях.

<programming-exercise name='Оценки по курсу, часть 1' anchor="Course grading, part 1" tmcname='part06-04_course_grading_part_1'>

Эта программа работает с двумя CSV‑файлами. В одном хранится информация о студентах курса:

```csv
id;first;last
12345678;peter;pythons
12345687;jean;javanese
12345699;alice;adder
```

В другом — количество упражнений, выполненных каждым студентом по неделям:

```csv
id;e1;e2;e3;e4;e5;e6;e7
12345678;4;1;1;4;5;2;4
12345687;3;5;3;1;5;4;6
12345699;10;2;2;7;10;2;2
```

Как видно, в обоих CSV‑файлах есть строка заголовков, которая описывает содержимое столбцов.

Напишите программу, которая спрашивает у пользователя имена этих двух файлов, читает их и затем печатает общее количество упражнений, выполненных каждым студентом. Если файлы содержат данные, как в примерах выше, программа должна напечатать:

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
pekka peloton 21
jaana javanainen 27
liisa virtanen 35

</sample-output>

Подсказка: при тестировании быстро надоедает каждый раз вводить имена файлов. Можно временно подставить ввод прямо в код (жёстко задать значения), например так:

```python
if False:
    # этот код никогда не выполняется
    student_info = input("Student information: ")
    exercise_data = input("Exercises completed: ")
else:
    # подставляем ввод прямо в код
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

Теперь «настоящая» логика ввода спрятана в ветке `False` и никогда не выполнится.

Если вы хотите быстро проверить, что программа корректно работает и с настоящим вводом, просто замените `False` на `True`:

```python

if True:
    student_info = input("Student information: ")
    exercise_data = input("Exercises completed: ")
else:
    # теперь это ветка False, и она никогда не выполняется
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

Когда убедитесь, что программа работает правильно, можно убрать конструкцию `if`, оставив обычные команды запроса ввода.

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

**Важно 2:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите [эти инструкции](/ru/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

</programming-exercise>

<programming-exercise name='Оценки по курсу, часть 2' anchor="Course grading, part 2" tmcname='part06-05_course_grading_part_2'>

Расширим программу из предыдущего упражнения. Теперь в отдельном CSV‑файле указаны баллы за экзамен каждого студента. Формат файла такой:

```csv
id;e1;e2;e3
12345678;4;1;4
12345687;3;5;3
12345699;10;2;2
```

В примере выше студент с номером 12345678 получил за экзамен 4+1+4 балла, всего 9.

Программа снова должна спросить у пользователя имена файлов, обработать данные и вывести оценку для каждого студента.

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
pekka peloton 0
jaana javanainen 1
liisa virtanen 3

</sample-output>

Выполненные упражнения переводятся в _баллы за упражнения_ (exercise points): выполнение хотя бы 10% всех упражнений даёт 1 балл, 20% — 2 балла и так далее. Выполнение всех 40 упражнений даёт 10 баллов. Количество баллов всегда целое (округляется вниз).

Итоговая оценка за курс определяется по сумме баллов за экзамен и баллов за упражнения согласно таблице:

баллы за экзамен + баллы за упражнения   | оценка
:--:|:----:
0-14 | 0 (не сдал)
15-17 | 1
18-20 | 2
21-23 | 3
24-27 | 4
28- | 5

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<programming-exercise name='Оценки по курсу, часть 3' anchor="Course grading, part 3" tmcname='part06-06_course_grading_part_3'>

Это упражнение продолжает предыдущее. Теперь нужно вывести статистику на основе CSV‑файлов.

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
<pre>
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-output>

Каждая строка содержит информацию об одном студенте. В аккуратно выровненных столбцах показываются: количество выполненных упражнений, количество баллов за упражнения, количество баллов за экзамен, общее количество баллов и оценка. Ширина столбца имени должна быть 30 символов, а остальные столбцы — по 10 символов.

Здесь вам пригодятся f-строки из [части 4](/ru/part-4/5-print-statement-formatting).

При выравнивании столбцов f‑строки по‑разному ведут себя для строк и чисел:

```python
word = "python"
print(f"{word:10}continues")
print(f"{word:>10}continues")
```

<sample-output>

<pre>
python    continues
    pythoncontinues
</pre>

</sample-output>

Как видно, по умолчанию строки выравниваются по _левому_ краю отведённой области. Символ `>` позволяет выровнять по правому краю.

Для чисел логика обратная:

```python
number = 42
print(f"{number:10}continues")
print(f"{number:<10}continues")
```

<sample-output>

<pre>
        42continues
42        continues
</pre>

</sample-output>

У чисел по умолчанию выравнивание идёт по _правому_ краю. Символ `<` позволяет выровнять по левому краю.

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<programming-exercise name='Проверка орфографии' anchor="Spell checker" tmcname='part06-07_spellchecker'>

Напишите программу, которая просит пользователя ввести текст. Затем программа должна выполнить проверку орфографии и вывести результат так, чтобы все слова с ошибками были окружены звёздочками. Смотрите два примера ниже:

<sample-output>

Write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
</pre>

</sample-output>

<sample-output>

Write text: **This is acually a good and usefull program**
<pre>
This is *acually* good and *usefull* program
</pre>

</sample-output>

Регистр букв не должен влиять на работу программы.

В шаблоне упражнения есть файл `wordlist.txt` — в нём перечислены слова, которые проверка орфографии должна считать корректными.

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

**Важно 2:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите [эти инструкции](/ru/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).


</programming-exercise>

<programming-exercise name='Поиск рецептов' anchor="Recipe search" tmcname='part06-08_recipe_search'>

В этом упражнении вы напишете программу, которая позволяет искать рецепты по названию, времени приготовления или ингредиентам. Программа должна читать рецепты из файла, имя которого вводит пользователь.

Каждый рецепт состоит из трёх или более строк. В первой строке — название рецепта, во второй строке — целое число (время приготовления в минутах), а в следующих строках — ингредиенты, по одному в строке. Рецепт заканчивается пустой строкой, кроме последнего рецепта в файле: он заканчивается концом файла. Поэтому в одном файле может быть несколько рецептов, как в примере ниже.

```sh
Pancakes
15
milk
eggs
flour
sugar
salt
butter

Meatballs
45
mince
eggs
breadcrumbs

Tofu rolls
30
tofu
rice
water
carrot
cucumber
avocado
wasabi

Cake pops
60
milk
bicarbonate
eggs
salt
sugar
cardamom
butter
```

**Подсказка:** возможно, удобнее сначала прочитать все строки файла в список, а затем обрабатывать этот список, как требуется по заданию.

#### Поиск рецептов по названию {#search-for-recipes-based-on-the-name-of-the-recipe}

Напишите функцию `search_by_name(filename: str, word: str)`, которая принимает имя файла и строку поиска. Функция должна пройти по файлу и выбрать все рецепты, в названии которых встречается строка поиска. Названия найденных рецептов нужно вернуть списком.

Пример работы функции:

```python
found_recipes = search_by_name("recipes1.txt", "cake")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes
Cake pops

</sample-output>

Как видно из примера, регистр букв не важен. Поиск по _cake_ находит и _Pancakes_, и _Cake pops_, хотя во втором случае слово начинается с заглавной буквы.

**Важно:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите [эти инструкции](/ru/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### Поиск рецептов по времени приготовления {#search-for-recipes-based-on-the-preparation-time}

Напишите функцию `search_by_time(filename: str, prep_time: int)`, которая принимает имя файла и целое число. Функция должна выбрать из файла все рецепты, время приготовления которых не превышает переданное значение.

Названия найденных рецептов нужно вернуть списком, но к каждому названию следует добавить время приготовления. Посмотрите пример ниже.

```python
found_recipes = search_by_time("recipes1.txt", 20)

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min

</sample-output>

#### Поиск рецептов по ингредиентам {#search-for-recipes-based-on-the-ingredients}

**Предупреждение:** третья часть задания заметно сложнее первых двух. Если вы чувствуете, что застряли, возможно, стоит перейти к другим упражнениям этой части, а затем вернуться сюда, если останется время. Помните, вы можете отправить решение и получить баллы за первые две части, даже если третью часть ещё не сделали.

Напишите функцию `search_by_ingredient(filename: str, ingredient: str)`, которая принимает имя файла и строку поиска. Функция должна выбрать из файла все рецепты, в ингредиентах которых встречается строка поиска.

Названия найденных рецептов нужно вернуть списком так же, как во второй части — с добавленным временем приготовления. Смотрите пример:

```python
found_recipes = search_by_ingredient("recipes1.txt", "eggs")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min
Meatballs, preparation time 45 min
Cake pops, preparation time 60 min

</sample-output>

</programming-exercise>

<programming-exercise name='Городские велосипеды' anchor="City bikes" tmcname='part06-09_city_bikes'>

В этом упражнении вы напишете несколько функций для работы с файлом, содержащим данные о расположении станций [городских велосипедов в Хельсинки](https://www.hsl.fi/en/citybikes).

Каждый файл имеет такой формат:

```csv
Longitude;Latitude;FID;name;total_slot;operative;id
24.950292890004903;60.155444793742276;1;Kaivopuisto;30;Yes;001
24.956347471358754;60.160959093887129;2;Laivasillankatu;12;Yes;002
24.944927399779715;60.158189199971673;3;Kapteeninpuistikko;16;Yes;003
```

Каждая станция занимает одну строку. В строке указаны координаты, название и другие идентифицирующие данные станции.

#### Расстояние между станциями {#distance-between-stations}

Сначала напишите функцию `get_station_data(filename: str)`. Она должна прочитать названия и координаты всех станций и вернуть их в виде словаря такого формата:

<sample-output>

<pre>
{
  "Kaivopuisto": (24.950292890004903, 60.155444793742276),
  "Laivasillankatu": (24.956347471358754, 60.160959093887129),
  "Kapteeninpuistikko": (24.944927399779715, 60.158189199971673)
}
</pre>

</sample-output>

Ключи словаря — названия станций, а значения — кортежи с координатами станции. Первый элемент кортежа — поле _Longitude_, второй — поле _Latitude_.

Затем напишите функцию `distance(stations: dict, station1: str, station2: str)`, которая возвращает расстояние между двумя станциями, переданными аргументами.

Расстояние вычисляется по теореме Пифагора. Множители ниже — приближённые коэффициенты для перевода широты и долготы в километры в регионе Хельсинки.

```python
# понадобится функция sqrt из модуля math
import math

x_km = (longitude1 - longitude2) * 55.26
y_km = (latitude1 - latitude2) * 111.2
distance_km = math.sqrt(x_km**2 + y_km**2)
```

Примеры использования функции:

```python
stations = get_station_data('stations1.csv')
d = distance(stations, "Designmuseo", "Hietalahdentori")
print(d)
d = distance(stations, "Viiskulma", "Kaivopuisto")
print(d)
```

<sample-output>

0.9032737292463177
0.7753594392019532

</sample-output>

**Важно:** если Visual Studio Code не находит файл и вы уверены, что в имени нет ошибок, посмотрите [эти инструкции](/ru/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### Наибольшее расстояние {#the-greatest-distance}

Напишите функцию `greatest_distance(stations: dict)`, которая находит две станции, находящиеся на максимальном расстоянии друг от друга. Функция должна вернуть кортеж, где первые два элемента — названия станций, а третий — расстояние между ними.

```python
stations = get_station_data('stations1.csv')
station1, station2, greatest = greatest_distance(stations)
print(station1, station2, greatest)
```

<sample-output>

Laivasillankatu Hietalahdentori 1.478708873076181

</sample-output>

</programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->
