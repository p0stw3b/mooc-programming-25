---
path: /ru/part-4/6-strings-and-lists
title: Ещё о строках и списках
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с дополнительными возможностями срезов строк и списков
- вы поймёте, что означает неизменяемость (immutability) строк
- вы сможете использовать методы `count` и `replace`

</text-box>

Вы уже знакомы с синтаксисом `[]`, который позволяет получать часть строки:

```python
my_string = "exemplary"
print(my_string[3:7])
```

<sample-output>

mpla

</sample-output>

Тот же синтаксис работает и со списками. Списки можно «резать» (делать срезы) так же, как строки:

```python
my_list = [3,4,2,4,6,1,2,4,2]
print(my_list[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## Дополнительные варианты срезов {#more-slices}

На самом деле синтаксис `[]` очень похож на `range`, а значит, можно задавать и шаг среза:

```python
my_string = "exemplary"
print(my_string[0:7:2])
my_list = [1,2,3,4,5,6,7,8]
print(my_list[6:2:-1])
```

<sample-output>

eepa
[7, 6, 5, 4]

</sample-output>

Если опустить один из индексов, по умолчанию будет взято «всё до конца» или «всё с начала». В частности, это позволяет очень коротко записать разворот строки:

```python
my_string = input("Please type in a string: ")
print(my_string[::-1])
```

<sample-output>

Please type in a string: **exemplary**
yralpmexe

</sample-output>

<!--похожее предупреждение есть в разделах 3-4, 4-6 и 5-1; если меняете здесь — проверьте и там-->
## Внимание: использование глобальных переменных внутри функций {#warning-using-global-variables-within-functions}

Мы знаем, что внутри функции можно создавать новые переменные. При этом функция «видит» и переменные, которые объявлены снаружи, в основной части программы. Такие переменные называются _глобальными_.

Использовать глобальные переменные внутри функций обычно плохая идея. Помимо прочего, это может привести к ошибкам, которые сложно обнаружить и отладить.

Ниже пример функции, которая «случайно» использует глобальную переменную:

```python
def print_reversed(names: list):
    # по ошибке используем глобальную переменную вместо параметра
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# здесь присваивается глобальная переменная
name_list = ["Steve", "Jean", "Katherine", "Paul"]
print_reversed(name_list)
print()
print_reversed(["Huey", "Dewey", "Louie"])
```

<sample-output>

Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve

</sample-output>

Хотя в обоих вызовах функции передан корректный аргумент, функция всё равно печатает то, что хранится в глобальной переменной `name_list`.

Ситуацию ещё больше запутывает то, что весь код для тестирования своих функций нужно помещать в блок `if __name__ == "__main__":`, чтобы автоматические тесты работали правильно. Предыдущий пример должен выглядеть так:

```python
def print_reversed(names: list):
    # по ошибке используем глобальную переменную вместо параметра
    i = len(name_list) - 1
    while i>=0:
        print(name_list[i])
        i -= 1

# Весь код для тестирования функции должен быть внутри этого блока
if __name__ == "__main__":
    # здесь присваивается глобальная переменная
    name_list = ["Steve", "Jean", "Katherine", "Paul"]
    print_reversed(name_list)
    print()
    print_reversed(["Huey", "Dewey", "Louie"])
