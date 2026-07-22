import re

with open('today.py', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('Andrew6rant', 'WolffsRoom')
code = code.replace('Andrew Grant', 'Gabriel Wolff')

with open('today.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated today.py")
