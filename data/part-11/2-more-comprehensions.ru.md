---
path: /ru/part-11/2-more-comprehensions
title: Ещё о включениях
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете использовать включения (comprehensions) со строками
- вы будете знать, как использовать включения с собственными классами
- вы сможете создавать включения для словарей (dictionary comprehensions)

</text-box>

Списки, пожалуй, самый распространённый объект для включений, но включения работают с любой последовательностью элементов — в том числе со строками. Так же, как и в примерах со списками из предыдущего раздела, если списковое включение выполняется над строкой, элементы строки (то есть символы) берутся по одному, обрабатываются согласно выражению и сохраняются в новый список.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```

<sample-output>

['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']

</sample-output>

Результат действительно является списком — это задаётся квадратными скобками вокруг включения. Если же нам нужна строка, можно использовать строковый метод `join`, чтобы «склеить» список обратно в строку. Помните: метод вызывается у строки‑«клея», которую мы хотим вставлять между символами. Посмотрим на примеры:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" and ".join(char_list))
```

<sample-output>

['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r

</sample-output>

Списковые включения и метод `join` позволяют легко создавать новые строки на основе других строк. Например, можно сделать строку, содержащую только гласные из другой строки:

```python
test_string = "Hello there, this is a test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```

<sample-output>

eoeeiiae

</sample-output>

В примере выше списковое включение и `join` записаны в разных строках, но их можно объединить в одно выражение:

```python
test_string = "Hello there, this is a test!"

vowel_string = "".join([character for character in test_string if character in "aeiou"])

print(vowel_string)
```

Многие Python‑программисты любят такие однострочники, так что полезно научиться их читать. Можно добавить сюда и метод `split`, чтобы эффективно обрабатывать целые предложения одной инструкцией. В примере ниже из каждого слова предложения удаляется первый символ:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

sentence_no_initials = " ".join([word[1:] for word in sentence.split()])
print(sentence_no_initials)
```

<sample-output>

heila eeps n elling eashells n he eashore

</sample-output>

Разберём это по шагам:

- `word[1:]` извлекает подстроку, начиная со второго символа (с индекса 1) и до конца
- `sentence.split()` разбивает строку на части по указанному разделителю; здесь аргумент не задан, поэтому строка по умолчанию делится по пробелам
- `" ".join()` объединяет элементы списка в новую строку, вставляя между элементами пробел

Более традиционный итеративный вариант мог бы выглядеть так:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

word_list = []
words = sentence.split()
for word in words:
    word_no_initials = word[1:]
    word_list.append(word_no_initials)

sentence_no_initials = " ".join(word_list)

print(sentence_no_initials)
```

<programming-exercise name='Фильтр запрещённых символов' anchor="Filter forbidden" tmcname='part11-08_filter_forbidden'>

Напишите функцию `filter_forbidden(string: str, forbidden: str)`, которая принимает две строки. Функция должна вернуть новую версию первой строки — без символов, встречающихся во второй строке.

Реализуйте функцию с помощью спискового включения. Максимальная длина функции — три строки кода, включая строку заголовка, начинающуюся с `def`.

Посмотрите на пример ниже.

```python
sentence = "Once! upon, a time: there was a python!??!?!"
filtered = filter_forbidden(sentence, "!?:,.")
print(filtered)
```

<sample-output>

Once upon a time there was a python

</sample-output>

</programming-exercise>

## Собственные классы и включения {#own-classes-and-comprehensions}

Включения могут быть полезны для обработки или создания экземпляров собственных классов — это видно в следующих примерах.

Сначала рассмотрим класс `Country` — простой модельный класс страны с атрибутами имени и численности населения. В основной части программы ниже мы создаём несколько объектов `Country`, а затем списковым включением выбираем только те, у которых население больше пяти миллионов.

```python
class Country:
    """Класс моделирует одну страну с численностью населения."""
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country)

```

<sample-output>

Finland
Sweden

</sample-output>

В списковом включении выше мы выбрали только атрибут `name` из объектов `Country`, поэтому список можно печатать напрямую. Можно было бы создать список самих объектов‑стран и обращаться к атрибутам уже в цикле `for`. Это полезно, если тот же список стран нужен позже в программе или если в цикле требуется и численность населения:

```python
if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country.name, country.population)
```

В следующем примере есть класс `RunningEvent`, который моделирует одно беговое соревнование, храня длину дистанции и название забега. Мы будем использовать списковое включение, чтобы создавать объекты `RunningEvent` на основе списка длин дистанций.

Параметр `name` имеет значение по умолчанию в конструкторе `RunningEvent`, поэтому нам не обязательно передавать название аргументом.

```python
class RunningEvent:
    """Класс моделирует одно беговое соревнование длиной n метров."""
    def __init__(self, length: int, name: str = "no name"):
        self.length = length
        self.name = name

    def __repr__(self):
        return f"{self.length} m. ({self.name})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    events = [RunningEvent(length) for length in lengths]

    # Выведем все соревнования
    print(events)

    # Выберем одно из списка и зададим ему имя
    marathon = events[-1] # последний элемент списка
    marathon.name = "Marathon"

    # Выведем всё снова, уже с новым именем
    print(events)
```

<sample-output>

[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (no name)]
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (Marathon)]

