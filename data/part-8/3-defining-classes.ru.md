---
path: /ru/part-8/3-defining-classes
title: Определение классов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как определять собственные классы
- вы сможете создавать объекты на основе классов, которые определили сами
- вы будете знать, как писать конструктор
- вы будете знакомы с параметром `self`
- вы будете знать, что такое атрибуты и как они используются

</text-box>

Класс определяется с помощью ключевого слова `class`. Синтаксис выглядит так:

```python
class NameOfClass:
    # здесь будет определение класса
```

Классы обычно называют в стиле _PascalCase_ (он же _UpperCamelCase_). Это означает, что слова пишутся слитно, без пробелов, а каждое слово начинается с заглавной буквы. Следующие имена классов соответствуют этому соглашению:

* `Weekday`
* `BankAccount`
* `LibraryDatabase`
* `PythonCourseGrades`

Одно определение класса должно описывать одну цельную сущность, компоненты которой логически связаны. В более сложных программах классы могут содержать объекты других классов. Например, класс `Course` может содержать объекты классов `Lecture`, `ExerciseSession` и т. п.

Посмотрим на «скелет» определения класса. Функциональности пока нет.

```python
class BankAccount:
    pass
```

Этот код сообщает Python, что мы определяем класс `BankAccount`. В классе пока нет функциональности, но мы всё равно можем создать объект этого класса.

Рассмотрим программу, где к объекту `BankAccount` добавляют две переменные: `balance` и `owner`. Переменные, «прикреплённые» к объекту, называют _атрибутами_ (точнее, _атрибутами данных_, иногда — _переменными экземпляра_, instance variables).

К атрибутам объекта обращаются через сам объект:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter Python"
peters_account.balance = 5.0

print(peters_account.owner)
print(peters_account.balance)
```

<sample-output>

Peter Python
5.0

</sample-output>

Атрибуты данных доступны только через объект, к которому они прикреплены. У каждого объекта `BankAccount` свои значения атрибутов. К ним обращаются, указывая нужный объект:

```python
account = BankAccount()
account.balance = 155.50

print(account.balance) # ссылка на атрибут balance, прикреплённый к объекту account
print(balance) # ЭТО ВЫЗОВЕТ ОШИБКУ: такой отдельной переменной нет, и ссылка на объект отсутствует
```

## Добавление конструктора {#adding-a-constructor}

В примере выше мы видели, что новый экземпляр класса создаётся вызовом конструктора: `NameOfClass()`. Затем мы добавляли атрибуты отдельно, но часто удобнее передавать начальные значения атрибутов сразу при создании объекта. В примере выше объект `BankAccount` сначала создавался без атрибутов, и атрибуты появлялись только после явного присваивания.

Если объявлять атрибуты вне конструктора, может получиться так, что разные экземпляры одного класса имеют разные атрибуты. Следующий код приводит к ошибке, потому что у нас появляется другой объект `BankAccount`, `paulas_account`, у которого нет тех же атрибутов:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter"
peters_account.balance = 1400

paulas_account = BankAccount()
paulas_account.owner = "Paula"

print(peters_account.balance)
print(paulas_account.balance) # ЭТО ВЫЗОВЕТ ОШИБКУ
```

Поэтому вместо того, чтобы объявлять атрибуты после создания каждого объекта, обычно лучше инициализировать их в момент вызова конструктора. Сейчас `BankAccount` — «пустой» класс, поэтому Python использует конструктор по умолчанию, но мы можем определить собственный конструктор — и именно это мы сейчас сделаем.

Конструктор — это метод со специальным именем `__init__`, который обычно располагают в начале определения класса.

Посмотрим на класс `BankAccount` с добавленным конструктором:

```python
class BankAccount:

    # Конструктор
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner
```

Имя конструктора всегда `__init__`. Обратите внимание на _двойные подчёркивания с обеих сторон_ слова `init`.

Первый параметр конструктора всегда называется `self`. Он ссылается на сам объект и нужен для объявления атрибутов объекта. Присваивание

`self.balance = balance`

присваивает значение `balance`, полученное как аргумент, атрибуту `balance` объекта. Часто параметры и атрибуты называют одинаково, но `self.balance` и `balance` — это _две разные переменные_:

* `self.balance` — атрибут объекта. У каждого объекта `BankAccount` свой баланс.

* `balance` — параметр конструктора `__init__`. Его значение равно аргументу, переданному при создании нового объекта.

Теперь, когда параметры конструктора определены, можно передавать начальные значения атрибутов при создании объекта:

```python
class BankAccount:

    # Конструктор
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

# При вызове метода аргумент для self указывать не нужно
# Python присваивает self автоматически
peters_account = BankAccount(100, "Peter Python")
paulas_account = BankAccount(20000, "Paula Pythons")

print(peters_account.balance)
print(paulas_account.balance)
```

<sample-output>

100
20000

</sample-output>

Так работать с объектами `BankAccount` гораздо удобнее: значения задаются при создании, и разные экземпляры становятся более предсказуемыми и одинаково устроенными. Кроме того, объявление атрибутов в конструкторе гарантирует, что атрибуты действительно существуют и что начальные значения задаёт программист, использующий класс.

При этом значения атрибутов всё равно можно менять позже в программе:

```python
class BankAccount:

    # Конструктор
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

peters_account = BankAccount(100, "Peter Python")
print(peters_account.balance)

# Меняем баланс на 1500
peters_account.balance = 1500
print(peters_account.balance)

# Добавляем 2000 к балансу
peters_account.balance += 2000
print(peters_account.balance)
```

<sample-output>

100
1500
3500

</sample-output>

Посмотрим на ещё один пример классов и объектов. Напишем класс, моделирующий один тираж лотереи:

```python
from datetime import date

class LotteryDraw:

    def __init__(self, round_week: int, round_date: date, numbers: list):
        self.round_week = round_week
        self.round_date = round_date
        self.numbers = numbers


# Создаём новый объект LotteryDraw
round1 = LotteryDraw(1, date(2021, 1, 2), [1,4,8,12,13,14,33])

# Выводим данные
print(round1.round_week)
print(round1.round_date)

for number in round1.numbers:
    print(number)
```

<sample-output>

1
2021-01-02
1
4
8
12
13
14
33

</sample-output>

Как видно, атрибуты могут быть любого типа. Здесь у каждого объекта `LotteryDraw` есть атрибуты типов `list` и `date`.

<programming-exercise name='Книга' anchor="Book" tmcname='part08-05_book'>

Напишите класс `Book` с атрибутами `name`, `author`, `genre` и `year`, а также конструктор, который присваивает этим атрибутам начальные значения.

Класс должен работать так:

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)

print(f"{python.author}: {python.name} ({python.year})")
print(f"The genre of the book {everest.name} is {everest.genre}")
```

<sample-output>

Luciano Ramalho: Fluent Python (2015)
The genre of the book High Adventure is autobiography

</sample-output>

</programming-exercise>

<programming-exercise name='Три класса' anchor="Three classes" tmcname='part08-06_three_classes'>

Напишите три класса, указанные ниже. У каждого класса должны быть атрибуты ровно с теми же именами и типами, что перечислены.

Также добавьте конструктор в каждый класс. Конструктор должен принимать начальные значения атрибутов в качестве аргументов в том порядке, который указан ниже.

1. Класс `Checklist`
- атрибут `header` (строка)
- атрибут `entries` (список)

2. Класс `Customer`
- атрибут `id` (строка)
- атрибут `balance` (число с плавающей точкой)
- атрибут `discount` (целое число)

3. Класс `Cable`
- атрибут `model` (строка)
- атрибут `length` (число с плавающей точкой)
- атрибут `max_speed` (целое число)
- атрибут `bidirectional` (логическое значение)

</programming-exercise>

## Использование объектов собственных классов {#using-objecs-formed-from-your-own-classes}

Объекты, созданные на основе ваших собственных классов, ничем не отличаются от других объектов Python. Их можно передавать в функции и возвращать из функций, как и любые другие объекты. Например, можно написать вспомогательные функции для работы с банковскими аккаунтами:

```python
# эта функция создаёт и возвращает новый объект банковского счёта
def open_account(name: str):
    new_account =  BankAccount(0, name)
    return new_account

# эта функция добавляет сумму amount к балансу переданного банковского счёта
def deposit_money_on_account(account: BankAccount, amount: int):
    account.balance += amount

peters_account = open_account("Peter Python")
print(peters_account.balance)

deposit_money_on_account(peters_account, 500)

print(peters_account.balance)
```

<sample-output>

0
500

</sample-output>

<programming-exercise name='Определение класса: Pet' anchor="Define class: Pet" tmcname='part08-07_pet'>

Определите класс `Pet`. В классе должен быть конструктор, который принимает начальные значения атрибутов `name`, `species` и `year_of_birth` в этом порядке.

Также напишите функцию `new_pet(name: str, species: str, year_of_birth: int)` _вне определения класса_. Функция должна создать и вернуть новый объект типа `Pet` (по определению из класса `Pet`).

Пример использования функции:

```python
fluffy = new_pet("Fluffy", "dog", 2017)
print(fluffy.name)
print(fluffy.species)
print(fluffy.year_of_birth)
```

<sample-output>

Fluffy
dog
2017

</sample-output>

</programming-exercise>

<programming-exercise name='Какая книга старше' anchor="The older book" tmcname='part08-08_older_book'>

Напишите функцию `older_book(book1: Book, book2: Book)`, которая принимает два объекта типа `Book`. Функция должна вывести сообщение с информацией о том, какая книга старше. Если книги изданы в один и тот же год, нужно вывести другое сообщение. См. пример ниже.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

older_book(python, everest)
older_book(python, norma)
```

<sample-output>

High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015

</sample-output>

</programming-exercise>

<programming-exercise name='Книги по жанру' anchor="Books of a genre" tmcname='part08-09_books_of_genre'>

Напишите функцию `books_of_genre(books: list, genre: str)`, которая принимает список объектов типа `Book` и строку с названием жанра.

Функция должна вернуть _новый_ список, содержащий книги нужного жанра из исходного списка. См. пример ниже.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

books = [python, everest, norma, Book("The Snowman", "Jo Nesbø", "crime", 2007)]

print("Books in the crime genre:")
for book in books_of_genre(books, "crime"):
    print(f"{book.author}: {book.name}")
```

<sample-output>

Books in the crime genre:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman

</sample-output>

</programming-exercise>
