---
path: /ru/part-6/2-writing-files
title: Запись файлов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как создавать файлы с помощью Python
- вы сможете записывать в файл текстовые данные
- вы будете знать, как создавать CSV‑файлы

</text-box>

До сих пор мы читали данные из файлов, но, разумеется, можно и записывать данные в файлы. Обычно программа обрабатывает данные и сохраняет результат в файл, чтобы затем использовать его позже или передать на обработку другой программе.

Можно каждый раз создавать новый файл для записи, а можно дописывать данные в конец уже существующего файла. В обоих случаях используется функция `open` из предыдущего раздела. Для записи в файл функции нужен второй аргумент.

## Создание нового файла {#creating-a-new-file}

Чтобы создать новый файл, вызовите `open` с дополнительным аргументом `w`, означающим режим записи (write mode). Например:

```python
with open("new_file.txt", "w") as my_file:
    # код для записи в файл
```

**Важно:** если файл уже существует, его содержимое будет полностью перезаписано. Будьте осторожны при создании новых файлов.

Когда файл открыт, в него можно записывать данные. Для этого используйте метод `write`, который принимает строку, которую нужно записать, в качестве аргумента.

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
```

После запуска программы в каталоге появится новый файл `new_file.txt`. Его содержимое будет таким:

<sample-data>

Hello there!

</sample-data>

Если вам нужны переводы строк, их придётся добавлять вручную — функция `write` работает не совсем так, как более привычная `print`, хотя в целом они похожи. Поэтому следующий код

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
    my_file.write("This is the second line")
    my_file.write("This is the last line")
```

создаст файл со следующим содержимым:

<sample-data>

Hello there!This is the second lineThis is the last line

</sample-data>

Переводы строк добавляются с помощью символа новой строки `\n` в записываемых строках:

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!\n")
    my_file.write("This is the second line\n")
    my_file.write("This is the last line\n")
```

Теперь содержимое `new_file.txt` будет таким:

<sample-data>

Hello there!
This is the second line
This is the last line

</sample-data>

<programming-exercise name='Посвящение' anchor="Inscription" tmcname='part06-10_inscription'>

Напишите программу, которая спрашивает имя пользователя и затем создаёт «посвящение» в файле, указанном пользователем. См. пример ниже.

<sample-output>

Whom should I sign this to: **Ada**
Where shall I save it: **inscribed.txt**

</sample-output>

Содержимое файла `inscribed.txt` будет таким:

<sample-data>

Hi Ada, we hope you enjoy learning Python with us! Best, Mooc.fi Team

</sample-data>

**Важно:** в этом задании не требуется писать функции, поэтому __не__ помещайте код в блок `if __name__ == "__main__"`.

</programming-exercise>

## Добавление данных в существующий файл {#appending-data-to-an-existing-file}

Если нужно дописать данные в конец файла, не перезаписывая его целиком, откройте файл в режиме добавления (append mode) с аргументом `a`.

Если файла ещё нет, режим добавления работает так же, как режим записи.

Следующая программа открывает файл `new_file.txt` и дописывает в конец пару строк текста:

```python
with open("new_file.txt", "a") as my_file:
    my_file.write("This is the 4th line\n")
    my_file.write("And yet another line.\n")
```

После выполнения программы содержимое файла будет таким:

<sample-output>

Hello there!
This is the second line
This is the last line
This is the 4th line
And yet another line.

</sample-output>

На практике дописывать данные в файл приходится не очень часто.

Гораздо чаще файл читают, обрабатывают и полностью перезаписывают. Например, если нужно изменить содержимое где‑то _в середине_ файла, обычно проще всего перезаписать файл целиком.

<programming-exercise name='Дневник' anchor="Diary" tmcname='part06-11_diary'>

Напишите программу, работающую как простой дневник. Записи дневника нужно сохранять в файл `diary.txt`. При запуске программа должна сначала прочитать записи, которые уже есть в файле.

Важно: автоматические тесты для этого задания будут изменять содержимое файла. Если вы хотите сохранить свои записи, сначала сделайте копию файла под другим именем.

Программа должна работать так:

<sample-output>

1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **Today I ate porridge**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **I went to the sauna in the evening**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!

</sample-output>

При втором запуске программы должно быть так:

<sample-output>

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!

</sample-output>

**Важно:** в этом задании не требуется писать функции, поэтому __не__ помещайте код в блок `if __name__ == "__main__"`.

</programming-exercise>

## Запись CSV‑файлов {#writing-csv-files}

CSV‑файлы можно записывать построчно с помощью метода `write`, как и любые другие файлы. В следующем примере создаётся файл `coders.csv`, где каждая строка содержит имя, рабочую среду, любимый язык и количество лет опыта одного программиста. Поля разделены точкой с запятой.

```python
with open("coders.csv", "w") as my_file:
    my_file.write("Eric;Windows;Pascal;10\n")
    my_file.write("Matt;Linux;PHP;2\n")
    my_file.write("Alan;Linux;Java;17\n")
    my_file.write("Emily;Mac;Cobol;9\n")
