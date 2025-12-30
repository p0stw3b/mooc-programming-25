---
path: /ru/part-9/3-encapsulation
title: Инкапсуляция
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, что такое инкапсуляция
- вы сможете создавать приватные атрибуты
- вы будете знать, как создавать геттеры и сеттеры для своих атрибутов

</text-box>

В объектно‑ориентированном программировании термин _клиент_ означает программу, которая использует класс или экземпляры класса. Класс предоставляет клиенту _сервисы_ (методы), через которые клиент получает доступ к объектам, созданным на основе класса. Цели здесь такие:

1) использование класса и/или объектов должно быть как можно более простым с точки зрения клиента
2) _целостность_ любого объекта должна сохраняться всегда

Целостность объекта означает, что _состояние_ объекта остаётся корректным. На практике это значит, что значения атрибутов объекта всегда допустимы. Например, объект‑дата никогда не должен иметь значение 13 в качестве месяца, объект‑студент не должен иметь отрицательное число зачётных единиц и т. д.

Рассмотрим класс `Student`:

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number
        self.study_credits = 0

    def add_credits(self, study_credits):
        if study_credits > 0:
            self.study_credits += study_credits
```

Объект `Student` предоставляет клиенту метод `add_credits`, который позволяет добавить указанное количество зачётных единиц к сумме. Метод гарантирует, что переданное значение больше нуля. Следующий код добавляет зачётные единицы три раза:

```python
sally = Student("Sally Student", "12345")
sally.add_credits(5)
sally.add_credits(5)
sally.add_credits(10)
print("Study credits:", sally.study_credits)
```

<sample-output>

Study credits: 20

</sample-output>

Несмотря на наличие метода, к атрибуту `study_credits` всё равно можно обратиться напрямую. Это может привести к ошибочному состоянию, когда целостность объекта нарушается:

```python
sally = Student("Sally Student", "12345")
sally.study_credits = -100
print("Study credits:", sally.study_credits)
```

<sample-output>

Study credits: -100

</sample-output>

## Инкапсуляция {#encapsulation}

Во многих объектно‑ориентированных языках классы могут скрывать свои атрибуты от клиентов. Такие скрытые атрибуты обычно называют _приватными_ (private). В Python это достигается добавлением двух подчёркиваний `__` в начале имени атрибута:

```python
class CreditCard:
    # атрибут number приватный, а атрибут name доступен
    def __init__(self, number: str, name: str):
        self.__number = number
        self.name = name
