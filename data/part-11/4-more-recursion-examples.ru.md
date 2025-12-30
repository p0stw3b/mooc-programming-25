---
path: /ru/part-11/4-more-recursion-examples
title: Ещё примеры рекурсии
hidden: false
---

<text-box variant='learningObjectives' name="Цели обучения">

После этого раздела:

- вы познакомитесь с бинарными деревьями и некоторыми рекурсивными алгоритмами для работы с ними

</text-box>

Настоящие преимущества рекурсии особенно заметны в задачах, где итеративное решение трудно написать. Например, рассмотрим _бинарные деревья_. Бинарное дерево — это ветвящаяся структура из узлов: в каждом узле структура разветвляется максимум на две дочерние ветви (каждая со своими узлами). Бинарное дерево может выглядеть так (информатику часто относят к естественным наукам, но в нашем представлении деревья, как вы заметите, «перевёрнуты»):

<img src="11_4_1_2.png">

Бинарные деревья, по крайней мере теоретически, удобно обрабатывать рекурсивно: если мы хотим выполнить некоторую операцию на каждом узле дерева, алгоритму достаточно:

1. Обработать текущий узел
2. Рекурсивно вызвать себя для левого дочернего узла
3. Рекурсивно вызвать себя для правого дочернего узла

<img src="11_4_2_2e.png">

Как видно на рисунке, левое и правое «поддеревья» сами являются полноценными бинарными деревьями, а единственный узел вне рекурсивных вызовов — родительский узел, который обрабатывается на шаге 1 до рекурсивных вызовов. Поэтому можно быть уверенным, что по завершении функции каждый узел будет посещён ровно один раз.

Итеративный обход бинарного дерева был бы намного сложнее: пришлось бы как‑то отслеживать, какие узлы уже посещены. Те же принципы верны и для других древесных структур, не только бинарных.

Бинарное дерево легко смоделировать и в коде Python. Достаточно определить класс для одного узла: у него есть значение и ссылки на левого и правого потомков:

```python

class Node:
    """Класс представляет один узел бинарного дерева."""
    def __init__(self, value, left_child:'Node' = None, right_child:'Node' = None):
        self.value = value
        self.left_child = left_child
        self.right_child = right_child
```

Теперь предположим, что мы хотим смоделировать такое дерево:

<img src="11_4_3.png">

Это можно сделать таким кодом:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)
```

## Рекурсивные алгоритмы для бинарных деревьев {#recursive-binary-tree-algorithms}

Сначала рассмотрим алгоритм, который печатает значения всех узлов бинарного дерева по одному. В следующих примерах мы будем работать с деревом, определённым выше.

Аргумент функции печати — корневой узел бинарного дерева. Это узел на самой вершине рисунка выше. Все остальные узлы являются его _потомками_:

```python

def print_nodes(root: Node):
    print(root.value)

    if root.left_child is not None:
        print_nodes(root.left_child)

    if root.right_child is not None:
        print_nodes(root.right_child)

```

Функция печатает значение узла, переданного аргументом, а затем рекурсивно вызывает себя для левого и правого потомков (если они существуют). Это очень простой алгоритм, но он эффективно и надёжно обходит все узлы дерева любого размера. Важно, что ни один узел не посещается дважды: каждое значение печатается ровно один раз.

Если передать корневой узел `tree` изображённого выше бинарного дерева в качестве аргумента функции, она выведет:

<sample-output>

2
3
5
8
4
11

</sample-output>

Как видно по порядку значений в выводе, алгоритм сначала спускается по «левой ветви» дерева до самого низа, а затем последовательно обходит остальные узлы.

Аналогично можно написать алгоритм, который вычисляет сумму всех значений, хранящихся в узлах дерева:

```python
def sum_of_nodes(root: Node):
    node_sum = root.value

    if root.left_child is not None:
        node_sum += sum_of_nodes(root.left_child)

    if root.right_child is not None:
        node_sum += sum_of_nodes(root.right_child)

    return node_sum
```

Переменная `node_sum` инициализируется значением текущего узла. Затем к ней добавляются суммы левого и правого поддеревьев с помощью рекурсивных вызовов (предварительно проверив, что потомки существуют). После этого результат возвращается.

<programming-exercise name='Наибольший узел' anchor="Greatest node" tmcname='part11-16_greatest_node'>

Напишите функцию `greatest_node(root: Node)`, которая принимает корневой узел бинарного дерева.

Функция должна вернуть значение узла с максимальным значением в дереве. Обход дерева должен быть рекурсивным.

Подсказка: может пригодиться функция `sum_of_nodes` из примера выше.

Пример того, как должна работать функция:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)

    print(greatest_node(tree))
```

