---
path: /ru/part-9/6-more-examples-with-classes
title: Ещё примеры с классами
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с дополнительными примерами классов и объектов
- вы сможете использовать значения параметров по умолчанию в своих методах

</text-box>

Следующий пример состоит из двух классов. Класс `Point` моделирует точку в двумерном пространстве. Класс `Line` моделирует отрезок между двумя точками. Код ниже снабжён комментариями — пожалуйста, прочитайте их, чтобы понять, как работают классы.

```python
import math

class Point:
    """Класс представляет точку в двумерном пространстве."""

    def __init__(self, x: float, y: float):
        # Эти атрибуты публичные, потому что для x и y допустимы любые значения
        self.x = x
        self.y = y

    # Этот метод класса возвращает новую точку Point в начале координат (0, 0)
    # Внутри класса можно вернуть новый экземпляр этого же класса
    @classmethod
    def origo(cls):
        return Point(0, 0)

    # Этот метод класса создаёт новую точку Point на основе существующей
    # Исходную точку можно отразить относительно оси x, оси y или обеих осей
    # Например, точка (1, 3), отражённая относительно оси x, станет (1, -3)
    @classmethod
    def mirrored(cls, point: "Point", mirror_x: bool, mirror_y: bool):
        x = point.x
        y = point.y
        if mirror_x:
            y = -y
        if mirror_y:
            x = -x

        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


class Line:
    """Класс представляет отрезок в двумерном пространстве."""

    def __init__(self, beginning: Point, end: Point):
        # Эти атрибуты публичные, потому что допустимы любые две точки Point
        self.beginning = beginning
        self.end = end

    # Этот метод использует теорему Пифагора для вычисления длины отрезка
    def length(self):
        sum_of_squares = (self.end.x - self.beginning.x) ** 2 + (self.end.y - self.beginning.y) ** 2
        return math.sqrt(sum_of_squares)

    # Этот метод возвращает точку Point в середине отрезка
    def centre_point(self):
        centre_x = (self.beginning.x + self.end.x) / 2
        centre_y = (self.beginning.y + self.end.y) / 2
        return Point(centre_x, centre_y)

    def __str__(self):
        return f"{self.beginning} ... {self.end}"
```

```python
point = Point(1,3)
print(point)

origo = Point.origo()
print(origo)

point2 = Point.mirrored(point, True, True)
print(point2)

line = Line(point, point2)
print(line.length())
print(line.centre_point())
print(line)
```

<sample-output>

(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)

</sample-output>

## Значения параметров по умолчанию {#default-values-of-parameters}

В Python обычно можно задавать значение по умолчанию для любого параметра. Значения по умолчанию можно использовать и в функциях, и в методах.

Если у параметра есть значение по умолчанию, при вызове функции можно не передавать этот аргумент. Если аргумент передан, значение по умолчанию игнорируется. Если нет — используется значение по умолчанию.

Значения по умолчанию часто используют в конструкторах. Если можно ожидать, что при создании объекта не вся информация известна, лучше задать «пустое» значение прямо в конструкторе, чем заставлять клиента каждый раз думать об этом. Это делает класс проще в использовании и помогает сохранять целостность объекта. Например, при заданном значении по умолчанию мы уверены, что «пустое» значение всегда одинаковое, если клиент специально не захочет передать другое. Если значение по умолчанию не задано, клиент сам решает, что считать «пустым»: например, пустую строку `""`, специальный объект `None` или строку `"not set"`.

Рассмотрим ещё один класс, представляющий студента. При создании объекта `Student` клиент обязан передать имя и номер студента. Номер хранится как приватный атрибут и позже не должен меняться. Кроме того, у объекта `Student` есть атрибуты для зачётных единиц и заметок — для них в конструкторе заданы значения по умолчанию. Новые значения можно передать аргументами конструктора, а можно и не передавать — тогда будут использованы значения по умолчанию. Чтобы лучше понять, что делает каждый метод, посмотрите на комментарии в коде.

```python
class Student:
    """Класс моделирует студента."""

    def __init__(self, name: str, student_number: str, credits: int = 0, notes: str = ""):
        # вызываем сеттер для атрибута name
        self.name = name

        if len(student_number) < 5:
            raise ValueError("A student number should have at least five characters")

        self.__student_number = student_number

        # вызываем сеттер для атрибута credits
        self.credits = credits

        self.__notes = notes

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        if name != "":
            self.__name = name
        else:
            raise ValueError("The name cannot be an empty string")

    @property
    def student_number(self):
        return self.__student_number

    @property
    def credits(self):
        return self.__credits

    @credits.setter
    def credits(self, op):
        if op >= 0:
            self.__credits = op
        else:
            raise ValueError("The number of study credits cannot be below zero")

    @property
    def notes(self):
        return self.__notes

    @notes.setter
    def notes(self, notes):
        self.__notes = notes

    def summary(self):
        print(f"Student {self.__name} ({self.student_number}):")
        print(f"- credits: {self.__credits}")
        print(f"- notes: {self.notes}")
```

