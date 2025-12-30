---
path: /ru/part-9/1-objects-and-references
title: Объекты и ссылки
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете использовать разные структуры данных для работы с объектами
- вы будете знать, как передавать объекты в качестве аргументов

</text-box>

Любое значение в Python является объектом. Любой объект, созданный на основе класса, который вы определили сами, работает точно так же, как и любой «обычный» объект Python. Например, объекты можно хранить в списке:

```python
from datetime import date

class CompletedCourse:

    def __init__(self, course_name: str, credits: int, completion_date: date):
        self.name = course_name
        self.credits = credits
        self.completion_date = completion_date


if __name__ == "__main__":
    # Создаём несколько завершённых курсов и добавляем их в список
    completed = []

    maths1 = CompletedCourse("Mathematics 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Programming 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # Добавим ещё пару прямо в список
    completed.append(CompletedCourse("Physics 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Programming 2", 5, date(2020, 5, 19)))

    # Пройдём по всем завершённым курсам, выведем их названия
    # и посчитаем суммарное число кредитов
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Total credits received:", credits)
```

<sample-output>

Mathematics 1
Programming 1
Physics 2
Programming 2
Total credits received: 20

</sample-output>

<programming-exercise name='Самый быстрый автомобиль' anchor="The fastest car" tmcname='part09-01_fastest_car'>

Шаблон упражнения содержит класс `Car`, который описывает автомобиль двумя атрибутами: `make (str)` и `top_speed (int)`.

Напишите функцию `fastest_car(cars: list)`, которая принимает список объектов `Car`.

Функция должна вернуть марку (`make`) самого быстрого автомобиля. Считайте, что автомобиль с максимальной скоростью всегда единственный. Не изменяйте список, переданный в качестве аргумента, и не вносите изменения в определение класса `Car`.

Для проверки вы можете использовать следующий код:

```python
if __name__ == "__main__":
    car1 = Car("Saab", 195)
    car2 = Car("Lada", 110)
    car3 = Car("Ferrari", 280)
    car4 = Car("Trabant", 85)

    cars = [car1, car2, car3, car4]
    print(fastest_car(cars))
```

<sample-output>

Ferrari

</sample-output>

</programming-exercise>

<programming-exercise name='Зачтённые работы' anchor="Passing submissions" tmcname='part09-02_passing_submissions'>

Шаблон упражнения содержит класс `ExamSubmission`, который, как следует из названия, моделирует работу (сдачу) участника экзамена. В классе определены два атрибута: `examinee (str)` и `points (int)`.

Напишите функцию `passed(submissions: list, lowest_passing: int)`, которая принимает список работ и целое число — минимальный проходной балл.

Функция должна создать и вернуть новый список, который содержит только зачтённые работы из исходного списка. Пожалуйста, не изменяйте список, переданный в качестве аргумента, и не меняйте определение класса `ExamSubmission`.

Для проверки вы можете использовать следующий код:

```python
if __name__ == "__main__":
    s1 = ExamSubmission("Peter", 12)
    s2 = ExamSubmission("Pippa", 19)
    s3 = ExamSubmission("Paul", 15)
    s4 = ExamSubmission("Phoebe", 9)
    s5 = ExamSubmission("Persephone", 17)

    passes = passed([s1, s2, s3, s4, s5], 15)
    for passing in passes:
        print(passing)
```

<sample-output>

ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)

</sample-output>

</programming-exercise>

Вы можете помнить, что списки сами по себе не «содержат» объекты. Они содержат _ссылки на объекты_. Один и тот же объект может встречаться в одном списке несколько раз, и на него можно ссылаться многократно — как внутри списка, так и вне его. Посмотрим на пример:

```python
class Product:
    def __init__(self, name: str, unit: str):
        self.name = name
        self.unit = unit


if __name__ == "__main__":
    shopping_list = []
    milk = Product("Milk", "litre")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Cucumber", "piece"))
```

<img src="9_1_1.png">

Если на один и тот же объект есть несколько ссылок, не имеет значения, какую из них использовать:

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

dogs = []
fluffy = Dog("Fluffy")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Fluffy"))

