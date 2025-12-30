---
path: /ru/part-9/5-class-attributes
title: Атрибуты класса
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с терминами «переменная класса» и «метод класса»
- вы поймёте, чем статические характеристики отличаются от характеристик экземпляров
- вы сможете добавлять статические характеристики в свои классы

</text-box>

_Характеристики_ (traits) объектов — одно из центральных понятий в объектно‑ориентированном программировании. Этот термин охватывает методы и переменные, определённые в классе. Впрочем, не все программисты на Python используют слово «traits»: некоторые предпочитают термины _атрибуты_, _свойства_ или _члены_ класса. В более широком мире ООП термин traits достаточно распространён, поэтому здесь будем пользоваться им (в русском переводе — «характеристики»).

До сих пор мы в основном работали с _характеристиками объектов_ — то есть методами и атрибутами, доступными в каждом экземпляре класса. На самом деле характеристики могут быть и у _самих классов_. Их иногда называют _статическими характеристиками_, а более конкретно — _переменными класса_ и _методами класса_.

## Переменные класса {#class-variables}

У каждого экземпляра класса есть свои значения атрибутов, определённых в классе — мы уже видели это в предыдущих разделах. Но что если нам нужны данные, общие для всех экземпляров? Тут и пригодятся _переменные класса_ (class variables), их также называют статическими переменными. Переменная класса — это переменная, к которой обращаются через сам класс, а не через экземпляры. В любой момент выполнения программы переменная класса имеет одно значение вне зависимости от того, сколько экземпляров класса создано.

Переменная класса объявляется без `self` и обычно вне методов, так как она должна быть доступна из любой части класса (и зачастую — извне).

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Итоговая процентная ставка равна
        # общей ставке + индивидуальной ставке счёта
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance
```

Так как переменная `general_rate` определена внутри класса, но вне методов, и не использует `self`, это переменная класса.

К переменной класса обращаются через имя класса, например так:

```python
# Общая ставка существует независимо от каких-либо экземпляров объектов
print("The general interest rate is", SavingsAccount.general_rate)

account = SavingsAccount("12345", 1000, 0.05)
# Начисляем проценты и добавляем их к балансу счёта
account.add_interest()
print(account.balance)
```

<sample-output>

The general interest rate is 0.03
1080.0

</sample-output>

Итак, переменные класса доступны через имя класса (например, `SavingsAccount.general_rate`), а переменные экземпляра — через имя переменной‑объекта (например, `account.balance`). Переменная экземпляра, естественно, существует только тогда, когда создан экземпляр класса; переменная класса доступна везде и в любой момент, когда доступен сам класс.

Переменные класса полезны, когда нужно значение, общее для всех экземпляров. В примере выше мы предположили, что итоговая процентная ставка по всем сберегательным счетам состоит из двух частей: общая ставка одинакова для всех счетов, но у каждого счёта есть и своя индивидуальная ставка в атрибуте экземпляра. Общая ставка также может меняться — и тогда изменение одинаково повлияет на все экземпляры класса.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # Итоговая процентная ставка равна
        # общей ставке + индивидуальной ставке счёта
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance

    @property
    def total_interest(self):
        return self.__interest_rate + SavingsAccount.general_rate
```

```python
account1 = SavingsAccount("12345", 100, 0.03)
account2 = SavingsAccount("54321", 200, 0.06)

print("General interest rate:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)

# Теперь общая процентная ставка — 10%
SavingsAccount.general_rate = 0.10

print("General interest rate:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)
```

<sample-output>

General interest rate: 0.03
0.06
0.09
General interest rate: 0.1
0.13
0.16

</sample-output>

Когда общая ставка меняется, итоговая ставка меняется у всех экземпляров класса. Как вы видите, можно добавить геттер через `@property`, даже если в классе нет атрибута с таким именем. Этот метод возвращает сумму общей ставки и индивидуальной ставки конкретного счёта.

Рассмотрим другой пример. Класс `PhoneNumber` описывает один телефонный номер, но также содержит коды стран в словаре. Этот словарь — переменная класса, а значит он общий для всех экземпляров, потому что код страны для номеров одной страны всегда одинаков.

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        self.__phone_number = phone_number
        self.__country = country

    @property
    def phone_number(self):
        # При добавлении кода страны
        # начальный ноль удаляется из номера
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]
```

```python
paulas_no = PhoneNumber("Paula Pythons", "050 1234 567", "Finland")
print(paulas_no.phone_number)
```

<sample-output>

+358 50 1234 567

</sample-output>

Каждый объект `PhoneNumber` содержит имя владельца, сам номер и страну, к которой относится номер. Когда мы обращаемся к номеру через геттер, нужный код страны берётся из словаря‑переменной класса на основании атрибута страны и добавляется в начало номера.

Сама по себе реализация выше пока не очень функциональна. В следующем примере мы добавили геттеры и сеттеры для всех атрибутов:

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        # Это вызов метода phone_number.setter
        self.phone_number = phone_number
        # Это вызов метода country.setter
        self.country = country

    # геттер phone_number объединяет код страны
    # и значение атрибута phone_number
    @property
    def phone_number(self):
        # начальный ноль удаляется, так как добавляется код страны
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]

    @phone_number.setter
    def phone_number(self, number):
        # Проверяем, что номер состоит только из цифр и пробелов
        for character in number:
            if character not in "1234567890 ":
                raise ValueError("A phone number can only contain numbers and spaces")
        self.__phone_number = number

    # геттер только локального номера без кода страны
    @property
    def local_number(self):
        return self.__phone_number

    @property
    def country(self):
        return self.__country

    @country.setter
    def country(self, country):
        # Проверяем, что страна — ключ в словаре кодов стран
        if country not in PhoneNumber.country_codes:
            raise ValueError("This country is not on the list.")
        self.__country = country

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    def __str__(self):
        return f"{self.phone_number} ({self.__name})"
```

