---
path: /ru/part-4/3-lists
title: Списки
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете понимать, что такое списки в Python
- вы сможете обращаться к элементам списка по индексу
- вы узнаете, как добавлять элементы в список и удалять их
- вы познакомитесь со встроенными функциями и методами для работы со списками

</text-box>

До сих пор в наших программах данные хранились в переменных — как правило, каждому значению соответствовала своя переменная. У этого подхода есть очевидные ограничения: если данных много, создавать отдельную переменную для каждого значения становится неудобно.

_Список_ (list) в Python — это коллекция значений, к которой обращаются по одному имени переменной. Содержимое списка записывается в квадратных скобках. Значения внутри списка называются _элементами_ (items/elements).

Следующая команда создаёт новый пустой список:

```python
my_list = []
```

а эта команда создаёт список из пяти элементов:

```python
my_list = [7, 2, 2, 5, 2]
```

## Доступ к элементам списка {#accessing-items-in-a-list}

Элементы списка индексируются так же, как и символы в строке. Индексация начинается с нуля, а последний индекс равен длине списка минус 1:

<img src="4_3_1.png" alt="Индексация списков начинается с 0">

К отдельному элементу списка можно обратиться так же, как к символу строки — с помощью квадратных скобок:

```python
my_list = [7, 2, 2, 5, 2]

print(my_list[0])
print(my_list[1])
print(my_list[3])

print("The sum of the first two items:", my_list[0] + my_list[1])
```

<sample-output>

7
2
5
The sum of the first two items: 9

</sample-output>

Можно вывести и весь список целиком:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]

</sample-output>

В отличие от строк, списки изменяемы (mutable), то есть их содержимое может меняться. Можно присвоить новый элемент по индексу — так же, как присваивают значение переменной:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
my_list[1] = 3
print(my_list)
```

<sample-output>

[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]

</sample-output>

Функция `len` возвращает количество элементов в списке:

```python
my_list = [7, 2, 2, 5, 2]
print(len(my_list))
```

<sample-output>

5

</sample-output>


<programming-exercise name='Изменение значения элемента' anchor="Change the value of an item" tmcname='part04-12_change_value_of_item'>

Напишите программу, которая создаёт список со значениями `[1, 2, 3, 4, 5]`. Затем программа должна запрашивать у пользователя индекс и новое значение, заменять элемент по заданному индексу и снова печатать список. Повторяйте это, пока пользователь не введёт -1 в качестве индекса. Можно считать, что все введённые значения индекса (кроме -1) будут в пределах списка.

Пример работы программы:

<sample-output>

Index: **0**
New value: **10**
[10, 2, 3, 4, 5]
Index: **2**
New value: **250**
[10, 2, 250, 4, 5]
Index: **4**
New value: **-45**
[10, 2, 250, 4, -45]
Index: **-1**

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Добавление элементов в список {#adding-items-to-a-list}

Метод `append` добавляет элементы в конец списка. Работает это так:

```python
numbers = []
numbers.append(5)
numbers.append(10)
numbers.append(3)
print(numbers)
```

<sample-output>

[5, 10, 3]

</sample-output>

В следующем примере используются два разных списка:

```python
numbers = []
shoe_sizes = []

numbers.append(5)
numbers.append(10)
numbers.append(3)

shoe_sizes.append(37)
shoe_sizes.append(44)
shoe_sizes.append(40)
shoe_sizes.append(28)

print("Numbers:")
print(numbers)

