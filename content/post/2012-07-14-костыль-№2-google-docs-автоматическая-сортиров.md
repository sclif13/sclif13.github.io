---
title: Костыль №2. Google Docs автоматическая сортировка в таблице.
author: Sclif
layout: post
date: 2012-07-14T11:53:19+00:00
categories:
  - Костыли
---

Появилась задача в Google Docs автоматически сортировать определенный столбец в таблице по возрастанию, потратив 3 часа времени и перебрав пару решений из коллекции скриптов получил вот такое вот решение. Создал скрипт-триггер который срабатывает при редактировании таблицы.

```
function onEdit() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var range = ss.getSheets()[0].getRange("A2:E255"); // A2:E255 диапазон сортировки
    range.sort({column: 5, ascending: false}); // сортировать 5 колонку по убыванию
}
```

{{< sample-onedit-link >}}
