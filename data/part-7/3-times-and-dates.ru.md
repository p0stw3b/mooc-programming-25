---
path: /ru/part-7/3-times-and-dates
title: Дата и время
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы будете знать, как работать с датами и временем в Python
- вы сможете создавать и использовать объекты `datetime`
- вы будете знать, как сравнивать даты/время и вычислять разницу между ними

</text-box>

## Объект `datetime` {#the-datetime-object}

В модуле Python [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) есть функция [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now), которая возвращает объект datetime с текущими датой и временем. Стандартный вывод datetime выглядит так:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```

<sample-output>

2021-10-19 08:46:49.311393

</sample-output>

Объект можно создать и вручную:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

По умолчанию время — полночь, так как в примере выше мы не задавали время суток.

К отдельным компонентам datetime можно обращаться так:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```

<sample-output>

Day: 24
Month: 12
Year: 1952

</sample-output>

Можно указать и время суток. Точность может отличаться — как видно из примера:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 в 13:00
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 в 18:45
```

## Сравнение дат/времени и вычисление разницы {#compare-times-and-calculate-differences-between-them}

Обычные операторы сравнения работают и с объектами datetime:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```

<sample-output>

It is past Midsummer

</sample-output>

Разницу между двумя datetime можно вычислить обычным вычитанием:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```

<sample-output>

Midsummer is -116 days away

</sample-output>

Важно: результат вычитания datetime — это объект [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects). Он менее «богат», чем `datetime`. Например, у `timedelta` можно получить количество дней, но нельзя получить количество лет, потому что длина года меняется. `timedelta` содержит атрибуты `days`, `seconds` и `microseconds`. Можно передавать и другие единицы измерения, но внутри они будут преобразованы.

Аналогично можно складывать `datetime` и `timedelta`. Результатом будет `datetime`, полученный добавлением к дате/времени указанного количества дней (или недель, секунд и т. п.):

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)

print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```

<sample-output>

A week after Midsummer it will be 2021-07-03 00:00:00
32 weeks and 15 days after Midsummer it will be 2022-02-20 00:00:00

</sample-output>

Посмотрим на пример с большей точностью:

```python
time_now = datetime.now()
midnight = datetime(2021, 6, 30)
difference = midnight - time_now
print(f"Midnight is still {difference.seconds} seconds away")
```

<sample-output>

Midnight is still 8188 seconds away

</sample-output>

<programming-exercise name='Сколько дней' anchor="How old" tmcname='part07-09_how_old'>

Напишите программу, которая спрашивает дату рождения пользователя и затем выводит, сколько дней пользователю было накануне нового тысячелетия. Программа должна спрашивать день, месяц и год отдельно и выводить возраст в днях. См. примеры ниже.

<sample-output>

Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.

</sample-output>

<sample-output>

Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.

</sample-output>

Можно считать, что все комбинации день‑месяц‑год, вводимые пользователем, являются корректными датами. То есть не будет даты вроде 31 февраля.

</programming-exercise>

<programming-exercise name='Корректный PIC?' anchor="Valid PIC?" tmcname='part07-10_valid_pic'>

В этом задании вы будете проверять финские персональные идентификационные коды (PIC).

Напишите функцию `is_it_valid(pic: str)`, которая возвращает `True` или `False` в зависимости от того, является ли PIC, переданный в аргументе, корректным. Финский PIC имеет формат `ddmmyyXyyyz`, где `ddmmyy` — дата рождения, `X` — маркер века, `yyy` — персональный идентификатор, а `z` — контрольный символ.

Программа должна проверить корректность по трём критериям:

* Первая часть кода — существующая корректная дата в формате `ddmmyy`.
* Маркер века — один из `+` (1800‑е), `-` (1900‑е) или `A` (2000‑е).
* Контрольный символ корректен.

Контрольный символ вычисляется так: берётся девятизначное число, составленное из даты рождения и персонального идентификатора, делится на 31, а затем по остатку выбирается символ с соответствующим индексом из строки `0123456789ABCDEFHJKLMNPRSTUVWXY`. Например, если остаток равен 12, контрольный символ будет `C`.

Больше примеров и объяснений можно найти на сайте [Digital and Population Data Services Agency](https://dvv.fi/en/personal-identity-code).

**Важно!** Пожалуйста, не публикуйте свой личный PIC — например, в тестовом коде или в каналах поддержки курса.

Вот несколько корректных PIC, которые можно использовать для тестирования:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Форматирование даты и времени {#formatting-times-and-dates}

В модуле `datetime` есть удобный метод [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime) для форматирования строкового представления datetime. Например, следующий код выведет текущую дату в формате `dd.mm.yyyy`, а затем дату и время в другом формате:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```

<sample-output>

19.10.2021
19/10/2021 09:31

</sample-output>

При форматировании используются специальные обозначения. Ниже приведены некоторые из них (полный список — в [документации Python](https://docs.python.org/3/library/time.html#time.strftime)):

Обозначение | Значение
:--------|:--------
`%d` | день (01–31)
`%m` | месяц (01–12)
`%Y` | год четырьмя цифрами
`%H` | часы в 24‑часовом формате
`%M` | минуты (00–59)
`%S` | секунды (00–59)

Разделители между элементами формата вы выбираете сами — как видно в примерах выше.

Форматирование работает и в обратную сторону: если нужно разобрать строку пользователя и получить `datetime`, используйте метод [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime):

```python
from datetime import datetime

birthday = input("Please type in your birthday in the format dd.mm.yyyy: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("You were born in the previous millennium")
else:
    print("You were born during this millennium")
```

<sample-output>

Please type in your birthday in the format dd.mm.yyyy: **5.11.1986**
You were born in the previous millennium

</sample-output>

<programming-exercise name='Экранное время' anchor="Screen time" tmcname='part07-11_screen_time'>

Напишите программу для записи времени, которое пользователь провёл перед экраном телевизора, компьютера или телефона за некоторый период.

Программа должна работать так:

<sample-output>

Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt

</sample-output>

Пользователь вводит данные за каждый день на отдельной строке. В строке три числа, разделённые пробелами — количество минут.

Для приведённого выше ввода программа должна сохранить данные в файл `late_june.txt`. Содержимое должно выглядеть так:

<sample-data>

Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>

<!---
<quiz id="6fff0633-2f18-5e2b-9eab-6c8950c8378b"></quiz>
-->