print("Shoe sizes:")
print(shoe_sizes)
```

Элемент добавляется именно в тот список, у которого вызывается метод:

<sample-output>

Numbers:
[5, 10, 3]
Shoe sizes:
[37, 44, 40, 28]

</sample-output>

<programming-exercise name='Добавление элементов в список' anchor="Add items to a list" tmcname='part04-13_add_items_to_list'>

Напишите программу, которая сначала спрашивает у пользователя, сколько элементов нужно добавить. Затем программа должна запросить указанное количество значений по одному и добавить их в список в том порядке, в котором они были введены. В конце напечатайте получившийся список.

Пример ожидаемого поведения:

<sample-output>

How many items: **3**
Item 1: **10**
Item 2: **250**
Item 3: **34**
[10, 250, 34]

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Вставка в определённое место {#adding-to-a-specific-location}

Если нужно добавить элемент в конкретное место списка, используйте метод `insert`. Он вставляет элемент по указанному индексу. Все элементы, которые уже были в списке и имели индекс больше или равный указанному, сдвигаются на один вправо:

<img src="4_3_2.png" alt = "Вставка элемента в список">

Например, программа

```python
numbers = [1, 2, 3, 4, 5, 6]
numbers.insert(0, 10)
print(numbers)
numbers.insert(2, 20)
print(numbers)
```

выведет:

<sample-output>

[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]

</sample-output>

## Удаление элементов из списка {#removing-items-from-a-list}

Есть два подхода к удалению элемента из списка:

* Если известен _индекс_ элемента, можно использовать метод `pop`.
* Если известно _значение_ элемента, можно использовать метод `remove`.

Итак, метод `pop` принимает индекс удаляемого элемента. Следующая программа удаляет элементы с индексами 2 и 3. Обратите внимание, как меняются индексы оставшихся элементов после удаления.

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)
my_list.pop(3)
print(my_list)
```

<sample-output>

[1, 2, 4, 5, 6]
[1, 2, 4, 6]

</sample-output>

Полезно помнить, что метод `pop` также _возвращает_ удалённый элемент:

```python
my_list = [4, 2, 7, 2, 5]

number = my_list.pop(2)
print(number)
print(my_list)
```

<sample-output>

7
[4, 2, 2, 5]

</sample-output>

Метод `remove`, наоборот, принимает значение элемента, который нужно удалить. Например, программа

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.remove(2)
print(my_list)
my_list.remove(5)
print(my_list)
```

выведет:

<sample-output>

[1, 3, 4, 5, 6]
[1, 3, 4, 6]

</sample-output>

Метод удаляет _первое_ вхождение значения в списке — похоже на то, как строковая функция `find` возвращает первое вхождение подстроки:

```python
my_list = [1, 2, 1, 2]

my_list.remove(1)
print(my_list)
my_list.remove(1)
print(my_list)
```

<sample-output>

[2, 1, 2]
[2, 2]

</sample-output>

<programming-exercise name='Добавление и удаление' anchor="Addition and removal" tmcname='part04-14_addition_and_removal'>

Напишите программу, которая предлагает пользователю выбрать добавление или удаление. В зависимости от выбора программа либо _добавляет элемент в_ конец списка, либо _удаляет элемент из_ конца списка. Добавляемый элемент всегда должен быть на 1 больше последнего элемента в списке. Первый добавляемый элемент должен быть равен 1.

Список нужно печатать в начале и после каждой операции. Посмотрите на пример работы ниже:

<sample-output>

The list is now []
a(d)d, (r)emove or e(x)it: **d**
The list is now [1]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **r**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **x**
Bye!

</sample-output>

Можно считать, что если список пуст, то попыток удаления не будет.

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

Если указанного значения нет в списке, метод `remove` вызовет ошибку. Как и со строками, наличие элемента можно проверить с помощью оператора `in`:

```python
my_list = [1, 3, 4]

if 1 in my_list:
    print("The list contains item 1")

if 2 in my_list:
    print("The list contains item 2")
```

<sample-output>

The list contains item 1

</sample-output>

<programming-exercise name='Одно и то же слово дважды' anchor="Same word twice" tmcname='part04-15_same_word_twice'>

Напишите программу, которая запрашивает у пользователя слова. Если пользователь вводит одно и то же слово второй раз, программа должна вывести количество разных слов, которые были введены, и завершиться.

<sample-output>

Word: **once**
Word: **upon**
Word: **a**
Word: **time**
Word: **upon**
You typed in 4 different words

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Сортировка списков {#sorting-lists}

Элементы списка можно _отсортировать_ по возрастанию с помощью метода `sort`.

```python
my_list = [2,5,1,2,4]
my_list.sort()
print(my_list)
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Обратите внимание: метод изменяет сам список. Иногда менять исходный список не хочется — тогда вместо `sort` используют функцию `sorted`. Она _возвращает_ отсортированный список:

```python
my_list = [2,5,1,2,4]
print(sorted(my_list)))
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Запомните различие: `sort` меняет порядок элементов в исходном списке «на месте», а `sorted` создаёт новую отсортированную копию. С `sorted` можно сохранить исходный порядок элементов:

```python
original = [2, 5, 1, 2, 4]
in_order = sorted(original)
print(original)
print(in_order)
```

<sample-output>

[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]

</sample-output>

<programming-exercise name='Список дважды' anchor="List twice" tmcname='part04-16_list_twice'>

Напишите программу, которая запрашивает у пользователя значения и добавляет их в список. После каждого добавления список печатается двумя способами:
- в порядке добавления элементов
- в отсортированном виде (по возрастанию)

Программа завершается, когда пользователь вводит 0.

Пример ожидаемого поведения:

<sample-output>

New item: **3**
The list now: [3]
The list in order: [3]
New item: **1**
The list now: [3, 1]
The list in order: [1, 3]
New item: **9**
The list now: [3, 1, 9]
The list in order: [1, 3, 9]
New item: **5**
The list now: [3, 1, 9, 5]
The list in order: [1, 3, 5, 9]
New item: **0**
Bye!

</sample-output>

**Важно:** в этом упражнении не требуется писать функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`.

</programming-exercise>

## Максимум, минимум и сумма {#maximum-minimum-and-sum}

Функции `max` и `min` (сокращение от _maximum_ и _minimum_) возвращают, соответственно, наибольший и наименьший элемент списка. Функция `sum` возвращает сумму всех элементов списка.

```python
my_list = [5, 2, 3, 1, 4]

greatest = max(my_list)
smallest = min(my_list)
list_sum = sum(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Sum:", list_sum)
```

<sample-output>

Smallest: 1
Greatest: 5
Sum: 15

</sample-output>

## Методы и функции {#methods-vs-functions}

Есть два способа работать со списками в Python — и это иногда путает. Чаще всего вы будете использовать _методы_ списка, такие как `append` и `sort`. Их вызывают через точку `.` у переменной‑списка:

```python
my_list = []

# вызовы методов
my_list.append(3)
my_list.append(1)
my_list.append(7)
my_list.append(2)

# ещё один вызов метода
my_list.sort()
```

Некоторые _функции_ умеют принимать список как аргумент. Выше мы уже видели, что так работают `max`, `min`, `len` и `sorted`:

```python
my_list = [3, 2, 7, 1]

# функции принимают список как аргумент
greatest = max(my_list)
smallest = min(my_list)
length = len(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Length of the list:", length)

# ещё один вызов функции
# список передаётся как аргумент, функция возвращает отсортированную копию
in_order = sorted(my_list)
print(in_order)
```

<sample-output>

Smallest: 1
Greatest: 7
Length of the list: 4
[1, 2, 3, 7]

</sample-output>

## Список как аргумент или возвращаемое значение {#a-list-as-an-argument-or-a-return-value}

Как и встроенные функции выше, наши собственные функции тоже могут принимать список как аргумент и возвращать список как результат. Следующая функция вычисляет центральное значение в отсортированном списке — _медиану_:

```python
def median(my_list: list):
    ordered = sorted(my_list)
    list_centre = len(ordered) // 2
    return ordered[list_centre]
```

Функция создаёт отсортированную версию списка, переданного аргументом, и возвращает элемент ровно посередине. Обратите внимание на оператор целочисленного деления `//`. Индекс элемента списка всегда должен быть целым числом.

Функция работает так:

```python
shoe_sizes = [45, 44, 36, 39, 40]
print("The median of the shoe sizes is", median(shoe_sizes))

ages = [1, 56, 34, 22, 5, 77, 5]
print("The median of the ages is", median(ages))
```

<sample-output>

The median of the shoe sizes is 40
The median of the ages is 22

</sample-output>

