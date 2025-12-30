---
path: /ru/part-7/2-randomness
title: Случайность
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с некоторыми функциями модуля `random`
- вы сможете использовать случайные числа в своих программах

</text-box>

В этом разделе мы сосредоточимся на модуле [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) из стандартной библиотеки Python. Он содержит инструменты для генерации случайных чисел и другую функциональность, связанную со случайностью.

В материалах этой части много ссылок на [документацию](https://docs.python.org/3/library/) стандартной библиотеки Python. Рекомендуем переходить по ссылкам, чтобы привыкнуть к тому, как устроена документация.

## Генерация случайного числа {#generating-a-random-number}

Функция [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) возвращает случайное целое число в диапазоне от `a` до `b` включительно. Например, следующая программа работает как обычный кубик:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

При запуске программа может вывести:

<sample-output>

The result of the throw: 4

</sample-output>

Следующая программа «бросает» кубик десять раз:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

При запуске может получиться, например, так:

<sample-output>

The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3

</sample-output>

Важно: помните, что `randint` работает немного иначе, чем, например, срезы или функция `range`, с которыми мы уже встречались. Вызов `randint(1, 6)` может вернуть числа от 1 до 6 включительно, а `range(1, 6)` создаёт последовательность от 1 до 5.

## Другие функции для «случайности» {#more-randomizing-functions}

Функция [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) перемешивает структуру данных, переданную в аргументе, «на месте». Например, следующий код перемешивает список слов:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```

<sample-output>

['banana', 'atlas', 'carrot']

</sample-output>

Функция `choice` возвращает случайный элемент из структуры данных:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```

<sample-output>

'carrot'

</sample-output>

## Лотерейные номера {#lottery-numbers}

Распространённый пример для изучения случайности — лотерейные номера. Попробуем сгенерировать набор таких номеров. В Финляндии национальная лотерея использует 40 чисел, из которых в каждом тираже выбирают 7.

Первая попытка может выглядеть так:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Однако в таком виде решение не годится: одно и то же число может встретиться дважды в одном наборе из семи чисел. Нужен способ гарантировать, что все числа уникальны.

Один вариант — сохранять выбранные числа в списке и добавлять новое число только если его ещё нет в списке. Повторяем, пока длина списка не станет равной семи:

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

Более компактный подход — использовать `shuffle`:

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

Идея в том, что мы сначала создаём список доступных чисел от 1 до 40 — как шарики в лототроне. Затем перемешиваем этот список и берём первые семь чисел. Это избавляет нас от необходимости писать цикл.

На самом деле в модуле `random` есть ещё более удобный способ выбрать лотерейные номера: функция [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample). Она возвращает случайную выборку заданного размера из структуры данных:

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

<programming-exercise name='Лотерейные номера' anchor="Lottery numbers" tmcname='part07-04_lottery_numbers'>

Напишите функцию `lottery_numbers(amount: int, lower: int, upper: int)`, которая генерирует столько случайных чисел, сколько указано в первом аргументе. Все числа должны лежать в диапазоне от `lower` до `upper`. Числа нужно сохранить в список и вернуть. В возвращаемом списке числа должны быть отсортированы по возрастанию.

Так как это лотерейные номера, одно и то же число не должно встречаться в списке дважды.

Пример того, как должна работать функция:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Откуда берутся эти «случайные» числа? {#where-do-these-random-numbers-come-from}

Возможности модуля [random](https://docs.python.org/3/library/random.html) основаны на алгоритме, который генерирует «случайные» числа, начиная с некоторого начального значения и выполняя арифметические операции. Начальное значение часто называют _seed_ (зерно, начальное значение генератора).

Значение seed можно задать вручную с помощью функции [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed):

```python
from random import randint, seed

seed(1337)
# это всегда будет давать одно и то же «случайное» число
print(randint(1, 100))
```

Если у нас есть функции, зависящие от случайности, и мы задаём seed, то результат будет одинаковым при каждом запуске. Он может отличаться между версиями Python, но в целом «случайность» теряется. Это может быть полезно, например, при тестировании.

<text-box variant="info" name="Настоящая случайность">

Если говорить точно, числа, которые выдаёт модуль `random`, не являются по‑настоящему случайными. Это _псевдослучайные_ числа. Компьютеры в своей природе детерминированы: в идеале поведение машины можно предсказать до последнего бита. Поэтому получить «истинную» случайность на компьютере сложно. Для большинства практических задач псевдослучайных чисел достаточно. Когда нужны действительно случайные числа, seed обычно берут из источника вне компьютера — например из фонового излучения, уровня шума или даже [лавовых ламп](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).

Подробнее о случайности можно почитать на <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Генератор паролей, часть 1' anchor="Password generator, part 1" tmcname='part07-05_password_generator_part_1'>

Напишите функцию, которая создаёт пароли заданной длины, состоящие из строчных букв от a до z.

Пример работы функции:

```python
for i in range(10):
    print(generate_password(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Генератор паролей, часть 2' anchor="Password generator, part 2" tmcname='part07-06_password_generator_part_2'>

Напишите улучшенную версию генератора паролей. Теперь функция принимает три аргумента:

* Если второй аргумент равен `True`, пароль также должен содержать одну или несколько цифр.
* Если третий аргумент равен `True`, пароль также должен содержать один или несколько специальных символов из набора: `!?=+-()#`.

Несмотря на два дополнительных требования, в пароле всегда должна быть хотя бы одна строчная буква. Можно считать, что функция будет вызываться только с такими комбинациями аргументов, для которых возможно составить пароль по этим правилам. Например, не будет вызова для пароля длиной 2, который должен содержать и цифру, и спецсимвол, потому что тогда не останется места для обязательной строчной буквы.

Пример работы функции:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Броски кубиков' anchor="Dice roller" tmcname='part07-07_dice_roller'>

В этом задании вы напишете несколько функций, которые можно использовать в играх с кубиками.

Вместо обычных кубиков в задании используются _нетранзитивные кубики_ (non‑transitive dice). О них можно прочитать [здесь](https://singingbanana.com/dice/article.htm) или [посмотреть видео](https://www.youtube.com/watch?v=LrIp6CKUlH8).

Мы будем использовать три кубика:

- Кубик A имеет грани 3, 3, 3, 3, 3, 6
- Кубик B имеет грани 2, 2, 2, 5, 5, 5
- Кубик C имеет грани 1, 4, 4, 4, 4, 4

</pre>

Напишите функцию `roll(die: str)`, которая «бросает» кубик, указанный в аргументе. Пример:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Также напишите функцию `play(die1: str, die2: str, times: int)`, которая бросает оба кубика столько раз, сколько указано в третьем аргументе. Функция должна вернуть кортеж: первое значение — сколько раз выиграл кубик 1, второе — сколько раз выиграл кубик 2, третье — сколько раз была ничья.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<programming-exercise name='Случайные слова' anchor="Random words" tmcname='part07-08_random_words'>

В шаблоне задания есть файл `words.txt`, в котором записаны английские слова — по одному на строку.

Напишите функцию `words(n: int, beginning: str)`, которая возвращает список из `n` случайных слов из файла `words.txt`. Все слова должны начинаться со строки, заданной вторым аргументом.

Одно и то же слово не должно встречаться в списке дважды. Если слов, начинающихся с указанной строки, недостаточно, функция должна возбуждать исключение `ValueError`.

Пример работы функции:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```

<sample-output>

cat
car
carbon

</sample-output>

</programming-exercise>

<!---
<quiz id="d53a6898-f390-55ef-b266-95694bcbe704"></quiz>
-->
