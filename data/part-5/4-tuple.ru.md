---
path: /ru/part-5/4-tuple
title: Кортежи (tuple)
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с типом данных «кортеж» (tuple)
- вы сможете создавать кортежи из значений разных типов
- вы будете понимать разницу между кортежем и списком
- вы сможете назвать типичные случаи применения кортежей

</text-box>

Кортеж (tuple) — структура данных, во многом похожая на список. Самые важные различия такие:

* Кортежи записываются в круглых скобках `()`, а списки — в квадратных `[]`
* Кортежи _неизменяемы_ (immutable), а содержимое списка можно менять

Следующий код создаёт кортеж с координатами точки:

```python
point = (10, 20)
```

К элементам кортежа обращаются по индексу — так же, как к элементам списка:

```python
point = (10, 20)
print("x coordinate:", point[0])
print("y coordinate:", point[1])
```

<sample-output>

x coordinate: 10
y coordinate: 20

</sample-output>

Значения в кортеже нельзя изменить после создания кортежа. Следующий код _не_ сработает:

```python
point = (10, 20)
point[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

<programming-exercise name='Создать кортеж' anchor="Create a tuple" tmcname='part05-23_create_tuple'>

Напишите функцию `create_tuple(x: int, y: int, z: int)`, которая принимает три целых числа и создаёт и возвращает кортеж по следующим правилам:

1. Первый элемент кортежа — наименьший из аргументов
2. Второй элемент кортежа — наибольший из аргументов
3. Третий элемент кортежа — сумма аргументов

Пример использования:

```python

if __name__ == "__main__":
    print(create_tuple(5, 3, -1))

```

<sample-output>

(-1, 5, 7)

</sample-output>


</programming-exercise>

<programming-exercise name='Самый старший человек' anchor="The oldest person" tmcname='part05-24_oldest_person'>

Напишите функцию `oldest_person(people: list)`, которая принимает список кортежей. В каждом кортеже первый элемент — имя человека, второй — год рождения. Функция должна найти самого старшего человека в списке и вернуть его имя.

Пример использования:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```

<sample-output>

Mary

</sample-output>

</programming-exercise>

<programming-exercise name='Люди старше заданного года' anchor="Older people" tmcname='part05-25_older_people'>

В этом упражнении мы работаем с кортежами такого же вида, как в предыдущем задании.

Напишите функцию `older_people(people: list, year: int)`, которая выбирает из списка всех людей, родившихся _раньше_ года, переданного аргументом. Функция должна вернуть имена этих людей в новом списке.

Пример использования:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

