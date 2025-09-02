IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'TemplateDB')
BEGIN
    CREATE DATABASE [TemplateDB];
END
