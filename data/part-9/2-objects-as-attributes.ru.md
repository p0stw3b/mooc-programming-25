---
path: /ru/part-9/2-objects-as-attributes
title: Объекты как атрибуты
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как использовать объекты как атрибуты других объектов
- вы познакомитесь с ключевым словом `None`

</text-box>

Мы уже видели примеры классов, у которых в качестве атрибутов используются списки. Значит, ничто не мешает включать в атрибуты и другие изменяемые объекты. Более того, мы можем использовать экземпляры собственных классов как атрибуты в других определённых нами классах. В следующих примерах мы определим классы `Course`, `Student` и `CompletedCourse`. «Завершённый курс» использует первые два класса. Определения классов специально сделаны короткими и простыми, чтобы сосредоточиться на приёме использования экземпляров собственных классов в качестве атрибутов.

Будем считать, что каждый класс определён в отдельном файле.

Сначала определим класс `Course` в файле `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

Далее — класс `Student` в файле `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

Наконец, класс `CompletedCourse` определим в файле `completedcourse.py`. Так как он использует два других класса, их нужно импортировать перед использованием:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

Ниже пример основной функции, которая добавляет завершённые курсы в список:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Создаём список студентов
students = []
students.append(Student("Ollie", "1234", 10))
students.append(Student("Peter", "3210", 23))
students.append(Student("Lena", "9999", 43))
students.append(Student("Tina", "3333", 8))

# Создаём курс Introduction to Programming
itp = Course("Introduction to Programming", "itp1", 5)

# Добавляем завершённые курсы каждому студенту, у всех оценка 3
completed = []
for student in students:
    completed.append(CompletedCourse(student, itp, 3))

# Выводим имя студента для каждого завершённого курса
for course in completed:
    print(course.student.name)
```

<sample-output>

Ollie
Peter
Lena
Tina

</sample-output>

Что именно происходит со всеми этими точками в строке `print(course.student.name)`?

* `course` — экземпляр класса `CompletedCourse`
* `student` — атрибут объекта `CompletedCourse`, который является объектом типа `Student`
* атрибут `name` в объекте `Student` содержит имя студента

## Когда нужен import? {#when-is-an-import-necessary}

В примерах выше оператор `import` встречался довольно часто:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# остальная часть основной программы
```

Оператор `import` нужен только тогда, когда вы используете код, определённый где‑то вне текущего файла (или текущей сессии интерпретатора Python). Это касается и стандартной библиотеки Python. Например, модуль `math` содержит математические операции:

```python
import math

x = 10
print(f"the square root of {x} is {math.sqrt(x)}")
```

В примере выше мы предположили, что три класса определены в отдельных файлах, а основная функция запускается из ещё одного файла. Поэтому и потребовались `import`‑ы.

Если весь код программы написан в одном файле (как обычно и рекомендуется делать в упражнениях этого курса), то для использования определённых вами классов `import` **не понадобится**.

Если вы поймали себя на том, что пишете что‑то вроде

```python
from person import Person

# ...дальше код
```

скорее всего, вы где‑то ошиблись. Если нужно освежить в памяти, оператор `import` впервые вводился в [части 7](/ru/part-7/1-modules) материалов курса.

<programming-exercise name='Питомцы' anchor="Pets" tmcname='part09-06_pets'>

Шаблон упражнения содержит заготовки двух классов: `Person` и `Pet`. У каждого человека есть один питомец. Измените метод `__str__` в классе `Person` так, чтобы он также выводил информацию о питомце, как показано в примере ниже.

Строка, возвращаемая методом, _должна в точности соответствовать указанному ниже формату_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```

<sample-output>

Levi, whose pal is Hulda, a mixed-breed dog

</sample-output>

**Важно:** все определения классов находятся в одном файле. Вам не нужно ничего импортировать.

</programming-exercise>

## Список объектов как атрибут объекта {#a-list-of-objects-as-an-attribute-of-an-object}

В примерах выше мы использовали по одному экземпляру других классов в качестве атрибутов: у `Person` есть один `Pet`, а у `CompletedCourse` — один `Student` и один `Course`.

В объектно‑ориентированном программировании часто хочется иметь _коллекцию_ объектов в качестве атрибута. Например, так устроена связь между спортивной командой и её игроками:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def summary(self):
        goals = []
        for player in self.players:
            goals.append(player.goals)
        print("Team:", self.name)
        print("Players:", len(self.players))
        print("Goals scored by each player:", goals)
```

Пример использования:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Emily", 22))
ca.add_player(Player("Andy", 1))
ca.summary()
```

<sample-output>

Team: Campus Allstars
Players: 3
Goals scored by each player: [10, 22, 1]

</sample-output>

<programming-exercise name='Коробка с подарками' anchor="A box of presents" tmcname='part09-07_box_of_presents'>

В этом упражнении вы потренируетесь «упаковывать» подарки. Вам нужно написать два класса: `Present` и `Box`. У подарка есть имя и вес, а коробка содержит подарки.

## Класс `Present` {#the-present-class}

Определите класс `Present`, который можно использовать для представления разных подарков. В определении класса должны быть атрибуты для имени и веса (в килограммах). Экземпляры класса должны работать так:

```python
book = Present("ABC Book", 2)

