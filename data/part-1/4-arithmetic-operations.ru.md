---
path: "/ru/part-1/4-arithmetic-operations"
title: "Арифметические операции"
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы сможете использовать переменные в разных арифметических выражениях
- вы узнаете, как работать с числами во вводе пользователя
- вы будете знать, как приводить значения к другим базовым типам данных

</text-box>

В предыдущих разделах вы уже видели примеры базовой арифметики. В таблице ниже перечислены самые распространённые арифметические операторы в Python, с примерами:

| Оператор      | Назначение       | Пример      | Результат |
|:-------------:|------------------|-------------|----------|
| `+`           | Сложение         | `2 + 4`      |`6`    |
| `-`           | Вычитание        | `10 - 2.5`   |`7.5`  |
| `*`           | Умножение        | `-2 * 123`  |`-246` |
| `/`           | Деление (результат — float) | `9 / 2`     | `4.5` |
| `//`          | Деление (результат — int)   | `9 // 2`    | `4`   |
| `%`           | Остаток от деления (modulo) | `9 % 2`      |`1`    |
| `**`          | Возведение в степень | `2 ** 3`    |`8`    |

Порядок действий привычен по математике: сначала степени, затем умножение и деление, затем сложение и вычитание. Порядок можно изменить с помощью скобок.

Например, этот код

```python
print(2 + 3 * 3)
print((2 + 3) * 3)
```

выводит:

<sample-output>

11
15

</sample-output>

## Операнды, операторы и типы данных {#operands-operators-and-data-types}

Вычисление обычно состоит из *операндов* и *операторов*:

<img src="1_4_1.png">

Тип данных операндов обычно определяет тип результата: если сложить два целых числа, результат тоже будет целым числом. Если из одного числа с плавающей точкой вычесть другое, результат будет числом с плавающей точкой. Более того, если хотя бы один операнд в выражении — число с плавающей точкой, результат тоже будет числом с плавающей точкой, независимо от остальных операндов.

Деление `/` — исключение из этого правила. Его результат — число с плавающей точкой, даже если операнды целые. Например, `1 / 5` даст число `0.2`.

Пример:

```python
height = 172.5
weight = 68.55

# индекс массы тела (Body Mass Index, BMI) вычисляют как массу, делённую на квадрат роста
# в формуле рост переводится в метры
bmi = weight / (height / 100) ** 2

print(f"The BMI is {bmi}")
```

Эта программа выводит:

<sample-output>

The BMI is 23.037177063642087

</sample-output>

В Python также есть оператор целочисленного деления `//`. Если оба операнда — целые числа, результат будет целым числом. Он округляется вниз до ближайшего целого. Например, программа

```python
x = 3
y = 2

print(f"/ operator {x/y}")
print(f"// operator {x//y}")
```

выводит:

<sample-output>

/ operator 1.5
// operator 1

</sample-output>

## Числа во вводе {#numbers-as-input}

Мы уже использовали `input`, чтобы читать строки от пользователя. Эту же функцию можно использовать и для чтения чисел, но строку, возвращаемую `input`, нужно преобразовать в числовой тип в коде программы. В предыдущем разделе мы приводили целые числа к строкам функцией `str`. Здесь принцип тот же, но имя функции будет другим.

Строку можно преобразовать в целое число функцией `int`. Следующая программа спрашивает год рождения и сохраняет его в переменную `input_str`. Затем создаёт переменную `year`, содержащую год, преобразованный в целое число. После этого становится возможным вычисление `2021 - year` с использованием введённого значения:

```python
input_str = input("Which year were you born? ")
year = int(input_str)
print(f"Your age at the end of the year 2021: {2021 - year}" )
```

<sample-output>

Which year were you born? **1995**
Your age at the end of the year 2021: 26

</sample-output>

Обычно вам не нужно заводить две отдельные переменные (как `input_str` и `year` выше), чтобы прочитать число. Ввод и преобразование можно сделать «в одну строку»:

```python
year = int(input("Which year were you born? "))
print(f"Your age at the end of the year 2021: {2021 - year}" )
```

Аналогично, строку можно преобразовать в число с плавающей точкой функцией `float`. Следующая программа спрашивает рост и вес и использует их для вычисления BMI:

```python
height = float(input("What is your height? "))
weight = float(input("What is your weight? "))

height = height / 100
bmi = weight / height ** 2

print(f"The BMI is {bmi}")
```

Пример вывода программы:

<sample-output>

What is your height? **163**
What is your weight? **74.45**
The BMI is 28.02137829801649

</sample-output>

<in-browser-programming-exercise name="Умножить на пять" anchor="Times five" tmcname="part01-13_times_five">

Напишите программу, которая спрашивает у пользователя число. Затем программа печатает это число, умноженное на пять.

Программа должна работать так:

<sample-output>

Please type in a number: **3**
3 times 5 is 15

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Имя и возраст" anchor="Name and age" tmcname="part01-14_name_and_age">

Напишите программу, которая спрашивает имя пользователя и год рождения. Затем программа печатает сообщение так, как показано ниже:

<sample-output>

What is your name? **Frances Fictitious**
Which year were you born? **1990**
Hi Frances Fictitious, you will be 31 years old at the end of the year 2021

</sample-output>

</in-browser-programming-exercise>

## Использование переменных {#using-variables}

Рассмотрим программу, которая вычисляет сумму трёх чисел, введённых пользователем:

```python
number1 = int(input("First number: "))
number2 = int(input("Second number: "))
number3 = int(input("Third number: "))

sum = number1 + number2 + number3
print(f"The sum of the numbers: {sum}")
```

Пример запуска:

<sample-output>

First number: **5**
Second number: **21**
Third number: **7**
The sum of the numbers: 33

</sample-output>

В программе используются четыре разные переменные, но в этом случае вполне хватило бы двух:

```python
sum = 0

number = int(input("First number: "))
sum = sum + number

number = int(input("Second number: "))
sum = sum + number

number = int(input("Third number: "))
sum = sum + number

print(f"The sum of the numbers: {sum}")
```

Теперь все числа читаются в одну и ту же переменную `number`. Значение переменной `sum` _увеличивается_ на значение переменной `number` каждый раз, когда пользователь вводит новое число.

Рассмотрим внимательнее эту команду:

```python
sum = sum + number
```

Здесь текущее значение `sum` складывается со значением `number`, а результат снова записывается в `sum`. Например, если до выполнения команды `sum` равна 3, а `number` равна 2, то после выполнения команды `sum` станет 5.

Увеличение значения переменной — очень частая операция. Поэтому существует распространённая краткая запись, эквивалентная явному сложению:

```python
sum += number
```

Так программу можно сделать немного короче:

```python
sum = 0

number = int(input("First number: "))
sum += number

number = int(input("Second number: "))
sum += number

number = int(input("Third number: "))
sum += number

print(f"The sum of the numbers: {sum}")
```

Более того, переменная `number` не всегда нужна. Ввод можно обрабатывать и так:

```python
sum = 0

sum += int(input("First number: "))
sum += int(input("Second number: "))
sum += int(input("Third number: "))

print(f"The sum of the numbers: {sum}")
```

Конечно, сколько переменных нужно, зависит от контекста. Если необходимо запомнить каждое введённое значение, то «переиспользовать» одну и ту же переменную для разных вводов уже нельзя. Например:

```python
number1 = int(input("First number: "))
number2 = int(input("Second number: "))

print(f"{number1} + {number2} = {number1+number2}")
```

<sample-output>

First number: **2**
Second number: **3**
2 + 3 = 5

</sample-output>

С другой стороны, в этой программе нет отдельной переменной для хранения суммы.

«Переиспользование» переменной имеет смысл, когда нужно временно хранить данные одного и того же типа и назначения — например, при суммировании чисел.