print("Dogs initially:")
for dog in dogs:
    print(dog)

print("The dog at index 0 is renamed:")
dogs[0].name = "Pooch"
for dog in dogs:
    print(dog)

print("The dog at index 2 is renamed:")
dogs[2].name = "Fifi"
for dog in dogs:
    print(dog)
```

<sample-output>

Dogs initially:
Fluffy
Fluffy
Fluffy
The dog at index 0 is renamed:
Pooch
Pooch
Fluffy
The dog at index 2 is renamed:
Pooch
Pooch
Fifi

</sample-output>

Ссылки по индексам 0 и 1 в списке указывают на один и тот же объект. Любую из этих ссылок можно использовать, чтобы получить доступ к объекту. Ссылка по индексу 2 указывает на другой объект, хоть его содержимое и кажется таким же. Изменение содержимого этого второго объекта не влияет на первый.

Оператор `is` используется, чтобы проверить, указывают ли две ссылки на _один и тот же_ объект, а оператор `==` показывает, совпадает ли содержимое объектов. Следующий пример иллюстрирует разницу:

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 is list2)
print(list1 is list3)
print(list2 is list3)

print()

print(list1 == list2)
print(list1 == list3)
print(list2 == list3)
```

<sample-output>

False
True
False

True
True
True

</sample-output>

Любой объект Python можно хранить и в словаре, и в любой другой структуре данных. Это относится и к объектам, созданным на основе вашего собственного класса.

```python
class Student:
    def __init__(self, name: str, cr: int):
        self.name = name
        self.cr = cr

if __name__ == "__main__":
    # Ключ в этом словаре — номер студента,
    # а значение — объект типа Student
    students = {}
    students["12345"] = Student("Saul Student", 10)
    students["54321"] = Student("Sally Student", 67)
```