<sample-output>

11

</sample-output>

</programming-exercise>

## Упорядоченное бинарное дерево {#a-sorted-binary-tree}

Бинарное дерево особенно полезно, когда узлы упорядочены определённым образом. Это делает поиск узлов быстрым и эффективным.

Рассмотрим дерево, которое упорядочено так: левый потомок каждого узла меньше самого узла, а правый потомок — соответственно больше.

<img src="11_4_1_2.png">

Теперь можно написать рекурсивный алгоритм поиска узла. Идея очень похожа на двоичный поиск из предыдущего раздела: если текущий узел — это то, что мы ищем, возвращаем `True`. Иначе продолжаем рекурсивно либо в левом, либо в правом поддереве. Если узла нет (`None`), возвращаем `False`.

```python
def find_node(root: Node, value):
    if root is None:
        return False

    if value == root.value:
        return True

    if value > root.value:
        return find_node(root.right_child, value)

    return find_node(root.left_child, value)
```

<programming-exercise name='Начальники и подчинённые' anchor="Bosses and subordinates" tmcname='part11-17_bosses_and_subordinates'>

Класс `Employee` моделирует сотрудника компании:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

Напишите функцию `count_subordinates(employee: Employee)`, которая рекурсивно подсчитывает количество подчинённых у сотрудника.

Пример работы функции:

```python
if __name__ == "__main__":
    t1 = Employee("Sally")
    t2 = Employee("Eric")
    t3 = Employee("Matthew")
    t4 = Employee("Emily")
    t5 = Employee("Adele")
    t6 = Employee("Claire")
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    print(count_subordinates(t1))
    print(count_subordinates(t4))
    print(count_subordinates(t5))
```

<sample-output>

5
3
0

</sample-output>

</programming-exercise>

## Возвращаясь во времена до рекурсии {#revisiting-the-times-before-recursion}

Завершим эту часть материалов чуть более крупным упражнением, в котором акцент будет на принципах объектно‑ориентированного программирования. Мы не рекомендуем использовать рекурсию в этой серии заданий, но техники списковых включений будут полезны.

<programming-exercise name='Журнал заказов' anchor="OrderBook" tmcname='part11-18_order_book'>

В этом упражнении вы напишете два класса. Они станут основой следующего упражнения, в котором вы будете писать интерактивное приложение.

## Задание Task {#task}

Напишите класс `Task`, который моделирует одну задачу в списке задач софтверной компании. У задачи есть:
- описание
- оценка количества часов, необходимых для выполнения
- имя программиста, которому назначена задача
- поле, показывающее, выполнена ли задача
- уникальный идентификатор

Класс используется так:

```python
t1 = Task("program hello world", "Eric", 3)
print(t1.id, t1.description, t1.programmer, t1.workload)
print(t1)
print(t1.is_finished())
t1.mark_finished()
print(t1)
print(t1.is_finished())
t2 = Task("program webstore", "Adele", 10)
t3 = Task("program mobile app for workload accounting", "Eric", 25)
print(t2)
print(t3)
```

<sample-output>

1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Adele NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED

</sample-output>

Уточнения:
- состояние задачи (завершена или ещё нет) проверяется методом `is_finished(self)`, который возвращает булево значение
- при создании задача считается незавершённой
- задача помечается завершённой методом `mark_finished(self)`
- `id` — это возрастающий номер, начинающийся с 1: у первой задачи `id` равен 1, у второй — 2 и т. д.

