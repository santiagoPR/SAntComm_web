# Rules Quick Reference - ALWAYS CHECK THIS

**Location:** .claude/RULES_QUICK_REF.md
**Source:** C:\Users\sigfr\.claude\core-principles.md
**Project:** SAntComm Web & Mobile

---

## RULE 1: NO UNICODE IN CODE

**NEVER in:**
- Python scripts (.py)
- JavaScript/TypeScript (.js, .ts)
- Configuration files (.json, .yaml, .toml)
- Code comments
- Variable names
- File paths
- Output strings IN CODE

**ACCEPTABLE in:**
- Documentation (.md files)
- This reference document
- User-facing output (NOT in code)

**Check before committing:** Scan all code files for Unicode

---

## RULE 2: NO SHORTCUTS

- Implement correctly the first time
- No placeholder values
- No TODO comments without implementation
- Full error handling
- Consider all edge cases

---

## RULE 3: VERIFIED METRICS ONLY

- Never say "probably" or "should"
- Provide exact measurements
- Show methodology
- Report failures alongside successes

---

## RULE 4: VALIDATE BEFORE RUNNING

**Checklist:**
- [ ] Read existing code
- [ ] Understand current state
- [ ] Identify dependencies
- [ ] Verify correctness
- [ ] Check for errors

---

## RULE 5: ASK BEFORE ACTING

**Always ask before:**
- Long-running processes (>30s)
- Changing existing code
- Installing packages
- Creating multiple files
- Git commits
- Destructive operations

---

## RULE 6: TERMINATE UNNEEDED PROCESSES

- Monitor completion
- Kill when no longer needed
- Clean up resources

---

## RULE 7: SENIOR-LEVEL QUALITY

- Clean, readable code
- Proper naming
- Error handling
- Best practices
- Design patterns

---

## RULE 8: SYSTEMATIC APPROACH

1. UNDERSTAND
2. ASK IF UNCLEAR
3. ANALYZE
4. PLAN
5. IMPLEMENT
6. VALIDATE

---

## RULE 9: USE AGENTS

Route tasks to specialized agents:
- Research -> Exa agent
- Quick lookup -> Brave agent
- Data analysis -> Pandas agent
- Code navigation -> Code Index agent
- Tasks -> TodoWrite agent

---

## RULE 10: USE GLOBAL AGENTS

**Location:** C:\Users\sigfr\.claude\global_commands\

**Never:**
- Create new agents from scratch
- Duplicate existing agents

**Always:**
- Use auto-setup script
- Copy from global library

---

## Pre-Action Checklist

Before any major action:

1. [ ] Have I read CORE_PRINCIPLES_LOCAL.md?
2. [ ] Am I using Unicode in code? (NO!)
3. [ ] Am I taking shortcuts? (NO!)
4. [ ] Have I validated before running?
5. [ ] Do I need to ask permission?
6. [ ] Am I using the right agent?
7. [ ] Am I using existing global agents?

---

**Remember:** Correctness > Speed

If in doubt: ASK THE USER
