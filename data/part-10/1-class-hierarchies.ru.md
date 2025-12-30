---
path: /ru/part-10/1-class-hierarchies
title: Иерархии классов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что означает наследование в программировании
- вы сможете писать классы, которые наследуются от других классов
- вы будете знать, как наследование влияет на характеристики классов

</text-box>

## Специальные классы для специальных задач {#special-classes-for-special-purposes}

Иногда вы сталкиваетесь с ситуацией, когда класс уже определён, но затем становится ясно: для некоторых (но не всех) экземпляров класса нужны дополнительные характеристики. Бывает и наоборот: вы понимаете, что определили два очень похожих класса, которые отличаются лишь деталями. Как программисты, мы стараемся повторяться как можно меньше, сохраняя при этом ясность и читаемость. Как же учесть разные реализации по сути похожих объектов?

Посмотрим на два определения классов: `Student` и `Teacher`. Чтобы пример был короче, геттеры и сеттеры пока опустим.

```python

class Student:

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits

class Teacher:

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

```

Даже в таком «облегчённом» примере уже есть заметное дублирование: в обоих классах есть атрибуты `name` и `email`. Было бы разумно определить эти атрибуты в одном месте, чтобы для изменения хватало одной функции.

Например, представьте, что у школы поменялся домен почты. Тогда пришлось бы обновить все адреса. Мы _могли бы_ написать две отдельные версии по сути одной и той же функции:

```python

def update_email(o: Student):
    o.email = o.email.replace(".com", ".edu")

def update_email2(o: Teacher):
    o.email = o.email.replace(".com", ".edu")

```

Писать практически одно и то же дважды — ненужное повторение; к тому же это вдвое увеличивает вероятность ошибки. Было бы намного лучше иметь одну функцию, которая умеет работать с экземплярами обоих классов.

У каждого класса есть и свои уникальные атрибуты. Если просто объединить _все_ атрибуты в одном классе, то у _всех_ экземпляров появились бы лишние атрибуты — просто «ненужные» наборы были бы разными для разных экземпляров. Это тоже выглядит не лучшим решением.

 ## Наследование

В объектно‑ориентированных языках обычно есть приём, называемый _наследованием_. Класс может _наследовать_ характеристики другого класса. Помимо унаследованных характеристик класс может иметь и собственные, уникальные для него.

Исходя из этого, логично, чтобы у классов `Teacher` и `Student` был общий базовый (родительский) класс `Person`:

 ```python

class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

 ```

Новый класс содержит характеристики, общие для двух других классов. Теперь `Student` и `Teacher` могут _наследовать_ эти характеристики и добавить свои собственные.

Синтаксис наследования прост: в строке объявления класса в скобках указывается имя базового класса:

 ```python
class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def update_email_domain(self, new_domain: str):
        old_domain = self.email.split("@")[1]
        self.email = self.email.replace(old_domain, new_domain)


class Student(Person):

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits


class Teacher(Person):

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

# Протестируем наши классы
if __name__ == "__main__":
    saul = Student("Saul Student", "1234", "saul@example.com", 0)
    saul.update_email_domain("example.edu")
    print(saul.email)

    tara = Teacher("Tara Teacher", "tara@example.fi", "A123", 2)
    tara.update_email_domain("example.ex")
    print(tara.email)

 ```

И `Student`, и `Teacher` наследуют класс `Person`, поэтому у обоих есть характеристики, определённые в `Person`, включая метод `update_email_domain`. Один и тот же метод работает для экземпляров обоих производных классов.

Рассмотрим другой пример. У нас есть `Bookshelf`, который наследует класс `BookContainer`:

 ```python
class Book:
    """Класс моделирует простую книгу."""
    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class BookContainer:
    """Класс моделирует контейнер для книг."""

    def __init__(self):
        self.books = []

    def add_book(self, book: Book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(f"{book.name} ({book.author})")


class Bookshelf(BookContainer):
    """Класс моделирует полку для книг."""

    def __init__(self):
        super().__init__()

    def add_book(self, book: Book, location: int):
        self.books.insert(location, book)

 ```

Класс `Bookshelf` содержит метод `add_book`. Метод с таким же именем определён и в базовом классе `BookContainer`. Это называется _переопределением_ (overriding): если в производном классе есть метод с тем же именем, что и в базовом, то в экземплярах производного класса используется именно производная версия.

Идея примера выше в том, что в `BookContainer` новая книга всегда добавляется «в конец», а в `Bookshelf` можно указать позицию. Метод `list_books` работает одинаково для обоих классов, потому что в производном классе он не переопределён.

