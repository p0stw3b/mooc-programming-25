---
path: /ru/part-8/4-defining-methods
title: Определение методов
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как работают методы классов
- вы сможете писать новые методы в собственных классах
- вы поймёте понятия инкапсуляции и клиента (client) в объектно‑ориентированном программировании

</text-box>

Классы, содержащие только атрибуты данных, не слишком отличаются от словарей. Ниже показаны два способа смоделировать банковский счёт: сначала с помощью класса, а затем с помощью словаря.

```python
# Пример 1: банковский счёт через класс
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
```

```python
# Пример 2: банковский счёт через словарь
peters_account = {"account_number": "12345-678", "owner": "Peter Python", "balance": 1500.0, "annual_interest": 0.015}
```

Со словарём реализация короче и прямолинейнее. Однако класс задаёт более «жёсткую» структуру: мы можем ожидать, что все объекты `BankAccount` устроены одинаково. Кроме того, класс имеет имя: при создании счёта мы явно обращаемся к классу `BankAccount`, и тип объекта — `BankAccount`, а не `dict`.

Ещё одно важное преимущество классов в том, что помимо данных они могут содержать функциональность. Один из ключевых принципов ООП: объект предоставляет доступ и к своим данным, и к поведению (методам), которые эти данные обрабатывают.

## Методы в классах {#methods-in-classes}

Метод — это функция, связанная с конкретным классом. Обычно метод воздействует на один объект. Метод определяется внутри класса и может обращаться к атрибутам объекта так же, как к обычным переменным.

Продолжим с классом `BankAccount` из примера выше. Ниже добавлен метод, который начисляет проценты на счёт:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # Этот метод добавляет годовые проценты к балансу счёта
    def add_interest(self):
        self.balance += self.balance * self.annual_interest


peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
peters_account.add_interest()
print(peters_account.balance)
```

<sample-output>

1522.5

</sample-output>

Метод `add_interest` умножает баланс на годовую процентную ставку и добавляет результат к текущему балансу. Метод действует только на тот объект, у которого он вызван.

Посмотрим, как это работает, если создать несколько экземпляров класса:

```python
# Класс BankAccount определён в предыдущем примере

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
paulas_account = BankAccount("99999-999", "Paula Pythonen", 1500.0, 0.05)
pippas_account = BankAccount("1111-222", "Pippa Programmer", 1500.0, 0.001)

# Начисляем проценты на счетах Питера и Паулы, но не Пиппы
peters_account.add_interest()
paulas_account.add_interest()

# Печатаем балансы всех счетов
print(peters_account.balance)
print(paulas_account.balance)
print(pippas_account.balance)
```

<sample-output>

1522.5
1575.0
1500.0

</sample-output>

Как видно, проценты начисляются только на те счета, у которых вызван метод. Так как ставки у Питера и Паулы разные, результаты отличаются. Баланс Пиппы не изменяется, потому что `add_interest` не вызывается у объекта `pippas_account`.

## Инкапсуляция {#encapsulation}

В ООП иногда используют слово _client_ («клиент»). Так называют участок кода, который создаёт объект и пользуется сервисом, предоставляемым его методами. Если данные объекта используются только через методы, сохраняется _внутренняя целостность_ объекта. На практике это означает, например, что класс `BankAccount` предоставляет методы для работы с атрибутом `balance`, и клиент не обращается к балансу напрямую. Тогда методы могут, например, гарантировать, что баланс не станет отрицательным.

Пример того, как это может выглядеть:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # Этот метод добавляет годовые проценты к балансу счёта
    def add_interest(self):
        self.balance += self.balance * self.annual_interest

    # Этот метод «снимает» деньги со счёта
    # Если снятие успешно, метод возвращает True, иначе False
    def withdraw(self, amount: float):
        if amount <= self.balance:
            self.balance -= amount
            return True

        return False

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

if peters_account.withdraw(1000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")

# Попробуем ещё раз
if peters_account.withdraw(1000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")
```

<sample-output>

The withdrawal was successful, the balance is now 500.0
The withdrawal was unsuccessful, the balance is insufficient

</sample-output>

Поддержание внутренней целостности объекта и предоставление подходящих методов для этого называется _инкапсуляцией_. Идея в том, что внутреннее устройство объекта скрыто от клиента, но объект предоставляет методы, через которые можно безопасно работать с данными.

Добавление метода само по себе не скрывает атрибут. Хотя в `BankAccount` есть метод `withdraw` для снятия денег, клиентский код всё равно может напрямую читать и изменять атрибут `balance`:

```python
peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

# Пытаемся снять 2000
if peters_account.withdraw(2000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")

    # «Принудительно» снимаем 2000
    peters_account.balance -= 2000

print("The balance is now:", peters_account.balance)
```