```

После выполнения программы получится такой файл:

<sample-output>

Eric;Windows;Pascal;10
Matt;Linux;PHP;2
Alan;Linux;Java;17
Emily;Mac;Cobol;9

</sample-output>

А что если данные, которые нужно записать, уже находятся в памяти программы в виде списка?

```python
coders = []
coders.append(["Eric", "Windows", "Pascal", 10])
coders.append(["Matt", "Linux", "PHP", 2])
coders.append(["Alan", "Linux", "Java", 17])
coders.append(["Emily", "Mac", "Cobol", 9])
```

Можно собрать строку для записи с помощью f‑строки и записать готовую строку в файл так:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = f"{coder[0]};{coder[1]};{coder[2]};{coder[3]}"
        my_file.write(line+"\n")
```

Если бы список данных о каждом программисте был очень длинным и содержал больше элементов, собирать строку вручную было бы неудобно. Вместо этого можно использовать цикл `for`:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = ""
        for value in coder:
            line += f"{value};"
        line = line[:-1]
        my_file.write(line+"\n")
```

## Очистка содержимого файла и удаление файлов {#clearing-file-contents-and-deleting-files}

Иногда нужно очистить содержимое существующего файла. Это можно сделать, открыв файл в режиме записи и сразу же закрыв его:

```python
with open("file_to_be_cleared.txt", "w") as my_file:
    pass
```

В блоке `with` используется команда `pass`, которая ничего не делает. Python не позволяет оставлять блоки пустыми, поэтому эта команда нужна.

Можно обойтись и без блока `with`, написав однострочник:

```python
open('file_to_be_cleared.txt', 'w').close()
```

<text-box variant='hint' name='Удаление файлов'>

Можно также полностью удалить файл. Для этого понадобится помощь операционной системы:

```python
# команда для удаления файлов находится в модуле os
import os