Проверим эти классы:

 ```python
if __name__ == "__main__":
    # Создаём несколько книг для тестирования
    b1 = Book("Old Man and the Sea", "Ernest Hemingway")
    b2 = Book("Silent Spring", "Rachel Carson")
    b3 = Book("Pride and Prejudice", "Jane Austen")

    # Создаём BookContainer и добавляем книги
    container = BookContainer()
    container.add_book(b1)
    container.add_book(b2)
    container.add_book(b3)

    # Создаём Bookshelf и добавляем книги (всегда в начало)
    shelf = Bookshelf()
    shelf.add_book(b1, 0)
    shelf.add_book(b2, 0)
    shelf.add_book(b3, 0)


    # Выводим
    print("Container:")
    container.list_books()

    print()

    print("Shelf:")
    shelf.list_books()
 ```

 <sample-output>

Container:
Old Man and the Sea (Ernest Hemingway)
Silent Spring (Rachel Carson)
Pride and Prejudice (Jane Austen)

Shelf:
Pride and Prejudice (Jane Austen)
Silent Spring (Rachel Carson)
Old Man and the Sea (Ernest Hemingway)

 </sample-output>

Таким образом, класс `Bookshelf` тоже имеет доступ к методу `list_books`. Благодаря наследованию этот метод становится членом всех классов, производных от `BookContainer`.

 ## Наследование и область видимости характеристик

Производный класс наследует все характеристики базового класса. Эти характеристики доступны напрямую в производном классе, если только они не объявлены как приватные в базовом классе (то есть с двумя подчёркиваниями `__` в начале имени).

Так как атрибуты `Bookshelf` совпадают с атрибутами `BookContainer`, переписывать конструктор `Bookshelf` не нужно. Мы просто вызываем конструктор базового класса:

 ```python
class Bookshelf(BookContainer):

    def __init__(self):
        super().__init__()

```

К любой характеристике базового класса можно обратиться из производного класса через `super()`. Аргумент `self` при таком вызове не указывается — Python добавляет его автоматически.

Но что если набор атрибутов отличается — можно ли всё равно использовать конструктор базового класса? Рассмотрим класс `Thesis`, который наследует `Book`. Производный класс всё равно _может_ вызвать конструктор базового класса:

```python

class Book:
    """Класс моделирует простую книгу."""

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class Thesis(Book):
    """Класс моделирует выпускную работу."""

    def __init__(self, name: str, author: str, grade: int):
        super().__init__(name, author)
        self.grade = grade

```

Конструктор `Thesis` вызывает конструктор базового класса `Book` с аргументами `name` и `author`. Кроме того, конструктор производного класса устанавливает значение атрибута `grade`. Очевидно, базовый класс этого сделать не может, потому что у него такого атрибута нет.

Класс выше можно использовать так:

```python
if __name__ == "__main__":
    thesis = Thesis("Python and the Universe", "Peter Pythons", 3)

    # Выведем значения атрибутов
    print(thesis.name)
    print(thesis.author)
    print(thesis.grade)

```

<sample-output>

Python and the Universe
Peter Pythons
3

</sample-output>

Даже если производный класс _переопределяет_ метод базового класса, он всё равно может _вызвать_ переопределённый метод базового класса. В следующем примере есть базовая `BonusCard` и особая `PlatinumCard` для особенно лояльных клиентов. Метод `calculate_bonus` переопределён в производном классе, но переопределяющий метод вызывает базовый:

```python

class Product:

    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class BonusCard:

    def __init__(self):
        self.products_bought = []

    def add_product(self, product: Product):
        self.products_bought.append(product)

    def calculate_bonus(self):
        bonus = 0
        for product in self.products_bought:
            bonus += product.price * 0.05

        return bonus

class PlatinumCard(BonusCard):

    def __init__(self):
        super().__init__()

    def calculate_bonus(self):
        # Вызываем метод из базового класса
        bonus = super().calculate_bonus()

        # ...и добавляем 5% к сумме
        bonus = bonus * 1.05
        return bonus
```

Итак, бонус для `PlatinumCard` вычисляется так: сначала вызывается переопределяемый метод базового класса, а затем к результату добавляется ещё 5%. Пример использования этих классов:

```python
if __name__ == "__main__":
    card = BonusCard()
    card.add_product(Product("Bananas", 6.50))
    card.add_product(Product("Satsumas", 7.95))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product("Bananas", 6.50))
    card2.add_product(Product("Satsumas", 7.95))
    bonus2 = card2.calculate_bonus()

    print(bonus)
    print(bonus2)
```

<sample-output>

0.7225
0.7586250000000001

</sample-output>

<programming-exercise name='Ноутбук' anchor="Laptop computer" tmcname='part10-01_laptop_computer'>

Шаблон упражнения содержит определение класса `Computer` с атрибутами `model` и `speed`.

Определите класс `LaptopComputer`, который _наследует_ класс `Computer`. Конструктор нового класса должен принимать третий аргумент `weight` типа `int`.

