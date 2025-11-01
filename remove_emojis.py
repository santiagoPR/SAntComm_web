#!/usr/bin/env python3
"""Remove all Unicode emojis from HTML and replace with professional SVG icons."""

import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace CSS link
html = html.replace('href="styles/premium-main.css"', 'href="styles/professional.css"')

# Replace hero badge emoji
html = html.replace(
    '<span class="badge-icon">⚡</span>',
    '<svg class="badge-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z" stroke="currentColor" stroke-width="1.5" fill="currentColor"/></svg>'
)

# Replace tech stack emojis
tech_replacements = {
    '<div class="tech-icon">🧠</div>': '''<div class="tech-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                                <circle cx="30" cy="10" r="2" fill="currentColor"/>
                                <circle cx="10" cy="30" r="2" fill="currentColor"/>
                                <circle cx="30" cy="30" r="2" fill="currentColor"/>
                                <path d="M20 20L10 10M20 20L30 10M20 20L10 30M20 20L30 30" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </div>''',
    '<div class="tech-icon">📊</div>': '''<div class="tech-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="28" width="6" height="8" fill="currentColor" rx="1"/>
                                <rect x="17" y="20" width="6" height="16" fill="currentColor" rx="1"/>
                                <rect x="26" y="14" width="6" height="22" fill="currentColor" rx="1"/>
                            </svg>
                        </div>''',
    '<div class="tech-icon">⚡</div>': '''<div class="tech-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 8V20L28 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>''',
    '<div class="tech-icon">🔒</div>': '''<div class="tech-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="12" y="16" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M16 16V12C16 9.79086 17.7909 8 20 8C22.2091 8 24 9.79086 24 12V16" stroke="currentColor" stroke-width="2"/>
                                <circle cx="20" cy="23" r="2" fill="currentColor"/>
                            </svg>
                        </div>'''
}

for emoji, svg in tech_replacements.items():
    html = html.replace(emoji, svg)

# Replace value icons
value_replacements = {
    '<div class="value-icon">🚀</div>': '''<div class="value-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M16 4L18 14L28 16L18 18L16 28L14 18L4 16L14 14L16 4Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                    </svg>
                                </div>''',
    '<div class="value-icon">🎯</div>': '''<div class="value-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="16" r="10" stroke="currentColor" stroke-width="2"/>
                                        <circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="2"/>
                                        <circle cx="16" cy="16" r="2" fill="currentColor"/>
                                    </svg>
                                </div>''',
    '<div class="value-icon">🤝</div>': '''<div class="value-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M8 16C8 12 10 8 16 8C22 8 24 12 24 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M24 16C24 20 22 24 16 24C10 24 8 20 8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <circle cx="16" cy="16" r="2" fill="currentColor"/>
                                    </svg>
                                </div>'''
}

for emoji, svg in value_replacements.items():
    html = html.replace(emoji, svg)

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully removed all emojis and replaced with professional SVG icons")
print("Updated CSS link to professional.css")