Функция также может возвращать список. Следующая функция просит пользователя вводить целые числа и возвращает введённые значения списком:

```python
def input_numbers():
    numbers = []
    while True:
        user_input = input("Please type in an integer, leave empty to exit: ")
        if len(user_input) == 0:
            break
        numbers.append(int(user_input))
    return numbers
```

Внутри используется вспомогательная переменная `numbers` — это список. Все числа, введённые пользователем, добавляются в этот список. Когда цикл завершается, функция возвращает список с помощью `return numbers`.

Если вызвать функцию так:

```python 
numbers = input_numbers()

print("The greatest number is", max(numbers))
print("The median of the numbers is", median(numbers))
```

может получиться, например, такой вывод:

<sample-output>

Please type in an integer, leave empty to exit: **5**
Please type in an integer, leave empty to exit: **-22**
Please type in an integer, leave empty to exit: **4**
Please type in an integer, leave empty to exit: **35**
Please type in an integer, leave empty to exit: **1**
Please type in an integer, leave empty to exit:
The greatest number is 35
The median of the numbers is 4

</sample-output>

Этот небольшой пример показывает одно из важнейших назначений функций: они помогают разбивать программу на небольшие, понятные и логически цельные части.

Конечно, то же самое можно сделать и без собственных функций:

```python
numbers = []
while True:
    user_input = input("Please type in an integer, leave empty to exit: ")
    if len(user_input) == 0:
        break
    numbers.append(int(user_input))

ordered = sorted(numbers)
list_centre = len(ordered) // 2
median = ordered[list_centre]

print("The greatest number is", max(numbers))
print("The median of the numbers is", median)
```

В этой версии сложнее следить за логикой программы: уже не так ясно, какие команды относятся к какой задаче. Код решает те же цели — читает ввод, вычисляет медиану и т. д. — но структура получается менее наглядной.

Организация кода в виде отдельных функций повышает читаемость программы и упрощает работу с логическими частями. Это, в свою очередь, облегчает проверку правильности: каждую функцию можно тестировать отдельно.

Ещё одно важное назначение функций — _повторное использование_ кода. Если вам нужно делать одно и то же несколько раз в программе, разумно вынести это в отдельную функцию и дать ей подходящее имя:

```python
print("Shoe sizes:")
shoe_sizes = input_numbers()

print("Weights:")
weights = input_numbers()

print("Heights:")
heights = input_numbers()
```

<programming-exercise name='Длина списка' anchor="The length of a list" tmcname='part04-17_length_of_list'>

Напишите функцию `length`, которая принимает список и возвращает его длину.

```python
my_list = [1, 2, 3, 4, 5]
result = length(my_list)
print("The length is", result)

# список, передаваемый аргументом, не обязательно хранить в переменной
result = length([1, 1, 1, 1])
print("The length is", result)
```

<sample-output>

The length is 5
The length is 4

</sample-output>

</programming-exercise>

<programming-exercise name='Среднее арифметическое' anchor="Arithmetic mean" tmcname='part04-18_mean'>

Напишите функцию `mean`, которая принимает список целых чисел и возвращает среднее арифметическое значений в списке.

```python
my_list = [1, 2, 3, 4, 5]
result = mean(my_list))
print("mean value is", result)
```

<sample-output>

mean value is 3.0

</sample-output>

</programming-exercise>

<programming-exercise name='Размах списка' anchor="The range of a list" tmcname='part04-19_range_of_list'>

Напишите функцию `range_of_list`, которая принимает список целых чисел и возвращает разницу между наименьшим и наибольшим значениями в списке.


```python
my_list = [1, 2, 3, 4, 5]
result = range_of_list(my_list))
print("The range of the list is", result)
```

<sample-output>

The range of the list is 4

</sample-output>

</programming-exercise>


Списки в Python можно использовать множеством способов. Если вы хотите узнать больше, хорошее начало — [документация Python](https://docs.python.org/3/tutorial/datastructures.html).

<!---
Тест для повторения материала этого раздела:

<quiz id="4849cd69-1938-5f4f-8805-8445f0f5c015"></quiz>
-->