<sample-output>

The withdrawal was unsuccessful, the balance is insufficient
The balance is now: -500.0

</sample-output>

Атрибуты данных можно скрыть от клиентского кода, что помогает решать такие проблемы. К этой теме мы вернёмся в следующей части.

<programming-exercise name='Уменьшающийся счётчик' anchor="Decreasing counter" tmcname='part08-10_decreasing_counter'>

Это задание состоит из нескольких частей. Части можно сдавать по отдельности. Каждая часть стоит один балл.

В шаблоне задания есть частично готовый класс `DecreasingCounter`:

```python
class DecreasingCounter:
    def __init__(self, initial_value: int):
        self.value = initial_value

    def print_value(self):
        print("value:", self.value)

    def decrease(self):
        pass

    # здесь определите остальные методы
```

Класс можно использовать так, как показано ниже. После выполнения первой части задания программа должна печатать следующее:

```python
counter = DecreasingCounter(10)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```

<sample-output>

value: 10
value: 9
value: 8

</sample-output>


### Уменьшение значения счётчика {#decreasing-the-value-of-the-counter}

Доработайте метод `decrease` из шаблона так, чтобы он уменьшал значение счётчика на один. Ожидаемое поведение показано в примере выше.

### Счётчик не должен становиться отрицательным {#the-counter-must-not-have-a-negative-value}

Добавьте в метод `decrease` проверку, чтобы значение счётчика никогда не становилось отрицательным. Если значение счётчика равно 0, дальше уменьшать не нужно.

```python
counter = DecreasingCounter(2)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```

<sample-output>

value: 2
value: 1
value: 0
value: 0

</sample-output>

### Установка значения в ноль {#setting-the-value-to-zero}

Добавьте метод `set_to_zero`, который устанавливает значение счётчика в 0:

```python
counter = DecreasingCounter(100)
counter.print_value()
counter.set_to_zero()
counter.print_value()
```

<sample-output>

value: 100
value: 0

</sample-output>

### Сброс счётчика {#resetting-the-counter}

Добавьте метод `reset_original_value()`, который возвращает счётчик к исходному значению:

```python
counter = DecreasingCounter(55)
counter.decrease()
counter.decrease()
counter.decrease()
counter.decrease()
counter.print_value()
counter.reset_original_value()
counter.print_value()
```

<sample-output>

value: 51
value: 55

</sample-output>

</programming-exercise>

В завершение этого раздела посмотрим на класс, который моделирует личный рекорд игрока. В определении класса есть отдельные методы‑проверки, которые убеждаются, что переданные аргументы корректны. Эти методы вызываются прямо в конструкторе, что гарантирует внутреннюю корректность создаваемого объекта.

```python
from datetime import date

class PersonalBest:

    def __init__(self, player: str, day: int, month: int, year: int, points: int):
        # Значения по умолчанию
        self.player = ""
        self.date_of_pb = date(1900, 1, 1)
        self.points = 0

        if self.name_ok(player):
            self.player = player

        if self.date_ok(day, month, year):
            self.date_of_pb = date(year, month, day)

        if self.points_ok(points):
            self.points = points

    # Вспомогательные методы проверяют корректность аргументов
    def name_ok(self, name: str):
        return len(name) >= 2 # имя должно быть длиной хотя бы два символа

    def date_ok(self, day, month, year):
        try:
            date(year, month, day)
            return True
        except:
            # если аргументы некорректны, будет выброшено исключение
            return False

    def points_ok(self, points):
        return points >= 0

if __name__ == "__main__":
    result1 = PersonalBest("Peter", 1, 11, 2020, 235)
    print(result1.points)
    print(result1.player)
    print(result1.date_of_pb)

    # Дата была некорректной
    result2 = PersonalBest("Paula", 4, 13, 2019, 4555)
    print(result2.points)
    print(result2.player)
    print(result2.date_of_pb) # печатает значение по умолчанию: 1900-01-01
```

<sample-output>

235
Peter
2020-11-01
4555
Paula
1900-01-01

</sample-output>

В примере выше вспомогательные методы вызываются через `self` внутри конструктора. Также в классах можно определять _статические_ методы — такие, которые можно вызывать, не создавая экземпляр класса. К этой теме мы вернёмся в следующей части.

Параметр `self` используется, когда мы обращаемся к возможностям _объекта как экземпляра класса_. Это включает и атрибуты данных, и методы объекта. Иногда атрибуты данных и методы вместе называют просто _атрибутами_ объекта, поэтому в этом материале мы часто уточняем «атрибуты данных», когда имеем в виду переменные, определённые в классе. Здесь терминология некоторых Python‑разработчиков может немного отличаться от более общего ООП‑употребления, где словом _attributes_ обычно называют именно атрибуты данных.

