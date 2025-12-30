---
path: /ru/part-10/2-access-modifiers
title: Модификаторы доступа
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы поймёте модификаторы доступа private и protected
- вы будете знать, как в Python определяется видимость характеристик (атрибутов и методов)

</text-box>

Если характеристика (атрибут или метод) определена как приватная в базовом классе, она недоступна напрямую в производных классах — мы кратко упоминали это в предыдущем разделе. Рассмотрим пример. В классе `Notebook` ниже заметки хранятся в списке, который находится в приватном атрибуте:

```python

class Notebook:
    """Блокнот хранит заметки в виде строк."""

    def __init__(self):
        # приватный атрибут
        self.__notes = []

    def add_note(self, note):
        self.__notes.append(note)

    def retrieve_note(self, index):
        return self.__notes[index]

    def all_notes(self):
        return ",".join(self.__notes)

```

Если для нас важна целостность класса, сделать атрибут‑список с заметками приватным — разумно. В конце концов, класс предоставляет клиенту подходящие методы для добавления и просмотра заметок. Но подход становится проблемным, если мы определяем новый класс `NotebookPro`, наследующий `Notebook`. Приватный атрибут недоступен не только клиенту, но и производному классу. Если попытаться обратиться к нему, как в методе `find_notes` ниже, мы получим ошибку:

```python
class NotebookPro(Notebook):
    """Улучшенный блокнот с возможностью поиска."""
    def __init__(self):
        # Это нормально: конструктор публичный, несмотря на подчёркивания
        super().__init__()

    # Это вызовет ошибку
    def find_notes(self, search_term):
        found = []
        # атрибут __notes приватный,
        # поэтому производный класс не может обращаться к нему напрямую
        for note in self.__notes:
            if search_term in note:
                found.append(note)

        return found
```

<sample-output>
    
AttributeError: 'NotebookPro' object has no attribute '_NotebookPro__notes'

</sample-output>

## Защищённые характеристики {#protected-traits}

Во многих объектно‑ориентированных языках есть механизм (обычно ключевое слово) для _защиты_ характеристик (атрибутов и методов). Это означает: характеристика скрыта от клиента класса, но доступна производным классам. Python в целом «не любит» ключевые слова, поэтому прямого аналога в языке нет. Вместо этого используется _соглашение_ о том, как обозначать защищённые характеристики.

Напомним: характеристику можно скрыть, добавив к её имени два подчёркивания:

```python
def __init__(self):
    self.__notes = []
```

Принятое соглашение для _защищённой_ характеристики — ставить _одно_ подчёркивание в начале имени. Это _лишь_ соглашение: формально ничто не мешает его нарушить, но это считается плохой практикой.

```python
def __init__(self):
    self._notes = []
```

Ниже приведён весь пример с `Notebook`, но теперь `_notes` защищённый вместо приватного `__notes`:

```python
class Notebook:
    """Блокнот хранит заметки в виде строк."""

    def __init__(self):
        # защищённый атрибут
        self._notes = []

    def add_note(self, note):
        self._notes.append(note)

    def retrieve_note(self, index):
        return self._notes[index]

    def all_notes(self):
        return ",".join(self._notes)

class NotebookPro(Notebook):
    """Улучшенный блокнот с возможностью поиска."""
    def __init__(self):
        # Это нормально: конструктор публичный, несмотря на подчёркивания
        super().__init__()

    # Это работает: защищённый атрибут доступен производному классу
    def find_notes(self, search_term):
        found = []
        for note in self._notes:
            if search_term in note:
                found.append(note)

        return found

```

Ниже — удобная таблица видимости атрибутов для разных модификаторов доступа:

Модификатор доступа | Пример | Видно клиенту | Видно производному классу
:--------:|:-------------:|:---:|:----:
Public    | `self.name`   | да  | да
Protected | `self._name`  | нет | да
Private   | `self.__name` | нет | нет

Модификаторы доступа работают одинаково для всех характеристик (и атрибутов, и методов). Например, в классе `Person` ниже есть защищённый метод `_capitalize_initials`. Его можно использовать из производного класса `Footballer`:

```python
class Person:
    def __init__(self, name: str):
        self._name = self._capitalize_initials(name)

    def _capitalize_initials(self, name):
        name_capitalized = []
        for n in name.split(" "):
            name_capitalized.append(n.capitalize())

        return " ".join(name_capitalized)

    def __repr__(self):
        return self.__name

class Footballer(Person):

    def __init__(self, name: str, nickname: str, position: str):
        super().__init__(name)
        # метод доступен, так как он защищённый в базовом классе
        self.__nickname = self._capitalize_initials(nickname)
        self.__position = position

    def __repr__(self):
        r =  f"Footballer - name: {self._name}, nickname: {self.__nickname}"
        r += f", position: {self.__position}"
        return r

# Протестируем классы
if __name__ == "__main__":
    jp = Footballer("peter pythons", "pyper", "forward")
    print(jp)

```

<sample-output>

Footballer - name: Peter Pythons, nickname: Pyper, position: forward

</sample-output>


<programming-exercise name='Супергруппа' anchor="Supergroup" tmcname='part10-05_supergroup'>

Шаблон упражнения содержит определение класса `SuperHero`.

Определите класс `SuperGroup`, который представляет группу супергероев. В классе должны быть:

* **защищённые** атрибуты `name` (str), `location` (str) и `members` (list)
* конструктор, который принимает имя и местоположение группы (в этом порядке)
* геттеры для атрибутов имени и местоположения
* метод `add_member(hero: SuperHero)`, который добавляет нового участника в группу
* метод `print_group`, который выводит информацию о группе и её участниках в формате, указанном ниже

Пример использования класса:

```python
superperson = SuperHero("SuperPerson", "Superspeed, superstrength")
invisible = SuperHero("Invisible Inca", "Invisibility")
revengers = SuperGroup("Revengers", "Emerald City")

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
```

<sample-output>

Revengers, Emerald City
Members:
SuperPerson, superpowers: Superspeed, superstrength
Invisible Inca, superpowers: Invisibility

</sample-output>

Если нужно освежить в памяти геттеры и сеттеры, посмотрите [этот раздел предыдущей части](/ru/part-9/3-encapsulation#getters-and-setters).

</programming-exercise>

<programming-exercise name='Секретное волшебное зелье' anchor="Secret magic potion" tmcname='part10-06_secret_magic_potion'>

Шаблон упражнения содержит определение класса `MagicPotion`, который позволяет хранить рецепт волшебного зелья. В классе есть конструктор и методы:

* `add_ingredient(ingredient: str, amount: float)`
* `print_recipe()`

Определите класс `SecretMagicPotion`, который наследует `MagicPotion` и дополнительно позволяет защитить рецепт паролем.

Новый класс должен иметь конструктор, который также принимает строку‑пароль.

Также в классе должны быть следующие методы:

* `add_ingredient(ingredient: str, amount: float, password: str)`
* `print_recipe(password: str)`

Если пароль, переданный любому из этих методов, неверный, метод должен выбросить исключение `ValueError`.

Если пароль верный, каждый метод должен вызвать соответствующий метод родительского класса. Ничего не копируйте и не вставляйте из класса `MagicPotion`.

Пример того, как это должно работать:

```python
diminuendo = SecretMagicPotion("Diminuendo maximus", "hocuspocus")
diminuendo.add_ingredient("Toadstool", 1.5, "hocuspocus")
diminuendo.add_ingredient("Magic sand", 3.0, "hocuspocus")
diminuendo.add_ingredient("Frogspawn", 4.0, "hocuspocus")
diminuendo.print_recipe("hocuspocus")

diminuendo.print_recipe("pocushocus") # неверный пароль!
```

<sample-output>

Diminuendo maximus:
Toadstool 1.5 grams
Magic sand 3.0 grams
Frogspawn 4.0 grams
Traceback (most recent call last):
  File "secret_magic_potion.py", line 98, in <module>
    raise ValueError("Wrong password!")
ValueError: Wrong password!

</sample-output>

</programming-exercise>