older = older_people(people, 1979)
print(older)
```

<sample-output>

[ 'Adam', 'Mary' ]

</sample-output>

</programming-exercise>

## Зачем нужен кортеж? {#what-is-the-purpose-of-a-tuple}

Кортежи удобны, когда есть фиксированный набор связанных значений. Например, для хранения координат точки (x и y) кортеж — естественный выбор, потому что координаты всегда состоят ровно из двух значений:

```python
point = (10, 20)
```

Технически, конечно, можно хранить координаты и в списке:

```python
point = [10, 20]
```

Список — это коллекция элементов в определённом порядке, и его размер может меняться. А для координат точки мы хотим хранить именно x и y, а не произвольный список значений.

Поскольку кортежи неизменяемы (в отличие от списков), их можно использовать как ключи словаря. Следующий код создаёт словарь, где ключи — это точки с координатами:

```python
points = {}
points[(3, 5)] = "monkey"
points[(5, 0)] = "banana"
points[(1, 2)] = "harpsichord"
print(points[(3, 5)])
```

<sample-output>
monkey
</sample-output>

Если попытаться сделать то же самое со списками, это _не_ сработает:

```python
points = {}
points[[3, 5]] = "monkey"
points[[5, 0]] = "banana"
points[[1, 2]] = "harpsichord"
print(points[[3, 5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

## Кортежи без круглых скобок {#tuples-without-parentheses}

При создании кортежа круглые скобки не строго обязательны. Следующие два присваивания дают одинаковый результат:

```python
numbers = (1, 2, 3)
```

```python
numbers = 1, 2, 3
```

Это означает, что с помощью кортежей удобно возвращать сразу несколько значений. Посмотрим на пример:

```python
def minmax(my_list):
  return min(my_list), max(my_list)

my_list = [33, 5, 21, 7, 88, 312, 5]

min_value, max_value = minmax(my_list)
print(f"The smallest item is {min_value} and the greatest item is {max_value}")
```

<sample-output>

The smallest item is 5 and the greatest item is 312

</sample-output>

Эта функция возвращает два значения в кортеже. Возвращаемый кортеж присваивается сразу двум переменным:

```python
min_value, max_value = minmax(my_list)
```

Круглые скобки можно использовать, чтобы запись была нагляднее. В левой части присваивания у нас тоже кортеж из двух имён переменных. Значения из кортежа, который вернула функция, присваиваются этим двум переменным.

```python
(min_value, max_value) = minmax(my_list)
```

В предыдущем разделе мы использовали метод словаря `items`, чтобы получить все ключи и значения:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

И здесь тоже используются кортежи: `my_dictionary.items()` возвращает каждую пару ключ‑значение как кортеж, где первый элемент — ключ, а второй — значение.

Ещё один частый случай применения кортежей — обмен значениями двух переменных:

```python
number1, number2 = number2, number1
```

Эта строка меняет местами значения переменных `number1` и `number2`. Результат такой же, как и при использовании вспомогательной переменной:

```python
helper_var = number1
number1 = number2
number2 = helper_var
```

<programming-exercise name='База данных студентов' anchor="Student database" tmcname='part05-26_student_database'>

В этой серии упражнений вы создадите простую базу данных студентов. Прежде чем начать, уделите немного времени чтению инструкции и подумайте, какие структуры данных понадобятся, чтобы организовать хранение информации в программе.

#### Добавление студентов {#adding-students}

Сначала напишите функцию `add_student`, которая добавляет нового студента в базу. Также напишите предварительную версию функции `print_student`, которая печатает информацию об одном студенте.

Функции используются так:

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
print_student(students, "Peter")
print_student(students, "Eliza")
print_student(students, "Jack")
```

Программа должна напечатать:

<sample-output>

<pre>
Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
</pre>

</sample-output>

#### Добавление завершённых курсов {#adding-completed-courses}

Напишите функцию `add_course`, которая добавляет завершённый курс в информацию о конкретном студенте. Данные о курсе — это кортеж из названия курса и оценки:

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
print_student(students, "Peter")
```

После добавления курсов вывод изменится:

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### Повторное прохождение курсов {#repeating-courses}

Курсы с оценкой 0 нужно игнорировать при добавлении. Кроме того, если курс уже есть в информации о студенте, при повторном добавлении оценка в базе не должна уменьшаться.

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
add_course(students, "Peter", ("Data Structures and Algorithms", 0))
add_course(students, "Peter", ("Introduction to Programming", 2))
print_student(students, "Peter")
```

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### Сводка по базе данных {#summary-of-database}

Напишите функцию `summary`, которая печатает сводку по всей информации, хранящейся в базе.

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
add_course(students, "Peter", ("Data Structures and Algorithms", 1))
add_course(students, "Peter", ("Introduction to Programming", 1))
add_course(students, "Peter", ("Advanced Course in Programming", 1))
add_course(students, "Eliza", ("Introduction to Programming", 5))
add_course(students, "Eliza", ("Introduction to Computer Science", 4))
summary(students)
```

Это должно напечатать:

<sample-output>

<pre>
students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name="Квадрат из букв" anchor="A square of letters" tmcname="part05-27_letter_square">

Последнее упражнение этой части — довольно непростая задача на решение. Её можно решить разными способами. Хотя текущий раздел посвящён кортежам, кортежи не обязательно являются лучшим инструментом для решения именно этой задачи.

Напишите программу, которая печатает квадрат из букв, как показано в примерах ниже. Можно считать, что слоёв будет не больше 26.

<sample-output>

Layers: **3**
<pre>
CCCCC
CBBBC
CBABC
CBBBC
CCCCC
</pre>

</sample-output>

<sample-output>

Layers: **4**
<pre>
DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
</pre>

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->


Пожалуйста, ответьте на небольшой опрос по материалам этой недели.

<quiz id="34daa09c-da82-53df-be28-02a22704bf7e"></quiz>