```

Приватный атрибут напрямую не виден клиенту. Попытка обратиться к нему приводит к ошибке. В примере выше атрибут `name` доступен и его можно свободно менять:

```python
card = CreditCard("123456","Randy Riches")
print(card.name)
card.name = "Charlie Churchmouse"
print(card.name)
```

<sample-output>

Randy Riches
Charlie Churchmouse

</sample-output>

А вот попытка вывести номер карты приводит к ошибке:

```python
card = CreditCard("123456","Randy Riches")
print(card.__number)
```

<sample-output>

AttributeError: 'CreditCard' object has no attribute '__number'

</sample-output>

Скрытие атрибутов от клиента называется _инкапсуляцией_. Как следует из названия, атрибут как бы «заключают в капсулу». При этом клиенту предоставляют подходящий интерфейс для доступа к данным и работы с ними.

Добавим ещё один инкапсулированный атрибут — баланс кредитной карты. На этот раз также добавим публичные методы, которые позволят клиенту получать баланс и изменять его:

```python
class CreditCard:
    def __init__(self, number: str, name: str, balance: float):
        self.__number = number
        self.name = name
        self.__balance = balance

    def deposit_money(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def withdraw_money(self, amount: float):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount

    def retrieve_balance(self):
        return self.__balance
```

```python
card = CreditCard("123456", "Randy Riches", 5000)
print(card.retrieve_balance())
card.deposit_money(100)
print(card.retrieve_balance())
card.withdraw_money(500)
print(card.retrieve_balance())
# Следующее не сработает, потому что на балансе недостаточно средств
card.withdraw_money(10000)
print(card.retrieve_balance())
```

<sample-output>

5000
5100
4600
4600

</sample-output>

Баланс нельзя изменить напрямую, потому что атрибут приватный, но мы добавили методы `deposit_money` и `withdraw_money`, которые меняют значение корректно. Метод `retrieve_balance` возвращает текущий баланс. В методах есть простые проверки для сохранения целостности объекта: например, карта не должна уходить в минус.

<programming-exercise name='Автомобиль' anchor="Car" tmcname='part09-09_car'>

Реализуйте класс `Car`, у которого есть две приватные, _инкапсулированные_ переменные: количество топлива в баке (от 0 до 60 литров) и показание одометра (в километрах). Автомобиль расходует один литр топлива на один километр.

В классе должны быть следующие методы:

- `fill_up()` — полностью заправляет бак
- `drive(km:int)` — «едет» указанное расстояние или столько, на сколько хватит топлива
- `__str__` — возвращает строковое представление автомобиля, как в примерах ниже

Пример использования класса:

```python
car = Car()
print(car)
car.fill_up()
print(car)
car.drive(20)
print(car)
car.drive(50)
print(car)
car.drive(10)
print(car)
car.fill_up()
car.fill_up()
print(car)
```

<sample-output>

Car: odometer reading 0 km, petrol remaining 0 litres
Car: odometer reading 0 km, petrol remaining 60 litres
Car: odometer reading 20 km, petrol remaining 40 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 60 litres

</sample-output>

**Важно:** требуется инкапсулировать количество топлива и показания одометра. К ним не должно быть прямого доступа извне (вне методов самого класса).

</programming-exercise>

## Небольшое замечание о приватных атрибутах, Python и ООП {#a-brief-note-on-private-attributes-python-and-object-oriented-programming}

Если искать материалы в интернете, можно встретить способы «обойти» нотацию `__` для скрытия атрибутов. В Python ни один атрибут не является по‑настоящему приватным — так задумано создателями языка. С другой стороны, от программиста на Python обычно ожидается, что он будет уважать правила видимости, заданные в классе, а чтобы обойти их, нужно предпринять специальные действия. В других объектно‑ориентированных языках (например, в Java) приватные переменные часто действительно скрыты, и лучше мыслить о приватных переменных Python примерно так же.

## Геттеры и сеттеры {#getters-and-setters}

В объектно‑ориентированном программировании методы, предназначенные для чтения и изменения атрибутов, обычно называют _геттерами_ (getters) и _сеттерами_ (setters). Не все Python‑программисты используют термины «геттер» и «сеттер», но ниже мы рассмотрим концепцию _свойств_ (properties), которая очень близка по смыслу, поэтому здесь воспользуемся общепринятой терминологией ООП.

Итак, выше мы создали публичные методы для доступа к приватным атрибутам, но есть более прямой, «питоничный» способ. Рассмотрим простой класс `Wallet` с одним приватным атрибутом `money`:

```python
class Wallet:
    def __init__(self):
        self.__money = 0
```

Мы можем добавить геттер и сеттер для доступа к приватному атрибуту с помощью декоратора `@property`:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # Метод-геттер
    @property
    def money(self):
        return self.__money

    # Метод-сеттер
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
```

Сначала мы определяем геттер, который возвращает текущее количество денег в кошельке. Затем определяем сеттер, который устанавливает новое значение атрибута `money`, при этом проверяя, что оно не отрицательное.

Новые методы используются так:

```python
wallet = Wallet()
print(wallet.money)

wallet.money = 50
print(wallet.money)

wallet.money = -30
print(wallet.money)
```

<sample-output>

0
50
50

</sample-output>

С точки зрения клиента, использование этих новых методов ничем не отличается от прямого доступа к атрибуту. Скобки не нужны: можно писать `wallet.money = 50`, как будто мы просто присваиваем значение переменной. Именно в этом и цель: скрыть (то есть инкапсулировать) внутреннюю реализацию атрибута и при этом дать простой способ читать и менять данные в объекте.

У предыдущего примера есть небольшой недостаток: клиент не получает уведомления о неудачной попытке установить отрицательное значение для `money`. Когда переданное значение явно некорректно, обычно стоит выбросить исключение и тем самым сообщить клиенту. В данном случае логично выбросить `ValueError`, чтобы обозначить недопустимое значение.

Ниже — улучшенная версия класса и код для проверки:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # Метод-геттер
    @property
    def money(self):
        return self.__money

    # Метод-сеттер
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
        else:
            raise ValueError("The amount must not be below zero")
```

```python
wallet.money = -30
print(wallet.money)
```

<sample-output>

ValueError: The amount must not be below zero

</sample-output>

**Важно:** геттер (то есть `@property`) нужно объявлять до сеттера, иначе при выполнении класса возникнет ошибка. Это потому, что `@property` задаёт имя «атрибута», доступного клиенту. Сеттер, добавленный через `.setter`, лишь расширяет уже созданное свойство.

<programming-exercise name='Запись' anchor="Recording" tmcname='part09-10_recording'>

Создайте класс `Recording`, который моделирует одну запись. В классе должна быть одна приватная переменная: `__length` типа `int`.

Реализуйте следующее:

* конструктор, который принимает длину как аргумент
* геттер `length`, который возвращает длину записи
* сеттер, который устанавливает длину записи

Класс должен использоваться так:

```python
the_wall = Recording(43)
print(the_wall.length)
the_wall.length = 44
print(the_wall.length)
```

<sample-output>

43
44

</sample-output>


Если аргумент в конструкторе или в сеттере меньше нуля, должно возникать исключение `ValueError`.

Если нужно освежить в памяти выбрасывание исключений, посмотрите [часть 6](/ru/part-6/3-errors#raising-exceptions) материалов курса.

</programming-exercise>

В следующем примере класс имеет два приватных атрибута и геттеры/сеттеры для каждого. Попробуйте запустить программу, подставляя разные значения:

```python
class Player:
    def __init__(self, name: str, player_number: int):
        self.__name = name
        self.__player_number = player_number

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name: str):
        if name != "":
            self.__name = name
        else:
            raise ValueError("The name may not be an empty string")

    @property
    def player_number(self):
        return self.__player_number

    @player_number.setter
    def player_number(self, player_number: int):
        if player_number > 0:
            self.__player_number = player_number
        else:
            raise ValueError("The player number must be a positive integer")