```

Обратите внимание: теперь глобальная переменная присваивается внутри блока `if`.

Автоматические тесты в системе TMC выполняются без запуска кода внутри блока `if`. Поэтому во втором варианте пример даже теоретически не заработал бы в тестах: функция обращается к `name_list`, а этой переменной вообще не существует во время выполнения тестов.

<programming-exercise name='Всё наоборот' anchor="Everything reversed" tmcname='part04-33_everything_reversed'>

Напишите функцию `everything_reversed`, которая принимает список строк. Функция должна вернуть новый список, где каждая строка исходного списка записана в обратном порядке. Кроме того, порядок элементов в новом списке тоже должен быть обратным.

Пример работы функции:

```python
my_list = ["Hi", "there", "example", "one more"]
new_list = everything_reversed(my_list)
print(new_list)
```

<sample-output>

['erom eno', 'elpmaxe', 'ereht', 'iH']

</sample-output>

</programming-exercise>

## Строки неизменяемы {#strings-are-immutable}

Строки и списки во многом похожи, особенно в том, как они ведут себя с разными операторами. Главное отличие в том, что строки _неизменяемы_ (immutable) — то есть их нельзя менять.

```python
my_string = "exemplary"
my_string[0] = "a"
```

Строки нельзя изменять, поэтому при выполнении этого кода возникает ошибка:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Похожая ошибка возникнет, если попытаться отсортировать строку методом `sort`.

Сами строки неизменяемы, но переменные, которые на них ссылаются, — нет. Строку можно заменить другой строкой.

Поэтому следующие два примера принципиально различаются:

```python
my_list = [1,2,3]
my_list[0] = 10
```

<img src="4_6_1.png">

```python
my_string = "Hey"
my_string = my_string + "!"
```

<img src="4_6_2.png">

В первом примере меняется содержимое списка, на который ссылается переменная. Во втором примере ссылка на исходную строку заменяется ссылкой на новую строку. Исходная строка всё ещё где‑то лежит в памяти компьютера, но на неё больше нет ссылки, и в программе её уже нельзя использовать.

К этой теме мы вернёмся в следующей части, где ссылки на списки разбираются подробнее.

## Ещё методы для списков и строк {#more-methods-for-lists-and-strings}

Метод `count` считает, сколько раз указанный элемент (или подстрока) встречается в объекте. Он одинаково работает и со строками, и со списками:

```python
my_string = "How much wood would a woodchuck chuck if a woodchuck could chuck wood"
print(my_string.count("ch"))

my_list = [1,2,3,1,4,5,1,6]
print(my_list.count(1))
```

<sample-output>

5
3

</sample-output>

Метод не учитывает пересекающиеся вхождения. Например, в строке `aaaa` метод посчитает только два вхождения подстроки `aa`, хотя при разрешении перекрытий их было бы три.

Метод `replace` создаёт новую строку, в которой указанная подстрока заменена на другую строку:

```python
my_string = "Hi there"
new_string = my_string.replace("Hi", "Hey")
print(new_string)
```

<sample-output>

Hey there

</sample-output>

Метод заменяет _все_ вхождения подстроки:

```python
sentence = "sheila sells seashells on the seashore"
print(sentence.replace("she", "SHE"))
```

<sample-output>

SHEila sells seaSHElls on the seashore

</sample-output>

При использовании `replace` типичная ошибка — забыть, что строки неизменяемы:

```python
my_string = "Python is fun"

# Заменяет подстроку, но не сохраняет результат...
my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Python is fun

</sample-output>

Если старая строка больше не нужна, новую строку можно присвоить той же переменной:

```python
my_string = "Python is fun"

# Заменяет подстроку и сохраняет результат в ту же переменную
my_string = my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Java is fun

</sample-output>

<programming-exercise name='Самый частый символ' anchor="Most common character" tmcname='part04-34_most_common_character'>

Напишите функцию `most_common_character`, которая принимает строку. Функция должна вернуть символ, который встречается в строке чаще всего. Если таких символов несколько, нужно вернуть тот, который встречается в строке первым.

Пример ожидаемого поведения:

```python
first_string = "abcdbde"
print(most_common_character(first_string))

second_string = "exemplaryelementary"
print(most_common_character(second_string))
```

<sample-output>

b
e

</sample-output>

</programming-exercise>


<programming-exercise name='Без гласных' anchor="No vowels allowed" tmcname='part04-35_no_vowels_allowed'>

Напишите функцию `no_vowels`, которая принимает строку. Функция должна вернуть новую строку — такую же, как исходная, но без всех гласных.

Можно считать, что строка содержит только символы английского алфавита в нижнем регистре: a–z.

Пример ожидаемого поведения:

```python
my_string = "this is an example"
print(no_vowels(my_string))
```

<sample-output>

ths s n xmpl

</sample-output>

</programming-exercise>


<programming-exercise name='Без крика' anchor="No shouting allowed" tmcname='part04-36_no_shouting_allowed'>

Строковый метод Python `isupper()` возвращает `True`, если строка состоит _только_ из заглавных букв.

Примеры:

```python
print("XYZ".isupper())

