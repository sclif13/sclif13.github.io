---
title: Django замена повторяющихся слэшей в url
author: Sclif
layout: post
date: 2015-04-06T17:35:12+00:00
categories:
  - Code
  - Заметки
tags:
  - django
  - python

---
Возникла необходимость удалять слэши в url. Пример:

```
http://example.com///
http://example.com/one//two//
```

Решение довольно простое. В ursl.py пишем

```
url(r'\/{2,}', 'views.redirect_to'),
```

Тем самым производим поиск **r&#8217;\/{2,}&#8217;** слэшей от 2 и более. Далее совершаем замену на один слэш.

```
import re
def redirect_to(request):
    return redirect(re.sub(r'\/{2,}', '/', request.path))
```

P.S. Если используете nginx, то в конфиге в контексте http или server выставите ```merge_slashes off;```

Данная директива запрещает преобразование URI путём замены двух и более подряд идущих слэшей (“/”) на один.