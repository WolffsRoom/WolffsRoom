import re
import os

wolf_ascii = [
"                                        ",
"           __..._          _...__       ",
"       _.-'      '-.    .-'      '-._   ",
"     .'             '..'             '. ",
"    /                ..                \\",
"   |               .'  '.               |",
"   |      _..._   /      \\   _..._      |",
"   \\    .'     '.|        |.'     '.    /",
"    \\  /         |        |         \\  / ",
"     | |         |        |         | | ",
"     | |      _.-'        '-._      | | ",
"     | \\    .'                '.    / | ",
"      \\ \\  /                    \\  / /  ",
"       \\ \\/                      \\/ /   ",
"        \\ |         .-.-.        | /    ",
"         \\|        / / \\ \\       |/     ",
"          |       | |   | |      |      ",
"          |       \\ \\   / /      |      ",
"           \\       '-...-'      /       ",
"            \\                  /        ",
"             '-._          _.-'         ",
"                 '--------'             ",
"                                        ",
"                                        "
]

def update_svg(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace ASCII art
    # Find the <text ... class="ascii"> block
    ascii_pattern = re.compile(r'(<text[^>]*class="ascii"[^>]*>)(.*?)(</text>)', re.DOTALL)
    
    def ascii_repl(match):
        start_tag = match.group(1)
        end_tag = match.group(3)
        
        # Calculate Y for each tspan. Starting at 30, incrementing by 20.
        y = 30
        tspan_lines = []
        for line in wolf_ascii:
            tspan_lines.append(f'<tspan x="15" y="{y}">{line}</tspan>')
            y += 20
        
        return f"{start_tag}\n" + "\n".join(tspan_lines) + f"\n{end_tag}"
    
    content = ascii_pattern.sub(ascii_repl, content)
    
    # 2. Replace data
    content = content.replace("andrew@grant", "wolff@room")
    content = content.replace("Windows 10, Android 14, Linux", "Windows 11, Linux")
    content = content.replace("22 years, 5 months, 29 days", "Top Secret")
    content = content.replace("TTM Technologies, Inc.", "Wolff's Room")
    content = content.replace("CAM (Computer Aided Manufacturing) Operator", "Developer & Modder")
    content = content.replace("IDEA 2023.3.2, VSCode 1.96.0", "VSCode, Cursor, Cursor IDE")
    content = content.replace("Java, Python, JavaScript, C++", "JavaScript, HTML, CSS, Python")
    content = content.replace("HTML, CSS, JSON, LaTeX, YAML", "JSON, YAML, Markdown")
    content = content.replace("Minecraft Modding, iOS Jailbreaking", "PSVita Homebrew, Web Dev")
    content = content.replace("Overclocking, Undervolting", "Hardware Modding, Consoles")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_svg('light_mode.svg')
update_svg('dark_mode.svg')

print("Updated SVGs with new ASCII and stats")