is_it_upper = "Abc".isupper()
print(is_it_upper)
```

<sample-output>

True
False

</sample-output>

Используя `isupper`, напишите функцию `no_shouting`, которая принимает список строк. Функция должна вернуть новый список, содержащий только те элементы исходного списка, которые не состоят целиком из заглавных букв.

Пример ожидаемого поведения:

```python
my_list = ["ABC", "def", "UPPER", "ANOTHERUPPER", "lower", "another lower", "Capitalized"]
pruned_list = no_shouting(my_list)
print(pruned_list)
```

<sample-output>

['def', 'lower', 'another lower', 'Capitalized']

</sample-output>

</programming-exercise>

<programming-exercise name='Соседи в списке' anchor="Neighbours in a list" tmcname='part04-37_neighbours_in_list'>

Пусть дан список целых чисел. Будем считать, что два соседних элемента списка являются «соседями», если их разница равна 1. Например, 1 и 2 — соседи, и 56 и 55 — тоже соседи.

Напишите функцию `longest_series_of_neighbours`, которая находит в списке самую длинную последовательность «соседей» и возвращает её длину.

Например, в списке `[1, 2, 5, 4, 3, 4]` самая длинная последовательность соседей — `[5, 4, 3, 4]`, её длина равна 4.

Пример вызова функции:

```python
my_list = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(longest_series_of_neighbours(my_list))
```

<sample-output>

4

</sample-output>

</programming-exercise>

## Разработка более крупного проекта {#developing-a-larger-programming-project}

Четвёртая часть заканчивается небольшим, но более крупным проектом, где вы сможете применить многие из уже изученных приёмов.

Правило № 1 при работе над любым проектом — не пытаться решить всё сразу. Программу лучше строить из небольших частей, например из вспомогательных функций. Проверяйте работу каждой части, прежде чем переходить к следующей. Если попытаться охватить слишком много сразу, чаще всего получается хаос.

Для этого нужен способ тестировать функции отдельно от «главной» части программы. Можно явно определить функцию `main` и вызывать её вне любых других функций. Тогда один вызов легко закомментировать для тестирования. Первые шаги проекта могут выглядеть так:

```python
def main():
    points = []
    # здесь будет код вашей программы

main()
```

Теперь вспомогательные функции можно тестировать, не запуская `main`:

```python
# вспомогательная функция для определения оценки по количеству баллов
def grade(points):
    # ...дальше код

def main():
    all_points = []
    # здесь будет код вашей программы

# закомментируйте вызов main
# main()

# тестируем вспомогательную функцию
student_points = 35
result = grade(student_points)
print(result)
```

## Передача данных между функциями {#passing-data-from-one-function-to-another}

<!--- см. также раздел 6-4: есть заметное пересечение-->
Когда программа состоит из нескольких функций, возникает вопрос: как передавать данные из одной функции в другую?

В следующем примере программа запрашивает у пользователя несколько целых чисел, затем печатает их и выполняет небольшую «аналитику». Программа разделена на три функции:

```python
def input_from_user(how_many: int):
    print(f"Please type in {how_many} numbers:")
    numbers = []

    for i in range(how_many):
        number = int(input(f"Number {i+1}: "))
        numbers.append(number)

    return numbers

def print_result(numbers: list):
    print("The numbers are: ")
    for number in numbers:
        print(number)

def analyze(numbers: list):
    mean = sum(numbers) / len(numbers)
    return f"There are altogether {len(numbers)} numbers, the mean is {mean}, the smallest is {min(numbers)} and the greatest is {max(numbers)}"

# «главная функция», использующая эти функции
inputs = input_from_user(5)
print_result(inputs)
analysis_result = analyze(inputs)
print(analysis_result)
```

При запуске программа может работать так:

<sample-output>

Please type in 5 numbers:
Number 1: **10**
Number 2: **34**
Number 3: **-32**
Number 4: **99**
Number 5: **-53**
The numbers are:
10
34
-32
99
-53
There are altogether 5 numbers, the mean is 11.6, the smallest is -53 and the greatest is 99

</sample-output>

Идея в том, что основная часть программы «сохраняет» все данные, которые обрабатываются. В данном случае достаточно хранить ввод пользователя в переменной `inputs`.

Если ввод нужен функции, он передаётся аргументом — так происходит с `print_result` и `analyze`. Если функция вычисляет результат, который нужен в другом месте программы, она возвращает его через `return`, а основная часть сохраняет его в переменной. Так происходит с `input_from_user` и `analyze`.

Можно было бы напрямую использовать глобальную переменную `inputs` во вспомогательных функциях. Мы уже обсуждали, почему это плохая идея, но вот [ещё одно объяснение](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil). Если функции могут менять глобальные переменные, в программе легко начинают происходить неожиданные вещи — особенно когда функций становится много.

Лучше всего передавать данные в функции и из функций с помощью аргументов и возвращаемых значений.

Можно также выделить «неявную» главную часть программы из примера выше в отдельную функцию `main`. Тогда `inputs` перестанет быть глобальной переменной и станет локальной переменной внутри `main`:

```python
# здесь будет ваша функция main
def main():
    inputs = input_from_user(5)
    print_result(inputs)
    analysis_result = analyze(inputs)

    print(analysis_result)