```python
if __name__ == "__main__":
    pn = PhoneNumber("Peter Pythons", "040 111 1111", "Sweden")
    print(pn)
    print(pn.phone_number)
    print(pn.local_number)
```

<sample-output>

+46 40 111 1111 (Peter Pythons)
+46 40 111 1111
040 111 1111

</sample-output>

<programming-exercise name='Почтовые индексы' anchor="Postcodes" tmcname='part09-13_postcodes'>

Шаблон упражнения содержит определение класса `City`, который моделирует один город.

Добавьте переменную класса `postcodes`, которая ссылается на словарь. Ключи словаря — названия городов, а значения — почтовые индексы этих городов. И ключи, и значения — строки.

Словарь должен содержать (как минимум) следующие индексы:

* Helsinki 00100
* Turku 20100
* Tampere 33100
* Rovaniemi 96100
* Oulu 90100

Другую функциональность реализовывать не нужно.

</programming-exercise>

## Методы класса {#class-methods}

Метод класса (его также называют статическим методом) — это метод, который не привязан к конкретному экземпляру класса. Такой метод можно вызывать, не создавая ни одного экземпляра.

Методы класса обычно служат инструментами, связанными с назначением класса, но «оторванными» от конкретных объектов: чтобы их вызвать, не должно быть необходимости создавать экземпляры. Как правило, такие методы публичные — их можно вызывать и снаружи класса, и изнутри, в том числе из методов экземпляров.

Метод класса определяется с помощью аннотации `@classmethod`. Первый параметр всегда называется `cls`. Имя `cls` похоже на `self`, но есть различие: `cls` указывает на класс, а `self` — на экземпляр класса. Ни один из этих параметров не передаётся при вызове вручную: Python подставляет нужное значение автоматически.

В следующем примере класс моделирует регистрацию транспортных средств. В классе `Registration` есть статический метод проверки корректности номерного знака. Это именно метод класса, потому что полезно уметь проверить номер даже до создания первого объекта `Registration`:

```python
class Registration:
    def __init__(self, owner: str, make: str, year: int, license_plate: str):
        self.__owner = owner
        self.__make = make
        self.__year = year

        # Вызываем метод license_plate.setter
        self.license_plate = license_plate

    @property
    def license_plate(self):
        return self.__license_plate

    @license_plate.setter
    def license_plate(self, plate):
        if Registration.license_plate_valid(plate):
            self.__license_plate = plate
        else:
            raise ValueError("The license plate is not valid")

    # Метод класса для проверки корректности номерного знака
    @classmethod
    def license_plate_valid(cls, plate: str):
        if len(plate) < 3 or "-" not in plate:
            return False

        # Проверяем отдельно буквенную и цифровую части
        letters, numbers = plate.split("-")

        # в буквенной части могут быть только буквы
        for character in letters:
            if character.lower() not in "abcdefghijklmnopqrstuvwxyzåäö":
                return False

        # в цифровой части могут быть только цифры
        for character in numbers:
            if character not in "1234567890":
                return False

        return True
```

```python
registration = Registration("Mary Motorist", "Volvo", "1992", "abc-123")

if Registration.license_plate_valid("xyz-789"):
    print("This is a valid license plate!")
```

<sample-output>

This is a valid license plate!

</sample-output>

Проверить корректность номерного знака можно, даже не создавая ни одного экземпляра класса — например, вызвав `Registration.license_plate_valid("xyz-789")`. Тот же метод вызывается и внутри конструктора класса. Важно: даже в конструкторе обращение идёт через имя класса, а не через `self`!

<programming-exercise name='Помощник для списков' anchor="List helper" tmcname='part09-14_list_helper'>

Создайте класс `ListHelper`, который содержит два метода класса:

* `greatest_frequency(my_list: list)` возвращает самый часто встречающийся элемент списка
* `doubles(my_list: list)` возвращает количество уникальных элементов, которые встречаются в списке минимум дважды

Эти методы должны вызываться без создания экземпляра класса. Пример использования:

```python
numbers = [1, 1, 2, 1, 3, 3, 4, 5, 5, 5, 6, 5, 5, 5]
print(ListHelper.greatest_frequency(numbers))
print(ListHelper.doubles(numbers))
```

<sample-output>

5
3

</sample-output>

</programming-exercise>