Также добавьте метод `__str__`. Формат строкового представления смотрите в примере ниже.

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```

<sample-output>

NoteBook Pro15, 1500 MHz, 2 kg

</sample-output>

</programming-exercise>

<programming-exercise name='Музей игр' anchor="Game Museum" tmcname='part10-02_game_museum'>

Шаблон упражнения содержит определения классов `ComputerGame` и `GameWarehouse`. Объект `GameWarehouse` используется для хранения объектов `ComputerGame`.

Ознакомьтесь с этими классами. Затем определите новый класс `GameMuseum`, который наследует класс `GameWarehouse`.

Класс `GameMuseum` должен _переопределить_ метод `list_games()`, чтобы он возвращал список только тех игр, которые были выпущены до 1990 года.

В новом классе также должен быть конструктор, который _вызывает конструктор родительского класса `GameWarehouse`_. Конструктор не принимает аргументов.

Для проверки можно использовать следующий код:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Площади' anchor="Areas" tmcname='part10-03_areas'>

Шаблон упражнения содержит определение класса `Rectangle`, который представляет [прямоугольник](https://en.wikipedia.org/wiki/Rectangle). Прямоугольник работает так:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("area:", rectangle.area())
```

<sample-output>

rectangle 2x3
area: 6

</sample-output>

## Квадрат {#square}

Определите класс `Square`, который наследует класс `Rectangle`. У [квадрата](https://en.wikipedia.org/wiki/Square) все стороны одинаковой длины, поэтому квадрат — частный случай прямоугольника. Новый класс не должен содержать новых атрибутов.

Объект `Square` используется так:

```python
square = Square(4)
print(square)
print("area:", square.area())
```

<sample-output>

square 4x4
area: 16

</sample-output>

</programming-exercise>

<programming-exercise name='Игра в слова' anchor="Word game" tmcname='part10-04_word_game'>

Шаблон упражнения содержит определение класса `WordGame`. Он предоставляет базовую функциональность для разных игр со словами:

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # определяем победителя случайно
        return random.randint(1, 2)

    def play(self):
        print("Word game:")
        for i in range(1, self.rounds+1):
            print(f"round {i}")
            answer1 = input("player1: ")
            answer2 = input("player2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("player 1 won")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("player 2 won")
            else:
                pass # ничья

        print("game over, wins:")
        print(f"player 1: {self.wins1}")
        print(f"player 2: {self.wins2}")
```

Игра запускается так:

```python
p = WordGame(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **longword**
player2: **??**
player 2 won
round 2
player1: **i'm the best**
player2: **wut?**
player 1 won
round 3
player1: **who's gonna win**
player2: **me**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

В этой «базовой» версии победитель определяется случайно. Ввод игроков никак не влияет на результат.

## Самое длинное слово побеждает {#longest-word-wins}

Определите класс `LongestWord`. Это версия игры, в которой в каждом раунде выигрывает тот, кто ввёл самое длинное слово.

Новая версия игры реализуется путём _наследования_ класса `WordGame`. Метод `round_winner` также нужно соответствующим образом переопределить. Заготовка нового класса выглядит так:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # здесь будет ваш код для определения победителя
```

Пример запуска новой игры:

```python
p = LongestWord(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **short**
player2: **longword**
player 2 won
round 2
player1: **word**
player2: **wut?**
round 3
player1: **i'm the best**
player2: **no, me**
player 1 won
game over, wins:
player 1: 1
player 2: 1

</sample-output>

## Больше гласных — победа {#most-vowels-wins}

Определите ещё один класс‑игру на основе `WordGame` — `MostVowels`. В этой версии раунд выигрывает тот, у кого в слове больше гласных.

## Камень, ножницы, бумага {#rock-paper-scissors}

Наконец, определите класс `RockPaperScissors`, который позволяет играть в [камень‑ножницы‑бумага](https://en.wikipedia.org/wiki/Rock_paper_scissors).

Правила игры:

- камень побеждает ножницы (камень ломает ножницы, а ножницы не режут камень)
- бумага побеждает камень (бумага накрывает камень)
- ножницы побеждают бумагу (ножницы режут бумагу)

Если ввод одного из игроков некорректен, он проигрывает раунд. Если оба игрока ввели что‑то отличное от _rock_, _paper_ или _scissors_, результат — ничья.

Пример запуска игры:

```python
p = RockPaperScissors(4)
p.play()
```

<sample-output>

Word game:
round 1
player1: **rock**
player2: **rock**
round 2
player1: **rock**
player2: **paper**
player 2 won
round 3
player1: **scissors**
player2: **paper**
player 1 won
round 4
player1: **paper**
player2: **dynamite**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

</programming-exercise>
