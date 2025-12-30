---
path: /ru/error_messages
title: Распространённые сообщения об ошибках
hidden: false
information_page: true
sidebar_priority: 2000
separator_after: Введение в программирование
---

На этой странице собраны пояснения к самым распространённым сообщениям об ошибках, которые вы можете встретить при выполнении упражнений на этом курсе.

### Мой вывод выглядит так же, как в примере, но решение всё равно не проходит {#my-printout-looks-identical-to-the-example-in-the-instructions-but-my-submission-still-fails}

Убедитесь, что ваша программа не выводит лишние пробельные символы (например, дополнительные пробелы). Обратите внимание: по умолчанию функция `print` добавляет пробел между аргументами, разделёнными запятой.

```python
    print("Hello","World!")    # вывод: Hello World!
```

### SyntaxError: bad input on line [line number] {#syntaxerror-bad-input-on-line-line-number}

Это сообщение обычно появляется, когда в коде есть опечатка, но интерпретатору Python сложно точнее определить проблему. Например, в конце строки `if` может отсутствовать двоеточие или может быть неправильно написано ключевое слово, например `while`. Исправить проблему можно только проверив строку, указанную в сообщении об ошибке.

```python
    number1 = 1
    number1 = 2
    if number1 < number2    # нет двоеточия ':'
        print('number2 is greater')
```

Если строка, указанная в сообщении об ошибке, выглядит правильной, проблема часто находится на строке выше или ниже — проверьте соседние строки.

**Примечание: в ранних частях курса используется Skulpt — среда, которая запускает Python‑код прямо в браузере.** Skulpt довольно ограничен по сравнению с обычным интерпретатором Python, поэтому сообщения об ошибках часто менее информативны. Например, `bad input on line` может соответствовать множеству разных ошибок, и по одному только этому сообщению сложно понять реальную причину.

### SyntaxError: unindent does not match any outer indentation level on line [line number] {#syntaxerror-unindent-does-not-match-any-outer-indentation-level-on-line-line-number}

В строке, указанной в сообщении об ошибке, неверные отступы. Например, все строки внутри блока `if` должны иметь одинаковый отступ. Чтобы исправить ошибку, выровняйте отступы: все строки внутри одного блока должны начинаться с одинакового количества пробелов.
Например, такой код вызовет эту ошибку:

```python
    if True:
        print('Indented correctly')
       print('Indented incorrectly!')
```

### NameError: name [variable name] is not defined on line [line number] {#nameerror-name-variable-name-is-not-defined-on-line-line-number}

Вы пытаетесь обратиться к переменной или объекту, которого в этой точке программы не существует. Возможно, переменной ещё не присвоено значение или в имени допущена опечатка. Также возможно, что переменная определена внутри функции, а вы пытаетесь использовать её вне этой функции.

```python
    person = input('Please type in your name: ')
    input('Please type in your age: ')

    print("Hi", pearson)                # ошибка: person написано как pearson
    print("You are", age, "years old")  # ошибка: переменная age не определена
```

### TypeError: unsupported operand type(s) for Add: 'int' and 'str' on line [line number] {#typeerror-unsupported-operand-types-for-add-int-and-str-on-line-line-number}

Скорее всего, вы пытаетесь сложить целое число и строку, не преобразовав строку в число. Строку можно преобразовать в целое число с помощью функции `int()`. Похожее сообщение может появиться, если вы попробуете выполнить над строками другие арифметические операции, например деление или вычитание.

Также возможно, что вы пытаетесь собрать новую строку, объединяя строку и число. В этом случае сначала преобразуйте число в строку с помощью `str()`.

```python
    my_age = input("Please type in your age: ")
    my_name = input("Please type in your name: ")

    print(my_age//2)   # ошибка: переменная my_age не преобразована в целое число
```

### TypeError: cannot concatenate 'str' and 'int' objects on line [line number] {#typeerror-cannot-concatenate-str-and-int-objects-on-line-line-number}

См. выше.

### Pylance падает {#pylance-is-crashing}

Обычно это происходит из‑за того, что в плагине TMC одновременно открыто слишком много заданий. Попробуйте закрыть ненужные упражнения через меню TMC в боковой панели Visual Studio Code.
Откройте меню TMC → `My courses`, выберите курс и нажмите `close all` для тех частей, над которыми вы сейчас не работаете.
Если вы решите вернуться к части позже, упражнения всегда можно снова открыть.