В следующем примере переменная `data` сначала хранит имя пользователя, а затем — его возраст. Это не имеет смысла:

```python
data = input("What is your name? ")
print("Hi " + data + "!")

data = int(input("What is your age? "))
# ...программа продолжается
```

Лучше использовать разные переменные с _говорящими_ именами:

```python
name = input("What is your name? ")
print("Hi " + name + "!")

age = int(input("What is your age? "))
# ...программа продолжается
```

<in-browser-programming-exercise name="Секунды в дне" anchor="Seconds in a day" tmcname="part01-15_seconds_in_a_day">

Напишите программу, которая спрашивает у пользователя количество дней. Затем программа печатает, сколько секунд в указанном количестве дней.

Программа должна работать так:

<sample-output>

How many days? **1**
Seconds in that many days: 86400

</sample-output>

Ещё один пример:

<sample-output>

How many days? **7**
Seconds in that many days: 604800

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Исправьте код: Произведение" anchor="Fix the code: Product" tmcname="part01-16_product">

Эта программа спрашивает у пользователя три числа, а затем печатает их произведение (то есть числа, перемноженные друг с другом). Однако с программой что-то не так — если вы её запустите, увидите, что она работает неправильно. Исправьте программу.

Пример ожидаемого выполнения:

<sample-output>

Please type in the first number: **2**
Please type in the second number: **3**
Please type in the third number: **5**
The product is 30

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Сумма и произведение" anchor="Sum and product" tmcname="part01-17_sum_and_product">

Напишите программу, которая спрашивает у пользователя два числа. Затем программа печатает сумму и произведение двух чисел.

Программа должна работать так:

<sample-output>

Number 1: **3**
Number 2: **7**
The sum of the numbers: 10
The product of the numbers: 21

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Сумма и среднее" anchor="Sum and mean" tmcname="part01-18_sum_and_mean">

Напишите программу, которая спрашивает у пользователя четыре числа. Затем программа печатает сумму и среднее значение этих чисел.

Программа должна работать так:

<sample-output>

Number 1: **2**
Number 2: **1**
Number 3: **6**
Number 4: **7**
The sum of the numbers is 16 and the mean is 4.0

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Расходы на питание" anchor="Food expenditure" tmcname="part01-19_food_expenditure">

Напишите программу, которая оценивает типичные расходы пользователя на питание.

Программа спрашивает, сколько раз в неделю пользователь ест в студенческой столовой. Затем спрашивает цену типичного студенческого обеда и сумму, которую пользователь тратит на продукты в неделю.

По этим данным программа вычисляет типичные расходы на еду в неделю и в день.

Программа должна работать так:

<sample-output>

How many times a week do you eat at the student cafeteria? **4**
The price of a typical student lunch? **2.5**
How much money do you spend on groceries in a week? **28.5**

Average food expenditure:
Daily: 5.5 euros
Weekly: 38.5 euros

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Студенты по группам" anchor="Students in groups" tmcname="part01-20_students_in_groups">

Напишите программу, которая спрашивает количество студентов на курсе и желаемый размер группы. Затем программа печатает количество групп, которое получится из студентов курса. Если деление не ровное, одна из групп может получиться меньше, чем заданный размер.

Если у вас не получается добиться правильного результата, ничего страшного: можно перейти дальше и вернуться к этому упражнению позже. Следующий раздел — [условные операторы](/ru/part-1/5-conditional-statements). Это упражнение также можно решить с помощью условной конструкции.

<sample-output>

How many students on the course? **8**
Desired group size? **4**
Number of groups formed: 2

</sample-output>

<sample-output>

How many students on the course? **11**
Desired group size? **3**
Number of groups formed: 4

</sample-output>

Подсказка: здесь может пригодиться оператор целочисленного деления `//`.

</in-browser-programming-exercise>


<!--

Тест для повторения материала этого раздела:

<quiz id="d781d54e-9792-5a79-a018-168940390580"></quiz>

-->
