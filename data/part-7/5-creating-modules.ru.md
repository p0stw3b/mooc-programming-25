---
path: /ru/part-7/5-creating-modules
title: Создание собственных модулей
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете писать собственные модули
- вы будете знать, что означают переменная Python `__name__` и значение `__main__`

</text-box>

Писать собственные модули Python просто. Любой файл с корректным Python‑кодом можно импортировать как модуль. Предположим, у нас есть файл `words.py` со следующим содержимым:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)
```

К функциям из файла можно обращаться, импортировав этот файл:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

Важно: файл с модулем должен находиться либо в том же каталоге, что и программа, которая его импортирует, либо в одном из стандартных каталогов Python. Иначе интерпретатор не найдёт модуль при выполнении `import`.

Собственные модули используются так же, как модули стандартной библиотеки:

```python
from words import first_word, last_word

sentence = input("Please type in a sentence: ")

print("The first word was: " + first_word(sentence))
print("The last word was: " + last_word(sentence))
```

<sample-output>

Please type in a sentence: **Python is a swell programming language**
The first word was: Python
The last word was: language

</sample-output>

## Используем подсказки типов {#putting-type-hints-to-use}

При работе с модулями подсказки типов становятся особенно полезными. Если вы используете редактор, который поддерживает подсказки типов, работать с разными модулями становится гораздо удобнее.

Например, Visual Studio Code показывает подсказки типов прямо во время написания кода:

<img src="7_vihje.png">

## Код «главной части» в модуле {#main-function-code-in-a-module}

Если в модуле есть код вне определения функций (то есть код на верхнем уровне файла), он автоматически выполняется каждый раз при импорте модуля.

Предположим, файл `words.py` также содержит тестовые примеры:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)

print(first_word("This is a test"))
print(last_word("Here we are still testing"))
print(number_of_words("One two three four five"))
```

Теперь, если импортировать модуль через `import`, весь код вне функций выполнится автоматически:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

This
testing
5
Sheila
seashore
6

</sample-output>

Как видно, это неудобно: тестовые примеры из модуля вмешиваются в работу программы, которую мы пытаемся написать.

К счастью, есть решение, и вы уже много раз использовали его в заданиях курса. Нужно проверить, запускается ли файл сам по себе или код импортирован через `import`. В Python есть встроенная переменная `__name__`, которая содержит имя выполняемой программы. Если файл запускается напрямую, значение `__name__` равно `__main__`. Если файл импортирован, `__name__` равно имени импортированного модуля (в данном случае `words`).

Зная это, можно добавить условие и выполнять тесты только при прямом запуске файла. Структура выглядит знакомо:

```python
def first_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str) -> int:
    parts = my_string.split(" ")
    return len(parts)

if __name__ == "__main__":
    # тестируем функциональность
    print(first_word("This is a test"))
    print(last_word("Here we are still testing"))
    print(number_of_words("One two three four five"))
```

Если запустить модуль напрямую, тесты будут выведены:

<sample-output>

This
testing
5

</sample-output>

Если импортировать модуль в другую программу, тесты не выполняются:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```

<sample-output>

Sheila
seashore
6

</sample-output>

В заданиях курса, когда вас просили написать функции, обычно ожидалось, что тестовые вызовы вы поместите внутрь блока `if __name__ == "__main__"` — теперь вы знаете, зачем это нужно.

<programming-exercise name='Помощник для строк' anchor="String helper" tmcname='part07-17_string_helper'>

Напишите модуль `string_helper`, который содержит следующие функции:

Функция `change_case(orig_string: str)` создаёт и возвращает новую версию строки. Строчные буквы в исходной строке должны стать заглавными, а заглавные — строчными.

Функция `split_in_half(orig_string: str)` делит строку пополам и возвращает результат в виде кортежа. Если количество символов нечётное, первая половина должна быть короче.

Функция `remove_special_characters(orig_string: str)` возвращает новую версию строки, из которой удалены все специальные символы. В возвращаемой строке допускаются только строчные и заглавные буквы, цифры и пробелы.

Пример использования модуля:

```python
import string_helper

my_string = "Well hello there!"

print(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

print(p1)
print(p2)

m2 = string_helper.remove_special_characters("This is a test, lets see how it goes!!!11!")
print(m2)
```

<sample-output>

wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11

</sample-output>

</programming-exercise>

<!---
<quiz id="2203412c-628c-54a3-bd77-edebd5ce4f67"></quiz>
-->

Пожалуйста, ответьте на короткий опрос по материалам этой недели.

<quiz id="483d5609-6819-5c77-86b1-bc8ce20a2e18"></quiz>