# запускаем функцию main
main()
```

<programming-exercise name='Статистика оценок' anchor="Grade statistics" tmcname='part04-38_grade_statistics'>

В этом упражнении вы напишете программу, которая печатает статистику оценок по университетскому курсу.

Программа запрашивает результаты разных студентов. Для каждого студента вводятся баллы за экзамен и количество выполненных упражнений. Затем программа печатает статистику на основе введённых данных.

Баллы за экзамен — целое число от 0 до 20. Количество выполненных упражнений — целое число от 0 до 100.

Программа продолжает запрашивать ввод, пока пользователь не введёт пустую строку. Можно считать, что ввод всегда корректный: либо строка пустая, либо в строке два целых числа.

Пример ввода данных:

<sample-output>

Exam points and exercises completed: **15 87**
Exam points and exercises completed: **10 55**
Exam points and exercises completed: **11 40**
Exam points and exercises completed: **4 17**
Exam points and exercises completed:
Statistics:

</sample-output>

Когда пользователь вводит пустую строку, программа печатает статистику. Она формируется так:

Количество выполненных упражнений преобразуется в _баллы за упражнения_. Если выполнено как минимум 10% упражнений — это 1 балл, 20% — 2 балла и так далее. Выполнение всех 100 упражнений даёт 10 баллов за упражнения. Количество баллов — целое число, округлённое вниз.

Оценка за курс определяется по таблице:

баллы за экзамен + баллы за упражнения   | оценка
:--:|:----:
0–14 | 0 (то есть не сдал)
15–17 | 1
18–20 | 2
21–23 | 3
24–27 | 4
28–30 | 5

Также есть «отсечка» по экзамену: если студент набрал меньше 10 баллов за экзамен, он автоматически не сдаёт курс, независимо от общего количества баллов.

Для примера ввода выше программа должна вывести такую статистику:

<sample-output>

<pre>
Statistics:
Points average: 14.5
Pass percentage: 75.0
Grade distribution:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</pre>

</sample-output>

Числа с плавающей точкой нужно печатать с точностью до одного знака после запятой.

**Важно:** в этом упражнении не требуется писать какие‑то конкретные функции, поэтому __не__ размещайте код внутри блока `if __name__ == "__main__"`. Если часть функциональности у вас вынесена, например, в функцию `main`, вызывайте её обычным образом, а не внутри `if`‑блока, как в упражнениях, где отдельно требуются конкретные функции.

**Подсказка:**

Ввод пользователя в этой программе состоит из строк с двумя целыми числами:

<sample-output>

Exam points and exercises completed: **15 87**

</sample-output>

Сначала нужно разделить строку на две части, а затем преобразовать их в числа с помощью `int`. Разделить строку можно так же, как в упражнении [First, second and last words](/ru/part-4/2-more-functions#programming-exercise-first-second-and-last-words), но есть и более простой способ. Метод строки `split` удобно «нарежет» ввод. Подробнее можно найти по запросу *python string split*.

<!-- **Важно:** сейчас в Windows бывают проблемы с запуском тестов некоторых заданий. Если вы столкнётесь со следующим сообщением об ошибке:

<img src="4_3_2.png" alt="Listan iterointi">

Вы можете запустить тесты, отправив решение на сервер: откройте меню TMC (значок справа от кнопки запуска тестов) и выберите _Submit solutions_.

Проблему можно исправить, открыв настройки расширения и в разделе "TMC Data" изменив расположение заданий на другой путь, который короче. На изображении ниже для этого есть кнопка _change path_. Перенос может занять некоторое время — дождитесь завершения операции.

<img src="4_3_3.png" alt="Listan iterointi">

В ближайшие дни планируется более надёжное решение этой проблемы. -->

</programming-exercise>

<!---
Тест для повторения материала этого раздела:

<quiz id="925f1715-d762-5e44-a812-be13bff1aa44"></quiz>
-->

Пожалуйста, ответьте на небольшой опрос по материалам этой недели.

<quiz id="5df4a245-bde4-5211-bcce-224e0e14d991"></quiz>