```python
# Передаём в конструктор только имя и номер студента
student1 = Student("Sally Student", "12345")
student1.summary()

# Передаём имя, номер студента и количество зачётных единиц
student2 = Student("Sassy Student", "54321", 25)
student2.summary()

# Передаём значения для всех параметров
student3 = Student("Saul Student", "99999", 140, "extra time in exam")
student3.summary()

# Передаём значение для notes, но не для credits
# Примечание: параметр нужно именовать, так как аргументы идут не по порядку
student4 = Student("Sandy Student", "98765", notes="absent in academic year 20-21")
student4.summary()
```

<sample-output>

Student Sally Student (12345):
- credits: 0
- notes:
Student Sassy Student (54321):
- credits: 25
- notes:
Student Saul Student (99999):
- credits: 140
- notes: extra time in exam
Student Sandy Student (98765):
- credits: 0
- notes: absent in academic year 20-21

</sample-output>

Важно: сеттера для атрибута `student_number` нет, потому что номер студента не должен изменяться.

При использовании значений параметров по умолчанию есть один довольно существенный подводный камень. Следующий пример, моделирующий ещё один вариант студента, показывает проблему:

```python
class Student:
    def __init__(self, name, completed_courses=[]):
        self.name = name
        self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
['ItP', 'ACiP']

</sample-output>

Добавляя курсы в список Салли, мы одновременно добавляем их и в список Сэсси. На самом деле это один и тот же список: Python повторно использует ссылку, которая хранится в значении по умолчанию. Создание двух объектов `Student` в примере выше эквивалентно следующему:

```python
courses = []
student1 = Student("Sally Student", courses)
student2 = Student("Sassy Student", courses)
```

Значения параметров по умолчанию никогда не должны быть экземплярами сложных изменяемых структур данных, таких как списки. Обойти проблему можно, если внести следующие изменения в конструктор класса `Student`:

```python
class Student:
    def __init__(self, name, completed_courses=None):
        self.name = name
        if completed_courses is None:
            self.completed_courses = []
        else:
            self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```

<sample-output>

['ItP', 'ACiP']
[]

</sample-output>

## Большой финал {#the-grand-finale}

Хотя следующее упражнение завершает эту часть материалов, все необходимые для него приёмы уже были рассмотрены в разделе [объекты как атрибуты](/ru/part-9/2-objects-as-attributes). В частности, в этом упражнении **не требуется** использовать декоратор `@property` или значения параметров по умолчанию. Упражнение очень похоже на задания [коробка с подарками](/ru/part-9/2-objects-as-attributes#programming-exercise-a-box-of-presents) и [самый невысокий человек в комнате](/ru/part-9/2-objects-as-attributes#programming-exercise-the-shortest-person-in-the-room).


#### Важная информация о следующем упражнении {#important-information-regarding-the-next-exercise}
Обратите внимание: из‑за обновления Python возник конфликт между встроенной библиотекой и исходным именем файла в этом упражнении. Если у вас появятся проблемы, рекомендуем заново скачать папку упражнения. После того как вы получите новые локальные тестовые файлы, вы можете использовать имя файла либо `code.py`, либо `code_1.py`. В Visual Studio Code могут появляться уведомления о проблемах в тестовом файле, но их можно безопасно игнорировать: они вызваны тем, что тесты не могут импортировать код ни из `code.py`, ни из `code_1.py`.

<programming-exercise name='Item, Suitcase и Cargo Hold' anchor="Item, Suitcase and Cargo hold" tmcname='part09-15_item_suitcase_hold'>

В этой серии упражнений вы создадите классы `Item`, `Suitcase` и `Cargo Hold` и дополнительно потренируетесь работать с объектами, которые содержат ссылки на другие объекты.

## `Item` (предмет) {#item}

Создайте класс `Item`, который используется для создания предметов разных типов. У каждого предмета есть имя и вес (в килограммах).

Для проверки класса можно использовать следующий код:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)

print("Name of the book:", book.name())
print("Weight of the book:", book.weight())

print("Book:", book)
print("Phone:", phone)
```