Внутри методов можно создавать и локальные переменные без `self`. Так и следует делать, если переменная не нужна за пределами метода. Локальные переменные внутри методов не требуют специальных ключевых слов — они используются так же, как обычные переменные, с которыми вы уже работали.

Например, следующий код корректен:

```python
class BonusCard:
    def __init__(self, name: str, balance: float):
        self.name = name
        self.balance = balance

    def add_bonus(self):
        # Переменная bonus ниже — локальная переменная.
        # Это не атрибут данных объекта.
        # К ней нельзя обратиться напрямую через объект.
        bonus = self.balance * 0.25
        self.balance += bonus

    def add_superbonus(self):
        # Переменная superbonus — тоже локальная переменная.
        # Обычно вспомогательные переменные делают локальными,
        # потому что к ним не нужно обращаться из других методов
        # класса или напрямую через объект.
        superbonus = self.balance * 0.5
        self.balance += superbonus

    def __str__(self):
        return f"BonusCard(name={self.name}, balance={self.balance})"
```

<programming-exercise name="Имя и фамилия" anchor="First and last name" tmcname='part08-11_first_and_last_name'>

Напишите класс `Person` с _единственным атрибутом_ `name`, который задаётся аргументом конструктора.

Также добавьте два метода:

Метод `return_first_name` должен возвращать имя человека, а метод `return_last_name` — фамилию.

Можно считать, что в `name`, переданном в конструктор, всегда ровно два слова, разделённые пробелом.

Пример использования:

```python
if __name__ == "__main__":
    peter = Person("Peter Pythons")
    print(peter.return_first_name())
    print(peter.return_last_name())

    paula = Person("Paula Pythonnen")
    print(paula.return_first_name())
    print(paula.return_last_name())
```

<sample-output>

Peter
Pythons
Paula
Pythonnen

</sample-output>


</programming-exercise>

<programming-exercise name='Статистика по числам' anchor="Statistics on numbers" tmcname='part08-12_number_stats'>

В этом задании нужно создать программу для работы с числами — аналогично заданию в [конце части 2](/ru/part-2/4-simple-loops#programming-exercise-working-with-numbers) курса «Введение в программирование». Но теперь для этого нужно определить класс.

### Подсчёт чисел {#count-the-numbers}

Напишите класс `NumberStats` со следующими методами:

- метод `add_number` добавляет новое число в статистику
- метод `count_numbers` возвращает количество добавленных чисел

На этом этапе не нужно хранить сами числа в какой‑то структуре данных. Достаточно помнить, сколько чисел было добавлено. Метод `add_number` принимает аргумент, но само значение пока можно никак не обрабатывать.

В шаблоне задания есть следующий «скелет» класса:

```python
class  NumberStats:
    def __init__(self):
        self.numbers = 0

    def add_number(self, number:int):
        pass

    def count_numbers(self):
        pass
```

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
```

<sample-output>

Numbers added: 4

</sample-output>

### Сумма и среднее {#the-sum-and-the-mean}

Добавьте в класс следующие методы:

- метод `get_sum` должен возвращать сумму добавленных чисел (если чисел нет, вернуть 0)
- метод `average` должен возвращать среднее арифметическое добавленных чисел (если чисел нет, вернуть 0)

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
print("Sum of numbers:", stats.get_sum())
print("Mean of numbers:", stats.average())
```

<sample-output>

Numbers added: 4
Sum of numbers: 11
Mean of numbers: 2.75

</sample-output>

### Ввод пользователя {#user-input}

Напишите основную программу, которая запрашивает у пользователя целые числа, пока пользователь не введёт -1. После этого программа должна вывести сумму и среднее арифметическое введённых чисел.

В программе должен использоваться объект `NumberStats` для хранения статистики.

Важно: в этой части задания класс `NumberStats` менять не нужно, если он уже проходит тесты предыдущей части. Используйте экземпляр класса, чтобы реализовать требуемое поведение.

Важно 2: основная программа не должна находиться внутри блока `if __name__ == "__main__"`, иначе тесты не будут работать.

<sample-output>

Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25

</sample-output>

### Несколько сумм {#multiple-sums}

Доработайте основную программу так, чтобы она отдельно считала сумму чётных и сумму нечётных чисел.

Важно: в этой части тоже не меняйте класс `NumberStats`. Вместо этого создайте три объекта `NumberStats`: один для всех чисел, второй — для чётных, третий — для нечётных.

Важно 2: основная программа не должна находиться внутри блока `if __name__ == "__main__"`, иначе тесты не будут работать.

Посмотрите на пример ожидаемого поведения программы:

<sample-output>

Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
Sum of even numbers: 8
Sum of odd numbers: 5

</sample-output>



</programming-exercise>