**Подсказка:** `id` можно реализовать как [переменную класса](/ru/part-9/5-class-attributes#class-variables).

## Класс `OrderBook` {#orderbook}

Напишите класс `OrderBook`, который хранит все задачи, заказанные у софтверной компании. Задачи должны быть представлены объектами класса `Task`, который вы только что написали.

Базовая версия `OrderBook` используется так:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

for order in orders.all_orders():
    print(order)

print()

for programmer in orders.programmers():
    print(programmer)
```

<sample-output>

1: program webstore (10 hours), programmer Adele NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

Adele
Eric

</sample-output>

На этом этапе ваш `OrderBook` должен предоставлять три метода:
- `add_order(self, description, programmer, workload)` добавляет новый заказ (задачу) в `OrderBook`. Внутри `OrderBook` заказы хранятся как объекты `Task`. Важно: метод должен принимать _ровно_ перечисленные аргументы, иначе автоматические тесты не будут работать корректно.
- `all_orders(self)` возвращает список всех задач, хранящихся в `OrderBook`
- `programmers(self)` возвращает список имён всех программистов, у которых есть задачи в `OrderBook`. Каждый программист должен встречаться в списке только один раз

**Подсказка:** простой способ убрать дубликаты — сначала обработать список как [множество (set)](https://docs.python.org/3.8/library/stdtypes.html#set). Множество — это коллекция, где каждый уникальный элемент встречается только один раз. Затем `set` можно преобразовать обратно в список, и тогда каждый элемент будет уникальным:

```python
my_list = [1,1,3,6,4,1,3]
my_list2 = list(set(my_list))
print(my_list)
print(my_list2)
```

<sample-output>

[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]

</sample-output>

## Ещё немного функциональности для OrderBook {#some-more-features-for-orderbook}

Напишите ещё три метода в классе `OrderBook`.

Метод `mark_finished(self, id: int)` принимает `id` задачи и помечает соответствующую задачу как выполненную:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

orders.mark_finished(1)
orders.mark_finished(2)

for order in orders.all_orders():
    print(order)
```

<sample-output>

1: program webstore (10 hours), programmer Adele FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

</sample-output>

Если задачи с указанным `id` нет, метод должен выбросить исключение `ValueError`. Если нужно освежить в памяти выбрасывание исключений, посмотрите [часть 6](/ru/part-6/3-errors#raising-exceptions).

Методы `finished_orders(self)` и `unfinished_orders(self)` работают ожидаемо: оба возвращают список соответствующих задач из `OrderBook`.

## Финальные штрихи в OrderBook {#finishing-touches-to-orderbook}

Напишите ещё один метод в классе `OrderBook`: `status_of_programmer(self, programmer: str)`. Он должен возвращать _кортеж_. В кортеже должны быть количество выполненных и невыполненных задач, назначенных программисту, а также суммарные оценки часов в обеих категориях.

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Adele", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)
orders.add_order("program the next facebook", "Eric", 1000)

orders.mark_finished(1)
orders.mark_finished(2)

status = orders.status_of_programmer("Adele")
print(status)
```

<sample-output>

(2, 1, 35, 100)

</sample-output>

Первый элемент кортежа — количество _выполненных_ задач, второй — количество _невыполненных_. Третий и четвёртый элементы — суммы оценок часов для выполненных и невыполненных задач соответственно.

Если программиста с указанным именем нет, метод должен выбросить исключение `ValueError`.

</programming-exercise>

<programming-exercise name='Приложение для OrderBook' anchor="Order book application" tmcname='part11-19_order_book_application'>

В этом упражнении вы создадите интерактивное приложение для управления задачами, заказанными у софтверной компании. Реализация полностью на ваше усмотрение, но вы можете использовать «строительные блоки» из предыдущего упражнения. Также могут пригодиться примеры из [последнего раздела части 10](/ru/part-10/4-application-development).

## Без обработки ошибок {#without-error-handling}

Приложение должно работать _точно_ так:

<sample-output>

commands:
0 exit
1 add order
2 list finished tasks
3 list unfinished tasks
4 mark task as finished
5 programmers
6 status of programmer

command: **1**
description: **program the next facebook**
programmer and workload estimate: **jonah 1000**
added!

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric 25**
added!

command: **1**
description: **program an app for music theory revision**
programmer and workload estimate: **nina 12**
added!

command: **1**
description: **program the next twitter**
programmer and workload estimate: **jonah 55**
added!

command: **2**
no finished tasks

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

command: **4**
id: **2**
marked as finished

command: **4**
id: **4**
marked as finished

command: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

command: **5**
jonah
eric
nina

command: **6**
programmer: **jonah**
tasks: finished 1 not finished 1, hours: done 55 scheduled 1000

</sample-output>

Первый балл даётся за работающее приложение при условии, что ввод пользователя всегда корректен.

## Обработка ошибок ввода {#handling-errors-in-user-input}

Чтобы получить второй балл за это упражнение, приложение должно уметь восстанавливаться после ошибочного ввода пользователя. Любой ввод, не соответствующий заданному формату, должен приводить к сообщению об ошибке _erroneous input_ и к очередному повтору цикла с запросом новой команды:

<sample-output>

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric xxx**
erroneous input

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric**
erroneous input

command: **4**
id: **1000000**
erroneous input

command: **4**
id: **XXXX**
erroneous input

command: **6**
programmer: **unknownprogrammer**
erroneous input

</sample-output>

</programming-exercise>

Пожалуйста, ответьте на небольшой опрос по этой части курса.

<quiz id="ce7a3228-ba6b-599b-8134-cd64fe015a96"></quiz>