</sample-output>

Теперь выясним, что делает последовательность элементов «пригодной для включений». В предыдущей части мы научились делать собственные классы итерируемыми. Именно эта особенность и позволяет использовать объекты в списковых включениях. Если ваш класс итерируемый, его можно использовать как основу для спискового включения. Следующие определения классов взяты напрямую из [части 10](/ru/part-10/3-oo-programming-techniques#iterators):

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # Метод инициализации итератора
    # Здесь нужно инициализировать переменную(-ые) итерации
    def __iter__(self):
        self.n = 0
        # метод возвращает ссылку на сам объект, так как
        # итератор реализован в этом же классе
        return self

    # Этот метод возвращает следующий элемент
    # Если все элементы пройдены, возбуждается StopIteration
    def __next__(self):
        if self.n < len(self._books):
            # Выбираем текущий элемент из списка внутри объекта
            book = self._books[self.n]
            # увеличиваем счётчик (переменную итерации) на один
            self.n += 1
            # возвращаем текущий элемент
            return book
        else:
            # Все книги уже пройдены
            raise StopIteration

# Протестируем классы
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Создадим список названий всех книг
    book_names = [book.name for book in shelf]
    print(book_names)

```

<programming-exercise name='Товары в списке покупок' anchor="Products in shopping list" tmcname='part11-09_products_in_shopping_list'>

В части 10 вы создавали [итерируемый список покупок](/ru/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list), и мы только что узнали, что объект итерируемого класса можно использовать в списковых включениях. Шаблон упражнения содержит упрощённую версию `ShoppingList` — ровно с той функциональностью, которая нужна для этого задания.

Напишите функцию `products_in_shopping_list(shopping_list, amount: int)`, которая принимает объект `ShoppingList` и целое число. Функция возвращает список названий продуктов. В список должны попасть только продукты, количество которых не меньше значения `amount`.

Реализуйте функцию с помощью спискового включения. Максимальная длина — две строки кода, включая строку заголовка, начинающуюся с `def`. Определение класса `ShoppingList` изменять _нельзя_.

Функция должна работать так:

```python
my_list = ShoppingList()
my_list.add("bananas", 10)
my_list.add("apples", 5)
my_list.add("alcohol free beer", 24)
my_list.add("pineapple", 1)

print("the shopping list contains at least 8 of the following items:")
for product in products_in_shopping_list(my_list, 8):
    print(product)
```

<sample-output>

the shopping list contains at least 8 of the following items:
bananas
alcohol free beer

</sample-output>

</programming-exercise>

<programming-exercise name='Разница в цене для более дешёвой недвижимости' anchor="Price difference of cheaper properties" tmcname='part11-10_cheaper_properties'>

Это упражнение — слегка изменённая версия задания [Сравнение свойств](/ru/part-9/1-objects-and-references#programming-exercise-comparing-properties) из части 9.

Напишите функцию `cheaper_properties(properties: list, reference: RealProperty)`, которая принимает список объектов недвижимости и один объект `RealProperty` в качестве эталона. Функция должна вернуть список только тех объектов недвижимости, которые дешевле эталонного, вместе с разницей в цене. Элементы возвращаемого списка должны быть кортежами, где первый элемент — объект недвижимости, а второй — разница в цене.

Реализуйте функцию с помощью спискового включения. Максимальная длина — две строки кода, включая строку заголовка, начинающуюся с `def`.

Код класса `RealProperty` есть в шаблоне упражнения и не должен изменяться.

Пример работы функции:

```python
a1 = RealProperty(1, 16, 5500, "Central studio")
a2 = RealProperty(2, 38, 4200, "Two bedrooms downtown")
a3 = RealProperty(3, 78, 2500, "Three bedrooms in the suburbs")
a4 = RealProperty(6, 215, 500, "Farm in the middle of nowhere")
a5 = RealProperty(4, 105, 1700, "Loft in a small town")
a6 = RealProperty(25, 1200, 2500, "Countryside mansion")

properties = [a1, a2, a3, a4, a5, a6]

print(f"cheaper options when compared to {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:35} price difference {item[1]} euros")
```

<sample-output>

cheaper options when compared to Three bedrooms in the suburbs:
Central studio                                    price difference 107000 euros
Two bedrooms downtown               price difference 35400 euros
Farm in the middle of nowhere       price difference 87500 euros
Loft in a small town                           price difference 16500 euros

</sample-output>

</programming-exercise>

## Включения и словари {#comprehensions-and-dictionaries}

Во включениях нет ничего «списочного» по своей природе. Результат становится списком только потому, что выражение включения заключено в квадратные скобки — а они обозначают список Python. Включения так же хорошо работают и со словарями, если использовать фигурные скобки. Но помните: словарь требует пары ключ‑значение. При создании словаря (в том числе через включение) нужно указать и ключ, и значение.

Основанием для включения может быть любая итерируемая последовательность: список, строка, кортеж, словарь, любой ваш итерируемый класс и т. д.

В следующем примере мы используем строку как основу для словаря. Словарь содержит все уникальные символы строки и количество их вхождений:

```python
sentence = "hello there"

char_counts = {character : sentence.count(character) for character in sentence}
print(char_counts)
```

<sample-output>

{'h': 2, 'e': 3, 'l': 2, 'o': 1, ' ': 1, 't': 1, 'r': 1}

</sample-output>

Принцип включения точно такой же, как и для списков, но вместо одного значения выражение теперь состоит из ключа и значения. Общий синтаксис выглядит так:

`{<key expression> : <value expression> for <item> in <series>}`

Чтобы завершить этот раздел, снова посмотрим на факториалы. На этот раз мы сохраним результаты в словарь: само число будет ключом, а значением — факториал, вычисленный нашей функцией:

```python
def factorial(n: int):
    """Функция вычисляет факториал n! для целых чисел больше нуля."""
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    factorials = {number : factorial(number) for number in numbers if number > 0}
    print(factorials)
```

<sample-output>

{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}

</sample-output>

<programming-exercise name='Длины строк' anchor="Lengths of strings" tmcname='part11-11_lengths_of_strings'>

Напишите функцию `lengths(strings: list)`, которая принимает список строк. Функция должна вернуть _словарь_, где ключи — строки из списка, а значения — их длины.

Реализуйте функцию с помощью включения для словаря (dictionary comprehension). Максимальная длина функции — две строки кода, включая строку заголовка, начинающуюся с `def`.

Функция должна работать так:

```python
word_list = ["once", "upon" , "a", "time", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```

<sample-output>

{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}

</sample-output>


</programming-exercise>

<programming-exercise name='Самые частые слова' anchor="Most common words" tmcname='part11-12_most_common_words'>

Напишите функцию `most_common_words(filename: str, lower_limit: int)`, которая принимает имя файла и целое число — нижнюю границу. Функция должна вернуть словарь с количеством вхождений тех слов, которые встречаются не реже, чем `lower_limit` раз.

Например, пусть функция обрабатывает файл _comprehensions.txt_ со следующим содержимым:

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
```

При вызове `most_common_words("comprehensions.txt", 3)` функция должна вернуть:

<sample-output>

{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}

</sample-output>

Важно: регистр букв влияет на результат, а разные формы слова считаются разными словами. То есть `List`, `lists` и `list` — это три разных слова, и только `list` встречается достаточно часто, чтобы попасть в результат. Также перед подсчётом нужно удалить всю пунктуацию.

Как именно реализовать решение — решать вам. Проще всего, вероятно, использовать списковые включения и включения для словарей.

</programming-exercise>