os.remove("unnecessary_file.csv")
```

Важно: это не будет работать при запуске автоматических тестов на серверах курса из‑за технических ограничений тестовой среды. Если в задании нужно «очистить файл», используйте методы, описанные выше.

</text-box>


<programming-exercise name='Фильтрация содержимого файла' anchor="Filtering the contents of a file" tmcname='part06-12_filtering_file_contents'>

Файл `solutions.csv` содержит некоторые решения математических задач:

```csv
Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
```

Как видно из примера, каждая строка имеет формат `name_of_student;problem;result`. Все операции — либо сложение, либо вычитание, и в каждой операции ровно два операнда.

Напишите функцию `filter_solutions()`, которая:

* читает содержимое файла `solutions.csv`
* записывает строки с _верным_ результатом в файл `correct.csv`
* записывает строки с _неверным_ результатом в файл `incorrect.csv`

Для приведённого выше примера файл `correct.csv` будет содержать строки:

```sh
Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
```

Две остальные строки должны оказаться в файле `incorrect.csv`.

Записывайте строки в том же порядке, в котором они идут в исходном файле. Исходный файл менять нельзя.

Важно: функция должна давать один и тот же результат независимо от того, сколько раз её вызывают. То есть не должно быть разницы, вызвали ли функцию один раз:

```python
filter_solutions()
```

или несколько раз подряд:

```python
filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
```

После выполнения содержимое файлов `correct.csv` и `incorrect.csv` в обоих случаях должно быть одинаковым.

</programming-exercise>

<programming-exercise name='Сохранение личных данных' anchor="Store personal data" tmcname='part06-13_store_personal_data'>

Напишите функцию `store_personal_data(person: tuple)`, которая получает кортеж с некоторыми идентифицирующими данными.

Кортеж содержит следующие элементы:

* Имя (строка)
* Возраст (целое число)
* Рост (число с плавающей точкой)

Эти данные нужно обработать и записать в файл `people.csv`. Файл может уже содержать записи; новую запись нужно добавить в конец файла. Данные следует записывать в формате:

name;age;height

Каждая запись должна быть на отдельной строке. Если вызвать функцию с аргументом `("Paul Paulson", 37, 175.5)`, то в конец файла должна быть добавлена строка:

`Paul Paulson;37;175.5`

</programming-exercise>

## Обработка данных в формате CSV {#handling-data-in-a-csv-format}

Напишем программу, которая оценивает успеваемость студентов на курсе. Программа читает CSV‑файл с еженедельными баллами за упражнения, затем подсчитывает сумму и определяет оценку каждого студента. Наконец, программа создаёт CSV‑файл, содержащий сумму баллов и оценку для каждого студента.

CSV‑файл, который подаётся на вход программе, выглядит так:

<sample-data>

Peter;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Susan;3;4;3;5;3;4;4
Emily;6;6;5;5;0;4;8

</sample-data>

Логику программы удобно разделить на три функции: чтение и преобразование данных в удобный формат, определение оценки и запись результатов в файл.

Файл читается по тем же принципам, что и в предыдущем разделе. Данные сохраняются в словарь: ключ — имя студента, значение — список баллов (целые числа), полученных студентом.

```python
def read_weekly_points(filename):
    weekly_points = {}
    with open(filename) as my_file:
        for line in my_file:
            parts = line.split(";")
            point_list = []
            for points in parts[1:]:
                point_list.append(int(points))
            weekly_points[parts[0]] = point_list

    return weekly_points
```

Вторая функция определяет оценку по сумме баллов. Она используется в третьей функции, которая записывает результат в файл.

```python
def grade(points):
    if points < 20:
        return 0
    elif points < 25:
        return 1
    elif points < 30:
        return 2
    elif points < 35:
        return 3
    elif points < 40:
        return 4
    else:
        return 5

def save_results(filename, weekly_points):
    with open(filename, "w") as my_file:
        for name, point_list in weekly_points.items():
            point_sum = sum(point_list)
            my_file.write(f"{name};{point_sum};{grade(point_sum)}\n")
```

Такая структура позволяет написать очень простую «главную» часть программы. Обратите внимание: имена файлов, которые читаются и в которые записывается результат, передаются как аргументы:

```python
weekly_points = read_weekly_points("weekly_points.csv")
save_results("results.csv", weekly_points)
```

После выполнения программы содержимое созданного файла `results.csv` будет таким:

<sample-data>

Peter;18;0
Paula;34;3
Susan;26;2
Emily;41;5

</sample-data>

Обратите внимание: каждая из функций выше довольно проста и отвечает за одну задачу. Это распространённый и рекомендуемый подход при разработке более крупных программ. Принцип единственной ответственности упрощает проверку корректности, облегчает изменения в будущем и добавление новых возможностей.

Допустим, мы хотим добавить функцию, которая выводит оценку для одного студента. У нас уже есть функция, определяющая оценку, поэтому можно использовать её в новой функции:

```python
def get_grade(student_name, weekly_points):
    for name, point_list in weekly_points.items():
        if name == student_name:
            return grade(sum(point_list))


weekly_points = read_weekly_points("weekly_points.csv")
print(get_grade("Paula", weekly_points))

