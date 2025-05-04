# VisualProgramming

Разработчики
1. Власова К.В.
2. Терентьев А.В.
3. Превед, Медвед

# Расширения VS Code
1. .NET Install Tool
2. C#
3. C# Dev Kit
4. REST Client

# .NET
https://dotnet.microsoft.com/ru-ru/download

# Install Terminal
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design


## Структура базы данных

![Таблица Comments](/img/Table.png)

![Свойства Comments](/img/Table1.png)

![Таблица Logs](/img/Table2.png)

![Свойства Logs](/img/Table3.png)


### Таблица
ALTER TABLE "Logs" 
ALTER COLUMN "Id" SET NOT NULL,
ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY,
ALTER COLUMN "Timestamp" SET NOT NULL,
ALTER COLUMN "Timestamp" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Level" SET NOT NULL,
ALTER COLUMN "Message" SET NOT NULL;
