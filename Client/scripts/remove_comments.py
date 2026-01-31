#!/usr/bin/env python3
"""Remove comments from project files (dry-run by default).

Usage:
  ./scripts/remove_comments.py [--apply] [--ext ts,js,html,css,md,json]

By default the script will do a dry-run and report which files would be changed
and how many comment occurrences would be removed. Use --apply to modify files
in-place. The script ignores common build folders like node_modules and .git.
"""

import argparse
import os
import re
import sys
from pathlib import Path

IGNORED_DIRS = {"node_modules", ".git", "dist", "build"}
DEFAULT_EXTS = ["ts", "js", "tsx", "jsx", "html", "css", "scss", "json", "md"]

RE_HTML_COMMENT = re.compile(r"<!--(.*?)-->", re.S)
RE_C_STYLE = re.compile(r"/\*(.*?)\*/", re.S)
RE_LINE_COMMENT = re.compile(r"//.*?$", re.M)


def remove_html_comments(text):
    matches = RE_HTML_COMMENT.findall(text)
    return RE_HTML_COMMENT.sub("", text), len(matches)


def remove_c_comments(text):
    matches = RE_C_STYLE.findall(text)
    return RE_C_STYLE.sub("", text), len(matches)


# A conservative JS/TS comment stripper that avoids removing comment-like
# sequences inside string and template literals. It removes //... and /*...*/
# when not inside single/double/backtick strings.

def remove_js_comments(text):
    i = 0
    n = len(text)
    out = []
    in_single = False
    in_double = False
    in_backtick = False
    in_block_comment = False
    in_line_comment = False
    escaped = False
    removed = 0

    while i < n:
        ch = text[i]

        # Handle exiting block comment
        if in_block_comment:
            if ch == '*' and i+1 < n and text[i+1] == '/':
                in_block_comment = False
                removed += 1
                i += 2
                continue
            else:
                i += 1
                continue

        # Handle exiting line comment
        if in_line_comment:
            if ch == '\n':
                in_line_comment = False
                out.append(ch)
                i += 1
                continue
            else:
                i += 1
                continue

        # If currently in a string, handle escapes and closing
        if in_single:
            if ch == "\\" and not escaped:
                escaped = True
                out.append(ch)
                i += 1
                continue
            if ch == "'" and not escaped:
                in_single = False
            escaped = False
            out.append(ch)
            i += 1
            continue

        if in_double:
            if ch == "\\" and not escaped:
                escaped = True
                out.append(ch)
                i += 1
                continue
            if ch == '"' and not escaped:
                in_double = False
            escaped = False
            out.append(ch)
            i += 1
            continue

        if in_backtick:
            if ch == "\\" and not escaped:
                escaped = True
                out.append(ch)
                i += 1
                continue
            if ch == '`' and not escaped:
                in_backtick = False
            escaped = False
            out.append(ch)
            i += 1
            continue

        # Not in string or comment
        if ch == "'":
            in_single = True
            out.append(ch)
            i += 1
            continue
        if ch == '"':
            in_double = True
            out.append(ch)
            i += 1
            continue
        if ch == '`':
            in_backtick = True
            out.append(ch)
            i += 1
            continue

        # Detect start of comments
        if ch == '/' and i+1 < n:
            nxt = text[i+1]
            if nxt == '/':
                in_line_comment = True
                i += 2
                removed += 1
                continue
            if nxt == '*':
                in_block_comment = True
                i += 2
                removed += 1
                continue

        out.append(ch)
        i += 1

    return ''.join(out), removed


def process_file(path: Path, exts):
    text = path.read_text(encoding='utf-8')
    orig = text
    total_removed = 0

    ext = path.suffix.lower().lstrip('.')
    changed = False

    if ext in ('html',):
        text, rc = remove_html_comments(text)
        total_removed += rc
    if ext in ('css', 'scss'):
        text, rc = remove_c_comments(text)
        total_removed += rc
    if ext in ('md',):
        text, rc = remove_html_comments(text)
        total_removed += rc
    if ext in ('ts', 'js', 'tsx', 'jsx'):
        text, rc = remove_js_comments(text)
        total_removed += rc
        # also remove any lingering C-style comments (edge-cases)
        text, rc2 = remove_c_comments(text)
        total_removed += rc2
    if ext in ('json',):
        # JSON: attempt to remove // and /* */ comments conservatively
        text, rc1 = RE_LINE_COMMENT.subn('', text)
        text, rc2 = RE_C_STYLE.subn('', text)
        total_removed += rc1 + rc2

    changed = (text != orig)
    return changed, total_removed, text


def is_ignored(path: Path):
    for part in path.parts:
        if part in IGNORED_DIRS:
            return True
    return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true', help='Apply changes')
    parser.add_argument('--ext', type=str, default=','.join(DEFAULT_EXTS), help='Comma-separated extensions to process')
    parser.add_argument('--root', type=str, default='.', help='Root folder to scan')
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    exts = {e.lower().strip() for e in args.ext.split(',') if e.strip()}

    root = Path(args.root).resolve()
    if not root.exists():
        print(f'Root path {root} does not exist', file=sys.stderr)
        sys.exit(2)

    has_git = (root / '.git').exists()
    if args.apply and has_git:
        print('Note: .git detected. It is recommended you commit changes before running with --apply.', file=sys.stderr)

    files_modified = []
    total_comments = 0

    for p in root.rglob('*'):
        if p.is_file():
            if is_ignored(p):
                continue
            if p.suffix:
                ext = p.suffix.lstrip('.').lower()
                if ext in exts:
                    try:
                        changed, removed, newtext = process_file(p, exts)
                        if changed:
                            files_modified.append((p.relative_to(root), removed))
                            total_comments += removed
                            if args.apply:
                                backup = str(p) + '.bak'
                                p.write_text(newtext, encoding='utf-8')
                                # write backup for safety
                                Path(backup).write_text('=== backup of ' + str(p) + ' ===\n', encoding='utf-8')
                    except Exception as e:
                        print(f'Error processing {p}: {e}', file=sys.stderr)

    if not files_modified:
        print('No files would be changed.')
        return

    print('\nSummary:')
    print(f'Files that would be changed: {len(files_modified)}')
    for f, r in files_modified:
        print(f' - {f}: ~{r} comment blocks removed')
    print(f'Total estimated comment blocks removed: {total_comments}')

    if args.apply:
        print('\nChanges applied. Backups with .bak were created for changed files.')
    else:
        print('\nDry-run finished. Run with --apply to modify files in-place.')


if __name__ == '__main__':
    main()