print("The name of the present:", book.name)
print("The weight of the present:", book.weight)
print("Present:", book)
```

Это должно вывести:

<sample-output>

The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)

</sample-output>

## Класс `Box` {#the-box-class}

Определите класс `Box`. Вы должны уметь добавлять подарки в коробку, а коробка должна хранить суммарный вес находящихся в ней подарков. В определении класса должны быть следующие методы:

- `add_present(self, present: Present)` добавляет подарок, переданный в качестве аргумента, в коробку. Метод ничего не возвращает.
- `total_weight(self)` возвращает суммарный вес подарков в коробке.

Для проверки класса можно использовать следующий код:

```python
book = Present("ABC Book", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark Side of the Moon", 1)
box.add_present(cd)
print(box.total_weight())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None: ссылка на «ничего» {#none-a-reference-to-nothing}

В Python все инициализированные переменные ссылаются на какой‑то объект. Но неизбежно возникают ситуации, когда нужно сослаться на несуществующее значение так, чтобы не получить ошибку. Ключевое слово `None` как раз и представляет такой «пустой» объект.

Продолжая пример с `Team` и `Player`, предположим, мы хотим добавить метод поиска игрока в команде по имени. Если игрока нет, разумно вернуть `None`:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def find_player(self, name: str):
        for player in self.players:
            if player.name == name:
                return player
        return None
```

Проверим функцию:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Amily", 22))
ca.add_player(Player("Andy", 1))

player1 = ca.find_player("Andy")
print(player1)
player2 = ca.find_player("Charlie")
print(player2)
```

<sample-output>

Andy (1 goals)
None

</sample-output>

Однако с `None` нужно быть осторожным: иногда он создаёт больше проблем, чем решает. Частая ошибка — пытаться обратиться к методу или атрибуту через ссылку, которая на самом деле равна `None`:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
print(f"Goals by Charlie: {player.goals}")
```

Выполнение приведённого кода вызовет ошибку:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'goals'

</sample-output>

Перед тем как обращаться к атрибутам или методам возвращаемых значений, полезно проверять их на `None`:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
if player is not None:
    print(f"Goals by Charlie: {player.goals}")
else:
    print(f"Charlie doesn't play in Campus Allstars :(")
```

<sample-output>

Charlie doesn't play in Campus Allstars :(

</sample-output>

<programming-exercise name='Самый невысокий человек в комнате' anchor="The shortest person in the room" tmcname='part09-08_shortest_in_room'>

Шаблон упражнения содержит класс `Person`. У человека есть имя и рост. В этом упражнении вы реализуете класс `Room`. В комнату можно добавлять любое количество людей, а также искать и удалять самого невысокого человека в комнате.

## Комната (Room) {#room}

Определите класс `Room`. У него должен быть атрибут‑список людей, а также следующие методы:

- `add(person: Person)` добавляет человека, переданного аргументом, в комнату.
- `is_empty()` возвращает `True` или `False` в зависимости от того, пуста ли комната.
- `print_contents()` выводит содержимое списка людей в комнате.

Посмотрите на пример использования:

```python
room = Room()
print("Is the room empty?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Ally", 166))
room.add(Person("Nina", 162))
room.add(Person("Dorothy", 155))
print("Is the room empty?", room.is_empty())
room.print_contents()
```

<sample-output>

Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)

</sample-output>

## Самый невысокий человек {#the-shortest-person}

Определите метод `shortest()` в классе `Room`. Метод должен возвращать самого невысокого человека в комнате, у которой его вызывают. Если комната пуста, метод должен вернуть `None`. Метод _не_ должен удалять человека из комнаты.

```python
room = Room()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))

print()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

print()

room.print_contents()
```

<sample-output>

Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

</sample-output>

## Удаление человека из комнаты {#removing-a-person-from-the-room}

Определите метод `remove_shortest()` в классе `Room`. Метод должен удалить из комнаты объект `Person` с наименьшим ростом и вернуть ссылку на этот объект. Если комната пуста, метод должен вернуть `None`.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Removed from room: {removed.name}")

print()

room.print_contents()
```

<sample-output>

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)

</sample-output>

**Подсказка:** в [части 4](/ru/part-4/3-lists#removing-items-from-a-list) есть инструкции по удалению элементов из списка.

**Подсказка 2:** внутри метода всегда можно вызвать другой метод того же класса. Следующий код должен работать без проблем:

```python
class Room:
    # ...
    def shortest(self):
        # ваш код здесь

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```

</programming-exercise>