```

```python
player = Player("Betty Ballmer", 10)
print(player.name)
print(player.player_number)

player.name = "Buster Ballmer"
player.player_number = 11
print(player.name)
print(player.player_number)
```

<sample-output>

Betty Ballmer
10
Buster Ballmer
11

</sample-output>

Чтобы завершить раздел, рассмотрим класс, моделирующий простой дневник. Все атрибуты приватные, но для них используются разные интерфейсы: у владельца дневника есть геттер и сеттер, а записи дневника обрабатываются «традиционными» методами. В этом случае имеет смысл полностью закрыть клиенту доступ к внутренней структуре данных дневника. Клиенту напрямую видны только публичные методы.

Инкапсуляция также гарантирует, что внутреннюю реализацию класса можно менять как угодно, пока публичный интерфейс остаётся тем же. Клиенту не нужно знать и не важно, на чём основана внутренняя структура данных — на списках, словарях или на чём‑то ещё.

```python
class Diary:
    def __init__(self, owner: str):
        self.__owner = owner
        self.__entries = []

    @property
    def owner(self):
        return self.__owner

    @owner.setter
    def owner(self, owner):
        if owner != "":
            self.__owner = owner
        else:
            raise ValueError("The owner may not be an empty string")

    def add_entry(self, entry: str):
        self.__entries.append(entry)

    def print_entries(self):
        print("A total of", len(self.__entries), "entries")
        for entry in self.__entries:
            print("- " + entry)
```

```python
diary = Diary("Peter")
diary.add_entry("Today I ate porridge")
diary.add_entry("Today I learned object oriented programming")
diary.add_entry("Today I went to bed early")
diary.print_entries()
```

<sample-output>

A total of 3 entries
- Today I ate porridge
- Today I learned object oriented programming
- Today I went to bed early

</sample-output>

<programming-exercise name='Метеостанция' anchor="Weather station" tmcname='part09-11_weather_station'>

Создайте класс `WeatherStation`, который хранит наблюдения за погодой. Публичный интерфейс класса должен включать:

* конструктор, который принимает имя станции
* метод `add_observation(observation: str)`, который добавляет наблюдение в конец списка
* метод `latest_observation()`, который возвращает последнее добавленное наблюдение; если наблюдений ещё нет, метод должен вернуть _пустую строку_
* метод `number_of_observations()`, который возвращает общее количество добавленных наблюдений
* метод `__str__`, который возвращает имя станции и количество наблюдений, как в примере ниже

Все атрибуты должны быть инкапсулированы, то есть к ним нельзя обращаться напрямую. Как именно реализовать класс — решать вам, главное, чтобы публичный интерфейс точно соответствовал описанию выше.

Пример использования:

```python
station = WeatherStation("Houston")
station.add_observation("Rain 10mm")
station.add_observation("Sunny")
print(station.latest_observation())

station.add_observation("Thunderstorm")
print(station.latest_observation())

print(station.number_of_observations())
print(station)
```

<sample-output>

Sunny
Thunderstorm
3
Houston, 3 observations

</sample-output>

</programming-exercise>