Разобраться в примере выше может помочь [инструмент визуализации](http://www.pythontutor.com/visualize.html#mode=edit):

<img src="9_1_2.png">


## Self: когда нужен, а когда нет? {#self-or-no-self}

До сих пор мы лишь поверхностно касались того, как используется параметр `self`. Теперь посмотрим внимательнее, когда он нужен, а когда нет.

Ниже приведён простой класс, который позволяет создать «словарик» (объект), содержащий набор слов:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    def add_word(self, word: str):
        if not word in self.words:
            self.words.append(word)

    def print_vocabulary(self):
        for word in sorted(self.words):
            print(word)

vocab = Vocabulary()
vocab.add_word("python")
vocab.add_word("object")
vocab.add_word("object-oriented programming")
vocab.add_word("object")
vocab.add_word("nerd")

vocab.print_vocabulary()
```

<sample-output>

nerd
object
object-oriented programming
python

</sample-output>

Список слов хранится в атрибуте `self.words`. В этом случае `self` обязателен и в конструкторе класса, и в любом другом методе, который обращается к этой переменной. Если убрать `self`, разные методы перестанут работать с одним и тем же списком слов.

Добавим в определение класса новый метод. Метод `longest_word(self)` возвращает (одно из) самых длинных слов в словаре.

Ниже показан один из способов решить задачу, но скоро мы увидим, что это не лучший вариант:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # определяем две вспомогательные переменные
        self.longest = ""
        self.length_of_longest = 0

        for word in self.words:
            if len(word) > self.length_of_longest:
                self.length_of_longest = len(word)
                self.longest = word

        return self.longest
```

В этом методе используются две вспомогательные переменные, объявленные с `self`. Помните: имена переменных функционально не важны, поэтому эти переменные можно было бы назвать и более запутанно — например, `helper` и `helper2`. Код начинает выглядеть довольно криптично:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # определяем две вспомогательные переменные
        self.helper = ""
        self.helper2 = 0

        for word in self.words:
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Когда переменная объявляется через `self`, она становится атрибутом объекта. Это означает, что переменная существует столько же, сколько существует объект. В частности, она остаётся после того, как метод, в котором она была «создана», завершил работу. В примере выше это совершенно не нужно: вспомогательные переменные должны использоваться только внутри метода `longest_word(self)`. Поэтому объявлять их через `self` здесь — плохая идея.

Помимо того что переменные «живут» дольше необходимого, использование `self` для создания новых атрибутов там, где они не нужны, может приводить к трудным для поиска ошибкам. Особенно опасны атрибуты с обобщёнными именами вроде `self.helper`, которые потом используются в разных методах: это может вызывать неожиданное поведение, которое сложно отследить.

Например, если вспомогательная переменная объявлена как атрибут и инициализирована в конструкторе, а затем в другом методе используется в другом контексте, результат часто оказывается непредсказуемым:

```python
class Vocabulary:
    def __init__(self):
        self.words = []
        # определяем вспомогательные переменные
        self.helper = ""
        self.helper2 = ""
        self.helper3 = ""
        self.helper4 = ""

    # ...

    def longest_word(self):
        for word in self.words:
            # выше всем вспомогательным переменным были присвоены строковые значения
            # следующее не сработает, потому что тип helper2 неверный
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

Можно подумать, что проблему решит объявление атрибутов там, где они используются, _вне_ конструктора, но тогда получится, что набор атрибутов, доступных у объекта, будет зависеть от того, _какие методы уже вызывались_. В предыдущей части мы видели, что преимущество объявления атрибутов в конструкторе в том, что у всех экземпляров класса будет один и тот же набор атрибутов. Если это не так, работа с разными экземплярами класса легко приводит к ошибкам.

Итак, если вам нужны вспомогательные переменные только внутри одного метода, правильно объявлять их _без_ `self`. Чтобы код было легче понимать, используйте понятные имена:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # правильный способ объявлять вспомогательные переменные
        # для использования внутри одного метода
        longest = ""
        length_of_longest = 0

        for word in self.words:
            if len(word) > length_of_longest:
                length_of_longest = len(word)
                longest = word

        return longest
```

В реализации выше вспомогательные переменные доступны только во время выполнения метода. Значения в них не могут случайно «повлиять» на другие части программы.

## Объекты как аргументы функций {#objects-as-arguments-to-functions}

Объекты, созданные на основе наших собственных классов, обычно изменяемы (мутабельны). Вы можете помнить, что, например, списки в Python изменяемы: при передаче в функции их содержимое может меняться в результате выполнения.

Посмотрим на простой пример, в котором функция получает в качестве аргумента ссылку на объект типа `Student`. Функция меняет имя студента. И функция, и вызывающая её основная часть программы обращаются к одному и тому же объекту, поэтому изменение видно и снаружи.

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# подсказка типа использует имя класса, определённого выше
def change_name(student: Student):
    student.name = "Saul Student"

# создаём объект Student
steve = Student("Steve Student", "12345")

print(steve)
change_name(steve)
print(steve)
```

<sample-output>

Steve Student (12345)
Saul Student (12345)

</sample-output>

Объекты можно создавать и внутри функций. Если функция возвращает ссылку на созданный объект, он становится доступен и в основной части программы:

```python
from random import randint, choice

class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# Эта функция создаёт и возвращает новый объект Student.
# Имя и номер студента выбираются случайным образом.
def new_student():
    first_names = ["Mark","Mindy","Mary","Mike"]
    last_names = ["Javanese", "Rusty", "Scriptor", "Pythons"]

    # случайным образом выбираем имя
    name = choice(first_names) + " " + choice(last_names)

    # случайным образом выбираем номер студента
    student_number = str(randint(10000,99999))

    # Создаём и возвращаем объект Student
    return Student(name, student_number)

if __name__ == "__main__":
    # Вызываем функцию пять раз и сохраняем результаты в список
    students = []
    for i in range(5):
        students.append(new_student())

    # Выводим результаты
    for student in students :
        print(student)
```

При выполнении этого кода можно получить, например, такой вывод (обратите внимание: из‑за случайности у вас, скорее всего, будут другие результаты).

<sample-output>

Mary Rusty (78218)
Mindy Rusty (80068)
Mike Pythons (70396)
Mark Javanese (83307)
Mary Pythons (45149)

</sample-output>

## Объекты как аргументы методов {#objects-as-arguments-to-methods}

Точно так же объекты могут выступать аргументами методов. Рассмотрим пример из парка аттракционов:

```python
class Person:
    def __init__(self, name: str, height: int):
        self.name = name
        self.height = height

class Attraction:
    def __init__(self, name: str, min_height: int):
        self.visitors = 0
        self.name = name
        self.min_height = min_height

    def admit_visitor(self, person: Person):
        if person.height >= self.min_height:
            self.visitors += 1
            print(f"{person.name} got on board")
        else:
            print(f"{person.name} was too short :(")

    def __str__(self):
        return f"{self.name} ({self.visitors} visitors)"
```
В классе `Attraction` есть метод `admit_visitor`, который принимает объект типа `Person`. Если посетитель достаточно высокого роста, его пропускают на аттракцион и увеличивают счётчик посетителей. Классы можно протестировать так:

```python
rollercoaster = Attraction("Rollercoaster", 120)
jared = Person("Jared", 172)
alice = Person("Alice", 105)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

print(rollercoaster)
```

<sample-output>

Jared got on board
Alice was too short :(
Rollercoaster (1 visitors)

</sample-output>

<programming-exercise name='Детский центр' anchor="Baby Centre" tmcname='part09-03_baby_centre'>

Шаблон упражнения содержит класс `Person` и заготовку класса `BabyCentre`. Объект `BabyCentre` выполняет различные действия с объектом `Person`: например, может взвесить или «покормить» человека. В этом упражнении вы реализуете оставшуюся часть класса `BabyCentre`. Пожалуйста, ни в коем случае не меняйте определение класса `Person`.

## Взвешивание людей {#weighing-persons}

В определении класса `BabyCentre` есть заготовка для функции `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # вернуть вес человека, переданного аргументом
        return -1
```

Метод принимает объект `Person`. Он должен возвращать вес человека. Доступ к весу можно получить через соответствующий атрибут, определённый в классе `Person`. Допишите реализацию метода `weigh`.

Ниже пример, в котором `BabyCentre` взвешивает двух разных объектов `Person`:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

</sample-output>

## Кормление {#feeding}

Состояние объекта, переданного аргументом, можно изменять. Реализуйте метод `feed(person: Person)`, который увеличивает вес переданного человека на единицу.

В следующем примере двух людей взвешивают, затем одного из них «кормят» три раза, после чего снова взвешивают:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
print() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

Вывод должен показать, что вес Эрика увеличился на 3:

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

Eric weighs 10 kg
Peter weighs 85 kg

</sample-output>

## Подсчёт взвешиваний {#counting-weigh-ins}

Реализуйте метод `weigh_ins()`, который возвращает общее количество взвешиваний, выполненных объектом `BabyCentre`. Важно: вам понадобится новый атрибут, чтобы хранить количество взвешиваний. Для проверки можно использовать следующий код:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")
```

<sample-output>

Total number of weigh-ins is 0
Total number of weigh-ins is 2
Total number of weigh-ins is 6

</sample-output>

</programming-exercise>

<programming-exercise name='LunchCard и PaymentTerminal' anchor="LunchCard and PaymentTerminal" tmcname='part09-04_lunchcard_and_paymentterminal'>

В предыдущей части было [упражнение](/ru/part-8/5-more-examples-of-classes#programming-exercise-lunchcard), в котором вы реализовали класс `LunchCard`. На карте были отдельные методы для покупки обычного и специального обеда, а также метод для пополнения баланса.

Однако у класса `LunchCard` в той реализации есть некоторые проблемы. Сама карта «знала» цены разных обедов и умела списывать нужную сумму. Но представьте, что цены изменились или в систему добавили новые позиции, при этом уже выдано много карт. Тогда все существующие карты пришлось бы заменить на версии, которые знают новые цены.

Лучшее решение — сделать карты «глупыми», то есть не знающими цены товаров. Назначение карты — просто хранить текущий баланс. Вся более сложная логика должна быть вынесена в другой класс: платёжный терминал.

## Упрощённый LunchCard {#a-simpler-lunchcard}

Сначала реализуем более простую версию класса `LunchCard`. Карта должна уметь только сообщать текущий баланс, пополняться и списывать средства. Заполните метод `subtract_from_balance(amount)` в шаблоне упражнения согласно инструкциям в комментариях:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def deposit_money(self, amount: float):
        self.balance += amount

    def subtract_from_balance(self, amount: float):
        pass
        # Сумму нужно вычитать из баланса только если
        # на карте достаточно денег.
        # Если оплата успешна, метод возвращает True.
        # Иначе он возвращает False.
```

Для проверки вы можете использовать следующий код:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Balance", card.balance)
    result = card.subtract_from_balance(8)
    print("Payment successful:", result)
    print("Balance", card.balance)
    result = card.subtract_from_balance(4)
    print("Payment successful:", result)
    print("Balance", card.balance)
```

<sample-output>

Balance 10
Payment successful: True
Balance 2
Payment successful: False
Balance 2

</sample-output>

## Платёжный терминал и оплата наличными {#the-payment-terminal-and-dealing-with-cash-payments}

В студенческой столовой можно платить либо наличными, либо картой LunchCard. Платёжный терминал обрабатывает и наличные, и платежи по карте. Начнём с оплаты наличными.

Ниже приведена заготовка класса `PaymentTerminal`. Реализуйте методы согласно комментариям:

```python
class PaymentTerminal:
    def __init__(self):
        # Изначально в терминале есть 1000 евро наличными
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # Обычный обед стоит 2.50 евро.
        # Увеличьте сумму наличных в терминале на цену обеда,
        # увеличьте счётчик проданных обычных обедов
        # и верните сдачу.
        # Если переданной суммы недостаточно,
        # обед не продаётся, и возвращается вся сумма.

    def eat_special(self, payment: float):
        # Специальный обед стоит 4.30 евро.
        # Увеличьте сумму наличных в терминале на цену обеда,
        # увеличьте счётчик проданных специальных обедов
        # и верните сдачу.
        # Если переданной суммы недостаточно,
        # обед не продаётся, и возвращается вся сумма.
```

Для проверки класса можно использовать следующий код:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

change = exactum.eat_lunch(5)
print("The change returned was", change)

change = exactum.eat_special(4.3)
print("The change returned was", change)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

The change returned was 7.5
The change returned was 2.5
The change returned was 0.0
Funds available at the terminal: 1009.3
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Оплата картой {#dealing-with-card-transactions}

Теперь реализуем оплату картой. Нам понадобятся методы, которые принимают `LunchCard` и уменьшают баланс карты на стоимость обеда. Ниже приведены заготовки этих методов. Заполните их согласно комментариям:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # Обычный обед стоит 2.50 евро.
        # Если на карте достаточно денег,
        # спишите цену обеда с баланса и верните True.
        # Иначе верните False.


    def eat_special_lunchcard(self, card: LunchCard):
        # Специальный обед стоит 4.30 евро.
        # Если на карте достаточно денег,
        # спишите цену обеда с баланса и верните True.
        # Иначе верните False.
```

**Важно:** при оплате картой LunchCard сумма наличных в терминале не меняется. Тем не менее, если на карте достаточно средств, обед считается проданным — не забудьте корректно увеличивать счётчики проданных обедов.

Для проверки класса можно использовать следующий код:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Payment successful:", result)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

The change returned was 7.5
Payment successful: True
Payment successful: False
Payment successful: True
Funds available at the terminal: 1002.5
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Пополнение карты {#depositing-money-on-the-card}

Наконец, добавим метод, который позволяет пополнять карту. Владелец карты платит наличными, поэтому внесённая сумма добавляется к наличным средствам в терминале. Вот заготовка метода:

```python
def deposit_money_on_card(self, card: LunchCard, amount: float):
    pass
```

Для проверки метода можно использовать следующий код:

```python
exactum = PaymentTerminal()

card = LunchCard(2)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
print(f"Card balance is {card.balance} euros")

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

Card balance is 2 euros
Payment successful: False
Card balance is 102 euros
Payment successful: True
Card balance is 97.7 euros
Funds available at the terminal: 1100
Regular lunches sold: 0
Special lunches sold: 1

</sample-output>

</programming-exercise>

## Экземпляр того же класса как аргумент метода {#an-instance-of-the-same-class-as-an-argument-to-a-method}

Ниже приведён ещё один вариант класса `Person`:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth
```

Предположим, мы хотим написать программу, которая сравнивает возраст объектов типа `Person`. Для этого можно написать отдельную функцию:

```python
def older_than(person1: Person, person2: Person):
    if person1.year_of_birth < person2.year_of_birth:
        return True
    else:
        return False

muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if older_than(muhammad, pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if older_than(grace, pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```

<sample-output>

Muhammad ibn Musa al-Khwarizmi is older than Blaise Pascal
Grace Hopper is not older than Blaise Pascal

</sample-output>

Один из принципов объектно‑ориентированного программирования — размещать функциональность, связанную с объектами определённого типа, внутри определения класса в виде методов. Поэтому вместо функции можно написать _метод_, который сравнивает возраст объекта `Person` с _другим_ объектом `Person`:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Примечание: подсказки типов нужно заключать в кавычки, если параметр
    # имеет тот же тип, что и сам класс!
    def older_than(self, another: "Person"):
        if self.year_of_birth < another.year_of_birth:
            return True
        else:
            return False
```

Здесь объект, у которого вызывают метод, обозначен как `self`, а второй объект `Person` — как `another`.

Помните: вызов метода отличается от вызова функции. Метод вызывается у объекта с помощью точечной нотации:

```python
muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if muhammad.older_than(pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if grace.older_than(pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```

Слева от точки находится сам объект — внутри метода он называется `self`. В скобках передаётся аргумент метода — тот объект, который в определении метода назван `another`.

Вывод программы будет ровно таким же, как и в варианте с функцией выше.

И напоследок небольшой косметический момент: конструкция `if...else` в методе `older_than` по большому счёту не нужна. Булево выражение в условии уже имеет то самое истинностное значение, которое мы и возвращаем. Поэтому метод можно упростить:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # Примечание: подсказки типов нужно заключать в кавычки, если параметр
    # имеет тот же тип, что и сам класс!
    def older_than(self, another: "Person"):
        return self.year_of_birth < another.year_of_birth
```

Как указано в комментариях в примерах выше, если параметр в методе имеет тот же тип, что и сам класс, подсказку типа нужно заключать в кавычки. Если кавычки убрать, возникнет ошибка — вы увидите это, если попробуете следующее:

```python
class Person:
    # ...

    # это вызовет ошибку, потому что Person нужно заключить в кавычки
    def older_than(self, another: Person):
        return self.year_of_birth < another.year_of_birth:
```

<programming-exercise name='Сравнение свойств' anchor="Comparing properties" tmcname='part09-05_comparing_properties'>

База данных агентства недвижимости хранит информацию о доступных объектах недвижимости с помощью объектов следующего класса:

```python
class RealProperty:
    def __init__(self, rooms: int, square_metres: int, price_per_sqm: int):
        self.rooms = rooms
        self.square_metres = square_metres
        self.price_per_sqm = price_per_sqm
```

Ваша задача — реализовать методы, которые позволят сравнивать объекты недвижимости.

## Больше ли объект? {#is-it-bigger}

Напишите метод `bigger(self, compared_to)`, который возвращает `True`, если текущий объект `RealProperty` больше того, с которым его сравнивают.

Пример того, как должен работать метод:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.bigger(downtown_two_bedroom))
print(suburbs_three_bedroom.bigger(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

## Разница в цене {#price-difference}

Напишите метод `price_difference(self, compared_to)`, который возвращает разницу в цене между текущим объектом `RealProperty` и объектом, с которым его сравнивают. Разница в цене — это модуль разности итоговых цен двух объектов. Итоговая цена недвижимости равна цене за квадратный метр, умноженной на площадь.

Пример того, как должен работать метод:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.price_difference(downtown_two_bedroom))
print(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
```

<sample-output>

71600
35400

</sample-output>

## Дороже ли объект? {#is-it-more-expensive}

Напишите метод `more_expensive(self, compared_to)`, который возвращает `True`, если текущий объект `RealProperty` дороже того, с которым его сравнивают.

Пример того, как должен работать метод:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.more_expensive(downtown_two_bedroom))
print(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>