```

<sample-data>

3

</sample-data>

Если мы решим, что какую‑то часть функциональности нужно исправить, то в хорошо спроектированной программе изменения затронут лишь несколько конкретных мест, и будет проще понять, где именно их вносить. Например, если нужно изменить границы оценок, достаточно изменить только функцию определения оценки — и это автоматически отразится во всех местах, где эта функция используется. Если же одну и ту же логику реализовать в нескольких местах, есть риск, что при изменении мы забудем обновить какую‑то часть программы.

<programming-exercise name='Оценки по курсу, часть 4' anchor="Course grading, part 4" tmcname='part06-14_course_grading_part_4'>

Вернёмся к проекту по оценкам из предыдущего раздела.

В прошлый раз программа читала и обрабатывала файлы с информацией о студентах, количеством выполненных упражнений и результатами экзамена. Теперь добавим файл с информацией о курсе. Пример формата файла:

<sample-data>

<pre>

name: Introduction to Programming
study credits: 5
</pre>

</sample-data>

После этого программа должна создать два файла. Первый — `results.txt` со следующим содержимым:

<sample-data>

<pre>
Introduction to Programming, 5 credits
======================================
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-data>

Раздел статистики должен быть идентичен результату из части 3 проекта. Единственное добавление — заголовок.

Кроме того, программа должна создать файл `results.csv` в следующем формате:

<sample-data>

<pre>
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
</pre>

</sample-data>

После запуска программа должна выглядеть так:

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
Course information: **course1.txt**
Results written to files results.txt and results.csv

</sample-output>

То есть программа спрашивает только имена входных файлов. Весь вывод должен быть записан в файлы. Пользователь видит только подтверждающее сообщение.

**Важно:** в этом задании не требуется писать функции, поэтому __не__ помещайте код в блок `if __name__ == "__main__"`.

</programming-exercise>



<programming-exercise name='Поиск слов' anchor="Word search" tmcname='part06-15_word_search'>

В шаблоне задания есть файл `words.txt`, который содержит английские слова.

Напишите функцию `find_words(search_term: str)`. Она должна возвращать список всех слов из файла, которые соответствуют поисковому запросу.

Поисковый запрос может содержать строчные латинские буквы и следующие символы‑шаблоны (wildcards):

* Точка `.` означает, что на её месте подходит любой одиночный символ. Например, `ca.` даст слова вроде _cat_ и _car_, `p.ng` — слова вроде _ping_ и _pong_, а `.a.e` — слова вроде _sane_, _care_ и _late_.
* Звёздочка `*` в _конце_ запроса означает, что подходит любое слово, которое _начинается_ с запроса. Звёздочка в _начале_ запроса означает, что подходит любое слово, которое _заканчивается_ запросом. Например, `ca*` даст _california_, _cat_, _caring_ и _catapult_, а `*ane` — _crane_, _insane_ и _aeroplane_. В запросе может быть только одна звёздочка.
* Если в запросе нет символов‑шаблонов, нужно вернуть только слова, полностью совпадающие с запросом.

Можно считать, что оба типа шаблонов никогда не используются в одном и том же запросе.

Все слова в файле записаны в нижнем регистре. Также можно считать, что аргумент функции целиком в нижнем регистре.

Если подходящих слов нет, функция должна вернуть пустой список.

Подсказка: могут пригодиться строковые методы Python `startswith()` и `endswith()`. При желании найдите о них информацию в интернете.

Пример работы функции:

```python
print(find_words("*vokes"))
```

<sample-output>

['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']

</sample-output>

</programming-exercise>

<programming-exercise name='Словарь, хранящийся в файле' anchor="Dictionary stored in a file" tmcname='part06-16_dictionary_file'>

Напишите программу, которая работает как словарь. Пользователь может добавлять новые записи или искать существующие.

Программа должна работать так:

<sample-output>

1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **auto**
The word in English: **car**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **roska**
The word in English: **garbage**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **laukku**
The word in English: **bag**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **bag**
roska - garbage
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **car**
auto - car
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **laukku**
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **3**
Bye!

</sample-output>

Записи словаря нужно сохранять в файл `dictionary.txt`. При запуске программа должна сначала прочитать содержимое файла. Новые записи добавляются в конец файла каждый раз, когда пользователь добавляет слово в словарь.

Формат хранения данных в файле вы можете выбрать самостоятельно.

**Важно:** автоматические тесты для этого задания могут изменять содержимое файла. Если вы хотите сохранить свои данные, сначала сделайте копию файла под другим именем.

**Важно 2:** в этом задании не требуется писать функции, поэтому __не__ помещайте код в блок `if __name__ == "__main__"`.


</programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->