Программа должна вывести:

<sample-output>

Name of the book: ABC Book
Weight of the book: 2
Book: ABC Book (2 kg)
Phone: Nokia 3210 (1 kg)

</sample-output>

Класс `Item` должен предоставлять методы `weight` и `name`, которые возвращают значения, хранящиеся в соответствующих атрибутах.

Имя и вес должны быть инкапсулированы внутри класса. Следующий код не должен работать:

```python
book = Item("ABC Book", 2)
book.weight = 10
```

## `Suitcase` (чемодан) {#suitcase}

Напишите класс `Suitcase`. В чемодан можно «упаковывать» предметы. У чемодана также есть максимальный общий вес для предметов внутри.

В вашем классе должны быть:

- конструктор, который принимает максимальный вес
- метод `add_item`, который добавляет переданный предмет в чемодан (метод ничего не возвращает)
- метод `__str__`, который возвращает строку формата `"x items (y kg)"`

Класс должен следить за тем, чтобы суммарный вес предметов в любом `Suitcase` не превышал максимальный вес, заданный для этого экземпляра. Если при вызове `add_item` добавление предмета превысило бы лимит, новый предмет не должен добавляться.

Класс должен работать так:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(5)
print(suitcase)

suitcase.add_item(book)
print(suitcase)

suitcase.add_item(phone)
print(suitcase)

suitcase.add_item(brick)
print(suitcase)
```

Выполнение кода выше должно вывести:

<sample-output>

0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Следите за формой слова {#mind-your-language}

Сообщение `"1 items"` выглядит неграмотно. Вместо этого должно быть `"1 item"`. Внесите необходимые изменения в метод `__str__`.

Теперь предыдущий пример должен вывести:

<sample-output>

0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Все предметы {#all-the-items}

Добавьте в класс `Suitcase` следующие методы:

- `print_items` — выводит все предметы, находящиеся в чемодане
- `weight` — возвращает целое число: суммарный вес всех предметов в чемодане

Теперь класс должен работать со следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

print("The suitcase contains the following items:")
suitcase.print_items()
combined_weight = suitcase.weight()
print(f"Combined weight: {combined_weight} kg")
```

Выполнение программы выше должно вывести:

<sample-output>

The suitcase contains the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
Combined weight: 7 kg

</sample-output>

Если вы реализовали `Suitcase` с более чем двумя переменными экземпляра, внесите изменения так, чтобы у каждого экземпляра было только два атрибута данных: максимальный вес и список предметов.

## Самый тяжёлый предмет {#the-heaviest-item}

Добавьте в класс `Suitcase` новый метод: `heaviest_item` должен возвращать самый тяжёлый `Item`. Если есть два или более предмета с одинаковым максимальным весом, метод может вернуть любой из них. Метод должен возвращать ссылку на объект. Если чемодан пуст, метод должен вернуть `None`.

Теперь класс должен работать со следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
print(f"The heaviest item: {heaviest}")
```

Выполнение программы выше должно вывести:

<sample-output>

The heaviest item: Brick (4 kg)

</sample-output>

## Грузовой отсек {#cargo-hold}

Напишите класс `CargoHold` со следующими методами:

- конструктор, который принимает максимальный вес
- метод `add_suitcase`, который добавляет переданный чемодан в грузовой отсек
- метод `__str__`, который возвращает строку формата `"x suitcases, space for y kg"`

Класс должен следить за тем, чтобы суммарный вес предметов в любом `CargoHold` не превышал максимальный вес, заданный для этого экземпляра. Если при вызове `add_suitcase` добавление чемодана превысило бы лимит, новый чемодан не должен добавляться.

Теперь класс должен работать со следующей программой:

```python
cargo_hold = CargoHold(1000)
print(cargo_hold)

book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
print(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
print(cargo_hold)
```

<sample-output>

0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg

</sample-output>

## Содержимое грузового отсека {#the-contents-of-the-cargo-hold}

Добавьте в класс `CargoHold` метод `print_items`. Он должен выводить все предметы во всех чемоданах, находящихся в грузовом отсеке.

Теперь класс должен работать со следующей программой:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(1000)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

print("The suitcases in the cargo hold contain the following items:")
cargo_hold.print_items()
```

Выполнение программы выше должно вывести:

<sample-output>

The suitcases in the cargo hold contain the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на небольшой опрос по материалам этой недели.

<quiz id="7d931659-2dd3-5557-bd3b-a409dd1ebfa2"></quiz>
